import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStudent } from 'app/shared/model/student.model';
import { AccountService } from 'app/core';
import { StudentService } from './student.service';

@Component({
  selector: 'jhi-student',
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit, OnDestroy {
  students: IStudent[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected studentService: StudentService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.studentService
      .query()
      .pipe(
        filter((res: HttpResponse<IStudent[]>) => res.ok),
        map((res: HttpResponse<IStudent[]>) => res.body)
      )
      .subscribe(
        (res: IStudent[]) => {
          this.students = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStudents();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStudent) {
    return item.id;
  }

  registerChangeInStudents() {
    this.eventSubscriber = this.eventManager.subscribe('studentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
