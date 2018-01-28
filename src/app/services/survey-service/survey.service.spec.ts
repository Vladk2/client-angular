import {TestBed, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {SurveyService} from './survey.service';
import {UserResponse} from '../../models/survey/user-response.model';
import {Answer} from '../../models/survey/answer.model';
import {Question} from '../../models/survey/question.model';
import {Survey} from '../../models/survey/survey.model';

describe('SurveyService', () => {

  let service: SurveyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveyService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    service = TestBed.get(SurveyService);
    httpMock = TestBed.get(HttpTestingController);

  });

  it('should be created', () => {
    expect(true).toBe(true);
  });

  it('getSurveys should return list of buildings', () => {
    const surveys = [
      {'id': 1, 'name': 'anketa', 'description': 'opis', 'creator': 1, 'dateCreated': '2018-01-20'},
      {'id': 2, 'name': 'anketa2', 'description': 'opis2', 'creator': 2, 'dateCreated': '2017-12-19'}
    ];

    service.getSurveys(1).subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res.length).toBe(2);
      expect(res[0].name).toBe('anketa');
    });

    const request = httpMock.expectOne('http://localhost:8080/api/surveys/buildings/1');

    expect(request.request.method).toBe('GET');

    request.flush(surveys);
  });

  it('delete should not be null', () => {
    const surveyId = 1;

    service.delete(surveyId).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/surveys/' + surveyId);

    expect(request.request.method).toBe('DELETE');

    request.flush(surveyId);
  });

  it('fillOut should not be null', () => {
    const userResponse = new UserResponse();
    userResponse.survey = 1;
    const answer = new Answer(new Question(1, 'Testiranje?', 'BOOL'));
    answer.answer = 'da';
    userResponse.answers.push(answer);

    service.fillOut(userResponse).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/surveys/fill');

    expect(request.request.method).toBe('POST');

    request.flush(userResponse);
  });

  it('create should not be null', () => {
    const survey = new Survey();

    survey.building = 1;
    survey.creator = 1;
    survey.name = 'anketica';
    survey.dateExpires = new Date('2018-03-22');
    survey.description = 'opis';

    service.create(survey).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/surveys/');

    expect(request.request.method).toBe('POST');

    request.flush(survey);
    });

  it('surveyStatistics and surveyAnswers should return list of userResponses', () => {
    const survey: any = {};

    survey.building = 1;
    survey.creator = 1;
    survey.name = 'anketica';
    survey.dateExpires = new Date('2018-03-22');
    survey.description = 'opis';
    survey.questionDTO = [
      new Question(1, 'Jeste li dobro ?', 'BOOL')
    ];
    survey.userResponses = [
      {
        'id': 1, 'user': 1, 'survey': null, 'answers': [
          {'id': 1, 'answer': 'true', 'question': new Question(1, 'Jeste li dobro ?', 'BOOL')}
        ]
      }
    ];

    expect(service.surveyStatistics(survey).length).toBe(1);
    expect(service.getAnswers(survey).length).toBe(1);
  });
});
