import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberOnlyDirective } from './number-only.directive';
import { PinNumberOnlyDirective } from './pin-number-only.directive';



@NgModule({
  declarations: [NumberOnlyDirective, PinNumberOnlyDirective],
  imports: [
    CommonModule
  ],
  exports: [NumberOnlyDirective, PinNumberOnlyDirective]
})
export class NumberOnlyModule { }
