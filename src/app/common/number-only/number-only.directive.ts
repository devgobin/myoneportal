import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";

@Directive({
  selector: "[appNumberOnly]",
})
export class NumberOnlyDirective implements AfterViewInit {
  // // tslint:disable-next-line: no-input-rename
  // @Input('decimals') decimals: any = 0;
  // // tslint:disable-next-line: no-input-rename
  // @Input('limits') limits: any = -1;
  // // tslint:disable-next-line: no-input-rename
  // @Input('next') xnext: any = '';
  // // tslint:disable-next-line: no-input-rename
  // @Input('prev') xprev: any = '';

  // // tslint:disable-next-line: no-input-rename
  // @Input('min') xmin: any = '-1';
  // // tslint:disable-next-line: no-input-rename
  // @Input('max') xmax: any = '-1';

  // constructor(
  //   private el: ElementRef
  // ) { }

  // private specialKeys = [
  //   'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'
  // ];
  // private check(value: string, decimals: any) {
  //   // console.log(value.length);
  //   if (decimals <= 0) {
  //     return String(value).match(new RegExp(/^\d+$/));
  //   } else {
  //     const regExpString = '^\\s*((\\d+(\\.\\d{0,' + decimals + '})?)|((\\d*(\\.\\d{1,' + decimals + '}))))\\s*$';
  //     return String(value).match(new RegExp(regExpString));
  //   }
  // }
  // private checkLimit(value: string) {
  //   // console.log(value);
  //   // console.log(this.limits > 0);
  //   if (this.limits > 0) {
  //     if (value.length <= parseFloat(this.limits)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // }
  // private minmax(value: string) {

  //   // console.log(this.limits > 0);
  //   if (this.xmin !== '-1' && this.xmax !== '-1') {
  //     if (parseFloat(value) >= parseFloat(this.xmin) && parseFloat(value) <= parseFloat(this.xmax)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else if (this.xmin !== '-1' && this.xmax === '-1') {
  //     if (parseFloat(value) >= parseFloat(this.xmin)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else if (this.xmin === '-1' && this.xmax !== '-1') {
  //     if (parseFloat(value) <= parseFloat(this.xmax)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  //   // if (this.limits > 0) {
  //   //   if (value.length <= parseFloat(this.limits)) {
  //   //     return true;
  //   //   } else {
  //   //     return false;
  //   //   }
  //   // } else {
  //   //   return true;
  //   // }
  // }

  // @HostListener('keydown', ['$event']) onInputChange(event) {
  //   if (this.specialKeys.indexOf(event.key) !== -1) {
  //     return;
  //   }
  //   const current: string = this.el.nativeElement.value;
  //   if (event.key === 'Backspace') {
  //     if (current === '') {
  //       const prevelement = document.getElementById(this.xprev);
  //       // console.log(prevelement);
  //       if (prevelement) {
  //         prevelement.focus();
  //       }
  //       return;
  //     } else {
  //       return;
  //     }
  //   }
  //   // console.log(current);
  //   const position = this.el.nativeElement.selectionStart;
  //   // const next: string = current.concat(event.key);
  //   let next: string;

  //   next = [current.slice(0, position), event.key === 'Decimal' ? '.' : event.key, current.slice(position)].join('');
  //   // console.log(next);
  //   if (!this.checkLimit(next)) {
  //     event.preventDefault();
  //     return;
  //   }
  //   // console.log(this.minmax(next));
  //   if (!this.minmax(next)) {
  //     event.preventDefault();
  //     return;
  //   }

  //   // console.log(event.key, next, this.el.nativeElement.value);
  //   if (this.el.nativeElement.value === '' && this.decimals > 0 && next === '.') {
  //     this.el.nativeElement.value = '0.';
  //     // console.log(event.key, next, this.el.nativeElement.value);
  //   }
  //   if (next && !this.check(next, this.decimals)) {
  //     event.preventDefault();
  //   }
  //   // console.log(next.length, this.limits);
  //   if (next.length === parseFloat(this.limits)) {
  //     if (this.check(next, this.decimals)) {
  //       setTimeout(() => {
  //         if (this.xnext !== '') {
  //           const element = document.getElementById(this.xnext);
  //           // console.log(element);
  //           if (element == null) {
  //             return;
  //           } else {
  //             element.focus();
  //           }
  //         }

  //       }, 100);
  //     }
  //   }

  //   // const initalValue = this.el.nativeElement.value;

  //   // // this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
  //   // this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
  //   // if (initalValue !== this.el.nativeElement.value) {
  //   //   event.stopPropagation();
  //   // }
  // }

  @Input("decimal") decimal: any = 0;
  @Input("limit") limit: any = -1;
  @Input("min") min: any = -1;
  @Input("max") max: any = -1;
  regex = /[^\d,.]+/g;

  value: any = "";
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    console.log(this.decimal);
    if (this.decimal === 0) {
      this.regex = /[^\d]+/g;
    }
  }

  @HostListener("input", ["$event"]) onInputChange($event) {
    // console.log(this.decimal);
    let xvalue = $event.target.value.toString();
    xvalue = xvalue.replace(",", "");
    let rvalue = xvalue.replace(this.regex, "");

    // On Limit Set
    if (this.limit > 0) {
      rvalue.length > this.limit
        ? (rvalue = rvalue.substring(0, this.limit))
        : "";
    }

    // decimal set
    if (this.decimal > 0) {
      const arr = rvalue.split(".");
      let dvalue = "";
      if (arr.length > 1) {
        let afterDecimal = arr[1].substring(0, this.decimal);
        dvalue = dvalue + arr[0] + "." + afterDecimal;
      }
      if (dvalue !== "") {
        rvalue = dvalue;
      }
    }

    // max number check
    if (this.max > 0) {
      // console.log(rvalue);
      parseFloat(rvalue) > this.max
        ? (rvalue = rvalue.substring(0, rvalue.length - 1))
        : "";
    }

    $event.target.value = rvalue;
    this.ngModelChange.emit(rvalue);
  }
}
