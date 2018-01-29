import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {TenantSurveyComponent} from './tenant-survey.component';
import {TenantService} from '../../../services/tenant-service/tenant.service';
import {SurveyService} from '../../../services/survey-service/survey.service';
import {AlertService} from '../../../services/alert-service/alert.service';

import {ConfirmationService} from 'primeng/primeng';
import {ActivatedRoute} from '@angular/router';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {RouterTestingModule} from '@angular/router/testing';
import {UserResponse} from '../../../models/survey/user-response.model';
import {Survey} from '../../../models/survey/survey.model';


describe('TenantSurveyComponent', () => {
  let component: TenantSurveyComponent;
  let fixture: ComponentFixture<TenantSurveyComponent>;
  let tenantService: TenantService;
  let surveyService: SurveyService;
  let alertService: AlertService;
  let confirmationService: ConfirmationService;
  let activeRoute: ActivatedRoute;

  beforeEach(async(() => {
    const tenants = [
      {'id': 1},
      {'id': 2}
    ];

    const surveys = [
      {'id': 1, 'name': 'anketa', 'description': 'opis', 'questionDTO': [], 'userResponses': []},
      {'id': 2, 'name': 'anketa2', 'description': 'opis2', 'questionDTO': [], 'userResponses': []}
    ];

    const tenantServiceMock = {
      getUsersTenants: jasmine.createSpy('getUsersTenants').and.returnValue(Observable.from([tenants])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    const surveyServiceMock = {
      getSurveys: jasmine.createSpy('getSurveys').and.returnValue(Observable.from([surveys])),
      delete: jasmine.createSpy('delete').and.returnValue(Observable.from([{}])),
      fillOut: jasmine.createSpy('fillOut').and.returnValue(Observable.from([{}])),
      create: jasmine.createSpy('create').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    const alertServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const confirmationServiceMock = {
      confirm: jasmine.createSpy('confirm')
    };

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

    TestBed.configureTestingModule({
      declarations: [TenantSurveyComponent],
      providers: [
        {provide: TenantService, useValue: tenantServiceMock},
        {provide: SurveyService, useValue: surveyServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: ConfirmationService, useValue: confirmationServiceMock},
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({id: '1'})
          }
        }
      ],
      imports: [FormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantSurveyComponent);
    component = fixture.componentInstance;
    surveyService = TestBed.get(SurveyService);
    tenantService = TestBed.get(TenantService);
    alertService = TestBed.get(AlertService);
    activeRoute = TestBed.get(ActivatedRoute);
    confirmationService = TestBed.get(ConfirmationService);
  });

  it('should create #ngOnInit', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of surveys #getSurveys', fakeAsync(() => {
    const token = {
      'username': 'riggy', tenans: [
        {'tenant': 1, 'supervisor': 1, 'owner': true},
        {'tenant': 5, 'owner': false}
      ]
    };
    localStorage.setItem('token', JSON.stringify(token));
    component.tenant.buildingId = 1;
    component.getSurveys();
    expect(surveyService.getSurveys).toHaveBeenCalled();
    tick();
    expect(component.surveys.length).toEqual(2);
  }));

  it('should delete survey #destroy', fakeAsync(() => {
    component.selectedSurvey.id = 1;
    component.destroy();
    expect(surveyService.delete).toHaveBeenCalled();
    tick();
    expect(component.messageDeleted).toEqual(true);
    expect(component.deleteDialog).toEqual(false);
  }));

  it('should submit filled survey #submit', async(() => {
    spyOn(component, 'resetMessageDivs');
    component.userResponse = new UserResponse();
    component.submit();
    expect(surveyService.fillOut).toHaveBeenCalled();
    expect(component.resetMessageDivs).toHaveBeenCalled();
  }));

  it('should add new question to survey #addQuestion', () => {
    component.newQuestion.question = 'Kako ste?';
    component.newQuestion.typeQuestion = 'BOOL';
    component.newSurvey.questionDTO = [];
    component.addQuestion();
    expect(component.newSurvey.questionDTO.length).toEqual(1);
    expect(component.newSurvey.questionDTO[0].question).toEqual('Kako ste?');
    expect(component.newQuestion.question).toEqual('');
  });

  it('should create new survey #createSurvey', async(() => {
    component.newQuestion.question = 'Kako ste?';
    component.newQuestion.typeQuestion = 'BOOL';
    component.newSurvey.questionDTO = [];
    component.addQuestion();
    component.newQuestion.question = 'Jeste li dobro?';
    component.newQuestion.typeQuestion = 'BOOL';
    component.addQuestion();
    component.newQuestion.question = 'Gde zivite?';
    component.newQuestion.typeQuestion = 'TEXT';
    component.addQuestion();

    expect(component.newSurvey.questionDTO.length).toEqual(3);

    component.newSurvey.dateExpires = new Date('2018-12-22');
    component.createSurvey(component.newSurvey);
    expect(surveyService.create).toHaveBeenCalled();
  }));

  it('should opet confirm dialog for removing surveys #confirm', () => {
    component.confirm(new Survey());
    expect(component.deleteDialog).toEqual(true);
  });

  it('should opet fill dialog #openFillDialog', () => {
    spyOn(component, 'fillResponseWithQuestions');
    component.openFillDialog(new Survey());
    expect(component.fillDialog).toEqual(true);
    expect(component.fillResponseWithQuestions).toHaveBeenCalled();
  });

  it('should open report dialog #openReportDialog', async(() => {
    component.openReportDialog(1);
    expect(surveyService.getSurveys).toHaveBeenCalled();
  }));

  it('should open create dialog #openCreateDialog', () => {
    component.openCreateDialog();
    expect(component.createSurveyDialog).toEqual(true);
  });

  it('should close fill dialog #hideFillDialog', () => {
    component.hideFillDialog();
    expect(component.fillDialog).toEqual(false);
  });

  it('should close report dialog #hideReportDialog', () => {
    component.hideReportDialog();
    expect(component.reportDialog).toEqual(false);
  });

  it('should close create dialog #hideCreateDialog', () => {
    component.hideCreateDialog();
    expect(component.createSurveyDialog).toEqual(false);
  });

  it('should reset message boxes #resetMessageDivs', () => {
    component.resetMessageDivs();
    expect(component.messageAddQuestion).toEqual(false);
    expect(component.messageWrongDateFormat).toEqual(false);
    expect(component.messageCreated).toEqual(false);
    expect(component.messageDeleted).toEqual(false);
    expect(component.messageNoResposes).toEqual(false);
  });
});
