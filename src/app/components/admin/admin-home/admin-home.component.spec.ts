import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';

import { AuthService } from '../../../services/auth-service/auth.service';
import { AdminService } from '../../../services/admin-service/admin.service';

import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;
  let authService: AuthService;
  let adminService: AdminService;

  beforeEach(async(() => {

    let adminServiceMock = {
      ReqenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    let authServiceMock = {
      ReqenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    }


    TestBed.configureTestingModule({
      declarations: [ AdminHomeComponent ],
      providers: [ {provide: AuthService, useValue: authServiceMock},
                   {provide: AdminService, useValue: adminServiceMock}],
      imports: [ RouterTestingModule,FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    authService = TestBed.get(AuthService);
    adminService = TestBed.get(AdminService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
