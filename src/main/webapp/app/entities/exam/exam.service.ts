import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExam } from 'app/shared/model/exam.model';

type EntityResponseType = HttpResponse<IExam>;
type EntityArrayResponseType = HttpResponse<IExam[]>;

@Injectable({ providedIn: 'root' })
export class ExamService {
  public resourceUrl = SERVER_API_URL + 'api/exams';

  constructor(protected http: HttpClient) {}

  create(exam: IExam): Observable<EntityResponseType> {
    return this.http.post<IExam>(this.resourceUrl, exam, { observe: 'response' });
  }

  update(exam: IExam): Observable<EntityResponseType> {
    return this.http.put<IExam>(this.resourceUrl, exam, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
