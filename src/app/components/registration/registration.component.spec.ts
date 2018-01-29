import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

import {RegistrationComponent} from './registration.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { AlertService } from '../../services/alert-service/alert.service';


describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    const buildings = {
      id: 1,
      address: {id: 1, street: 'Moja ulica', city: 'Novi Sad'}
    };

    let authServiceMock = {
      getAllBuildings: jasmine.createSpy('getAllBuildings')
        .and.returnValue(Observable.from([buildings])),

      registration_service: jasmine.createSpy('registration_service')
        .and.returnValue(Observable.from([{}])),
 
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    let alertServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: AlertService, useValue: alertServiceMock}
      ],
      imports: [ FormsModule, RouterTestingModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    authService = TestBed.get(AuthService);
    component = fixture.componentInstance;
  });

  it('should get all building', () => {
    component.ngOnInit();

    expect(component.buildings.id).toEqual(1);
    expect(component.buildings.address.id).toEqual(1);
    expect(component.buildings.address.street).toEqual('Moja ulica');
  });

});
