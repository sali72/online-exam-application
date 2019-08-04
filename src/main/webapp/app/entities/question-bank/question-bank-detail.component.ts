import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuestionBank } from 'app/shared/model/question-bank.model';

@Component({
  selector: 'jhi-question-bank-detail',
  templateUrl: './question-bank-detail.component.html'
})
export class QuestionBankDetailComponent implements OnInit {
  questionBank: IQuestionBank;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ questionBank }) => {
      this.questionBank = questionBank;
    });
  }

  previousState() {
    window.history.back();
  }
}
