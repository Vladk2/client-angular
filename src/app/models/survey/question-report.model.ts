import { Question } from "./question.model";

export class QuestionReport {
  private _question: Question;
  private _chartType: string;
  private _data: any;

  constructor(question: Question, data: any) {
    this._question = question;
    if (question.type === 'GRADE') {
      this._chartType = 'doughnut';
    } else if (question.type === 'BOOL') {
      this._chartType = 'pie'
    } else {
      this._chartType = 'text';
    }
    this._data = data;
  }

  get question(): Question {
    return this._question;
  }

  set question(question: Question) {
    this._question = question;
  }

  get data(): any {
    return this._data;
  }

  set data(data: any) {
    this._data = data;
  }

  get chartType(): string {
    return this._chartType;
  }

  set chartType(cType: string) {
    this._chartType = cType;
  }
}
