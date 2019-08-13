import { IQuestion } from 'app/shared/model/question.model';

export interface IQuestionBank {
  id?: number;
  title?: string;
  questions?: IQuestion[];
}

export class QuestionBank implements IQuestionBank {
  constructor(public id?: number, public title?: string, public questions?: IQuestion[]) {}
}
