/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineExamApplicationTestModule } from '../../../test.module';
import { QuestionBankComponent } from 'app/entities/question-bank/question-bank.component';
import { QuestionBankService } from 'app/entities/question-bank/question-bank.service';
import { QuestionBank } from 'app/shared/model/question-bank.model';

describe('Component Tests', () => {
  describe('QuestionBank Management Component', () => {
    let comp: QuestionBankComponent;
    let fixture: ComponentFixture<QuestionBankComponent>;
    let service: QuestionBankService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineExamApplicationTestModule],
        declarations: [QuestionBankComponent],
        providers: []
      })
        .overrideTemplate(QuestionBankComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestionBankComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionBankService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new QuestionBank(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.questionBanks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
