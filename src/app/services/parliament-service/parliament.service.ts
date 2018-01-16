import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParliamentService {

  constructor(private http: HttpClient) {}

  announceParliament(tenantId, date) {
    return this.http.post('http://localhost:8080/api/parliaments/scheduleMeeting/' + tenantId, date); 
  }

  checkParliamentStatus(tenantId) {
    return this.http.get('http://localhost:8080/api/parliaments/' + tenantId + "/status"); 
  }

}
