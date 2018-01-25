import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class TenantService {

  constructor(private http: HttpClient) {
  }

  // gets all tenants for a logged user
  getUsersTenants(): Observable<any> {
    return this.http.get('http://localhost:8080/api/tenants/myTenants');
  }

  // get all announcements for a logged user (all announcements from his building)
  getAnnouncements(tenantId): Observable<any> {
    return this.http.get('http://localhost:8080/api/tenants/announcement/' + tenantId);
  }

  postAnnouncement(tenantId, announcement) {
    return this.http.post('http://localhost:8080/api/tenants/announcement/' + tenantId, announcement);
  }

  // register new abode for user
  createNewTenant(abode) {
    return this.http.post('http://localhost:8080/api/tenants/', abode);
  }
}

