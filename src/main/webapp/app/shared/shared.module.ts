import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnlineExamApplicationSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [OnlineExamApplicationSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [OnlineExamApplicationSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineExamApplicationSharedModule {
  static forRoot() {
    return {
      ngModule: OnlineExamApplicationSharedModule
    };
  }
}
