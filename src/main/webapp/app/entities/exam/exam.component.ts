import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IExam } from 'app/shared/model/exam.model';
import { AccountService } from 'app/core';
import { ExamService } from './exam.service';

@Component({
  selector: 'jhi-exam',
  templateUrl: './exam.component.html'
})
export class ExamComponent implements OnInit, OnDestroy {
  exams: IExam[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected examService: ExamService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.examService
      .query()
      .pipe(
        filter((res: HttpResponse<IExam[]>) => res.ok),
        map((res: HttpResponse<IExam[]>) => res.body)
      )
      .subscribe(
        (res: IExam[]) => {
          this.exams = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInExams();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExam) {
    return item.id;
  }

  registerChangeInExams() {
    this.eventSubscriber = this.eventManager.subscribe('examListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
