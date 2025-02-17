import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncompleteCsSubmissionComponent } from './incomplete-cs-submission.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/common/share/share.module';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';

const routes: Routes = [
  {
    path: '',
    component: IncompleteCsSubmissionComponent
  }
];

@NgModule({
  declarations: [IncompleteCsSubmissionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule
  ]
})
export class IncompleteCsSubmissionModule { }
