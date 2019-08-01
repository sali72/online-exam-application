import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExam } from 'app/shared/model/exam.model';
import { ExamService } from './exam.service';

@Component({
  selector: 'jhi-exam-delete-dialog',
  templateUrl: './exam-delete-dialog.component.html'
})
export class ExamDeleteDialogComponent {
  exam: IExam;

  constructor(protected examService: ExamService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.examService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'examListModification',
        content: 'Deleted an exam'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-exam-delete-popup',
  template: ''
})
export class ExamDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ exam }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExamDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.exam = exam;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/exam', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/exam', { outlets: { popup: null } }]);
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
