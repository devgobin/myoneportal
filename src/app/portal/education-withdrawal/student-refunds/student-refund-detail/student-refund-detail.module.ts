import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRefundDetailComponent } from './student-refund-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';
const routes: Routes = [
  {
    path: '',
    component: StudentRefundDetailComponent
  }
];



@NgModule({
  declarations: [StudentRefundDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class StudentRefundDetailModule { }
