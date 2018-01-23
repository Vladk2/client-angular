import { Question } from "./question.model";

export class QuestionReport {
  public question: Question;
  public chartType: string;
  public data: any;

  constructor(question: Question, data: any) {
    this.question = question;
    if (question.type === 'GRADE') {
      this.chartType = 'doughnut';
    } else if (question.type === 'BOOL') {
      this.chartType = 'pie'
    } else {
      this.chartType = 'text';
    }
    this.data = data;
  }
}
