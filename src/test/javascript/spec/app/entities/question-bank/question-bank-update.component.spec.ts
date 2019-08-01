/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OnlineExamApplicationTestModule } from '../../../test.module';
import { QuestionBankUpdateComponent } from 'app/entities/question-bank/question-bank-update.component';
import { QuestionBankService } from 'app/entities/question-bank/question-bank.service';
import { QuestionBank } from 'app/shared/model/question-bank.model';

describe('Component Tests', () => {
  describe('QuestionBank Management Update Component', () => {
    let comp: QuestionBankUpdateComponent;
    let fixture: ComponentFixture<QuestionBankUpdateComponent>;
    let service: QuestionBankService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineExamApplicationTestModule],
        declarations: [QuestionBankUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(QuestionBankUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestionBankUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionBankService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new QuestionBank(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new QuestionBank();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
