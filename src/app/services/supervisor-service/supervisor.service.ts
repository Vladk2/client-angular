import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SupervisorService {

  constructor(private http: HttpClient) {
  }

  removeSupervisor(supervisorId): Observable<any> {
    return this.http.delete('http://localhost:8080/api/supervisors/' + supervisorId);
  }

  approvateTenant(username, building, apartmentNo) {
    return this.http.get('http://localhost:8080/api/supervisors/tenants/'
      + username + '/buildings/' + building + '/' + apartmentNo);
  }
}
