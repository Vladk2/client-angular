export class Question {

  private _id: number;
  private _content: string;
  private _type: string;

  constructor(id, content, type) {
    this._id = id;
    this._content = content;
    this._type = type;
  }

  get id(): number {
    return this._id;
  }

  get type(): string {
    return this._type;
  }

  get content(): string {
    return this._content;
  }
}
