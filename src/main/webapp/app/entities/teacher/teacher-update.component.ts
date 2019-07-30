import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITeacher, Teacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'jhi-teacher-update',
  templateUrl: './teacher-update.component.html'
})
export class TeacherUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    teacherFirstName: [],
    teacherLastName: [],
    gender: [],
    birthDate: []
  });

  constructor(protected teacherService: TeacherService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ teacher }) => {
      this.updateForm(teacher);
    });
  }

  updateForm(teacher: ITeacher) {
    this.editForm.patchValue({
      id: teacher.id,
      teacherFirstName: teacher.teacherFirstName,
      teacherLastName: teacher.teacherLastName,
      gender: teacher.gender,
      birthDate: teacher.birthDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const teacher = this.createFromForm();
    if (teacher.id !== undefined) {
      this.subscribeToSaveResponse(this.teacherService.update(teacher));
    } else {
      this.subscribeToSaveResponse(this.teacherService.create(teacher));
    }
  }

  private createFromForm(): ITeacher {
    return {
      ...new Teacher(),
      id: this.editForm.get(['id']).value,
      teacherFirstName: this.editForm.get(['teacherFirstName']).value,
      teacherLastName: this.editForm.get(['teacherLastName']).value,
      gender: this.editForm.get(['gender']).value,
      birthDate: this.editForm.get(['birthDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>) {
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
