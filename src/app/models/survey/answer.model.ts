import { Question } from "./question.model";

export class Answer {
  public question: Question;
  public answer: string;

  constructor(question) {
    this.question = question;
  }
}
