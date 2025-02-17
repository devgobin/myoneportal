import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { CsAdjustmentService } from "../cs-adjustment.service";

@Component({
  selector: "app-cs-adjustment-search",
  templateUrl: "./cs-adjustment-search.component.html",
  styleUrls: ["./cs-adjustment-search.component.scss"],
})
export class CsAdjustmentSearchComponent implements OnInit {
  pageId = "CSASR";
  showEmpty = false;
  searchParams = {
    orgId: 0,
    orgRefNo: "",
    fromDate: "",
    toDate: "",
    csCode: "",
    csMonth: "",
    csYear: 0,
    wagesMonth: "",
    wagesYear: 0,
    headerStatus: "",
    lstprotoentCSCode: [],
    contributionHeaderId: 0,
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
    "adjHeaderId",
    "contHeaderId",
    "csCode",
    "csMonthDescription",
    "year",
    "wagesPaidMonthDescription",
    "wagesPaidYear",
    "totalAdjAmt",
    "actionStatusDescription",
    "headerStatusDescription",
    "action",
  ];
  istrid = "";

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
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: CsAdjustmentService,
    public route: ActivatedRoute
  ) {
    this.data.headerName = {
      screenName: "CS Adjustment",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "CS Adjustment",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "adjHeaderId",
        "contHeaderId",
        "csMonthDescription",
        "year",
        "totalAdjAmt",
        "actionStatusDescription",
      ];
    }
    this.route.paramMap.subscribe((params) => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.InitialData();
    });
  }
  ngOnInit(): void {
    // this.();
  }

  InitialData() {
    this.istrid = this.route.snapshot.paramMap.get("id");

    this.service.clearData();
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.csadjustment.initialdata).then(
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

  setHeaderId() {
    this.searchParams.contributionHeaderId = parseInt(this.istrid);
    this.getData(true);
    // this.istrid = this.route.snapshot.paramMap.get("id");
    // if (this.istrid == "" || this.istrid == null || this.istrid == undefined) {
    //   this.searchParams.contributionHeaderId = 0;
    // }
    // else {

    // }
  }

  getSearchParams() {
    this.data.getData(AppGlobal.apiPaths.csadjustment.getsearch).then(
      (success: any) => {
        this.searchParams = success;
        if (this.istrid) {
          this.setHeaderId();
        } else {
          this.getData(true);
        }
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }

  getData(val) {
    this.data.clearErrorMsg();
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
      .postData(AppGlobal.apiPaths.csadjustment.search, this.searchParams)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          this.dataSource = new MatTableDataSource(
            success.lstprotoentCSAdjustmentHeader
          );
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.sortingDataAccessor = (item, property) => {
              switch (property) {
                case "year":
                case "csMonthDescription":
                  let mDate = this.months.indexOf(
                    item.protoentCSHeader.csMonthDescription
                  );
                  let monthDight = 0;
                  mDate !== -1 ? (monthDight = mDate + 1) : "";
                  let monthDightParsed = "";
                  monthDight < 10
                    ? (monthDightParsed = "0" + monthDight)
                    : (monthDightParsed = monthDight.toString());
                  let praseDate =
                    item.protoentCSHeader.year + "-" + monthDightParsed + "-01";
                  return new Date(praseDate);
                  break;
                case "wagesPaidYear":
                case "wagesPaidMonthDescription":
                  let wDate = this.months.indexOf(
                    item.protoentCSHeader.wagesPaidMonthDescription
                  );
                  let wmonthDight = 0;
                  wDate !== -1 ? (wmonthDight = wDate + 1) : "";
                  let wmonthDightParsed = "";
                  wmonthDight < 10
                    ? (wmonthDightParsed = "0" + wmonthDight)
                    : (wmonthDightParsed = wmonthDight.toString());
                  let praseDate1 =
                    item.protoentCSHeader.wagesPaidYear +
                    "-" +
                    wmonthDightParsed +
                    "-01";
                  return new Date(praseDate1);
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
          } else if (success.lstprotoentCSAdjustmentHeader.length != 0) {
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

  pageChanged(event) {
    // this.searchParams.pageNumber = event.pageIndex + 1;
    // this.searchParams.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(true);
  }

  doSearch() {
    // this.searchParams.pageNumber = 1;
    this.pageIndex = 0;
    // this.paginator.pageIndex = 0;
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams = {
      orgId: 0,
      orgRefNo: "",
      fromDate: "",
      toDate: "",
      csCode: "",
      csMonth: "",
      csYear: 0,
      wagesMonth: "",
      wagesYear: 0,
      headerStatus: "",
      lstprotoentCSCode: [],
      contributionHeaderId: 0,
    };
    //this.doSearch();
  }

  onNew() {
    this.service.adjustmentHeaderId = 0;
    this.router.navigateByUrl("/app/cs-adjustment-detail/new");
  }

  onEdit(val) {
    this.service.adjustmentHeaderId = val.adjHeaderId;
    this.router.navigateByUrl("/app/cs-adjustment-detail");
  }

  active(row) {
    this.activeIndex = row;
  }
}
