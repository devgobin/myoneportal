
import { SuccessAlertComponent } from './success-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    SuccessAlertComponent
  ],
  entryComponents: [
    SuccessAlertComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    SuccessAlertComponent
  ]
})
export class SuccessAlertModule { }
