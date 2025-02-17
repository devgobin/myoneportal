import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { TimePaymentPlanService } from "../time-payment-plan.service";
import { FullSpinnerService } from "../../../common/full-spinner/full-spinner.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { AppGlobal } from "src/app/constants";
import * as moment from "moment";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";

@Component({
  selector: "app-time-payment-plan-search",
  templateUrl: "./time-payment-plan-search.component.html",
  styleUrls: ["./time-payment-plan-search.component.scss"],
})
export class TimePaymentPlanSearchComponent implements OnInit {
  pageId = "TIPSR";
  showEmpty = false;
  searchParams = {
    timePaymentPlanId: "",
    effectiveFromDate: "",
    effectiveToDate: "",
    submissionFromDate: "",
    submissionToDate: "",
    statusValue: "",
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
    "timePaymentId",
    "submissionDate",
    "effectiveDate",
    "totalInvoiceAmount",
    "totalRecoveredAmt",
    "invoiceBalanceAmt",
    "noOfInstallment",
    "monthlyInstallmentAmount",
    "statusDescription",
    "action",
  ];
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: TimePaymentPlanService
  ) {
    this.data.headerName = {
      screenName: "Time Payment Plan",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Time Payment Plan",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "timePaymentId",
        "totalInvoiceAmount",
        "invoiceBalanceAmt",
        "monthlyInstallmentAmount",
        "statusDescription",
      ];
    }
  }

  ngOnInit(): void {
    this.InitialData();
  }
  InitialData() {
    this.service.clearData();
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.timepaymentpaln.initialdata).then(
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
  DDL: any = {
    DDLMonthValue: [],
  };

  getSearchParams() {
    this.data.getData(AppGlobal.apiPaths.timepaymentpaln.getsearch).then(
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
      .postData(AppGlobal.apiPaths.timepaymentpaln.search, this.searchParams)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          this.dataSource = new MatTableDataSource(
            success.plstProtoentTimePaymentPlan
          );
          // this.totalCount = success.totalCount;
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
          } else if (success.plstProtoentTimePaymentPlan != 0) {
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
            let Message =
              "There are no Payment Plans on record. Click on the Submit New Plan to create one.";
            if (
              success.plstProtoentTimePaymentPlan.infoMsg != null &&
              success.plstProtoentTimePaymentPlan.infoMsg != ""
            ) {
              Message = success.plstProtoentTimePaymentPlan.infoMsg;
            }
            const xdata = {
              msg: {
                infoMessage: {
                  msgDescription: Message,
                },
              },
            };
            this.data.successMesaage(xdata);
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
    this.service.TimePaymentPlan.timePaymentId = val.timePaymentId;
    this.router.navigateByUrl("/app/time-payment-plan-schedule");
  }

  newPaymentPlan() {
    this.service.TimePaymentPlan.timePaymentId = 0;
    this.router.navigateByUrl("/app/time-payment-plan-schedule");
  }

  newPaymentRequest() {
    this.service.TimePaymentPlan.timePaymentId = 0;
    this.router.navigateByUrl("/app/time-payment-request-detail/new");
  }
  doSearch() {
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }
  doClear() {
    this.searchclearflag = true;
    this.searchParams = {
      timePaymentPlanId: "",
      effectiveFromDate: "",
      effectiveToDate: "",
      submissionFromDate: "",
      submissionToDate: "",
      statusValue: "",
    };
    this.isOpen = false;
    this.getSearchParams();
  }
}
