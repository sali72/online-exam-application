import { NgModule } from '@angular/core';

import { OnlineExamApplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [OnlineExamApplicationSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [OnlineExamApplicationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class OnlineExamApplicationSharedCommonModule {}
