import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { QuestionBank } from 'app/shared/model/question-bank.model';
import { QuestionBankService } from './question-bank.service';
import { QuestionBankComponent } from './question-bank.component';
import { QuestionBankDetailComponent } from './question-bank-detail.component';
import { QuestionBankUpdateComponent } from './question-bank-update.component';
import { QuestionBankDeletePopupComponent } from './question-bank-delete-dialog.component';
import { IQuestionBank } from 'app/shared/model/question-bank.model';

@Injectable({ providedIn: 'root' })
export class QuestionBankResolve implements Resolve<IQuestionBank> {
  constructor(private service: QuestionBankService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IQuestionBank> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<QuestionBank>) => response.ok),
        map((questionBank: HttpResponse<QuestionBank>) => questionBank.body)
      );
    }
    return of(new QuestionBank());
  }
}

export const questionBankRoute: Routes = [
  {
    path: '',
    component: QuestionBankComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionBanks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QuestionBankDetailComponent,
    resolve: {
      questionBank: QuestionBankResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionBanks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QuestionBankUpdateComponent,
    resolve: {
      questionBank: QuestionBankResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionBanks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QuestionBankUpdateComponent,
    resolve: {
      questionBank: QuestionBankResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionBanks'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const questionBankPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: QuestionBankDeletePopupComponent,
    resolve: {
      questionBank: QuestionBankResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'QuestionBanks'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
