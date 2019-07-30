import { ICourse } from 'app/shared/model/course.model';
import { IQuestion } from 'app/shared/model/question.model';

export interface IExam {
  id?: number;
  examTitle?: string;
  details?: string;
  requiredTime?: string;
  totalMark?: number;
  maxTotalMark?: number;
  courses?: ICourse[];
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
    public courses?: ICourse[],
    public questions?: IQuestion[]
  ) {}
}
