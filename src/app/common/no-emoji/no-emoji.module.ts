import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoEmojiDirective } from './no-emoji.directive';



@NgModule({
  declarations: [NoEmojiDirective],
  imports: [
    CommonModule
  ],
  exports: [
    NoEmojiDirective
  ]
})
export class NoEmojiModule { }
