import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQuestionBank } from 'app/shared/model/question-bank.model';

type EntityResponseType = HttpResponse<IQuestionBank>;
type EntityArrayResponseType = HttpResponse<IQuestionBank[]>;

@Injectable({ providedIn: 'root' })
export class QuestionBankService {
  public resourceUrl = SERVER_API_URL + 'api/question-banks';

  constructor(protected http: HttpClient) {}

  create(questionBank: IQuestionBank): Observable<EntityResponseType> {
    return this.http.post<IQuestionBank>(this.resourceUrl, questionBank, { observe: 'response' });
  }

  update(questionBank: IQuestionBank): Observable<EntityResponseType> {
    return this.http.put<IQuestionBank>(this.resourceUrl, questionBank, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuestionBank>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuestionBank[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
