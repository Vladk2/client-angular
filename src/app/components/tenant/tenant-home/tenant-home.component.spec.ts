import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

import {TenantHomeComponent} from './tenant-home.component';
import {TenantService} from '../../../services/tenant-service/tenant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert-service/alert.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('TenantHomeComponent', () => {
  let component: TenantHomeComponent;
  let fixture: ComponentFixture<TenantHomeComponent>;
  let tenantService: TenantService;
  let activeRoute: ActivatedRoute;
  let router: Router;
  let alertService: AlertService;

  beforeEach(async(() => {

    const tenantServiceMock = {
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
      declarations: [TenantHomeComponent],
      providers: [
        {provide: TenantService, useValue: tenantServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: ActivatedRoute},
        {provide: Router, useValue: routerMock}
      ],
      imports: [FormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantHomeComponent);
    alertService = TestBed.get(AlertService);
    tenantService = TestBed.get(TenantService);
    router = TestBed.get(Router);
    activeRoute = TestBed.get(ActivatedRoute);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
