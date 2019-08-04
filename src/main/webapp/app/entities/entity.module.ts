import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.OnlineExamApplicationRoleModule)
      },
      {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then(m => m.OnlineExamApplicationTeacherModule)
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.OnlineExamApplicationCourseModule)
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.OnlineExamApplicationStudentModule)
      },
      {
        path: 'exam',
        loadChildren: () => import('./exam/exam.module').then(m => m.OnlineExamApplicationExamModule)
      },
      {
        path: 'question',
        loadChildren: () => import('./question/question.module').then(m => m.OnlineExamApplicationQuestionModule)
      },
      {
        path: 'question-bank',
        loadChildren: () => import('./question-bank/question-bank.module').then(m => m.OnlineExamApplicationQuestionBankModule)
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
