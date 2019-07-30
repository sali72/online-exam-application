import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Question } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';
import { QuestionComponent } from './question.component';
import { QuestionDetailComponent } from './question-detail.component';
import { QuestionUpdateComponent } from './question-update.component';
import { QuestionDeletePopupComponent } from './question-delete-dialog.component';
import { IQuestion } from 'app/shared/model/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionResolve implements Resolve<IQuestion> {
  constructor(private service: QuestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuestion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Question>) => response.ok),
        map((question: HttpResponse<Question>) => question.body)
      );
    }
    return of(new Question());
  }
}

export const questionRoute: Routes = [
  {
    path: '',
    component: QuestionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Questions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QuestionDetailComponent,
    resolve: {
      question: QuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Questions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QuestionUpdateComponent,
    resolve: {
      question: QuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Questions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QuestionUpdateComponent,
    resolve: {
      question: QuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Questions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const questionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: QuestionDeletePopupComponent,
    resolve: {
      question: QuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Questions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
