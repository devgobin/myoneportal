import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrativeLoginComponent } from './administrative-login.component';
import { ShareModule } from 'src/app/common/share/share.module';
import { RouterModule, Routes } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';

const routes: Routes = [
  {
    path: '',
    component: AdministrativeLoginComponent
  }
];

@NgModule({
  declarations: [AdministrativeLoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class AdministrativeLoginModule { }
