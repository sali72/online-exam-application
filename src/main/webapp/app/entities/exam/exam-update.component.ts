import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IExam, Exam } from 'app/shared/model/exam.model';
import { ExamService } from './exam.service';

@Component({
  selector: 'jhi-exam-update',
  templateUrl: './exam-update.component.html'
})
export class ExamUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    examTitle: [],
    details: [],
    requiredTime: [],
    totalMark: [],
    maxTotalMark: []
  });

  constructor(protected examService: ExamService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ exam }) => {
      this.updateForm(exam);
    });
  }

  updateForm(exam: IExam) {
    this.editForm.patchValue({
      id: exam.id,
      examTitle: exam.examTitle,
      details: exam.details,
      requiredTime: exam.requiredTime,
      totalMark: exam.totalMark,
      maxTotalMark: exam.maxTotalMark
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
      maxTotalMark: this.editForm.get(['maxTotalMark']).value
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
}
