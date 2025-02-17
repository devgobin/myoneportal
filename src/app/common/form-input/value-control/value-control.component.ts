import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TotalControlService } from "../total-control/total-control.service";
import { ValueAccessorBase } from "../value-accessor-base";

@Component({
  selector: "app-value-control",
  templateUrl: "./value-control.component.html",
  styleUrls: ["./value-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ValueControlComponent,
      multi: true,
    },
  ],
})
export class ValueControlComponent
  extends ValueAccessorBase<string>
  implements OnInit
{
  xValue = "";
  totalAmountNow = "";

  @Input()
  set totalAmount(totalAmount: string) {
    this.totalAmountNow = totalAmount || "0";
    this.calculateValue();
  }
  get totalAmount() {
    return this.totalAmountNow;
  }

  amountToPayNow = "";
  @Input()
  set amountToPay(amountToPay: string) {
    this.amountToPayNow = amountToPay || "0";
    this.calculateValue();
  }
  get amountToPay() {
    return this.amountToPayNow;
  }

  constructor(
    public totalService: TotalControlService,
    public cdf: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {}

  calculateValue() {
    setTimeout(() => {
      if (isNaN(parseFloat(this.totalAmountNow))) {
        this.totalAmountNow = "0";
      }
      if (isNaN(parseFloat(this.amountToPayNow))) {
        this.amountToPayNow = "0";
      }
      let xValue =
        parseFloat(this.totalAmountNow) - parseFloat(this.amountToPayNow);
      if (isNaN(xValue)) {
        this.xValue = "0.00";
        this.value = "0.00";
      } else {
        this.xValue = xValue.toString();
        this.value = xValue.toString();
      }
      this.totalService.setValue(true);
      this.cdf.detectChanges();
    }, 100);
  }
}
