import { QuestionReport } from "./question-report.model";
import { Survey } from "./survey.model";
import { Question } from "./question.model";

export class SurveyResponse {
  private _survey: Survey;
  private _questionReports: QuestionReport[];

  constructor() {
    this._survey = new Survey();
    this._questionReports = new Array<QuestionReport>();
    let dataGrade = {
      labels: ['5', '4', '3', '2', '1'],
      datasets: [
        {
          data: [300, 50, 100, 40, 10],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF5733",
            "#099311"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF5733",
            "#099311"
          ]
        }]
    };
    let dataBool = {
      labels: ['Da', 'Ne'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: [
            "#FF6384",
            "#36A2EB"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB"
          ]
        }]
    };
    this._questionReports.push(new QuestionReport(new Question(1, 'Koliko kida nas sajt?', 'GRADE'), dataGrade));
    this._questionReports.push(new QuestionReport(new Question(1, 'Jeste li debeli?', 'BOOL'), dataBool));
  }

  get survey(): Survey {
    return this._survey;
  }

  get questionReports(): QuestionReport[] {
    return this._questionReports;
  }
}
