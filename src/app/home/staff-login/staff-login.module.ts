import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/common/share/share.module';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { StaffLoginComponent } from './staff-login.component';

const routes: Routes = [
  {
    path: '',
    component: StaffLoginComponent
  }
];

@NgModule({
  declarations: [StaffLoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class StaffLoginModule { }
