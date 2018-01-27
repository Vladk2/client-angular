import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { TenantHomeComponent } from './tenant-home.component';
import { TenantService } from '../../../services/tenant-service/tenant.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert-service/alert.service';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('TenantHomeComponent', () => {
  let component: TenantHomeComponent;
  let fixture: ComponentFixture<TenantHomeComponent>;

  beforeEach(async(() => {

    let tenantServiceMock = {
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
      declarations: [ TenantHomeComponent ],
      providers: [
        {provide: TenantService, useValue: tenantServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: ActivatedRoute}
      ],
      imports: [ FormsModule, RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantHomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
