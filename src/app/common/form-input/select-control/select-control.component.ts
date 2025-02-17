import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { ValueAccessorBase } from "../value-accessor-base";

@Component({
  selector: "app-select-control",
  templateUrl: "./select-control.component.html",
  styleUrls: ["./select-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectControlComponent,
      multi: true,
    },
  ],
})
export class SelectControlComponent
  extends ValueAccessorBase<string>
  implements OnInit
{
  @Input() public label: string = "";
  @Input() public items = [];
  @Input() public key: string = "";
  @Input() public keyname: string = "";
  @Input() public placeholderLabel: string = "";
  @Input() public search: boolean = false;
  @Input() public mandatory = false;
  @Input() public valuetype = "string";
  errorTrueNow = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this.errorTrueNow = errorTrue || false;
  }
  get errorTrue() {
    return this.errorTrueNow;
  }

  btnClickedNow = false;
  @Input()
  set btnClicked(btnClicked: boolean) {
    this.btnClickedNow = btnClicked || false;
  }
  get btnClicked() {
    return this.btnClickedNow;
  }

  searchItem = "";

  @Output("onChanges") onChanges: EventEmitter<any> = new EventEmitter();
  constructor() {
    super();
  }

  ngOnInit(): void {}

  doChange() {
    this.onChanges.next();
  }
}
