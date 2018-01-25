import { Question } from "./question.model";
import { Survey } from "./survey.model";
import { Answer } from "./answer.model";

export class UserResponse {
  public answers: Answer[];
  public survey: number;

  constructor() {
    this.answers = new Array<Answer>();
  }
}
