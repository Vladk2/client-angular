import { Question } from "./question.model";
import { Survey } from "./survey.model";
import { Answer } from "./answer.model";

export class UserResponse {
  private _answers: Answer[];
  private _survey: Survey;

  constructor() {
    this._answers = new Array<Answer>();
  }

  get answers(): Answer[] {
    return this._answers;
  }

  get survey(): Survey {
    return this._survey;
  }

  set survey(survey: Survey) {
    this._survey = survey;
  }
}
