/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OnlineExamApplicationTestModule } from '../../../test.module';
import { QuestionBankDeleteDialogComponent } from 'app/entities/question-bank/question-bank-delete-dialog.component';
import { QuestionBankService } from 'app/entities/question-bank/question-bank.service';

describe('Component Tests', () => {
  describe('QuestionBank Management Delete Component', () => {
    let comp: QuestionBankDeleteDialogComponent;
    let fixture: ComponentFixture<QuestionBankDeleteDialogComponent>;
    let service: QuestionBankService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineExamApplicationTestModule],
        declarations: [QuestionBankDeleteDialogComponent]
      })
        .overrideTemplate(QuestionBankDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuestionBankDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionBankService);
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
