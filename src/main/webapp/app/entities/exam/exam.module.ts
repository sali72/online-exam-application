import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlineExamApplicationSharedModule } from 'app/shared';
import {
  ExamComponent,
  ExamDetailComponent,
  ExamUpdateComponent,
  ExamDeletePopupComponent,
  ExamDeleteDialogComponent,
  examRoute,
  examPopupRoute
} from './';

const ENTITY_STATES = [...examRoute, ...examPopupRoute];

@NgModule({
  imports: [OnlineExamApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ExamComponent, ExamDetailComponent, ExamUpdateComponent, ExamDeleteDialogComponent, ExamDeletePopupComponent],
  entryComponents: [ExamComponent, ExamUpdateComponent, ExamDeleteDialogComponent, ExamDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineExamApplicationExamModule {}
