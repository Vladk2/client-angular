import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VerificationComponent} from './verification.component';
import {UserService} from '../../../services/user-service/user.service';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

describe('VerificationComponent', () => {
  let component: VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;
  let userService: UserService;
  let activeRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async(() => {

    const userServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const activatedRouteMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const routerMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    TestBed.configureTestingModule({
      declarations: [VerificationComponent],
      providers: [
        {provide: UserService, useValue: userServiceMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: Router, useValue: routerMock},
      ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    activeRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  //it('should create', () => {
    //expect(component).toBeTruthy();
  //});
});
