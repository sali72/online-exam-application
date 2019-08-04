import { IQuestion } from 'app/shared/model/question.model';

export interface IQuestionBank {
  id?: number;
  title?: string;
  courseId?: number;
  questions?: IQuestion[];
}

export class QuestionBank implements IQuestionBank {
  constructor(public id?: number, public title?: string, public courseId?: number, public questions?: IQuestion[]) {}
}
