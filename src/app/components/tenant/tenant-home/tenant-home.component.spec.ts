import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

import {TenantHomeComponent} from './tenant-home.component';
import {TenantService} from '../../../services/tenant-service/tenant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert-service/alert.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';

describe('TenantHomeComponent', () => {
  let component: TenantHomeComponent;
  let fixture: ComponentFixture<TenantHomeComponent>;
  let tenantService: TenantService;
  let activeRoute: ActivatedRoute;
  let router: Router;
  let alertService: AlertService;

  beforeEach(async(() => {
    const announcements = [
      {'title': 'obavestenje', 'message': 'poruka', 'building': 1, 'tenant': {'id': 1}}
    ];

    const tenantServiceMock = {
      getAnnouncements: jasmine.createSpy('getAnnouncements').and.returnValue(Observable.from([announcements])),
      postAnnouncement: jasmine.createSpy('postAnnouncement').and.returnValue(Observable.from([{}])),
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

  it('should get list of announcements #getAnnouncements', fakeAsync(() => {
    component.getAnnouncements();
    expect(component.announcements.length).toEqual(1);
    expect(tenantService.getAnnouncements).toHaveBeenCalled();
  }));

  it('should post announcement #postAnnouncement', fakeAsync(() => {
    component.postAnnouncement();
    //expect(component.loading).toEqual(true);
    expect(component.announcement.isAnonymous).toEqual(false);
    tick();
    expect(tenantService.postAnnouncement).toHaveBeenCalled();
  }));
});
