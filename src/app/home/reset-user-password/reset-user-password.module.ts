import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetUserPasswordComponent } from './reset-user-password.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from '../../common/share/share.module';
import { FormInputModule } from '../../common/form-input/form-input.module';

const routes: Routes = [
  {
    path: '',
    component: ResetUserPasswordComponent
  }
];

@NgModule({
  declarations: [ResetUserPasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class ResetUserPasswordModule { }
