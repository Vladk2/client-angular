import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';
import { Firm } from '../../../models/firm/firm.model';
import { Address } from '../../../models/address/address.model';

import { EmployeeHomeComponent } from './employee-home.component';
import { EmployeeService } from '../../../services/employee/employee.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('EmployeeHomeComponent', () => {
  let component: EmployeeHomeComponent;
  let fixture: ComponentFixture<EmployeeHomeComponent>;
  let employeeService: any;

  beforeEach(async(() => {

    let firm = {
      id: 1,
      firm_name: 'moja firma',
      address: {id: 1, street: 'Moja ulica'},
      userDTO: [
        {id: 1, username: 'nole', name: 'Novica'}
      ]
    }

    const employeeServiceMock = {
      updateFirm: jasmine.createSpy('updateFirm')
        .and.returnValue(Observable.from([{}])),

      showFirm: jasmine.createSpy('showFirm')
        .and.returnValue(Observable.from([firm])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ EmployeeHomeComponent ],
      imports: [ FormsModule ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceMock},
        {provide: ActivatedRoute}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHomeComponent);
    employeeService = TestBed.get(EmployeeService);
    component = fixture.componentInstance;
  });

  it('should show firm', fakeAsync(() => {
    component.showFirm();

    expect(employeeService.showFirm).toHaveBeenCalledWith(undefined);

    expect(component.firm).not.toBe(null);

    expect(component.addressDTO.id).toEqual(1);
  }));

  it('should update profile', fakeAsync(() => {
    component.onUpdate();
    
    const firm = new Firm();
    firm.address = new Address();

    expect(employeeService.updateFirm).toHaveBeenCalledWith(firm);

    expect(component.message).toEqual(true);
  }));
});
