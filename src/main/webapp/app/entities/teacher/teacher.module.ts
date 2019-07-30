import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlineExamApplicationSharedModule } from 'app/shared';
import {
  TeacherComponent,
  TeacherDetailComponent,
  TeacherUpdateComponent,
  TeacherDeletePopupComponent,
  TeacherDeleteDialogComponent,
  teacherRoute,
  teacherPopupRoute
} from './';

const ENTITY_STATES = [...teacherRoute, ...teacherPopupRoute];

@NgModule({
  imports: [OnlineExamApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TeacherComponent,
    TeacherDetailComponent,
    TeacherUpdateComponent,
    TeacherDeleteDialogComponent,
    TeacherDeletePopupComponent
  ],
  entryComponents: [TeacherComponent, TeacherUpdateComponent, TeacherDeleteDialogComponent, TeacherDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineExamApplicationTeacherModule {}
