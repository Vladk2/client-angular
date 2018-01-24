import { Question } from "./question.model";

export class Survey {
  public id: number;
  public creator: number;
  public name: string;
  public description: string;
  public dateCreated: Date;
  public dateExpires: Date;
  public questionDTO: any;
}
