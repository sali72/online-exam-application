import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IQuestionBank, QuestionBank } from 'app/shared/model/question-bank.model';
import { QuestionBankService } from './question-bank.service';

@Component({
  selector: 'jhi-question-bank-update',
  templateUrl: './question-bank-update.component.html'
})
export class QuestionBankUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected questionBankService: QuestionBankService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ questionBank }) => {
      this.updateForm(questionBank);
    });
  }

  updateForm(questionBank: IQuestionBank) {
    this.editForm.patchValue({
      id: questionBank.id
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
      id: this.editForm.get(['id']).value
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
}
