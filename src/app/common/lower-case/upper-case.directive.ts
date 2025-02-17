import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appUpperCase]'
})
export class UpperCaseDirective {
@Input() appUpperCase = false;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event) {
    console.log(this.appUpperCase);
    if(this.appUpperCase){
      let ss = $event.target.selectionStart;
      let se = $event.target.selectionEnd;
      this.value = $event.target.value.toUpperCase();
      $event.target.value = $event.target.value.toUpperCase();
      $event.target.selectionStart = ss;
      $event.target.selectionEnd = se;
      this.ngModelChange.emit(this.value);
    }
  }

}
