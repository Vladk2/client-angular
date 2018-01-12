import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TenantService {

  constructor(private http: HttpClient) { }

  // gets all tenants for a logged user
  getUsersTenants(): Observable<any> {
    return this.http.get('http://localhost:8080/api/tenants/myTenants');
  }

}
