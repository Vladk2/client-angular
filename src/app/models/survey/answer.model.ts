import { Question } from "./question.model";

export class Answer {
  private _question: Question;
  private _answer: string;

  constructor(question) {
    this._question = question;
  }

  get question(): Question {
    return this._question;
  }

  set question(question: Question) {
    this._question = question;
  }

  get answer(): string {
    return this._answer;
  }

  set answer(answer: string) {
    this._answer = answer;
  }
}
