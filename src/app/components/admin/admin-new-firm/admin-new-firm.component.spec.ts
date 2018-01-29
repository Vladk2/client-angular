import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

import { AdminNewFirmComponent } from './admin-new-firm.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AdminService } from '../../../services/admin-service/admin.service';

import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {User} from '../../../models/user/user.model';
import { Address } from '../../../models/address/address.model';

describe('AdminNewFirmComponent', () => {
  let component: AdminNewFirmComponent;
  let fixture: ComponentFixture<AdminNewFirmComponent>;
  let adminService: AdminService;

  beforeEach(async(() => {

    let users = [
      {id: 1, username: 'nole', password: '123', name: 'Novica', last_name: 'Nikolic', email: 'nole0223@gmail.com'},
      {id: 2, username: 'noco', password: '123', name: 'Nole', last_name: 'Nikolic', email: 'nole@gmail.com'}
    ]

    let adminServiceMock = {
      getAllUser: jasmine.createSpy('getAllUser')
        .and.returnValue(Observable.from([users])),

      addFirm: jasmine.createSpy('addFirm')
        .and.returnValue(Observable.from([])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AdminNewFirmComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpClientModule, HttpModule ],
      providers: [ {provide: AdminService, useValue: adminServiceMock} ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewFirmComponent);
    adminService = TestBed.get(AdminService);
    component = fixture.componentInstance;
  });

  it('should get all user', fakeAsync(() => {
    component.ngOnInit();

    expect(component.users[0].id).toEqual(1);
    expect(component.users[1].username).toEqual('noco');
  }));

  it('should open dialog for AddUser', () => {
    component.openDialogAddUser();

    expect(component.showModal).toEqual(true);
  });

  it('should add firm ', () => {
    component.onAddFirm();

    const adres = new Address();

    let firms = {
      firm_name: undefined,
      address: adres
    }
    expect(adminService.addFirm).toHaveBeenCalledWith(firms, undefined);
  });
});
