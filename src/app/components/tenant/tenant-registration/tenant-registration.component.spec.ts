import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

import {TenantRegistrationComponent} from './tenant-registration.component';
import {AuthService} from '../../../services/auth-service/auth.service';
import {TenantService} from '../../../services/tenant-service/tenant.service';
import {Observable} from 'rxjs/Observable';

describe('TenantRegistrationComponent', () => {
  let component: TenantRegistrationComponent;
  let fixture: ComponentFixture<TenantRegistrationComponent>;
  let authService;
  let tenantService;

  beforeEach(async(() => {
    const buildings = [
      {
        'id': 1, 'addressDTO': {
          'id': 2, 'city': 'Novi Sad', 'zip': 21000, 'street': 'Bulevar Oslobođenja', 'number': 55
        }
      },
      {
        'id': 2, 'addressDTO': {
          'id': 1, 'city': 'Novi Sad', 'zip': 21000, 'street': 'Cara Dušana', 'number': 17
        }
      }
    ];

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    const authServiceMock = {
      getAllBuildings: jasmine.createSpy('getAllBuildings').and.returnValue(Observable.from([buildings])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const tenantServiceMock = {
      createNewTenant: jasmine.createSpy('createNewTenant').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [TenantRegistrationComponent],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: TenantService, useValue: tenantServiceMock}
      ],
      imports: [FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantRegistrationComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    tenantService = TestBed.get(TenantService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get buildings on init #ngOnInit', fakeAsync(() => {
    const token = {'username': 'riggy'};
    localStorage.setItem('token', JSON.stringify(token));
    component.ngOnInit();

    expect(authService.getAllBuildings).toHaveBeenCalled();
    tick();

    expect(component.buildings.length).toEqual(2);

    expect(component.messageWarning).toEqual(false);
    expect(component.messageSuccess).toEqual(false);
    expect(component.messageWarningNoSupervisor).toEqual(false);
  }));

  it('should register new tenant #registerNewAbode', fakeAsync(() => {
    const abode = {
      'building': 1,
      'apartmentNo': 55
    };
    spyOn(component, 'resetMessages');
    component.abode = abode;
    component.registerNewAbode();
    expect(component.resetMessages).toHaveBeenCalled();
    expect(tenantService.createNewTenant).toHaveBeenCalled();

    tick();

    expect(component.messageSuccess).toEqual(true);
  }));

  it('should reset messages boxes #resetMessages', () => {
    component.resetMessages();

    expect(component.messageWarningNoSupervisor).toEqual(false);
    expect(component.messageSuccess).toEqual(false);
    expect(component.messageWarning).toEqual(false);
  });
});
