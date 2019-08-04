import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRole } from 'app/shared/model/role.model';
import { AccountService } from 'app/core';
import { RoleService } from './role.service';

@Component({
  selector: 'jhi-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit, OnDestroy {
  roles: IRole[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected roleService: RoleService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.roleService
      .query()
      .pipe(
        filter((res: HttpResponse<IRole[]>) => res.ok),
        map((res: HttpResponse<IRole[]>) => res.body)
      )
      .subscribe(
        (res: IRole[]) => {
          this.roles = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRoles();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRole) {
    return item.id;
  }

  registerChangeInRoles() {
    this.eventSubscriber = this.eventManager.subscribe('roleListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
