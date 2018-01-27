import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { TenantRegistrationComponent } from './tenant-registration.component';
import {AuthService} from '../../../services/auth-service/auth.service';
import {TenantService} from '../../../services/tenant-service/tenant.service';

describe('TenantRegistrationComponent', () => {
  let component: TenantRegistrationComponent;
  let fixture: ComponentFixture<TenantRegistrationComponent>;

  beforeEach(async(() => {

    let authServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    let tenantServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ TenantRegistrationComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: TenantService, useValue: tenantServiceMock}
      ],
      imports: [ FormsModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantRegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
