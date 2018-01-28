import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {AuthService} from '../../services/auth-service/auth.service';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {AlertService} from '../../services/alert-service/alert.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;
  let alertService: AlertService;
  let router: Router;

  beforeEach(async(() => {
    const authServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const routerMock = {
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
      declarations: [RegistrationComponent],
      providers: [
        {provide: Router, useValue: routerMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: AuthService, useValue: authServiceMock
      }],
      imports: [FormsModule, RouterTestingModule, HttpClientModule, HttpModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    alertService = TestBed.get(AlertService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
