import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ShareModule } from '../../common/share/share.module';
import { Routes, RouterModule } from '@angular/router';
import { FormInputModule } from '../../common/form-input/form-input.module';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
    ChartsModule
  ]
})
export class DashboardModule { }
