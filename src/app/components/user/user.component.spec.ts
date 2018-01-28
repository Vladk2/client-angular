import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ConfirmationService} from 'primeng/primeng';

import {UserComponent} from './user.component';
import {AuthService} from '../../services/auth-service/auth.service';
import {UserService} from '../../services/user-service/user.service';
import {AlertService} from '../../services/alert-service/alert.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user/user.model';
import {By} from '@angular/platform-browser';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let authService: AuthService;
  let userService: UserService;
  let alertService: AlertService;
  let confirmationService: ConfirmationService;

  beforeEach(async(() => {
    const user = new User();

    user.username = 'riggy';
    user.password = '123';
    user.name = 'riggy';
    user.last_name = 'ruter';
    user.email = 'riggy.ruter@gmail.com';

    const authServiceMock = {
      logout_service: jasmine.createSpy('logout_service').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    const userServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(Observable.from([user])),
      update: jasmine.createSpy('update').and.returnValue(Observable.from([{}])),
      updatePassword: jasmine.createSpy('updatePassword').and.returnValue(Observable.from([{}])),
      destroy: jasmine.createSpy('destroy').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    const alertServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: UserService, useValue: userServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: ConfirmationService}
      ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    userService = TestBed.get(UserService);
    alertService = TestBed.get(AlertService);
    confirmationService = TestBed.get(ConfirmationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user details #get', fakeAsync(() => {
    component.ngOnInit();
    expect(userService.get).toHaveBeenCalled();
    tick();
    expect(component.display).toEqual(false);

    expect(component.user.username).toEqual('riggy');
    expect(component.user.name).toEqual('riggy');
    expect(component.user.email).toEqual('riggy.ruter@gmail.com');
    expect(component.user.password).toEqual('123');

    expect(component.messageWarningEmail).toEqual(false);
    expect(component.messageWarningPassword).toEqual(false);
    expect(component.messageSuccess).toEqual(false);

    expect(component.password.pw).toEqual('');
    expect(component.password.re_pw).toEqual('');

    fixture.detectChanges(); // tell angular that data are fetched
    tick(); // initiate next cycle of binding these data to HTML components
    fixture.detectChanges(); // detect changes in the HTML components

    const emailElement = fixture.debugElement.query(By.css('input[type=email]')).nativeElement;
    const nameElement = fixture.debugElement.query(By.css('input[name=name]')).nativeElement;
    // no need to check the rest html elements
    expect(emailElement.value).toEqual('riggy.ruter@gmail.com');
    expect(nameElement.value).toEqual('riggy');
  }));

  it('should hide dialog #hideDialog', () => {
    component.hideDialog();

    expect(component.display).toEqual(false);
  });

  it('should show dialog #showDialog', () => {
    component.showDialog();

    expect(component.display).toEqual(true);
  });

  it('should update user and hide show message success div #update', fakeAsync(() => {
    component.user.username = 'rr';
    component.update();
    expect(userService.update).toHaveBeenCalled();
    tick();
    expect(component.messageSuccess).toEqual(true);
    expect(component.user.username).toEqual('rr');
  }));

  it('should update password - passwords don`t match #updatePassword', fakeAsync(() => {
    component.password.pw = '3211';
    component.password.re_pw = '321';

    component.showDialog();
    component.updatePassword();
    expect(userService.updatePassword).not.toHaveBeenCalled();
    tick();
    expect(component.messageWarningPassword).toEqual(true);
  }));

  it('should update password #updatePassword', fakeAsync(() => {
    component.password.pw = '321';
    component.password.re_pw = '321';

    component.showDialog();
    component.updatePassword();
    expect(userService.updatePassword).toHaveBeenCalled();
    tick();
    expect(component.display).toEqual(false);
    expect(component.messageSuccess).toEqual(true);
  }));

  it('should delete user #deleteAccount', fakeAsync(() => {
    component.deleteAccount();
    expect(userService.destroy).toHaveBeenCalled();
    tick();
  }));

  it('shoud reset message boxes #resetMessageDivs', () => {
    component.resetMessageDivs();
    expect(component.messageWarningPassword).toEqual(false);
    expect(component.messageSuccess).toEqual(false);
    expect(component.messageWarningEmail).toEqual(false);
  });
});
