import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Teacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';
import { TeacherComponent } from './teacher.component';
import { TeacherDetailComponent } from './teacher-detail.component';
import { TeacherUpdateComponent } from './teacher-update.component';
import { TeacherDeletePopupComponent } from './teacher-delete-dialog.component';
import { ITeacher } from 'app/shared/model/teacher.model';

@Injectable({ providedIn: 'root' })
export class TeacherResolve implements Resolve<ITeacher> {
  constructor(private service: TeacherService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITeacher> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Teacher>) => response.ok),
        map((teacher: HttpResponse<Teacher>) => teacher.body)
      );
    }
    return of(new Teacher());
  }
}

export const teacherRoute: Routes = [
  {
    path: '',
    component: TeacherComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Teachers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TeacherDetailComponent,
    resolve: {
      teacher: TeacherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Teachers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TeacherUpdateComponent,
    resolve: {
      teacher: TeacherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Teachers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TeacherUpdateComponent,
    resolve: {
      teacher: TeacherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Teachers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const teacherPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TeacherDeletePopupComponent,
    resolve: {
      teacher: TeacherResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Teachers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
