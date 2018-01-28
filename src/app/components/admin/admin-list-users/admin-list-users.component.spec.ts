import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListUsersComponent } from './admin-list-users.component';
import { FormsModule }   from '@angular/forms';
import {AdminService} from '../../../services/admin-service/admin.service';
import {ConfirmationService} from 'primeng/primeng';
import {AuthService} from '../../../services/auth-service/auth.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AdminListUsersComponent', () => {
  let component: AdminListUsersComponent;
  let fixture: ComponentFixture<AdminListUsersComponent>;

  beforeEach(async(() => {

    let adminServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let authServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ AdminListUsersComponent ],
      imports: [ FormsModule ],
      providers: [
        ConfirmationService,
        {provide: AdminService, useValue: adminServiceMock},
        {provide: AuthService, useValue: authServiceMock}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListUsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
