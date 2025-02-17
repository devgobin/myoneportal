import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/common/share/share.module';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { DefaultLandingPageComponent } from './default-landing-page/default-landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailComponent
  }
];

@NgModule({
  declarations: [ProfileDetailComponent, DefaultLandingPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class ProfileDetailModule { }
