import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IQuestion } from 'app/shared/model/question.model';
import { AccountService } from 'app/core';
import { QuestionService } from './question.service';

@Component({
  selector: 'jhi-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit, OnDestroy {
  questions: IQuestion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected questionService: QuestionService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.questionService
      .query()
      .pipe(
        filter((res: HttpResponse<IQuestion[]>) => res.ok),
        map((res: HttpResponse<IQuestion[]>) => res.body)
      )
      .subscribe(
        (res: IQuestion[]) => {
          this.questions = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInQuestions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IQuestion) {
    return item.id;
  }

  registerChangeInQuestions() {
    this.eventSubscriber = this.eventManager.subscribe('questionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
