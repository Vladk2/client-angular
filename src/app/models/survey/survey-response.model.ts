import { QuestionReport } from "./question-report.model";
import { Survey } from "./survey.model";
import { Question } from "./question.model";

export class SurveyResponse {
  public survey: Survey;
  public questionReports: QuestionReport[];

  constructor() {
    this.survey = new Survey();
    this.questionReports = new Array<QuestionReport>();
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
    this.questionReports.push(new QuestionReport(new Question(1, 'Koliko kida nas sajt?', 'GRADE'), dataGrade));
    this.questionReports.push(new QuestionReport(new Question(1, 'Jeste li debeli?', 'BOOL'), dataBool));
  }

}
