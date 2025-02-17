import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { TimePaymentPlanScheduleNewComponent } from "../time-payment-plan-schedule-new/time-payment-plan-schedule-new.component";
import { TimePaymentPlanService } from "../time-payment-plan.service";
export interface PeriodicElement {
  scheduleId: string;
  dueDate: string;
  monthlyInstallment: string;
  invoiceBalanceAmt: string;
  employeeShareAmt: string;
  viewDetail: string;
}
@Component({
  selector: "app-time-payment-plan-schedule",
  templateUrl: "./time-payment-plan-schedule.component.html",
  styleUrls: ["./time-payment-plan-schedule.component.scss"],
})
export class TimePaymentPlanScheduleComponent implements OnInit {
  pageId = "TIPLS";
  dataSource: any = new MatTableDataSource();
  isOpen = false;
  pageIndex = 0;
  pageSize = 10;
  totalCount = 0;
  displayedColumns: string[] = [
    "timePaymentScheduleId",
    "installmentDueDate",
    "monthlyInstallmentAmt",
    "invoiceBalanceAmt",
    "employeeShareAmt",
    "viewDetail",
  ];
  activeIndex: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public service: TimePaymentPlanService,
    public fullspinner: FullSpinnerService,
    public router:Router
  ) {
    this.data.headerName = {
      screenName: "Time Payment Plan Schedule",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Time Payment Plan Schedule",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (this.service.TimePaymentPlan.timePaymentId > 0) {
      this.getData(this.service.TimePaymentPlan.timePaymentId);
    }
  }

  getData(val) {
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data
      .postData(AppGlobal.apiPaths.timepaymentpaln.opentimepaymentplan, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.TimePaymentPlan = success;
          this.dataSource = new MatTableDataSource(
            this.service.TimePaymentPlan.lstProtoentTimePaymentSchedule
          );
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 400);
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  active(row) {
    this.activeIndex = row;
  }
  
  newSchedule(val) {
    this.service.TimePaymentScedule = val;
    const dialogRef = this.dialog.open(TimePaymentPlanScheduleNewComponent, {
      width: "850px",
      height: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  
  viewScreen() {
    this.router.navigateByUrl("/app/time-payment-plan-search");
  }
}
