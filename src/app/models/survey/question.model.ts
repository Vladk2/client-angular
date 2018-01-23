export class Question {

  public id: number;
  public content: string;
  public type: string;

  constructor(id, content, type) {
    this.id = id;
    this.content = content;
    this.type = type;
  }

}
