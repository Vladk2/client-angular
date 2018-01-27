import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';

import { UserComponent } from './user.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { UserService } from '../../services/user-service/user.service';
import { AlertService } from '../../services/alert-service/alert.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {

    let authServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let userServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let alertServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: UserService, useValue: userServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: ConfirmationService}
      ],
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});