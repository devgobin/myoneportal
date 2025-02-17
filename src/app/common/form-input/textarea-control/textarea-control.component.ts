import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { InputControlComponent } from "../input-control/input-control.component";
import { ValueAccessorBase } from "../value-accessor-base";

@Component({
  selector: "app-textarea-control",
  templateUrl: "./textarea-control.component.html",
  styleUrls: ["./textarea-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaControlComponent,
      multi: true,
    },
  ],
})
export class TextareaControlComponent
  extends ValueAccessorBase<string>
  implements OnInit {
  @Input() public label: string;
  @Input() public helptext: string;
  @Input() public class: string;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public mandatory = false;
  @Input() public icononly = "false";
  @Input() public editOption = "false";
  @Input() public counter = false;
  @Input() public limter = 0;

  // tslint:disable-next-line: no-output-rename
  @Output("onblur") onblur: EventEmitter<any> = new EventEmitter();
  @Output("onenter") onenter: EventEmitter<any> = new EventEmitter();
  @Output() onedit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("inputbox", { static: false }) inputbox: ElementRef;
  @ViewChild("selectInput") selectInput: ElementRef;
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
    this.selectInput.nativeElement.focus();
  }
  edit() {
    this.onedit.emit();
  }
}
