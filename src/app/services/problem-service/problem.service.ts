import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ProblemService {

  constructor(private http: HttpClient) { }

  postProblem(tenantId, problem) {
    return this.http.post('http://localhost:8080/api/problems/' + tenantId, problem);
  }

  getProblems() {
    return this.http.get('http://localhost:8080/api/problems/');
  }

  getComments() {
    return this.http.get('http://localhost:8080/api/problems/comments');
  }

  postComment(probId, comment) {
    return this.http.post('http://localhost:8080/api/problems/comment/' + probId, comment);
  }

}
