import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SupervisorService {

  constructor(private http: HttpClient) { }

  removeSupervisor(supervisorId): Observable<any> {
    return this.http.delete('http://localhost:8080/api/supervisors/' + supervisorId);
  }
}
