import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";

@Component({
  selector: "app-view-invoice",
  templateUrl: "./view-invoice.component.html",
  styleUrls: ["./view-invoice.component.scss"],
})
export class ViewInvoiceComponent implements OnInit {
  pageId = "VIINV";
  showEmpty = false;
  selectedInvoice = 0;
  searchParams = {
    csMonth: "",
    csYear: "0",
    fromDate: "",
    toDate: "",
    statusValue: "",
  };
  isOpen = false;
  activeIndex: number;
  loadingTrue = false;
  searchclearflag: boolean = false;
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("invoiceDialog", { static: false })
  invoiceDialog: TemplateRef<any>;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  displayedColumns: string[] = [
    "invoiceId",
    "invoiceTypeDescription",
    "csMonthDescription",
    "csYear",
    "invoiceDate",
    "totalAmount",
    "statusDescription",
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
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "Invoices",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Invoices",
          link: "",
        },
        {
          name: "View",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "invoiceId",
        "invoiceTypeDescription",
        "csMonthDescription",
        "csYear",
        "totalAmount",
        "statusDescription",
        "action",
      ];
    }
  }

  ngOnInit(): void {
    this.getInitialData();
  }
  DDL: any = {
    DDLMonthValue: [],
    DDLStatusValue: [],
    DDLDepositSlipBankValue: [],
  };
  getInitialData() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.payment.paymentinitialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.DDL[element.key] = element.value;
        });
        this.fullspinner.empty.next(false);
        this.getSearchParams();
      },
      (error: any) => {
        this.fullspinner.empty.next(false);
        this.data.errorMethod(error);
      }
    );
  }
  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.payment.invoicegetsearch).then(
      (success: any) => {
        this.searchParams = success;
        this.fullspinner.empty.next(false);
        this.getData(true);
      },
      (error: any) => {
        this.fullspinner.empty.next(false);
        this.data.errorMethod(error);
      }
    );
  }
  getData(val) {
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.payment.invoicesearch, this.searchParams)
      .then(
        (success: any) => {
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            success.lstProtoentViewInvoice
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
                // case 'paidDate':
                //   const ydate = moment(item.paidDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
                //   return new Date(ydate);
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
    this.isOpen = false;
    console.log("value is" + this.searchParams.csYear);
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.csMonth = "";
    this.searchParams.csYear = "0";
    this.searchParams.fromDate = "";
    this.searchParams.toDate = "";
    this.searchParams.statusValue = "";
    //this.doSearch();
  }
  active(row) {
    this.activeIndex = row;
  }
  openInvoice(invoice) {
    this.selectedInvoice = invoice.invoiceId;
    if (
      invoice &&
      invoice.invoiceStatusValue &&
      invoice.invoiceStatusValue === "OPEN"
    ) {
      this.dialog.open(this.invoiceDialog, {
        width: "500px",
        // height: "500px",
      });
    } else {
      this.viewInvoice();
    }
  }
  viewInvoice() {
    if (this.selectedInvoice > 0) {
      const obj = {
        data: this.selectedInvoice,
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

  getinvoicewithdepositslip(value) {
    if (this.selectedInvoice > 0) {
      const obj = {
        invoiceid: this.selectedInvoice,
        depositSlipBankValue: value,
      };
      this.fullspinner.empty.next(true);
      this.data
        .pdf(AppGlobal.apiPaths.payment.getinvoicewithdepositslip, obj)
        .then(
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
  onNoClick() {
    this.dialog.closeAll();
  }
}
