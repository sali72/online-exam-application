import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IQuestion, Question } from 'app/shared/model/question.model';
import { QuestionService } from './question.service';
import { IExam } from 'app/shared/model/exam.model';
import { ExamService } from 'app/entities/exam';
import { IQuestionBank } from 'app/shared/model/question-bank.model';
import { QuestionBankService } from 'app/entities/question-bank';

@Component({
  selector: 'jhi-question-update',
  templateUrl: './question-update.component.html'
})
export class QuestionUpdateComponent implements OnInit {
  isSaving: boolean;

  exams: IExam[];

  questionbanks: IQuestionBank[];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    examId: [],
    questionBankId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected questionService: QuestionService,
    protected examService: ExamService,
    protected questionBankService: QuestionBankService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ question }) => {
      this.updateForm(question);
    });
    this.examService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IExam[]>) => mayBeOk.ok),
        map((response: HttpResponse<IExam[]>) => response.body)
      )
      .subscribe((res: IExam[]) => (this.exams = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.questionBankService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IQuestionBank[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuestionBank[]>) => response.body)
      )
      .subscribe((res: IQuestionBank[]) => (this.questionbanks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(question: IQuestion) {
    this.editForm.patchValue({
      id: question.id,
      title: question.title,
      description: question.description,
      examId: question.examId,
      questionBankId: question.questionBankId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const question = this.createFromForm();
    if (question.id !== undefined) {
      this.subscribeToSaveResponse(this.questionService.update(question));
    } else {
      this.subscribeToSaveResponse(this.questionService.create(question));
    }
  }

  private createFromForm(): IQuestion {
    return {
      ...new Question(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      description: this.editForm.get(['description']).value,
      examId: this.editForm.get(['examId']).value,
      questionBankId: this.editForm.get(['questionBankId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestion>>) {
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

  trackExamById(index: number, item: IExam) {
    return item.id;
  }

  trackQuestionBankById(index: number, item: IQuestionBank) {
    return item.id;
  }
}
