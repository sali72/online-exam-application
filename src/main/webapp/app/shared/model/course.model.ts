import { IStudent } from 'app/shared/model/student.model';

export interface ICourse {
  id?: number;
  courseTitle?: string;
  startDate?: string;
  endDate?: string;
  questionBankId?: number;
  teacherId?: number;
  examId?: number;
  students?: IStudent[];
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public courseTitle?: string,
    public startDate?: string,
    public endDate?: string,
    public questionBankId?: number,
    public teacherId?: number,
    public examId?: number,
    public students?: IStudent[]
  ) {}
}
