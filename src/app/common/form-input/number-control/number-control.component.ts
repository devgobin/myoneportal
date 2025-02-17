import {
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { ValueAccessorBase } from "../value-accessor-base";

@Component({
  selector: "app-number-control",
  templateUrl: "./number-control.component.html",
  styleUrls: ["./number-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumberControlComponent,
      multi: true,
    },
  ],
})
export class NumberControlComponent
  extends ValueAccessorBase<string>
  implements OnInit
{
  // @Input() public label: string = "";
  @Input() public label: string;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public mandatory = false;
  @Input() public icononly = "false";
  @Input() public search = "false";
  @Input() public limit = -1;
  @Input() public decimal = 0;
  @Input() public max = -1;
  @Input() public min = -1;
  @Input() public isZeroOnEmpty = false;

  // tslint:disable-next-line: no-output-rename
  @Output("onblur") onblur: EventEmitter<any> = new EventEmitter();
  @Output("onenter") onenter: EventEmitter<any> = new EventEmitter();
  @Output("onclear") onclear: EventEmitter<any> = new EventEmitter();
  @ViewChild("inputbox", { static: false }) inputbox: ElementRef;
  @Output() onsearchevent: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line: variable-name
  errorTrueNow = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this.errorTrueNow = errorTrue || false;
  }
  get errorTrue() {
    return this.errorTrueNow;
  }
  constructor() {
    super();
  }
  btnClickedNow = false;
  @Input()
  set btnClicked(btnClicked: boolean) {
    this.btnClickedNow = btnClicked || false;
  }
  get btnClicked() {
    return this.btnClickedNow;
  }

  errorTextNow = "";
  @Input()
  set errorText(errorText: string) {
    this.errorTextNow = errorText || "";
  }
  get errorText() {
    return this.errorTextNow;
  }
  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  blured() {
    if (this.isZeroOnEmpty) {
      if (this.value === "") {
        let mValue = 0;
        this.value = mValue.toFixed(this.decimal);
      }
    }
    this.onblur.next();
  }

  // tslint:disable-next-line: typedef
  setFocus() {
    this.inputbox.nativeElement.focus();
    this.inputbox.nativeElement.select();
  }

  checkenter(event) {
    if (event.key === "Enter") {
      this.onenter.next();
    }
  }

  onFocus() {
    this.inputbox.nativeElement.focus();
  }
  doClear() {
    this.value = "";
    this.onclear.next();
  }
  onSearch() {
    this.onsearchevent.emit();
  }
  // checkValue(){
  //   this.inputbox.nativeElement.value = this.inputbox.nativeElement.value.replace(/[^\d,.]+/g,'');
  //   if(this.limit > 1){

  //   }
  //   this.value = this.inputbox.nativeElement.value;
  // }
}
