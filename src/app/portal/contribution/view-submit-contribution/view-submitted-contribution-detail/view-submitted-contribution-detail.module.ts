import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSubmittedContributionDetailComponent } from './view-submitted-contribution-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/common/share/share.module';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { EditContributionScheduleComponent } from './edit-contribution-schedule/edit-contribution-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ViewSubmittedContributionDetailComponent
  }
];

@NgModule({
  declarations: [ViewSubmittedContributionDetailComponent, EditContributionScheduleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class ViewSubmittedContributionDetailModule { }
