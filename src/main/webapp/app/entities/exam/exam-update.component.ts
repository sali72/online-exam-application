import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IExam, Exam } from 'app/shared/model/exam.model';
import { ExamService } from './exam.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';

@Component({
  selector: 'jhi-exam-update',
  templateUrl: './exam-update.component.html'
})
export class ExamUpdateComponent implements OnInit {
  isSaving: boolean;

  courses: ICourse[];

  editForm = this.fb.group({
    id: [],
    examTitle: [],
    details: [],
    requiredTime: [],
    totalMark: [],
    maxTotalMark: [],
    courseId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected examService: ExamService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ exam }) => {
      this.updateForm(exam);
    });
    this.courseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICourse[]>) => response.body)
      )
      .subscribe((res: ICourse[]) => (this.courses = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(exam: IExam) {
    this.editForm.patchValue({
      id: exam.id,
      examTitle: exam.examTitle,
      details: exam.details,
      requiredTime: exam.requiredTime,
      totalMark: exam.totalMark,
      maxTotalMark: exam.maxTotalMark,
      courseId: exam.courseId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const exam = this.createFromForm();
    if (exam.id !== undefined) {
      this.subscribeToSaveResponse(this.examService.update(exam));
    } else {
      this.subscribeToSaveResponse(this.examService.create(exam));
    }
  }

  private createFromForm(): IExam {
    return {
      ...new Exam(),
      id: this.editForm.get(['id']).value,
      examTitle: this.editForm.get(['examTitle']).value,
      details: this.editForm.get(['details']).value,
      requiredTime: this.editForm.get(['requiredTime']).value,
      totalMark: this.editForm.get(['totalMark']).value,
      maxTotalMark: this.editForm.get(['maxTotalMark']).value,
      courseId: this.editForm.get(['courseId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExam>>) {
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
}
