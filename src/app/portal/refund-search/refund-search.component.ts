import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { RefundService } from "./refund.service";

@Component({
  selector: "app-refund-search",
  templateUrl: "./refund-search.component.html",
  styleUrls: ["./refund-search.component.scss"],
})
export class RefundSearchComponent implements OnInit {
  pageId = "REFSR";
  showEmpty = false;
  searchParams = {
    csMonthValue: "",
    csYear: 0,
    memberName: "",
    refundStatusValue: "",
    refundId: 0,
  };
  totalCount = 0;
  pageNumber = 1;
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
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "refundId",
    "employeeName",
    "csMonthDescription",
    "csYear",
    "refundAmount",
    "refundStatusDescription",
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
    public service: RefundService
  ) {
    this.data.headerName = {
      screenName: "Refund",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Refund",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "refundId",
        "employeeName",
        "csMonthDescription",
        "csYear",
        "refundAmount",
        "refundStatusDescription",
      ];
    }
  }
  ngOnInit(): void {
    this.InitialData();
  }

  InitialData() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.refund.initialdata).then(
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
    this.data.getData(AppGlobal.apiPaths.refund.getSearch).then(
      (success: any) => {
        this.searchParams = success;
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
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.refund.search, this.searchParams)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          this.dataSource = new MatTableDataSource(success.plstProtoentRefund);
          // this.totalCount = success.totalCount;
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
          } else if (success.plstProtoentRefund) {
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
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(true);
  }

  doSearch() {
    // this.pageNumber = 1;
    // this.pageIndex = 0;
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams = {
      csMonthValue: "",
      csYear: 0,
      memberName: "",
      refundStatusValue: "",
      refundId: 0,
    };
    this.doSearch();
  }

  active(row) {
    this.activeIndex = row;
  }
}
