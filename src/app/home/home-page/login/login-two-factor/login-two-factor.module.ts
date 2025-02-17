import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';
import { LoginTwoFactorComponent } from './login-two-factor.component';

const routes: Routes = [
  {
    path:'',
    component: LoginTwoFactorComponent
  }
];

@NgModule({
  declarations: [LoginTwoFactorComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class LoginTwoFactorModule { }
