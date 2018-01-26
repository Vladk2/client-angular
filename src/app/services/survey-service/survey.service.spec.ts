import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SurveyService } from './survey.service';

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
});
