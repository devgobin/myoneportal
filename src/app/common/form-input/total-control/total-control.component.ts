import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  IterableDiffers,
  OnInit,
  Optional,
  Self,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";
import { ValueAccessorBase } from "../value-accessor-base";
import { TotalControlService } from "./total-control.service";

@Component({
  selector: "app-total-control",
  templateUrl: "./total-control.component.html",
  styleUrls: ["./total-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TotalControlComponent,
      multi: true,
    },
  ],
})
export class TotalControlComponent
  extends ValueAccessorBase<string>
  implements OnInit
{
  xValue: any = "";
  @Input() public decimal = 2;

  // @Input() public totalPayableAmount = "";
  // @Input() public totalInvoicePaymentAmount = "";
  // @Input() public totalBalanceAmount = "";

  xZero = 0;

  _type: string = "";
  get name(): string {
    return this._type;
  }
  @Input() set name(name: string) {
    this._type = name;
  }

  _items: any = [];
  // @Input() items: any = [];
  get items(): string {
    return this._items;
  }
  @Input() set items(items: string) {
    this._items = items;
  }

  constructor(
    public cdf: ChangeDetectorRef,
    public totalService: TotalControlService
  ) {
    super();
    this.totalService.getValue().subscribe((val) => {
      if (val) {
        this.calculate();
      } else {
        let value = 0;
        this.xValue = value.toFixed(this.decimal);
      }
    });
  }

  async ngOnInit() {
    // console.log(await this.roundOff(1.735555));
  }

  async calculate() {
    let totalPayableAmount = 0;
    let totalInvoicePaymentAmount = 0;
    let totalBalanceAmount = 0;
    this._items.forEach((xitem) => {
      let payableAmount = isNaN(
        parseFloat(xitem.iProtoentViewInvoice.invoiceBalanceAmount)
      )
        ? 0
        : parseFloat(xitem.iProtoentViewInvoice.invoiceBalanceAmount);
      totalPayableAmount = totalPayableAmount + payableAmount;

      let invoicePaymentAmount = isNaN(parseFloat(xitem.invoiceAmountToPay))
        ? 0
        : parseFloat(xitem.invoiceAmountToPay);
      totalInvoicePaymentAmount =
        totalInvoicePaymentAmount + invoicePaymentAmount;

      let balanceAmount = isNaN(parseFloat(xitem.balanceAmount))
        ? 0
        : parseFloat(xitem.balanceAmount);
      totalBalanceAmount = totalBalanceAmount + balanceAmount;
    });

    setTimeout(() => {
      if (this._type === "totalPayableAmount") {
        this.xValue = totalPayableAmount.toFixed(this.decimal);
        this.value = totalPayableAmount.toFixed(this.decimal);
      }
      if (this._type === "totalInvoicePaymentAmount") {
        this.xValue = totalInvoicePaymentAmount.toFixed(this.decimal);
        this.value = totalInvoicePaymentAmount.toFixed(this.decimal);
      }
      if (this._type === "totalBalanceAmount") {
        this.xValue = totalBalanceAmount.toFixed(this.decimal);
        this.value = totalBalanceAmount.toFixed(this.decimal);
      }
    }, 100);
  }
}
