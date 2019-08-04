import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'jhi-teacher-delete-dialog',
  templateUrl: './teacher-delete-dialog.component.html'
})
export class TeacherDeleteDialogComponent {
  teacher: ITeacher;

  constructor(protected teacherService: TeacherService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.teacherService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'teacherListModification',
        content: 'Deleted an teacher'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-teacher-delete-popup',
  template: ''
})
export class TeacherDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ teacher }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TeacherDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.teacher = teacher;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/teacher', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/teacher', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
