import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePaymentPlanScheduleComponent } from './time-payment-plan-schedule.component';
import { Routes, RouterModule } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';
import { TimePaymentPlanScheduleNewModule } from '../time-payment-plan-schedule-new/time-payment-plan-schedule-new.module';

const routes: Routes = [
  {
    path: '',
    component: TimePaymentPlanScheduleComponent
  }
];

@NgModule({
  declarations: [TimePaymentPlanScheduleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
    TimePaymentPlanScheduleNewModule
  ]
})
export class TimePaymentPlanScheduleModule { }
