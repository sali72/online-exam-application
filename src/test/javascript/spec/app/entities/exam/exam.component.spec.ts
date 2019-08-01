/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineExamApplicationTestModule } from '../../../test.module';
import { ExamComponent } from 'app/entities/exam/exam.component';
import { ExamService } from 'app/entities/exam/exam.service';
import { Exam } from 'app/shared/model/exam.model';

describe('Component Tests', () => {
  describe('Exam Management Component', () => {
    let comp: ExamComponent;
    let fixture: ComponentFixture<ExamComponent>;
    let service: ExamService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineExamApplicationTestModule],
        declarations: [ExamComponent],
        providers: []
      })
        .overrideTemplate(ExamComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExamComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExamService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Exam(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.exams[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
