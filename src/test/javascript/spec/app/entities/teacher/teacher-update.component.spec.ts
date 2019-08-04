/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { OnlineExamApplicationTestModule } from '../../../test.module';
import { TeacherUpdateComponent } from 'app/entities/teacher/teacher-update.component';
import { TeacherService } from 'app/entities/teacher/teacher.service';
import { Teacher } from 'app/shared/model/teacher.model';

describe('Component Tests', () => {
  describe('Teacher Management Update Component', () => {
    let comp: TeacherUpdateComponent;
    let fixture: ComponentFixture<TeacherUpdateComponent>;
    let service: TeacherService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OnlineExamApplicationTestModule],
        declarations: [TeacherUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TeacherUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TeacherUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeacherService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Teacher(123);
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
        const entity = new Teacher();
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
