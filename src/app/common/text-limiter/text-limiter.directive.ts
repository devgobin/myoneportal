import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";

@Directive({
  selector: "[ngModel][appTextLimiter]",
})
export class TextLimiterDirective {
  @Input("appTextLimiter") limiter = 0;

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  value: any;
  private specialKeys = [
    "Tab",
    "End",
    "Home",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Delete",
    "Backspace",
  ];
  @HostListener("keydown", ["$event"]) onInputChange(event: any) {
    // console.log(event.key);
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    // event.preventDefault();
    this.value = event.target.value;
    if (this.value.length >= this.limiter && this.limiter > 0) {
      event.preventDefault();
    }
    // console.log(this.value);
    // // this.ngModelChange.emit(this.value);
    // console.log(event);
  }
}
