/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OnlineExamApplicationTestModule } from '../../../test.module';
import { ExamDeleteDialogComponent } from 'app/entities/exam/exam-delete-dialog.component';
import { ExamService } from 'app/entities/exam/exam.service';

describe('Component Tests', () => {
  describe('Exam Management Delete Component', () => {
    let comp: ExamDeleteDialogComponent;
    let fixture: ComponentFixture<ExamDeleteDialogComponent>;
    let service: ExamService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineExamApplicationTestModule],
        declarations: [ExamDeleteDialogComponent]
      })
        .overrideTemplate(ExamDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExamDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExamService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
