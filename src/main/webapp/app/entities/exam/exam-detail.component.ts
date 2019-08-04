import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExam } from 'app/shared/model/exam.model';

@Component({
  selector: 'jhi-exam-detail',
  templateUrl: './exam-detail.component.html'
})
export class ExamDetailComponent implements OnInit {
  exam: IExam;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ exam }) => {
      this.exam = exam;
    });
  }

  previousState() {
    window.history.back();
  }
}
