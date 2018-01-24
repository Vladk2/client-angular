import { Question } from "./question.model";

export class Answer {
  public question: any;
  public answer: string;

  constructor(question) {
    this.question = question;
  }
}
