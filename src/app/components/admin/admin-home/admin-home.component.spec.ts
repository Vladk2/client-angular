import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AdminHomeComponent} from './admin-home.component';

import {AuthService} from '../../../services/auth-service/auth.service';
import {AdminService} from '../../../services/admin-service/admin.service';

import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {User} from '../../../models/user/user.model';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;
  let adminService: any;

  beforeEach(async(() => {
    const user = new User();

    user.id = 1;
    user.username = 'nole';
    user.password = '123';
    user.name = 'Novica';
    user.last_name = 'Nikolic';
    user.email = 'nole@wdaadw.com';

    const adminServiceMock = {
      getProfile: jasmine.createSpy('getProfile')
        .and.returnValue(Observable.from([user])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const authServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [AdminHomeComponent],
      providers: [{provide: AuthService, useValue: authServiceMock},
        {provide: AdminService, useValue: adminServiceMock}],
      imports: [RouterTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    adminService = TestBed.get(AdminService);
    component = fixture.componentInstance;
  });

  it('should fetch user', fakeAsync(() => {
    //ovde puca dalje
    component.ngOnInit();
    tick();
    expect(component.user.username).toBe('nole');
    expect(component.user.password).toBe('123');
    expect(component.user.name).toBe('Novica');
    expect(component.user.last_name).not.toBe('Petar');

  }));

  it('should render username in a small tag', async(() => {
    const fixture = TestBed.createComponent(AdminHomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('nole');
  }));


});
