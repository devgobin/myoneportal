import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsDetailComponent } from './appointments-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';
import { CsAdjustmentDetailNewModule } from '../../cs-adjustment/cs-adjustment-detail-new/cs-adjustment-detail-new.module';
import { TextLimiterModule } from 'src/app/common/text-limiter/text-limiter.module';
import { NumberOnlyModule } from 'src/app/common/number-only/number-only.module';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsDetailComponent
  }
];

@NgModule({
  declarations: [AppointmentsDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,CsAdjustmentDetailNewModule,TextLimiterModule,NumberOnlyModule
  ]
})
export class AppointmentsDetailModule { }
