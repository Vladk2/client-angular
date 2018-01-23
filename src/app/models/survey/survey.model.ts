import { Question } from "./question.model";

export class Survey {

  private _id: number;
  private _name: string;
  private _description: string;
  private _dateCreated: Date;
  private _dateExpires: Date;
  private _questions: any;

  constructor() {}

  set id(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }

  get description(): string {
    return this._description;
  }

  set description(newDesc: string) {
    this._description = newDesc;
  }

  get dateCreated(): Date {
    return this._dateCreated;
  }

  set dateCreated(newDate: Date) {
    this._dateCreated = newDate;
  }

  get dateExpires(): Date {
    return this._dateExpires;
  }

  set dateExpires(newDate: Date) {
    this._dateExpires = newDate;
  }

  set questions(questions: any) {
    this._questions = questions;
  }

  get questions(): any {
    return this._questions;
  }
}
