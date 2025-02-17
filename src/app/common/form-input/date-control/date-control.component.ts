import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { ValueAccessorDateBase } from "./value-accessor-date-base";
import * as moment from "moment";
import { format, sub } from "date-fns";
@Component({
  selector: "app-date-control",
  templateUrl: "./date-control.component.html",
  styleUrls: ["./date-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateControlComponent,
      multi: true,
    },
  ],
})
export class DateControlComponent
  extends ValueAccessorDateBase<string>
  implements OnInit, AfterViewInit
{
  xvalue = {
    date: "",
    view: "",
  };
  minDateNow = "";
  maxDateNow = "";
  errorTrueNow = false;
  btnClickedNow = false;
  @Input() public label = "";
  @Input() public name = "";
  @Input() public placeholder = "eg. dd/mm/yyyy";
  @Input() public requiredtrue: string = "false";
  @Input() public errormsg = "";
  @Input() public mandatory = false;
  @Input() public readonly = false;
  @Input() public dob = false;
  public inputFormat = "DD-MM-YYYY HH:mm";
  public entryFormat = "DD/MM/YYYY";
  public returnFormat = "DD-MM-YYYY HH:mm";
  public seperator = "/";
  @Output("change") change: EventEmitter<any> = new EventEmitter();
  digitPattern: any = /[^\d/\s]+/g;
  datePattern: any = /^(?:[1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
  monthPattern: any =
    /^(?:[1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(?:[1-9]|0[1-9]|1[0-2])$/;
  yearPattern: any =
    /^(?:[1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(?:[1-9]|0[1-9]|1[0-2])\/(?:(?:19|20)[0-9]{2})$/;
  dateSinglePattern: any = /^(?:[1-9])\/$/;
  monthSinglePattern: any =
    /^(?:[1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(?:[1-9])\/$/;

  // Set Min Date
  @Input()
  set minDate(minDate: string) {
    this.minDateNow =
      moment(minDate, this.inputFormat).format("YYYY-MM-DD") || "";
  }
  get minDate() {
    return this.minDateNow;
  }

  // Set Max Date
  @Input()
  set maxDate(maxDate: string) {
    this.maxDateNow =
      moment(maxDate, this.inputFormat).format("YYYY-MM-DD") || "";
  }
  get maxDate() {
    return this.maxDateNow;
  }

  // Set errorTrue
  @Input()
  set errorTrue(errorTrue: boolean) {
    this.errorTrueNow = errorTrue || false;
  }
  get errorTrue() {
    return this.errorTrueNow;
  }

  // Set btnTrue
  @Input()
  set btnClicked(btnClicked: boolean) {
    this.btnClickedNow = btnClicked || false;
  }
  get btnClicked() {
    return this.btnClickedNow;
  }
  @ViewChild("inputbox", { static: false }) inputbox: ElementRef;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getValue().subscribe((xvalue) => {
      // console.log(this.value, this.xvalue);
      this.xvalue.date = moment(this.value, this.inputFormat).format(
        "YYYY-MM-DD"
      );
    });
  }

  ngAfterViewInit() {
    this.digitPattern = new RegExp("[^\\d" + this.seperator + "\\s]+", "g");
    const result = sub(new Date(), { years: 18 });
    result.setDate(result.getDate() - 1);
    setTimeout(() => {
      if (this.dob) {
        this.maxDateNow = format(result, "yyyy-MM-dd");
      }
    }, 500);
  }

  doFocus() {
    if (this.xvalue.date !== "") {
      const nowDate = moment(this.xvalue.date).format(this.entryFormat);
      // console.log(nowDate);
      if (nowDate !== "Invalid date") {
        this.inputbox.nativeElement.value = nowDate;
      }
    }
  }

  checkDate(event) {
    if (event.inputType === "deleteContentBackward") {
      return;
    }

    let xvalue = event.target.value.toString();
    let rvalue = xvalue.replace(this.digitPattern, "");

    if (rvalue.length > this.entryFormat.length) {
      rvalue = rvalue.substring(0, rvalue.length - 1);
    }
    // console.log(this.dateSinglePattern.test(rvalue));
    this.dateSinglePattern.test(rvalue) ? (rvalue = "0" + rvalue) : "";

    if (rvalue.length === 2 && !this.dateSinglePattern.test(rvalue)) {
      this.datePattern.test(rvalue)
        ? (rvalue = rvalue + this.seperator)
        : (rvalue = rvalue.substring(0, rvalue.length - 1));
    }

    if (rvalue.length === 4) {
      /^(?:[1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/\/$/.test(rvalue)
        ? (rvalue = rvalue.substring(0, rvalue.length - 1))
        : "";
    }
    if (this.monthSinglePattern.test(rvalue)) {
      rvalue = rvalue.slice(0, 3) + "0" + rvalue.slice(3);
    }
    if (rvalue.length === 5 && !this.monthSinglePattern.test(rvalue)) {
      this.monthPattern.test(rvalue)
        ? (rvalue = rvalue + this.seperator)
        : (rvalue = rvalue.substring(0, rvalue.length - 1));
    }
    if (rvalue.length === 7) {
      /^(?:[1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(?:[1-9]|0[1-9]|1[0-2])\/\/$/.test(
        rvalue
      )
        ? (rvalue = rvalue.substring(0, rvalue.length - 1))
        : "";
    }

    if (rvalue.length > 5) {
      // console.log(this.yearPattern.test(rvalue));
    }
    event.target.value = rvalue;
    this.dateSelected();
  }
  dateSelected() {
    //console.log(this.xvalue.date);
    const xdate = moment(this.xvalue.date).format(this.returnFormat);
    // console.log(this.xvalue.date, xdate);
    if (xdate === "Invalid date") {
      this.value = "";
    } else {
      this.value = xdate;
    }
  }
  doClear() {
    this.xvalue.date = "";
    this.value = "";
    // this.onClear
  }

  doChange(event: any) {
    this.change.emit(event);
  }
}
