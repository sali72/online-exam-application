/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlineExamApplicationTestModule } from '../../../test.module';
import { QuestionBankDetailComponent } from 'app/entities/question-bank/question-bank-detail.component';
import { QuestionBank } from 'app/shared/model/question-bank.model';

describe('Component Tests', () => {
  describe('QuestionBank Management Detail Component', () => {
    let comp: QuestionBankDetailComponent;
    let fixture: ComponentFixture<QuestionBankDetailComponent>;
    const route = ({ data: of({ questionBank: new QuestionBank(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineExamApplicationTestModule],
        declarations: [QuestionBankDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(QuestionBankDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(QuestionBankDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.questionBank).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
