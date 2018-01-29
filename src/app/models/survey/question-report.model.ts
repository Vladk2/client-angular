import { Injectable } from '@angular/core';

import { Question } from './question.model';

@Injectable()
export class QuestionReport {
  public question: Question;
  public chartType: string;
  public data: any;

  constructor(question: Question) {
    this.question = question;
    if (question.typeQuestion === 'GRADE') {
      this.chartType = 'doughnut';
    } else if (question.typeQuestion === 'BOOL') {
      this.chartType = 'pie';
    } else {
      this.chartType = 'text';
    }
  }
}
