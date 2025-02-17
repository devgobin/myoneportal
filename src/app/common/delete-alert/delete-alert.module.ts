import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAlertComponent } from './delete-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    DeleteAlertComponent
  ],
  entryComponents: [
    DeleteAlertComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    DeleteAlertComponent
  ]
})
export class DeleteAlertModule { }
