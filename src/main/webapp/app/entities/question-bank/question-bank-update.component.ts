import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQuestionBank, QuestionBank } from 'app/shared/model/question-bank.model';
import { QuestionBankService } from './question-bank.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';

@Component({
  selector: 'jhi-question-bank-update',
  templateUrl: './question-bank-update.component.html'
})
export class QuestionBankUpdateComponent implements OnInit {
  isSaving: boolean;

  courses: ICourse[];

  editForm = this.fb.group({
    id: [],
    title: [],
    courseId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected questionBankService: QuestionBankService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ questionBank }) => {
      this.updateForm(questionBank);
    });
    this.courseService
      .query({ filter: 'questionbank-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICourse[]>) => response.body)
      )
      .subscribe(
        (res: ICourse[]) => {
          if (!this.editForm.get('courseId').value) {
            this.courses = res;
          } else {
            this.courseService
              .find(this.editForm.get('courseId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ICourse>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ICourse>) => subResponse.body)
              )
              .subscribe(
                (subRes: ICourse) => (this.courses = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(questionBank: IQuestionBank) {
    this.editForm.patchValue({
      id: questionBank.id,
      title: questionBank.title,
      courseId: questionBank.courseId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const questionBank = this.createFromForm();
    if (questionBank.id !== undefined) {
      this.subscribeToSaveResponse(this.questionBankService.update(questionBank));
    } else {
      this.subscribeToSaveResponse(this.questionBankService.create(questionBank));
    }
  }

  private createFromForm(): IQuestionBank {
    return {
      ...new QuestionBank(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      courseId: this.editForm.get(['courseId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestionBank>>) {
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
