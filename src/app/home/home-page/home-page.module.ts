import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from 'src/app/common/share/share.module';
import { LoginComponent } from './login/login.component';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { LoginErrorComponent } from './login/login-error/login-error.component';

const routes: Routes = [
  {
    path:'',
    component: HomePageComponent
  }
];

@NgModule({
  declarations: [HomePageComponent, LoginComponent, LoginErrorComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class HomePageModule { }
