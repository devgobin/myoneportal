import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { AppGlobal } from "src/app/constants";
import { DebtService } from "../debt.service";
import { FullSpinnerService } from "../../../common/full-spinner/full-spinner.service";
import { Router } from "@angular/router";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";

@Component({
  selector: "app-debt-search",
  templateUrl: "./debt-search.component.html",
  styleUrls: ["./debt-search.component.scss"],
})
export class DebtSearchComponent implements OnInit {
  pageId = "DEPTS";
  showEmpty = false;
  searchParams = {
    orgrefno: "",
    orgid: 0,
    totalCount: 0,
    csMonthValue: "",
    csYear: 0,
    invoiceTypeValue: "",
    invoiceNo: 0,
    invoiceStatusValue: "",
    recoveryStageValue: "",
    fromDate: "",
    toDate: "",
  };
  totalCount = 0;
  isOpen = false;
  activeIndex: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "invoiceId",
    "invoiceTypeDescription",
    "csMonthDecription",
    "csYear",
    "wagesMonthDescription",
    "wagesYear",
    "invoiceAmount",
    "paidAmount",
    "balanceOwing",
    "waivedAmount",
    "waivedStatus",
    "fnpfRecoveryStage",
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
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: DebtService
  ) {
    this.data.headerName = {
      screenName: "Debt",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Debt Search",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "invoiceId",
        "invoiceTypeDescription",
        "csMonthDecription",
        "csYear",
        "invoiceAmount",
        "balanceOwing",
        "fnpfRecoveryStage",
      ];
    }
  }

  ngOnInit(): void {
    this.InitialData();
  }
  InitialData() {
    this.service.clearData();
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.debt.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.service.DDL[element.key] = element.value;
        });
        this.fullspinner.empty.next(false);
        this.getSearchParams();
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  getSearchParams() {
    this.data.getData(AppGlobal.apiPaths.debt.getsearch).then(
      (success: any) => {
        this.searchParams = success;
        // this.searchParams.pageNumber = 1;
        // this.searchParams.pageSize = this.pageSize;
        this.getData(true);
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }

  getData(val) {
    this.data.clearErrorMsg();
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data.postData(AppGlobal.apiPaths.debt.search, this.searchParams).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.loadingTrue = false;
        this.dataSource = new MatTableDataSource(success.plstProtoentDept);
        // this.totalCount = success.totalCount;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case "csYear":
              case "csMonthDecription":
                let mDate = this.months.indexOf(item.csMonthDecription);
                let monthDight = 0;
                mDate !== -1 ? (monthDight = mDate + 1) : "";
                let monthDightParsed = "";
                monthDight < 10
                  ? (monthDightParsed = "0" + monthDight)
                  : (monthDightParsed = monthDight.toString());
                let praseDate = item.csYear + "-" + monthDightParsed + "-01";
                return new Date(praseDate);
                break;
              case "wagesYear":
              case "wagesMonthDescription":
                let wDate = this.months.indexOf(item.wagesMonthDescription);
                let wmonthDight = 0;
                wDate !== -1 ? (wmonthDight = wDate + 1) : "";
                let wmonthDightParsed = "";
                wmonthDight < 10
                  ? (wmonthDightParsed = "0" + wmonthDight)
                  : (wmonthDightParsed = wmonthDight.toString());
                let mpraseDate =
                  item.wagesYear + "-" + wmonthDightParsed + "-01";
                return new Date(mpraseDate);
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
        } else if (success.plstProtoentDept) {
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
        this.fullspinner.empty.next(false);
        this.data.errorMethod(error);
        this.loadingTrue = false;
      }
    );
  }
  active(row) {
    this.activeIndex = row;
  }
  doSearch() {
    // this.searchParams.pageNumber = 1;
    // this.pageIndex = 0;
    // this.paginator.pageIndex = 0;
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams = {
      orgrefno: "",
      orgid: 0,
      totalCount: 0,
      csMonthValue: "",
      csYear: 0,
      invoiceTypeValue: "",
      invoiceNo: 0,
      invoiceStatusValue: "",
      recoveryStageValue: "",
      fromDate: "",
      toDate: "",
    };
    this.isOpen = false;
    this.getSearchParams();
  }
}
