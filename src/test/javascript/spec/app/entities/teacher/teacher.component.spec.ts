/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OnlineExamApplicationTestModule } from '../../../test.module';
import { TeacherComponent } from 'app/entities/teacher/teacher.component';
import { TeacherService } from 'app/entities/teacher/teacher.service';
import { Teacher } from 'app/shared/model/teacher.model';

describe('Component Tests', () => {
  describe('Teacher Management Component', () => {
    let comp: TeacherComponent;
    let fixture: ComponentFixture<TeacherComponent>;
    let service: TeacherService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineExamApplicationTestModule],
        declarations: [TeacherComponent],
        providers: []
      })
        .overrideTemplate(TeacherComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TeacherComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeacherService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Teacher(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.teachers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
