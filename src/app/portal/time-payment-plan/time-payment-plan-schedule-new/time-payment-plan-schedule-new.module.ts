import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePaymentPlanScheduleNewComponent } from './time-payment-plan-schedule-new.component';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';

@NgModule({
  declarations: [TimePaymentPlanScheduleNewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ShareModule,
    FormInputModule],
  exports: [TimePaymentPlanScheduleNewComponent],
})
export class TimePaymentPlanScheduleNewModule { }
