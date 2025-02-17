import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateControlComponent } from './date-control.component';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { NativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [DateControlComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    NativeDateModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  exports: [
    DateControlComponent,
    MatDatepickerModule,
  ]
})
export class DateFormatModule { }
