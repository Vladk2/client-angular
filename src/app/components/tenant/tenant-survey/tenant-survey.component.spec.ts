import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';

import { TenantSurveyComponent } from './tenant-survey.component';
import {TenantService} from '../../../services/tenant-service/tenant.service';
import {SurveyService} from '../../../services/survey-service/survey.service';
import {AlertService} from '../../../services/alert-service/alert.service';

import {ConfirmationService} from 'primeng/primeng';
import {ActivatedRoute} from '@angular/router';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('TenantSurveyComponent', () => {
  let component: TenantSurveyComponent;
  let fixture: ComponentFixture<TenantSurveyComponent>;

  beforeEach(async(() => {

    let tenantServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    let surveyServiceMock = {
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
      declarations: [ TenantSurveyComponent ],
      providers: [
        {provide: TenantService, useValue: tenantServiceMock},
        {provide: SurveyService, useValue: surveyServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: ConfirmationService},
        {provide: ActivatedRoute}
      ],
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantSurveyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
