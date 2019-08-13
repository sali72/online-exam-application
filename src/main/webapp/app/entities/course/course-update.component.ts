import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICourse, Course } from 'app/shared/model/course.model';
import { CourseService } from './course.service';
import { IQuestionBank } from 'app/shared/model/question-bank.model';
import { QuestionBankService } from 'app/entities/question-bank';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/entities/teacher';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';

@Component({
  selector: 'jhi-course-update',
  templateUrl: './course-update.component.html'
})
export class CourseUpdateComponent implements OnInit {
  isSaving: boolean;

  questionbanks: IQuestionBank[];

  teachers: ITeacher[];

  students: IStudent[];

  editForm = this.fb.group({
    id: [],
    courseTitle: [],
    startDate: [],
    endDate: [],
    questionBankId: [],
    teacherId: [],
    students: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected courseService: CourseService,
    protected questionBankService: QuestionBankService,
    protected teacherService: TeacherService,
    protected studentService: StudentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ course }) => {
      this.updateForm(course);
    });
    this.questionBankService
      .query({ filter: 'course-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IQuestionBank[]>) => mayBeOk.ok),
        map((response: HttpResponse<IQuestionBank[]>) => response.body)
      )
      .subscribe(
        (res: IQuestionBank[]) => {
          if (!this.editForm.get('questionBankId').value) {
            this.questionbanks = res;
          } else {
            this.questionBankService
              .find(this.editForm.get('questionBankId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IQuestionBank>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IQuestionBank>) => subResponse.body)
              )
              .subscribe(
                (subRes: IQuestionBank) => (this.questionbanks = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.teacherService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITeacher[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITeacher[]>) => response.body)
      )
      .subscribe((res: ITeacher[]) => (this.teachers = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.studentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStudent[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStudent[]>) => response.body)
      )
      .subscribe((res: IStudent[]) => (this.students = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(course: ICourse) {
    this.editForm.patchValue({
      id: course.id,
      courseTitle: course.courseTitle,
      startDate: course.startDate,
      endDate: course.endDate,
      questionBankId: course.questionBankId,
      teacherId: course.teacherId,
      students: course.students
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const course = this.createFromForm();
    if (course.id !== undefined) {
      this.subscribeToSaveResponse(this.courseService.update(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.create(course));
    }
  }

  private createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.editForm.get(['id']).value,
      courseTitle: this.editForm.get(['courseTitle']).value,
      startDate: this.editForm.get(['startDate']).value,
      endDate: this.editForm.get(['endDate']).value,
      questionBankId: this.editForm.get(['questionBankId']).value,
      teacherId: this.editForm.get(['teacherId']).value,
      students: this.editForm.get(['students']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>) {
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

  trackQuestionBankById(index: number, item: IQuestionBank) {
    return item.id;
  }

  trackTeacherById(index: number, item: ITeacher) {
    return item.id;
  }

  trackStudentById(index: number, item: IStudent) {
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
