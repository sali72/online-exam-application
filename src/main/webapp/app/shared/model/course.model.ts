import { IStudent } from 'app/shared/model/student.model';

export interface ICourse {
  id?: number;
  courseTitle?: string;
  startDate?: string;
  endDate?: string;
  teacherId?: number;
  questionBankId?: number;
  teacherId?: number;
  examId?: number;
  students?: IStudent[];
  students?: IStudent[];
  examId?: number;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public courseTitle?: string,
    public startDate?: string,
    public endDate?: string,
    public teacherId?: number,
    public questionBankId?: number,
    public teacherId?: number,
    public examId?: number,
    public students?: IStudent[],
    public students?: IStudent[],
    public examId?: number
  ) {}
}
