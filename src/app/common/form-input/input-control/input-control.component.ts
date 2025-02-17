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
import { ValueAccessorBase } from "../value-accessor-base";

@Component({
  selector: "app-input-control",
  templateUrl: "./input-control.component.html",
  styleUrls: ["./input-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputControlComponent,
      multi: true,
    },
  ],
})
export class InputControlComponent
  extends ValueAccessorBase<string>
  implements OnInit
{
  @Input() public label: string;
  @Input() public helptext: string;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public icononly = "false";
  @Input() public search = "false";
  @Input() public mandatory = false;
  @Input() public upperCase = false;
  @Input() public noEmoji = true;
  @Input() public emojiType = "emoji";
  // tslint:disable-next-line: no-output-rename
  @Output("onblur") onblur: EventEmitter<any> = new EventEmitter();
  @Output("onenter") onenter: EventEmitter<any> = new EventEmitter();
  @Output("onClear") onClear: EventEmitter<any> = new EventEmitter();
  @Output("onChange") onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild("inputbox", { static: false }) inputbox: ElementRef;
  @ViewChild("selectInput") selectInput: ElementRef;
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

  onSearch() {
    this.onsearchevent.emit();
  }

  doClear() {
    this.value = "";
    this.onClear.emit();
  }
  doChange(event: any) {
    this.onChange.next(event);
  }
}
