import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarComponent } from './snackbar.component';


@NgModule({
  declarations: [
    SnackbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  exports: [
    SnackbarComponent
  ]
})
export class SnackbarModule { }
