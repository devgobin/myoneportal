import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appLowerCase]'
})
export class LowerCaseDirective {

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event) {
    // console.log($event);
    this.value = $event.target.value.toLowerCase();
    this.ngModelChange.emit(this.value);
  }

}
