import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

import { AdminNewBuildingComponent } from './admin-new-building.component';
import { FormsModule }   from '@angular/forms';
import { AdminService } from '../../../services/admin-service/admin.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Address } from '../../../models/address/address.model';

describe('AdminNewBuildingComponent', () => {
  let component: AdminNewBuildingComponent;
  let fixture: ComponentFixture<AdminNewBuildingComponent>;
  let adminService: any;
  let router: any; 

  beforeEach(async(() => {

    let adminServiceMock = {
      addBuilding: jasmine.createSpy('addBuilding')
        .and.returnValue(Observable.from([{}])),

      buildongChange: jasmine.createSpy('buildongChange'),

      RegenerateDate$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [ AdminNewBuildingComponent ],
      providers: [
        {provide: AdminService, useValue: adminServiceMock},
        {provide: Router, useValue: routerMock}
      ],
      imports: [ FormsModule, RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewBuildingComponent);
    adminService = TestBed.get(AdminService);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
  });

  it('should add building', async() => {

    let building = {
      addressDTO: new Address()
    }
    component.onAddBuilding();
    expect(adminService.addBuilding).toHaveBeenCalledWith(building);

  });
});
