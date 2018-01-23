import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Survey } from '../../models/survey/survey.model';
import { Question } from "../../models/survey/question.model";

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
    console.log(obj);
    return this.http.post('http://localhost:8080/api/surveys/fill', obj);
  }

  convert(object: any): Survey {
    let survey = new Survey();

    survey.id = object.id;
    survey.userId = object.creator.id;
    survey.name = object.name_survey;
    survey.description = object.description;
    survey.dateCreated = object.create_survey;
    survey.dateExpires = object.time_duration;

    let questions: Question[] = [];
    object.questionDTO.forEach(q => {
      questions.push(new Question(q.id, q.question, q.typeQuestion));
    });
    survey.questions = questions;

    return survey;
  }
}
