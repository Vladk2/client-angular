import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  public getToken(): string {
  	return localStorage.getItem('token');
  }


}
 
