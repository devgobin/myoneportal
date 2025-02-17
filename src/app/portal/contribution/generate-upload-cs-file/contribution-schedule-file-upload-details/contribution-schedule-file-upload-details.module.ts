import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributionScheduleFileUploadDetailsComponent } from './contribution-schedule-file-upload-details.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/common/share/share.module';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { CsDetailsPopComponent } from './cs-details-pop/cs-details-pop.component';

const routes: Routes = [
  {
    path: '',
    component: ContributionScheduleFileUploadDetailsComponent
  }
];

@NgModule({
  declarations: [ContributionScheduleFileUploadDetailsComponent, CsDetailsPopComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class ContributionScheduleFileUploadDetailsModule { }
