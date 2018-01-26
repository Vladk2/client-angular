import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';

import {SurveyResponse} from '../../models/survey/survey-response.model';

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) {
  }

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

  // create survey
  create(obj) {
    return this.http.post('http://localhost:8080/api/surveys/', obj);
  }

  surveyStatistics(survey) {
    const surveyResponses = new Array<SurveyResponse>();
    const responses = this.getAnswers(survey);

    survey.questionDTO.forEach(q => {
      const surveyResponse = new SurveyResponse();
      const yesNo = {'yes': 0, 'no': 0};
      const grades = {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'f': 0};
      const textAnswers = [];

      responses.forEach(r => {
        if (q.question === r.question.question) {
          if (q.typeQuestion === 'BOOL') {
            yesNo.yes += r.values.yes;
            yesNo.no += r.values.no;
          } else if (q.typeQuestion === 'GRADE') {
            grades.a += r.values.a;
            grades.b += r.values.b;
            grades.c += r.values.c;
            grades.d += r.values.d;
            grades.f += r.values.f;
            return;
          } else {
            textAnswers.push(r.values);
          }
        }
      });
      surveyResponse.question = q;
      if (surveyResponse.question.typeQuestion === 'BOOL') {
        surveyResponse.values = yesNo;
        surveyResponse.setData(surveyResponse.question.typeQuestion);
      } else if (surveyResponse.question.typeQuestion === 'GRADE') {
        surveyResponse.values = grades;
        surveyResponse.setData(surveyResponse.question.typeQuestion);
      } else {
        surveyResponse.values = textAnswers;
        surveyResponse.setData(surveyResponse.question.typeQuestion);
      }
      surveyResponses.push(surveyResponse);
    });

    return surveyResponses;
  }

  getAnswers(survey) {
    const responses = new Array<SurveyResponse>();

    survey.userResponses.forEach(r => {
      //console.log(r);

      r.answers.forEach((a, i) => {
        const surveyResponse = new SurveyResponse();

        const yesNo = {'yes': 0, 'no': 0};
        const grades = {'a': 0, 'b': 0, 'c': 0, 'd': 0, 'f': 0};
        let textAnswer;

        surveyResponse.question = a.question;

        if (a.question.typeQuestion === 'BOOL') {
          if (a.answer === 'true') {
            yesNo.yes++;
          } else {
            yesNo.no++;
          }
        } else if (a.question.typeQuestion === 'GRADE') {
          switch (a.answer) {
            case '1':
              grades.f++;
              break;
            case '2':
              grades.d++;
              break;
            case '3':
              grades.c++;
              break;
            case '4':
              grades.b++;
              break;
            case '5':
              grades.a++;
              break;
            default:
              break;
          }
        } else {
          textAnswer = a.answer;
        }
        if (surveyResponse.question.typeQuestion === 'BOOL') {
          surveyResponse.values = yesNo;
        } else if (surveyResponse.question.typeQuestion === 'GRADE') {
          surveyResponse.values = grades;
        } else {
          surveyResponse.values = textAnswer;
        }
        responses.push(surveyResponse);
      });
    });

    return responses;
  }

}
