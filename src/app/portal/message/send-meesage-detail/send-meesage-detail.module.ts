import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMeesageDetailComponent } from './send-meesage-detail.component';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';


@NgModule({
  declarations: [SendMeesageDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ShareModule,
    FormInputModule],
  exports: [SendMeesageDetailComponent],
})
export class SendMeesageDetailModule { }
