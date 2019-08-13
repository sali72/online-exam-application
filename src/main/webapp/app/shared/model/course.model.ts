import { IExam } from 'app/shared/model/exam.model';
import { IStudent } from 'app/shared/model/student.model';

export interface ICourse {
  id?: number;
  courseTitle?: string;
  startDate?: string;
  endDate?: string;
  questionBankId?: number;
  exams?: IExam[];
  teacherId?: number;
  students?: IStudent[];
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public courseTitle?: string,
    public startDate?: string,
    public endDate?: string,
    public questionBankId?: number,
    public exams?: IExam[],
    public teacherId?: number,
    public students?: IStudent[]
  ) {}
}
