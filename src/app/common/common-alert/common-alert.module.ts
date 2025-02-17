import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonAlertComponent } from './common-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CommonAlertComponent
  ],
  entryComponents: [
    CommonAlertComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    CommonAlertComponent
  ]
})
export class CommonAlertModule { }
