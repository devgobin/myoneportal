import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageSearchComponent } from './message-search.component';
import { Routes, RouterModule } from '@angular/router';
import { FormInputModule } from 'src/app/common/form-input/form-input.module';
import { ShareModule } from 'src/app/common/share/share.module';
import { SendMeesageDetailModule } from '../send-meesage-detail/send-meesage-detail.module';
import { RecievedMessageDetailModule } from '../recieved-message-detail/recieved-message-detail.module';

const routes: Routes = [
  {
    path: '',
    component: MessageSearchComponent
  }
  ];

@NgModule({
  declarations: [MessageSearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ShareModule,
    FormInputModule,
    SendMeesageDetailModule,
    RecievedMessageDetailModule,
  ]
})
export class MessageSearchModule { }
