import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlineExamApplicationSharedModule } from 'app/shared';
import {
  QuestionComponent,
  QuestionDetailComponent,
  QuestionUpdateComponent,
  QuestionDeletePopupComponent,
  QuestionDeleteDialogComponent,
  questionRoute,
  questionPopupRoute
} from './';

const ENTITY_STATES = [...questionRoute, ...questionPopupRoute];

@NgModule({
  imports: [OnlineExamApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    QuestionComponent,
    QuestionDetailComponent,
    QuestionUpdateComponent,
    QuestionDeleteDialogComponent,
    QuestionDeletePopupComponent
  ],
  entryComponents: [QuestionComponent, QuestionUpdateComponent, QuestionDeleteDialogComponent, QuestionDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineExamApplicationQuestionModule {}