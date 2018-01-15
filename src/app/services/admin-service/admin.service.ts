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

}
