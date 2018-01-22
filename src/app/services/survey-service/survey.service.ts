import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) { }

  // get building surveys
  getSurveys(buildingId) {
    return this.http.get('http://localhost:8080/api/surveys/' + buildingId);
  }
}
