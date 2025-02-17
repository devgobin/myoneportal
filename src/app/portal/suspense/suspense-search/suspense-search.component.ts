import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { SuspenseService } from "../suspense.service";

@Component({
  selector: "app-suspense-search",
  templateUrl: "./suspense-search.component.html",
  styleUrls: ["./suspense-search.component.scss"],
})
export class SuspenseSearchComponent implements OnInit {
  pageId = "SUSSR";
  showEmpty = false;
  searchParams = {
    suspenseAccountId: 0,
    orgRefNo: "",
    fnpfId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    fromDate: "",
    toDate: "",
    tin: "",
    suspenseSourceValue: "",
    suspenseStatusValue: "",
    suspenseReasonValue: "",
    suspenseSourceRefId: 0,
    contribMonthValue: "",
    contribYear: "",
    noOfYearsForSearch: 7,
  };
  patternErrorText = "";
  totalCount = 0;
  pageNumber = 1;
  isOpen = false;
  activeIndex: number;
  no_of_years: number = 7;
  label: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "suspenseAccountId",
    "fnpfId",
    "memberFullName",
    "csMonthDescription",
    "csYear",
    "wagesMonthDescription",
    "wagesYear",
    "suspenseAmt",
    "suspenseStatusDescription",
    "action",
  ];
  minimumcontribYear: any;
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
    public service: SuspenseService,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "Suspense",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Suspense",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "memberFullName",
        "csMonthDescription",
        "csYear",
        "suspenseAmt",
        "suspenseStatusDescription",
        "action",
      ];
    }
  }

  ngOnInit(): void {
    this.InitialData();
  }

  InitialData() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.suspense.initialdata).then(
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
    this.data.getData(AppGlobal.apiPaths.suspense.getsearch).then(
      (success: any) => {
        this.searchParams = success;
        this.getMinYear();
        this.getData(true);
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }

  getData(val) {
    var contriYear = this.searchParams.contribYear;
    var csYear: number = +contriYear;
    if (csYear >= 0) {
      if (csYear >= this.minimumcontribYear || csYear == 0) {
        this.data.clearErrorMsg();
        this.loadingTrue = val;
        this.showEmpty = false;
        if (this.searchParams.suspenseAccountId! <= 0) {
          this.searchParams.suspenseAccountId = 0;
        }
        this.fullspinner.empty.next(true);
        this.data
          .postData(AppGlobal.apiPaths.suspense.search, this.searchParams)
          .then(
            (success: any) => {
              this.fullspinner.empty.next(false);
              this.loadingTrue = false;
              this.dataSource = new MatTableDataSource(
                success.plstProtoentSuspense
              );
              this.patternErrorText = "";
              setTimeout(() => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.sortingDataAccessor = (item, property) => {
                  switch (property) {
                    case "csYear":
                    case "csMonthDescription":
                    case "wagesYear":
                    case "wagesMonthDescription":
                      let mDate = this.months.indexOf(
                        item.csMonthDescription && item.wagesMonthDescription
                      );
                      let monthDight = 0;
                      mDate !== -1 ? (monthDight = mDate + 1) : "";
                      let monthDightParsed = "";
                      monthDight < 10
                        ? (monthDightParsed = "0" + monthDight)
                        : (monthDightParsed = monthDight.toString());
                      let praseDate =
                        item.csYear + "-" + monthDightParsed + "-01" &&
                        item.wagesYear + "-" + monthDightParsed + "-01";
                      return new Date(praseDate);
                    default:
                      return item[property];
                  }
                };
              }, 400);
              // this.totalCount = success.totalCount;
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
              } else if (success.plstProtoentSuspense) {
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
      } else {
        const xdata = {
          msg: {
            infoMessage: {
              msgDescription: this.greet(),
            },
          },
        };
        this.data.successMesaage(xdata);
        this.isOpen = true;
      }
    }
  }

  pageChanged(event) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(true);
  }

  doSearch() {
    this.pageNumber = 1;
    this.pageIndex = 0;
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams = {
      suspenseAccountId: 0,
      orgRefNo: "",
      fnpfId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      fromDate: "",
      toDate: "",
      tin: "",
      suspenseSourceValue: "",
      suspenseStatusValue: "",
      suspenseReasonValue: "",
      suspenseSourceRefId: 0,
      contribMonthValue: "",
      contribYear: "",
      noOfYearsForSearch: 7,
    };
    this.doSearch();
  }

  active(row) {
    this.activeIndex = row;
  }

  openDetail(val) {
    this.service.clearSuspense();
    this.service.suspense.suspenseAccountId = val.suspenseAccountId;
    this.router.navigateByUrl("/app/suspense-detail");
  }

  greet(): string {
    this.no_of_years = this.searchParams.noOfYearsForSearch;
    if (
      this.no_of_years == 0 ||
      this.no_of_years == null ||
      this.no_of_years == undefined
    ) {
      this.no_of_years = 7;
    }

    this.label =
      "You may only view suspense records that are " +
      this.no_of_years +
      " years prior to the current date";
    return this.label;
  }

  getMinYear() {
    if (
      this.no_of_years == 0 ||
      this.no_of_years == null ||
      this.no_of_years == undefined
    ) {
      this.no_of_years = 7;
    }

    var date = new Date();
    date.setFullYear(date.getFullYear() - this.no_of_years);
    this.minimumcontribYear = date.getFullYear();
  }
}
