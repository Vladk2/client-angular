import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Problem } from '../../models/problem/problem.model';
import { User } from '../../models/user/user.model';
import { Comment } from '../../models/problem/comment.model';
import { DateTime } from '../../models/date/datetime.model';
import { ProblemService } from './problem.service';

describe('ProblemService', () => {

  let service: ProblemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProblemService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    service = TestBed.get(ProblemService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(true).toBe(true);
  });

  it('should return list of active problems', () => {
    const problems = [
      {'id': 1, 'title': 'Kvar1', 'description': 'opis1', 'active': true, 'imgNo': 0, 'repairDate': '14/12/2018 12:44',
      'openForAll': false, 'images': null, 'postDate': '14/12/2017 12:44', 'tenant': null, 'firm': null},
      {'id': 2, 'title': 'Kvar2', 'description': 'opis2', 'active': true, 'imgNo': 0, 'repairDate': '14/12/2018 12:44',
      'openForAll': true, 'images': null, 'postDate': '14/12/2017 12:44', 'tenant': null, 'firm': null}
    ];

    service.getProblems().subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res.length).toBe(2);
      expect(res[0].description).toBe('opis1');
    });

    const request = httpMock.expectOne('http://localhost:8080/api/problems/');

    expect(request.request.method).toBe('GET');

    request.flush(problems);
  });

  it('should report a problem successfully', () => {

    const tenantId = 1;
    const problem = new Problem();
    problem.title = 'Golem kvar';
    problem.description = 'Vrlo golem kvar';
    problem.active = true;
    problem.openForAll = true;

    service.postProblem(tenantId, problem).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/problems/' + tenantId);

    expect(request.request.method).toBe('POST');

  });

  it('should get all active comments', () => {
    const user = new User();
    const problem = new Problem();
    const comments = [
      {'id': 1, 'message': 'Komentar1', 'creator': user, 'problem': problem, 'date': '26/12/2017 14:29'},
      {'id': 2, 'message': 'Komentar2', 'creator': user, 'problem': problem, 'date': '28/12/2017 14:29'}
    ];

    service.getComments().subscribe((res: any) => {
      expect(res).not.toBe(null);
      expect(res.length).toBe(2);
      expect(res[1].message).toBe('Komentar2');
    });

    const request = httpMock.expectOne('http://localhost:8080/api/problems/comments');

    expect(request.request.method).toBe('GET');

    request.flush(comments);
  });

  it('should post a comment successfully', () => {

    const user = new User();
    const problemId = 1;
    const comment = new Comment();
    comment.message = 'Komentar na kvar';
    comment.creator = user;

    service.postComment(problemId, comment).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/problems/comment/' + problemId);

    expect(request.request.method).toBe('POST');

  });

  it('should set a repairDate', () => {

    const problemId = 1;
    const repairDate = new DateTime('28/12/2017 14:29');
    service.setRepairDate(problemId, repairDate).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/problems/setRepairDate/' + problemId);

    expect(request.request.method).toBe('PATCH');

  });


  it('should forward a problem', () => {

    const problemId = 4;
    const firmId = 1;
    service.forwardProblem(problemId, firmId).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/problems/forward/' + problemId + '/' + firmId);

    expect(request.request.method).toBe('PATCH');

  });

  it('should resolve a problem', () => {

    const problemId = 4;
    service.resolveProblem(problemId).subscribe(res => {
      expect(res).not.toBe(null);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/problems/solve/' + problemId);

    expect(request.request.method).toBe('PATCH');

  });

});
