import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionAlertComponent } from './session-alert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    SessionAlertComponent
  ],
  entryComponents: [
    SessionAlertComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    SessionAlertComponent,
    MatDialogModule,
  ]
})
export class SessionAlertModule { }
