import { ITeacher } from 'app/shared/model/teacher.model';
import { IQuestionBank } from 'app/shared/model/question-bank.model';
import { IStudent } from 'app/shared/model/student.model';
import { IExam } from 'app/shared/model/exam.model';

export interface ICourse {
  id?: number;
  courseTitle?: string;
  startDate?: string;
  endDate?: string;
  teacher?: ITeacher;
  questionBank?: IQuestionBank;
  students?: IStudent[];
  exam?: IExam;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public courseTitle?: string,
    public startDate?: string,
    public endDate?: string,
    public teacher?: ITeacher,
    public questionBank?: IQuestionBank,
    public students?: IStudent[],
    public exam?: IExam
  ) {}
}
