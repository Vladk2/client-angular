export class Question {

  public id;
  public question;
  public typeQuestion;

  constructor(id, content, type) {
    this.id = id;
    this.question = content;
    this.typeQuestion = type;
  }

}
