import { Question } from "./question.model";
import { Survey } from "./survey.model";
import { Answer } from "./answer.model";

export class UserResponse {
  public responseDTO: Answer[];
  public survey: number;

  constructor() {
    this.responseDTO = new Array<Answer>();
  }
}
