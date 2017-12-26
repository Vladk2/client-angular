import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
  			  private router: Router) { }

  login_service(credentials): Observable<any> {
  	return this.http.post('http://localhost:8080/api/users/sign_in', credentials)
  	.map((res: any)  => {
  		//Method for decod JWT Token
      	//const tokenPayload = decode(res.jwt);

      	const tokenPayload = {'role':'ADMIN'};
      	if (tokenPayload.role === 'ADMIN') {
      		//TODOO: Add guard for admin	
      		localStorage.setItem('adminToken', res.jwt);
      		this.router.navigate(['/admin']);
      	}
      	if (tokenPayload.role === 'EMPLOYEE') {
      		//TODOO: Add guard for employee
      	}
      	if (tokenPayload.role === 'SUPERVISOR') {
      		//TODOO: Add guard for supervisor
      	}
      	if (tokenPayload.role === 'TENANT') {
      		//TODOO: Add guard for tenant
      	}
      	return res;
  	});
  };
  
  logout_service() {
  	if (localStorage.getItem('adminToken')) {
  		localStorage.removeItem('adminToken');
  		this.router.navigate(['/login']);
  	}


  };
}
