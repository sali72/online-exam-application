import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'teacher',
        loadChildren: './teacher/teacher.module#OnlineExamApplicationTeacherModule'
      },
      {
        path: 'course',
        loadChildren: './course/course.module#OnlineExamApplicationCourseModule'
      },
      {
        path: 'student',
        loadChildren: './student/student.module#OnlineExamApplicationStudentModule'
      },
      {
        path: 'exam',
        loadChildren: './exam/exam.module#OnlineExamApplicationExamModule'
      },
      {
        path: 'question',
        loadChildren: './question/question.module#OnlineExamApplicationQuestionModule'
      },
      {
        path: 'question-bank',
        loadChildren: './question-bank/question-bank.module#OnlineExamApplicationQuestionBankModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineExamApplicationEntityModule {}
