export const enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export interface ITeacher {
  id?: number;
  teacherFirstName?: string;
  teacherLastName?: string;
  gender?: Gender;
  birthDate?: string;
  teacherCode?: string;
}

export class Teacher implements ITeacher {
  constructor(
    public id?: number,
    public teacherFirstName?: string,
    public teacherLastName?: string,
    public gender?: Gender,
    public birthDate?: string,
    public teacherCode?: string
  ) {}
}
