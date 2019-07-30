import { IExam } from 'app/shared/model/exam.model';
import { IQuestionBank } from 'app/shared/model/question-bank.model';

export interface IQuestion {
  id?: number;
  title?: string;
  description?: string;
  exam?: IExam;
  questionBank?: IQuestionBank;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public exam?: IExam,
    public questionBank?: IQuestionBank
  ) {}
}
