import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

import { AdminListFirmsComponent } from './admin-list-firms.component';
import { FormsModule }   from '@angular/forms';
import { AdminService } from '../../../services/admin-service/admin.service';
import {ConfirmationService} from 'primeng/primeng';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { Firm } from '../../../models/firm/firm.model';

describe('AdminListFirmsComponent', () => {
  let component: AdminListFirmsComponent;
  let fixture: ComponentFixture<AdminListFirmsComponent>;
  let adminService: any;

  beforeEach(async(() => {

    const firms = [
        {id: 1, firm_name: 'moja firma1'},
        {id: 2, firm_name: 'moja firma2'},
        {id: 3, firm_name: 'moja firma3'},
        {id: 4, firm_name: 'moja firma4'}
    ];

    let adminServiceMock = {
      getAllFirms: jasmine.createSpy('getAllFirms')
        .and.returnValue(Observable.from([firms])),

      removeFirm: jasmine.createSpy('removeFirm')
        .and.returnValue(Observable.from([{}])),

      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AdminListFirmsComponent ],
      imports: [ FormsModule ],
      providers: [
        ConfirmationService,
        {provide: AdminService, useValue: adminServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListFirmsComponent);
    adminService = TestBed.get(AdminService);
    component = fixture.componentInstance;
  });

  it('should all firms getAllFirms', fakeAsync(() => {
    component.ngOnInit();

    expect(component.firms[0].firm_name).toEqual('moja firma1');
    expect(component.firms[1].firm_name).toEqual('moja firma2');
    expect(component.firms[2].firm_name).toEqual('moja firma3');
    expect(component.firms[3].firm_name).toEqual('moja firma4');

  }));

  it('should open delete dialog', () => {
    component.openDeleteDialog(1);

    expect(component.deleteDialog).toEqual(true);
  });

  it('should remove firm', async() => {
    component.onRemoveFirm();

    expect(adminService.removeFirm).toHaveBeenCalled();
  });

});
