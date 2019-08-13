import { ICourse } from 'app/shared/model/course.model';

export const enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export interface IStudent {
  id?: number;
  studentFirstName?: string;
  studentLastName?: string;
  gender?: Gender;
  birthDate?: string;
  studentCode?: string;
  courses?: ICourse[];
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public studentFirstName?: string,
    public studentLastName?: string,
    public gender?: Gender,
    public birthDate?: string,
    public studentCode?: string,
    public courses?: ICourse[]
  ) {}
}
