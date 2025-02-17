import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LowerCaseDirective } from './lower-case.directive';
import { UpperCaseDirective } from './upper-case.directive';

@NgModule({
  declarations: [LowerCaseDirective, UpperCaseDirective],
  imports: [
    CommonModule
  ],
  exports: [
    LowerCaseDirective,
    UpperCaseDirective
  ]
})
export class LowerCaseModule { }
