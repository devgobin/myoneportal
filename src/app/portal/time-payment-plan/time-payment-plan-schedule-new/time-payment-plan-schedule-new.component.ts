import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { TimePaymentPlanService } from "../time-payment-plan.service";

@Component({
  selector: "app-time-payment-plan-schedule-new",
  templateUrl: "./time-payment-plan-schedule-new.component.html",
  styleUrls: ["./time-payment-plan-schedule-new.component.scss"],
})
export class TimePaymentPlanScheduleNewComponent implements OnInit {
  pageId = "TIPSN";
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "timePaymentSchedulePaymentDetailId",
    "remittanceId",
    "paidAmt",
  ];
  constructor(
    public dialog: MatDialog,
    public service: TimePaymentPlanService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.dataSource = new MatTableDataSource(
      this.service.TimePaymentScedule.lstProtoentTimePaymentScheduleDetail
    );
  }
  onNoClick() {
    this.dialog.closeAll();
  }
}
