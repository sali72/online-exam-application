import { IStudent } from 'app/shared/model/student.model';

export interface ICourse {
  id?: number;
  courseTitle?: string;
  startDate?: string;
  endDate?: string;
  teacherId?: number;
  questionBankId?: number;
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
    public students?: IStudent[],
    public examId?: number
  ) {}
}
