import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  showFirm(id_firm): Observable<any> {
  	return this.http.get('http://localhost:8080/api/firms/' + id_firm + '/');
  };

  addEmployFirms(id_firm, id_user): Observable<any> {
  	return this.http.post('http://localhost:8080/api/firms/' + id_firm + '/' + id_user, {});
  };

  removeEmployFirms(id_firm, id_user): Observable<any> {
  	return this.http.post('http://localhost:8080/api/firms/remove/' + id_firm + '/' + id_user, {});
  };

  updateFirm(firm): Observable<any> {
  	return this.http.post('http://localhost:8080/api/firms/update', firm);
  };

  showFirmByUser(): Observable<any> {
  	return this.http.get('http://localhost:8080/api/firms/show');
  };
}
