import { async, ComponentFixture, TestBed,fakeAsync } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

import { EmployeeNewComponent } from './employee-new.component';
import { EmployeeService } from '../../../services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin-service/admin.service';


describe('EmployeeNewComponent', () => {
  let component: EmployeeNewComponent;
  let fixture: ComponentFixture<EmployeeNewComponent>;
  let employeeService: any;

  beforeEach(async(() => {

    let users = [
      {id: 1, username: 'nole', password: '123', name: 'Novica', last_name: 'Nikolic', email: 'nole0223@gmail.com'},
      {id: 2, username: 'noco', password: '123', name: 'Nole', last_name: 'Nikolic', email: 'nole@gmail.com'}
    ]

    let employeeServiceMock = {
      addEmployFirms: jasmine.createSpy('addEmployFirms')
        .and.returnValue(Observable.from([{}])),
      RegenerateDate$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let adminServiceMock = {
      getAllUser: jasmine.createSpy('getAllUser')
        .and.returnValue(Observable.from([users])),
      RegenerateDate$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    TestBed.configureTestingModule({
      declarations: [ EmployeeNewComponent ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceMock},
        {provide: AdminService, useValue: adminServiceMock},
        {provide: ActivatedRoute}
      ],
      imports: [ RouterTestingModule, FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNewComponent);
    employeeService = TestBed.get(EmployeeService);
    component = fixture.componentInstance;
  });

  it('should add new employee', () => {

    component.onAddEmployee(1);

    expect(employeeService.addEmployFirms).toHaveBeenCalledWith(undefined, 1);

  });
});
