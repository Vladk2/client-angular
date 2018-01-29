import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { ProblemPostingComponent } from './problem-posting.component';
import { ProblemService } from '../../../services/problem-service/problem.service';
import { AlertService } from '../../../services/alert-service/alert.service';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

describe('ProblemPostingComponent', () => {
  let component: ProblemPostingComponent;
  let fixture: ComponentFixture<ProblemPostingComponent>;
  let problemService: ProblemService;
  let alertService: AlertService;

  beforeEach(async(() => {

    const problemServiceMock = {
      postProblem: jasmine.createSpy('postProblem').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    let alertServiceMock = {
      success: jasmine.createSpy('success').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };
    TestBed.configureTestingModule({
      declarations: [ProblemPostingComponent],
      providers: [
        { provide: ProblemService, useValue: problemServiceMock },
        { provide: AlertService, useValue: alertServiceMock },
        { provide: ActivatedRoute }
      ],
      imports: [FormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemPostingComponent);
    component = fixture.componentInstance;
    problemService = TestBed.get(ProblemService);
    alertService = TestBed.get(AlertService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post a problem ', async(() => {
    component.postProblem();
    expect(component.postClicked).toEqual(true);
    expect(component.loading).toEqual(true);
    expect(problemService.postProblem).toHaveBeenCalled();
  }));
});
