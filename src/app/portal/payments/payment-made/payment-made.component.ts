import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { MatDialog } from "@angular/material/dialog";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";

@Component({
  selector: "app-payment-made",
  templateUrl: "./payment-made.component.html",
  styleUrls: ["./payment-made.component.scss"],
})
export class PaymentMadeComponent implements OnInit {
  pageId = "PAYMA";
  showEmpty = false;
  searchParams = {
    // csCode: '',
    csMonth: "",
    csYear: "0",
    fromDate: "",
    toDate: "",
    status: "",
    depositId: "",
  };
  isOpen = false;
  activeIndex: number;
  loadingTrue = false;
  searchclearflag: boolean = false;
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  displayedColumns: string[] = [
    "tc",
    "month",
    "year",
    "amount",
    "remittanceStatusDescription",
    "action",
  ];
  months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "Payments Made",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Payments",
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
        "tc",
        "month",
        "year",
        "amount",
        "remittanceStatusDescription",
        "action",
      ];
    }
  }

  ngOnInit(): void {
    this.getSearchParams();
    this.getInitialData();
  }
  DDL: any = {
    DDLMonthValue: [],
  };
  getInitialData() {
    this.data.getData(AppGlobal.apiPaths.payment.paymentinitialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.DDL[element.key] = element.value;
        });
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }
  getSearchParams() {
    this.data.getData(AppGlobal.apiPaths.payment.paymentgetsearch).then(
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
    //   if ((this.searchParams.fromDate !== '' && this.searchParams.fromDate !== null &&
    //   this.searchParams.fromDate !== undefined) && (this.searchParams.toDate !== '' && this.searchParams.toDate !== null &&
    //     this.searchParams.toDate !== undefined)) {
    //       if (this.searchParams.fromDate > this.searchParams.toDate) {
    //         this.data.errorMesaageOnly('From Date must be less than To Date');
    //         return
    //       }
    // }
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.payment.paymentsearch, this.searchParams)
      .then(
        (success: any) => {
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            success.lstProtoentViewPayment
          );
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            if (this.dataSource !== null && this.dataSource.length > 0) {
              this.dataSource.sort.sort({
                id: "tc",
                start: "desc",
                disableClear: false,
              });
            }
            this.dataSource.sortingDataAccessor = (item, property) => {
              switch (property) {
                case "year":
                case "month":
                  let mDate = this.months.indexOf(item.month);
                  let monthDight = 0;
                  mDate !== -1 ? (monthDight = mDate + 1) : "";
                  let monthDightParsed = "";
                  monthDight < 10
                    ? (monthDightParsed = "0" + monthDight)
                    : (monthDightParsed = monthDight.toString());
                  let praseDate = item.year + "-" + monthDightParsed + "-01";
                  return new Date(praseDate);
                default:
                  return item[property];
              }
            };
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
          } else if (success.lstProtoentViewPayment.length != 0) {
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
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    //this.searchParams.csCode = "";
    this.searchParams.csMonth = "";
    this.searchParams.csYear = "0";
    this.searchParams.fromDate = "";
    this.searchParams.toDate = "";
    this.doSearch();
  }
  active(row) {
    this.activeIndex = row;
  }

  viewpayment(val) {
    const obj = {
      data: val,
    };
    this.fullspinner.empty.next(true);
    this.data.pdf(AppGlobal.apiPaths.payment.generatepayment, val).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.openPDFViewer(success);
        // console.log(success);
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
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
}
