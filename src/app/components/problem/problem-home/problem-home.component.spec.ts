import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProblemHomeComponent } from './problem-home.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert-service/alert.service';
import { ProblemService } from '../../../services/problem-service/problem.service';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth.service';
import { AdminService } from '../../../services/admin-service/admin.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

describe('ProblemHomeComponent', () => {
  let component: ProblemHomeComponent;
  let fixture: ComponentFixture<ProblemHomeComponent>;
  let activeRoute: ActivatedRoute;
  let router: Router;
  let alertService: AlertService;
  let problemService: ProblemService;
  let authService: AuthService;
  let adminService: AdminService;
  let confService: ConfirmationService;

  beforeEach(async(() => {

    const problems = [
      {'id': 1, 'title': 'Kvar1', 'description': 'opis1', 'active': true, 'imgNo': 0, 'repairDate': '14/12/2018 12:44',
      'openForAll': false, 'images': null, 'postDate': '14/12/2017 12:44', 'tenant': null, 'firm': null},
      {'id': 2, 'title': 'Kvar2', 'description': 'opis2', 'active': true, 'imgNo': 0, 'repairDate': '14/12/2018 12:44',
      'openForAll': true, 'images': null, 'postDate': '14/12/2017 12:44', 'tenant': null, 'firm': null}
    ];
    const comments = [
      {'id': 1, 'message': 'Komentar1', 'creator': {'userId': 1}, 'problem': {'problemId': 5}, 'date': '26/12/2017 14:29'},
      {'id': 2, 'message': 'Komentar2', 'creator': {'userId': 2}, 'problem': {'problemId': 1}, 'date': '28/12/2017 14:29'}
    ];

    const problemServiceMock = {
      getProblems: jasmine.createSpy('getProblems').and.returnValue(Observable.from([problems])),
     // postProblem: jasmine.createSpy('postProblem').and.returnValue(Observable.from([{}])),
      getComments: jasmine.createSpy('getComments').and.returnValue(Observable.from([comments])),
      postComment: jasmine.createSpy('postComment').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const authServiceMock = {
      logout_service: jasmine.createSpy('logout_service').and.returnValue(Observable.from([{}])),
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const routerMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const adminServiceMock = {
      RegenerateData$: {
        subscribe: jasmine.createSpy('subscribe')
      }
    };

    const confServiceMock = {
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
      declarations: [ ProblemHomeComponent ],
      providers: [
        {provide: ProblemService, useValue: problemServiceMock},
        {provide: AlertService, useValue: alertServiceMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: AdminService, useValue: adminServiceMock},
        {provide: ConfirmationService, useValue: confServiceMock},
        {provide: ActivatedRoute},
        {provide: Router, useValue: routerMock}
      ],
      imports: [FormsModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemHomeComponent);
    alertService = TestBed.get(AlertService);
    authService = TestBed.get(AuthService);
    problemService = TestBed.get(ProblemService);
    router = TestBed.get(Router);
    activeRoute = TestBed.get(ActivatedRoute);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of active problems', fakeAsync(() => {
    component.getProblems();
    expect(component.allProblems.length).toEqual(2);
    expect(problemService.getProblems).toHaveBeenCalled();
  }));

  it('should get list of comments', fakeAsync(() => {
    component.getComments();
    expect(component.comments.length).toEqual(2);
    expect(problemService.getComments).toHaveBeenCalled();
  }));

  it('should post a comment ', fakeAsync(() => {
    const problemId = 4;
    component.postComment(4);
    tick();
    expect(problemService.postComment).toHaveBeenCalled();
  }));

});
