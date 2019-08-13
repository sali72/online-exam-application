import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
  isSaving: boolean;

  courses: ICourse[];

  editForm = this.fb.group({
    id: [],
    studentFirstName: [],
    studentLastName: [],
    gender: [],
    birthDate: [],
    studentCode: [null, []]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studentService: StudentService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);
    });
    this.courseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICourse[]>) => response.body)
      )
      .subscribe((res: ICourse[]) => (this.courses = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(student: IStudent) {
    this.editForm.patchValue({
      id: student.id,
      studentFirstName: student.studentFirstName,
      studentLastName: student.studentLastName,
      gender: student.gender,
      birthDate: student.birthDate,
      studentCode: student.studentCode
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    return {
      ...new Student(),
      id: this.editForm.get(['id']).value,
      studentFirstName: this.editForm.get(['studentFirstName']).value,
      studentLastName: this.editForm.get(['studentLastName']).value,
      gender: this.editForm.get(['gender']).value,
      birthDate: this.editForm.get(['birthDate']).value,
      studentCode: this.editForm.get(['studentCode']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCourseById(index: number, item: ICourse) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
