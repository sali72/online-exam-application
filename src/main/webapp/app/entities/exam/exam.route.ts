import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Exam } from 'app/shared/model/exam.model';
import { ExamService } from './exam.service';
import { ExamComponent } from './exam.component';
import { ExamDetailComponent } from './exam-detail.component';
import { ExamUpdateComponent } from './exam-update.component';
import { ExamDeletePopupComponent } from './exam-delete-dialog.component';
import { IExam } from 'app/shared/model/exam.model';

@Injectable({ providedIn: 'root' })
export class ExamResolve implements Resolve<IExam> {
  constructor(private service: ExamService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExam> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Exam>) => response.ok),
        map((exam: HttpResponse<Exam>) => exam.body)
      );
    }
    return of(new Exam());
  }
}

export const examRoute: Routes = [
  {
    path: '',
    component: ExamComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Exams'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExamDetailComponent,
    resolve: {
      exam: ExamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Exams'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExamUpdateComponent,
    resolve: {
      exam: ExamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Exams'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExamUpdateComponent,
    resolve: {
      exam: ExamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Exams'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const examPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExamDeletePopupComponent,
    resolve: {
      exam: ExamResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Exams'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
