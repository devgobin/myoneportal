import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { DebtPaymentService } from "../debt-payment.service";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";

@Component({
  selector: "app-debt-payment-search",
  templateUrl: "./debt-payment-search.component.html",
  styleUrls: ["./debt-payment-search.component.scss"],
})
export class DebtPaymentSearchComponent implements OnInit {
  pageId = "DBPSH";
  showEmpty = false;
  searchParams = {
    invoicePaymentId: "0",
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

  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  pageIndex = 0;
  pageSize = 10;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "invoicePaymentId",
    "totalInvoiceCount",
    "totalInvoicePaymentAmount",
    "statusDescription",
    "action",
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
      screenName: "Debt Payment Search",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Debt Payment Search",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getInitialData();
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
        this.fullspinner.empty.next(false);
        this.data.errorMethod(error);
      }
    );
  }
  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.invoicePayment.getSearch).then(
      (success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = 1;
        this.searchParams.pageSize = 10;
        this.fullspinner.empty.next(false);
        this.getData(true);
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  getData(val) {
    this.data.clearErrorMsg();
    this.fullspinner.empty.next(true);
    this.showEmpty = false;
    this.data
      .postData(AppGlobal.apiPaths.invoicePayment.search, this.searchParams)
      .then(
        (success: any) => {
          this.searchParams.totalCount = success.totalCount;
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(success.searchResult);
          // setTimeout(() => {
          //   this.dataSource.sort = this.sort;
          // }, 400);
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
          } else if (success.searchResult.length != 0) {
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

  pageChanged(event) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize;
    this.getData(true);
  }
  sortData(event) {
    this.searchParams.isortcolumn = event.active;
    this.searchParams.isortorder = event.direction === "asc" ? true : false;
    this.getData(true);
    console.log(event);
  }

  doSearch() {
    if (this.searchParams.invoicePaymentId === "") {
      this.searchParams.invoicePaymentId = "0";
    }
    this.searchParams.pageNumber = 1;
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.invoicePaymentId = "0";
    this.searchParams.statusValue = "";
    this.doSearch();
  }
  active(row) {
    this.activeIndex = row;
  }

  async newapplication() {
    let id = 0;
    const encodedId = await this.data.encode(id);
    this.router.navigateByUrl("/app/payment-summary/" + encodedId);
  }

  async editapplication(val) {
    const encodedId = await this.data.encode(val.invoicePaymentId);
    this.router.navigateByUrl("/app/payment-summary/" + encodedId);
  }
}
