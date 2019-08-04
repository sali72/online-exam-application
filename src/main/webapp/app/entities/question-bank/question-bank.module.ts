import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OnlineExamApplicationSharedModule } from 'app/shared';
import {
  QuestionBankComponent,
  QuestionBankDetailComponent,
  QuestionBankUpdateComponent,
  QuestionBankDeletePopupComponent,
  QuestionBankDeleteDialogComponent,
  questionBankRoute,
  questionBankPopupRoute
} from './';

const ENTITY_STATES = [...questionBankRoute, ...questionBankPopupRoute];

@NgModule({
  imports: [OnlineExamApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    QuestionBankComponent,
    QuestionBankDetailComponent,
    QuestionBankUpdateComponent,
    QuestionBankDeleteDialogComponent,
    QuestionBankDeletePopupComponent
  ],
  entryComponents: [
    QuestionBankComponent,
    QuestionBankUpdateComponent,
    QuestionBankDeleteDialogComponent,
    QuestionBankDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineExamApplicationQuestionBankModule {}
