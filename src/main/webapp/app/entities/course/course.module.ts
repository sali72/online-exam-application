import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlineExamApplicationSharedModule } from 'app/shared';
import {
  CourseComponent,
  CourseDetailComponent,
  CourseUpdateComponent,
  CourseDeletePopupComponent,
  CourseDeleteDialogComponent,
  courseRoute,
  coursePopupRoute
} from './';

const ENTITY_STATES = [...courseRoute, ...coursePopupRoute];

@NgModule({
  imports: [OnlineExamApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CourseComponent, CourseDetailComponent, CourseUpdateComponent, CourseDeleteDialogComponent, CourseDeletePopupComponent],
  entryComponents: [CourseComponent, CourseUpdateComponent, CourseDeleteDialogComponent, CourseDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineExamApplicationCourseModule {}