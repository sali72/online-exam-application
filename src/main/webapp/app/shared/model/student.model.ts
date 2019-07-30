import { ICourse } from 'app/shared/model/course.model';

export interface IStudent {
  id?: number;
  studentFirstName?: string;
  studentLastName?: string;
  gender?: string;
  birthDate?: string;
  courses?: ICourse[];
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public studentFirstName?: string,
    public studentLastName?: string,
    public gender?: string,
    public birthDate?: string,
    public courses?: ICourse[]
  ) {}
}
