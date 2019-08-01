import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuestionBank } from 'app/shared/model/question-bank.model';
import { AccountService } from 'app/core';
import { QuestionBankService } from './question-bank.service';

@Component({
  selector: 'jhi-question-bank',
  templateUrl: './question-bank.component.html'
})
export class QuestionBankComponent implements OnInit, OnDestroy {
  questionBanks: IQuestionBank[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected questionBankService: QuestionBankService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.questionBankService
      .query()
      .pipe(
        filter((res: HttpResponse<IQuestionBank[]>) => res.ok),
        map((res: HttpResponse<IQuestionBank[]>) => res.body)
      )
      .subscribe(
        (res: IQuestionBank[]) => {
          this.questionBanks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInQuestionBanks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IQuestionBank) {
    return item.id;
  }

  registerChangeInQuestionBanks() {
    this.eventSubscriber = this.eventManager.subscribe('questionBankListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
