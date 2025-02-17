import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { DebtPaymentService } from "../debt-payment.service";

@Component({
  selector: "app-invoice-payment-summary",
  templateUrl: "./invoice-payment-summary.component.html",
  styleUrls: ["./invoice-payment-summary.component.scss"],
})
export class InvoicePaymentSummaryComponent implements OnInit {
  pageId = "INPSM";
  showEmpty = false;
  searchParams = {
    invoicePaymentId: 0,
    orgRefNo: "",
    totalInvoicePaymentAmount: "",
    statusValue: "",
    paymentDateFrom: "",
    paymentDateTo: "",
    pageSize: 0,
    pageNumber: 0,
    istrlastName: "",
    isortorder: true,
    isortcolumn: "",
    totalCount: 0,
  };

  isOpen = false;
  searchclearflag: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  pageIndex = 0;
  pageSize = 10;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "invoiceId",
    "invoiceTypeDescription",
    "paidAmount",
    "paymentAmount",
    "balanceAmount",
    "action",
  ];
  activeIndex: number;
  id: any = 0;
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public service: DebtPaymentService,
    public route: ActivatedRoute
  ) {
    this.data.headerName = {
      screenName: "View Payments to be Made",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "View Payments to be Made",
          link: "",
        },
      ],
    };
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }

  ngOnInit(): void {}
  async init() {
    let id = this.route.snapshot.paramMap.get("id");
    this.id = await this.data.decode(id);
    this.service.invoicepayment.invoicePaymentId = this.id;
    if (this.service.invoicepayment.invoicePaymentId <= 0)
      this.createinvoicepayment();
    else this.openinvoicepayment();
  }
  createinvoicepayment() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.invoicePayment.create).then(
      (success: any) => {
        this.service.invoicepayment = success;
        this.fullspinner.empty.next(false);
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  openinvoicepayment() {
    this.fullspinner.empty.next(true);
    const obj = { data: this.service.invoicepayment.invoicePaymentId };
    this.data
      .postData(AppGlobal.apiPaths.invoicePayment.openinvoicepayment, obj)
      .then(
        (success: any) => {
          this.service.invoicepayment = success;
          this.dataSource = new MatTableDataSource(
            this.service.invoicepayment.ilstprotoInvoicePaymentDetail
          );
          setTimeout(() => {
            this.dataSource.sort = this.sort;
          }, 400);
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  saveinvoicepayment() {
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.invoicePayment.save,
        this.service.invoicepayment
      )
      .then(
        (success: any) => {
          this.service.invoicepayment = success;
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  CancelInvoicePayment() {
    this.fullspinner.empty.next(true);
    this.service.invoicepayment.statusValue = "CANCL";
    this.data
      .postData(
        AppGlobal.apiPaths.invoicePayment.save,
        this.service.invoicepayment
      )
      .then(
        (success: any) => {
          this.service.invoicepayment = success;
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  pageChanged(event) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize;
    this.fullspinner.empty.next(true);
  }

  addInvoice() {
    this.router.navigateByUrl("/app/outstanding-invoice");
  }

  active(row) {
    this.activeIndex = row;
  }
  openDelete(val): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this invoice?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteNominee(val);
      }
    });
  }

  openCancel(): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to cancel this payment?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.CancelInvoicePayment();
      }
    });
  }

  deleteNominee(nominee) {
    this.service.invoicepayment.iprotoInvoicePaymentDetail = nominee;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.invoicePayment.deleteinvoicepaymentdetail,
        this.service.invoicepayment
      )
      .then(
        (success: any) => {
          this.service.invoicepayment = success;
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  makeinvoicepayment() {
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.invoicePayment.makeinvoicepayment,
        this.service.invoicepayment
      )
      .then(
        (success: any) => {
          this.service.invoicepayment = success;
          this.fullspinner.empty.next(false);
          this.goToPaymentGateway();
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  goToPaymentGateway() {
    window.location.href =
      this.service.invoicepayment.iprotoInvoicePaymentTransaction.paymentUrl;
  }
}
