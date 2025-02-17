import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ngModel][appNoEmoji]'
})
export class NoEmojiDirective {
  @Input("emojiType") emojiType: any = 'emoji';
  orginalRegex = /[^\w.,\s]/g;
  regex = /[^\w.,@!#$%^&*)(-_=+;:\s]/g;
  regexForName = /[^\w.,@!#$%^&*)(-_=+;:'\s]/g;
  regexForPassword = /[^\w.,@!#$%^&*)(-_='"|~+;:\s]/g;

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;

  @HostListener('input', ['$event']) onInputChange($event) {
    if (this.emojiType === 'password') {
      this.value = $event.target.value.replace(this.regexForPassword, '');
    } else if (this.emojiType === 'name') {
      this.value = $event.target.value.replace(this.regexForName, '');
    } else {
      this.value = $event.target.value.replace(this.regex, '');
    }
    $event.target.value = this.value;
    this.ngModelChange.emit(this.value);
  }
}