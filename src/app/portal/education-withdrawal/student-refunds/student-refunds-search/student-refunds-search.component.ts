import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { StudentRefundsService } from "../student-refunds.service";

@Component({
  selector: "app-student-refunds-search",
  templateUrl: "./student-refunds-search.component.html",
  styleUrls: ["./student-refunds-search.component.scss"],
})
export class StudentRefundsSearchComponent implements OnInit {
  pageId = "STRSH";
  id: any = 0;
  showEmpty = false;
  searchParams = {
    unclaimedWithdrawalRefundId: 0,
    refundFromDate: "",
    totalRefundAmount: 0,
    statusValue: "",
    isortcolumn: "",
    isortorder: true,
    refundToDate: "",
    totalCount: 0,
    pageSize: 0,
    pageNumber: 0,
  };
  totalCount = 0;
  isOpen = false;
  errorTrue = false;
  activeIndex: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "unclaimedWithdrawalRefundId",
    "refundDate",
    "totalRefundAmount",
    "statusValue",
    "action",
  ];
  istrid = "";
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: StudentRefundsService,
    public route: ActivatedRoute
  ) {
    this.data.headerName = {
      screenName: "Student Refunds Search ",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Student Refunds Search",
          link: "",
        },
      ],
    };
    this.route.paramMap.subscribe((params) => {});
  }

  ngOnInit(): void {
    this.getInitialData();
  }
  getInitialData() {
    this.errorTrue = false;
    this.fullspinner.empty.next(true);
    this.data
      .getData(AppGlobal.apiPaths.unclaimedWithdrawalReturns.getinitialData)
      .then(
        (success: any) => {
          success.data.forEach((element) => {
            this.service.initialData[element.key] = element.value;
          });
          this.fullspinner.empty.next(false);
          this.getSearchParams();
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }
  private disableLoader() {
    this.service.setAll(false);
    this.fullspinner.empty.next(false);
  }
  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data
      .getData(AppGlobal.apiPaths.unclaimedWithdrawalReturns.getSearch)
      .then(
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
    this.showEmpty = false;
    if (this.searchParams.unclaimedWithdrawalRefundId! <= 0) {
      this.searchParams.unclaimedWithdrawalRefundId = 0;
    }
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.unclaimedWithdrawalReturns.search,
        this.searchParams
      )
      .then(
        (success: any) => {
          this.searchParams.totalCount = success.totalCount;
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            success.ilstProtoUnclaimedWithdrawalRefundSearchResultset
          );
          setTimeout(() => {
            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
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
          } else if (
            success.ilstProtoUnclaimedWithdrawalRefundSearchResultset.length !=
            0
          ) {
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
    //this.fullspinner.empty.next(true);
    this.getData(true);
  }

  doSearch() {
    this.searchParams.pageNumber = 1;
    this.isOpen = false;
    //this.fullspinner.empty.next(true);
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.unclaimedWithdrawalRefundId = 0;
    this.searchParams.refundFromDate = "";
    this.searchParams.refundToDate = "";
    this.searchParams.statusValue = "";
    this.doSearch();
  }

  active(row) {
    this.activeIndex = row;
  }
  onNew() {
    this.service.unClaimedWithdrawal.unclaimedWithdrawalRefundId = 0;
    this.router.navigateByUrl("/app/student-refunds/detail");
  }
  openDetail(val) {
    this.service.unClaimedWithdrawal.unclaimedWithdrawalRefundId =
      val.unclaimedWithdrawalRefundId;
    this.router.navigateByUrl("/app/student-refunds/detail");
  }
  sortData(event: any) {
    this.searchParams.isortcolumn = event.active;
    this.searchParams.isortorder = event.direction === "asc" ? true : false;
    this.getData(true);
  }
}
