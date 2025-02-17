import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsAdjustmentDetailComponent } from './cs-adjustment-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';
import { CsAdjustmentDetailNewModule } from '../cs-adjustment-detail-new/cs-adjustment-detail-new.module';

const routes: Routes = [
  {
    path: '',
    component: CsAdjustmentDetailComponent
  }
];


@NgModule({
  declarations: [CsAdjustmentDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,CsAdjustmentDetailNewModule
  ]
})
export class CsAdjustmentDetailModule { }
