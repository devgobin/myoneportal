import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { HousingAssistanceService } from "src/app/portal/housing-assitance/housing-assitance.service";
import { AppGlobal } from "src/app/constants";
import { TimePaymentRequestService } from "../time-payment-request.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-time-payment-request-search",
  templateUrl: "./time-payment-request-search.component.html",
  styleUrls: ["./time-payment-request-search.component.scss"],
})
export class TimePaymentRequestSearchComponent implements OnInit {
  pageId = "TIRSR";
  showEmpty = false;
  searchParams = {
    timePaymentPlanRequestId: 0,
    organizationId: 0,
    requestRefNo: "",
    requestedDateFrom: "",
    requestedDateTo: "",
    isortcolumn: "",
    isortorder: true,
  };

  totalCount = 0;
  isOpen = false;
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
    "requestRefNo",
    "requestedDate",
    // "fileName",
    "timePaymentRequestStatusDescription",
    "action",
  ];
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: TimePaymentRequestService
  ) {
    this.data.headerName = {
      screenName: "Time Payment Schedule",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Time Payment Request",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getSearchParams();
  }

  getSearchParams() {
    this.data.getData(AppGlobal.apiPaths.timepaymentrequest.getsearch).then(
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
    this.data
      .postData(AppGlobal.apiPaths.timepaymentrequest.search, this.searchParams)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          this.dataSource = new MatTableDataSource(success.searchResult);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            //this.dataSource.sort = this.sort;
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
          } else if (success.plstProtoentTimePaymentRequest) {
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

  onEdit(val) {
    this.service.TimePaymentPlan.timePaymentPlanRequestId =
      val.timePaymentPlanRequestId;
    this.router.navigateByUrl("/app/time-payment-request-detail");
  }
  sortData(event) {
    this.searchParams.isortcolumn = event.active;
    this.searchParams.isortorder = event.direction === "asc" ? true : false;
    this.getData(true);
    console.log(event);
  }
  newPaymentRequest() {
    this.service.TimePaymentPlan.timePaymentPlanRequestId = 0;
    this.router.navigateByUrl("/app/time-payment-request-detail/new");
  }
  doSearch() {
    this.isOpen = false;
    this.getData(true);
  }
  doClear() {
    this.searchclearflag = true;
    this.searchParams = {
      timePaymentPlanRequestId: 0,
      organizationId: 0,
      requestRefNo: "",
      requestedDateFrom: "",
      requestedDateTo: "",
      isortcolumn: "",
      isortorder: true,
    };
    this.doSearch();
  }
}
