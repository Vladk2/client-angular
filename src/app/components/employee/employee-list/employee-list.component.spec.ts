import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

import { EmployeeService } from '../../../services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeService: any;

  beforeEach(async(() => {
    const firm = {
      id: 1,
      firm_name: 'moja firma',
      address: {id: 1, street: 'Moja ulica'},
      userDTO: [
        {id: 1, username: 'nole', name: 'Novica'}
      ]
    }

    const employeeServiceMock = {
      removeEmployFirms: jasmine.createSpy('removeEmployFirms')
        .and.returnValue(Observable.from([{}])),
      showFirm: jasmine.createSpy('showFirm')
        .and.returnValue(Observable.from([firm])),
      RegenerateDate$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceMock },
        {provide: ActivatedRoute}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    employeeService = TestBed.get(EmployeeService);
    component = fixture.componentInstance;
  });

  it('should remove employee onRemoveEmployee()', () => {
    component.onRemoveEmployee(1);


    expect(employeeService.removeEmployFirms).toHaveBeenCalledWith(undefined, 1);
  });
});
