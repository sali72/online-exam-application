import { IQuestion } from 'app/shared/model/question.model';

export interface IQuestionBank {
  id?: number;
  questions?: IQuestion[];
}

export class QuestionBank implements IQuestionBank {
  constructor(public id?: number, public questions?: IQuestion[]) {}
}
