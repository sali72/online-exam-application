export interface IQuestion {
  id?: number;
  title?: string;
  description?: string;
  examId?: number;
  questionBankId?: number;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public examId?: number,
    public questionBankId?: number
  ) {}
}
