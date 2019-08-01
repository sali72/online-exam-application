import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITeacher } from 'app/shared/model/teacher.model';
import { AccountService } from 'app/core';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'jhi-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent implements OnInit, OnDestroy {
  teachers: ITeacher[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected teacherService: TeacherService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.teacherService
      .query()
      .pipe(
        filter((res: HttpResponse<ITeacher[]>) => res.ok),
        map((res: HttpResponse<ITeacher[]>) => res.body)
      )
      .subscribe(
        (res: ITeacher[]) => {
          this.teachers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTeachers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITeacher) {
    return item.id;
  }

  registerChangeInTeachers() {
    this.eventSubscriber = this.eventManager.subscribe('teacherListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
