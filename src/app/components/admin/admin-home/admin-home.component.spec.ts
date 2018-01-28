import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';

import { AuthService } from '../../../services/auth-service/auth.service';
import { AdminService } from '../../../services/admin-service/admin.service';

import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { User } from '../../../models/user/user.model';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;
  let adminService: any;

  beforeEach(async(() => {

    let adminServiceMock = {
      getProfile: jasmine.createSpy('getProfile')
        .and.returnValue(Promise.resolve(new User({
          username: 'nole',
          password: '123',
          name: 'Novica',
          last_name: 'Nikolic',
          email: 'nole0223@gmail.com'
        }))),
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
    adminService = TestBed.get(AdminService);
    component = fixture.componentInstance;
  });

  it('should fatch user', async(() => {
    //ovde puca dalje
    component.ngOnInit();
    tick();
    expect(component.user.username).toBe('nole')
    
  }))
});
