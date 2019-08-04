import { IQuestion } from 'app/shared/model/question.model';

export interface IExam {
  id?: number;
  examTitle?: string;
  details?: string;
  requiredTime?: string;
  totalMark?: number;
  maxTotalMark?: number;
  questions?: IQuestion[];
}

export class Exam implements IExam {
  constructor(
    public id?: number,
    public examTitle?: string,
    public details?: string,
    public requiredTime?: string,
    public totalMark?: number,
    public maxTotalMark?: number,
    public questions?: IQuestion[]
  ) {}
}
