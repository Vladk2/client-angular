import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Survey } from '../../models/survey/survey.model';
import { Question } from "../../models/survey/question.model";
import { SurveyResponse } from "../../models/survey/survey-response.model";
import { QuestionReport } from "../../models/survey/question-report.model";

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) { }

  // get building surveys
  getSurveys(buildingId) {
    return this.http.get('http://localhost:8080/api/surveys/buildings/' + buildingId);
  }

  // destroy surveys
  delete(id) {
    return this.http.delete('http://localhost:8080/api/surveys/' + id);
  }

  // fill survey
  fillOut(obj) {
    return this.http.post('http://localhost:8080/api/surveys/fill', obj);
  }

  // convert(object: any): SurveyResponse {
  //   console.log(object);
  //   let surveyResponse = new SurveyResponse();
  //   let survey = new Survey();
  //
  //   survey.id = object.survey.id;
  //   survey.userId = object.survey.creator;
  //   survey.name = object.survey.name;
  //   survey.description = object.survey.description;
  //   survey.dateCreated = object.survey.dateCreated;
  //   survey.dateExpires = object.survey.dateCreated;
  //
  //   let questions: Question[] = [];
  //
  //   object.survey.questionDTO.forEach(q => {
  //     questions.push(new Question(q.id, q.question, q.typeQuestion));
  //   });
  //   survey.questionDTO = questions;
  //
  //   surveyResponse.survey = survey;
  //
  //   let questionReports: QuestionReport[] = [];
  //
  //   object.results.forEach(r => {
  //     questionReports.push(new QuestionReport(
  //       new Question(r.question.id,
  //         r.question.content,
  //         r.question.type)
  //     ));
  //   });
  //
  //   surveyResponse.questionReports = questionReports;
  //   surveyResponse.users = object.users;
  //
  //   return surveyResponse;
  //   //
  //   // return survey;
  // }
}
