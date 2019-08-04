/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OnlineExamApplicationTestModule } from '../../../test.module';
import { ExamDetailComponent } from 'app/entities/exam/exam-detail.component';
import { Exam } from 'app/shared/model/exam.model';

describe('Component Tests', () => {
  describe('Exam Management Detail Component', () => {
    let comp: ExamDetailComponent;
    let fixture: ComponentFixture<ExamDetailComponent>;
    const route = ({ data: of({ exam: new Exam(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineExamApplicationTestModule],
        declarations: [ExamDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ExamDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExamDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.exam).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
