import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSelectOrganizationComponent } from './login-select-organization.component';
import { Routes, RouterModule } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';
// import { LoginTwoFactorComponent } from '../login-two-factor/login-two-factor.component';

const routes: Routes = [
  {
    path: '',
    component: LoginSelectOrganizationComponent,
  },
];

@NgModule({
  declarations: [LoginSelectOrganizationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
  ],
})
export class LoginSelectOrganizationModule {}
