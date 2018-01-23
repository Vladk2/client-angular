import { Question } from "./question.model";

export class Survey {
  public id: number;
  public userId: number;
  public name: string;
  public description: string;
  public dateCreated: Date;
  public dateExpires: Date;
  public questions: any;
}
