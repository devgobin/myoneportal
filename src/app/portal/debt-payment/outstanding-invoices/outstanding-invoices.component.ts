import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import * as moment from "moment";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { IncompleteMemberRegistrationService } from "../../employees/incomplete-member-registration/incomplete-member-registration.service";
import { MemberRegistration } from "../../employees/new-member-registration/new-member-registration.service";
import { DebtPaymentService } from "../debt-payment.service";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";

@Component({
  selector: "app-outstanding-invoices",
  templateUrl: "./outstanding-invoices.component.html",
  styleUrls: ["./outstanding-invoices.component.scss"],
})
export class OutstandingInvoicesComponent implements OnInit {
  pageId = "OTINV";
  showEmpty = false;
  searchParams = {
    csMonth: "",
    csYear: "0",
    fromDate: "",
    toDate: "",
    statusValue: "",
    invoiceId: "0",
    invoiceTypeValue: "",
  };

  isOpen = false;
  searchclearflag: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  pageIndex = 0;
  pageSize = 10;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "invoiceId",
    "invoiceTypeDescription",
    "csMonthDescription",
    "csYear",
    "invoiceDate",
    "totalAmount",
    "paidAmount",
    "invoiceBalanceAmount",
    "action",
  ];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  activeIndex: number;
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public service: DebtPaymentService
  ) {
    this.data.headerName = {
      screenName: "Make Payment",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Make Payment",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.CheckId();
  }

  CheckId() {
    if (
      this.service.invoicepayment.invoicePaymentId <= 0 ||
      (this.service.invoicepayment.statusValue !== "PENPY" &&
        this.service.invoicepayment.statusValue !== "PAYFI")
    ) {
      this.router.navigateByUrl("/app/debt-payment");
    } else {
      this.getInitialData();
    }
  }

  getInitialData() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.invoicePayment.initial).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.service.initialData[element.key] = element.value;
        });
        this.fullspinner.empty.next(false);
        this.getSearchParams();
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }

  getSearchParams() {
    this.data
      .getData(AppGlobal.apiPaths.invoicePayment.getinvoicesearchforpayment)
      .then(
        (success: any) => {
          this.searchParams = success;
          this.getData(true);
        },
        (error: any) => {
          this.data.errorMethod(error);
        }
      );
  }
  getData(val) {
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.invoicePayment.searchInvoiceForPayment,
        this.searchParams
      )
      .then(
        (success: any) => {
          this.loadingTrue = false;
          this.service.invoicepayment.lstProtoentViewInvoice =
            success.lstProtoentViewInvoice;
          this.DisableExistingInvoice();
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            this.service.invoicepayment.lstProtoentViewInvoice
          );
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.sortingDataAccessor = (item, property) => {
              switch (property) {
                case "csYear":
                case "csMonthDescription":
                  let mDate = this.months.indexOf(item.csMonthDescription);
                  let monthDight = 0;
                  mDate !== -1 ? (monthDight = mDate + 1) : "";
                  let monthDightParsed = "";
                  monthDight < 10
                    ? (monthDightParsed = "0" + monthDight)
                    : (monthDightParsed = monthDight.toString());
                  let praseDate = item.csYear + "-" + monthDightParsed + "-01";
                  return new Date(praseDate);
                case "invoiceDate":
                  const xdate = moment(item.invoiceDate, "DD/MM/YYYY").format(
                    "YYYY-MM-DD"
                  );
                  return new Date(xdate);
                case "totalAmount":
                  let totalInvoiceAmount = 0;
                  totalInvoiceAmount = parseFloat(item.totalAmount);
                  return totalInvoiceAmount;
                case "paidAmount":
                  let invoicePaidAmount = 0;
                  invoicePaidAmount = parseFloat(item.paidAmount);
                  return invoicePaidAmount;
                case "invoiceBalanceAmount":
                  let balanceAmount = 0;
                  balanceAmount = parseFloat(item.invoiceBalanceAmount);
                  return balanceAmount;
                default:
                  return item[property];
              }
            };
            if (this.dataSource !== null && this.dataSource.length > 0) {
              this.dataSource.sort.sort({
                id: "invoiceId",
                start: "desc",
                active: "invoiceId",
                direction: "desc",
              });
            }
          }, 400);
          if (this.searchclearflag === true) {
            const xdata = {
              msg: {
                infoMessage: {
                  msgDescription: "Data cleared successfully.",
                },
              },
            };
            this.data.successMesaage(xdata);
            this.searchclearflag = false;
          } else if (success.lstProtoentViewInvoice.length != 0) {
            const xdata = {
              msg: {
                infoMessage: {
                  msgDescription: "Search executed successfully.",
                },
              },
            };
            this.data.successMesaage(xdata);
          } else {
            this.showEmpty = true;
          }
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
        }
      );
  }
  doSearch() {
    if (this.searchParams.csYear === "") {
      this.searchParams.csYear = "0";
    }
    if (this.searchParams.invoiceId === "") {
      this.searchParams.invoiceId = "0";
    }
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.csMonth = "";
    this.searchParams.csYear = "0";
    this.searchParams.invoiceId = "0";
    this.searchParams.fromDate = "";
    this.searchParams.toDate = "";
    this.searchParams.statusValue = "";
    this.searchParams.invoiceTypeValue = "";
    this.doSearch();
  }
  active(row) {
    this.activeIndex = row;
  }
  pageChanged(event) {
    //this.searchParams.pageNumber = event.pageIndex + 1;
    //this.searchParams.pageSize = event.pageSize;
    this.fullspinner.empty.next(true);
    this.getData(true);
  }
  sortData(event) {
    //this.searchParams.isortcolumn = event.active;
    //this.searchParams.isortorder = event.direction === "asc" ? true : false;
    this.fullspinner.empty.next(true);
    this.getData(true);
    console.log(event);
  }

  SelectInvoice(val, invoice) {
    if (val) {
      invoice.isSelected = "Y";
    } else {
      invoice.isSelected = "N";
    }
    this.service.invoicepayment.lstProtoentViewInvoice.forEach((element) => {
      if (element.invoiceId === invoice.invoiceId) {
        element.isSelected = invoice.isSelected;
      }
    });
  }

  async saveinvoicepaymentdetail() {
    let updateItem = this.service.invoicepayment.lstProtoentViewInvoice.find(
      (item) => item.isSelected == "Y" && item.isAddedForPayment === "N"
    );
    if (updateItem && updateItem.invoiceId > 0) {
      this.fullspinner.empty.next(true);
      await this.data
        .postData(
          AppGlobal.apiPaths.invoicePayment.saveinvoicepaymentdetail,
          this.service.invoicepayment
        )
        .then(
          async (success: any) => {
            this.service.invoicepayment = success;
            this.fullspinner.empty.next(false);
            const encodedId = await this.data.encode(
              this.service.invoicepayment.invoicePaymentId
            );
            this.router.navigateByUrl("/app/payment-summary/" + encodedId);
          },
          (error) => {
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
          }
        );
    } else {
      this.data.errorMesaageOnly("Please select invoice to proceed.");
      return;
    }
  }

  DisableExistingInvoice() {
    if (
      this.service.invoicepayment &&
      this.service.invoicepayment.ilstprotoInvoicePaymentDetail &&
      this.service.invoicepayment.ilstprotoInvoicePaymentDetail.length > 0 &&
      this.service.invoicepayment.lstProtoentViewInvoice &&
      this.service.invoicepayment.lstProtoentViewInvoice.length > 0
    ) {
      this.service.invoicepayment.ilstprotoInvoicePaymentDetail.forEach(
        (element) => {
          let updateItem =
            this.service.invoicepayment.lstProtoentViewInvoice.find(
              this.findIndexToUpdate,
              element.invoiceId
            );
          if (updateItem) {
            let index =
              this.service.invoicepayment.lstProtoentViewInvoice.indexOf(
                updateItem
              );

            updateItem.isSelected = "Y";
            updateItem.isAddedForPayment = "Y";

            this.service.invoicepayment.lstProtoentViewInvoice[index] =
              updateItem;
          }
        }
      );
    }
  }

  viewInvoice(invoiceid) {
    if (invoiceid > 0) {
      const obj = {
        data: invoiceid,
      };
      this.fullspinner.empty.next(true);
      this.data.pdf(AppGlobal.apiPaths.payment.viewinvoice, obj).then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.openPDFViewer(success);
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
    }
  }

  openPDFViewer(xurl) {
    if (this.data.isMobile) {
      let link = document.createElement("a");
      link.href = xurl;
      link.target = "_blank";
      link.download = "";
      // link.download = this.response.data + '_file.pdf';
      link.dispatchEvent(new MouseEvent("click"));
    } else {
      const dialogRef = this.dialog.open(ViewPdfComponent, {
        width: "100%",
        height: "85%",
        data: {
          url: xurl,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // this.logout();
        }
      });
    }
  }

  findIndexToUpdate(newItem) {
    return newItem.invoiceId === this;
  }
}
