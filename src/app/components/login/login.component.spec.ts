import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

import {LoginComponent} from './login.component';
import {AuthService} from '../../services/auth-service/auth.service';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(() => {
    let store = {};
    const authServiceMock = {
      login_service: jasmine.createSpy('login_service')
        .and.returnValue(Observable.from([{}]))
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{provide: AuthService, useValue: authServiceMock}],
      imports: [FormsModule, RouterTestingModule, HttpClientModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();

  });

  it('should create', () => {
    component.login();
    
    const credenciali = {
    }
    expect(authService.login_service).toHaveBeenCalledWith(credenciali);
  });
});
