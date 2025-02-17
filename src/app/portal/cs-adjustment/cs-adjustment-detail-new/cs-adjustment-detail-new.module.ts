import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsAdjustmentDetailNewComponent } from './cs-adjustment-detail-new.component';
import { ShareModule } from 'src/app/common/share/share.module';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';



@NgModule({
  declarations: [CsAdjustmentDetailNewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ShareModule,
    FormInputModule],
  exports: [CsAdjustmentDetailNewComponent],
})
export class CsAdjustmentDetailNewModule { }
