import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient,
       private router: Router) { }

  getAllBuildin(): Observable<any> {
    return this.http.get('http://localhost:8080/api/admins/buildings/');
  }

  getProfile(): Observable<any> {
    return this.http.get('http://localhost:8080/api/users/');
  }

  updateInfo(user): Observable<any> {
    return this.http.put('http://localhost:8080/api/users/', user);
  }

  updatePassword(pass): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/password', pass);
  }

  addBuilding(building): Observable<any> {
    return this.http.post('http://localhost:8080/api/admins/building/', building);
  }

  getAllUser(): Observable<any> {
    return this.http.get('http://localhost:8080/api/admins/users/');
  }

  addFirm(firm, user_id): Observable<any> {
    return this.http.post('http://localhost:8080/api/admins/firm/' + user_id + '/null', firm);
  }

  addAdmin(id_user): Observable<any> {
    return this.http.patch('http://localhost:8080/api/admins/admin/' + id_user, {});
  }

  removeAdmin(id_user): Observable<any> {
    return this.http.patch('http://localhost:8080/api/admins/admin/remove/' + id_user, {});
  }

  getAllBuildings(): Observable<any> {
    return this.http.get('http://localhost:8080/api/admins/buildings/');
  }

  getAllFirms(): Observable<any> {
    return this.http.get('http://localhost:8080/api/admins/firms/');
  }

  removeFirm(id_firm): Observable<any> {
    return this.http.delete('http://localhost:8080/api/admins/firm/' + id_firm);
  }
}
