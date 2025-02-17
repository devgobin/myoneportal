import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetMobileNumberComponent } from './reset-mobile-number.component';
import { FormInputModule } from '../../../common/form-input/form-input.module';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../../common/share/share.module';

const routes: Routes = [
  {
    path: '',
    component: ResetMobileNumberComponent
  }
];

@NgModule({
  declarations: [ResetMobileNumberComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class ResetMobileNumberModule { }
