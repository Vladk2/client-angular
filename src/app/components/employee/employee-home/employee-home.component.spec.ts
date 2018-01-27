import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHomeComponent } from './employee-home.component';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('EmployeeHomeComponent', () => {
  let component: EmployeeHomeComponent;
  let fixture: ComponentFixture<EmployeeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeHomeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeHomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
