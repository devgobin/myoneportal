import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecievedMessageDetailComponent } from './recieved-message-detail.component';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';



@NgModule({
  declarations: [RecievedMessageDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ShareModule,
    FormInputModule],
  exports: [RecievedMessageDetailComponent],

})
export class RecievedMessageDetailModule { }
