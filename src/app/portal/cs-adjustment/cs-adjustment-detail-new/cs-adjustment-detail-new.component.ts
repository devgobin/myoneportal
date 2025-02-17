import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { CsAdjustmentService } from "../cs-adjustment.service";

@Component({
  selector: "app-cs-adjustment-detail-new",
  templateUrl: "./cs-adjustment-detail-new.component.html",
  styleUrls: ["./cs-adjustment-detail-new.component.scss"],
})
export class CsAdjustmentDetailNewComponent implements OnInit {
  pageId = "CSNDT";
  btnClicked = false;
  errorTrue = false;
  type: any = "";
  constructor(
    public dialog: MatDialog,
    public service: CsAdjustmentService,
    public data: DataService,
    public fullspinner: FullSpinnerService,
    public dialogRef: MatDialogRef<CsAdjustmentDetailNewComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any
  ) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    if (
      this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
        .adjDetailId > 0
    ) {
      this.type = "edit";
    } else if (
      this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
        .adjDetailId === 0
    ) {
      this.type = "new";
    }
  }
  createData() {
    this.service.createdata();
  }
  getData(val) {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data.postData(AppGlobal.apiPaths.csadjustment.opendetail, obj).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail =
          success;
        this.data.successMesaage(success);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }

  // onsubmit(h) {
  //   if (h.valid) {
  //     this.errorTrue = false;
  //     this.btnClicked = true;
  //     this.fullspinner.empty.next(true);
  //     this.data
  //       .postData(
  //         AppGlobal.apiPaths.csadjustment.submitdetail,
  //         this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
  //       )
  //       .then(
  //         (success: any) => {
  //           this.data.successMesaage(success);
  //           this.fullspinner.empty.next(false);
  //           this.btnClicked = false;
  //           this.dialogRef.close(success);
  //         },
  //         (error) => {
  //           this.data.errorMethod(error);
  //           this.fullspinner.empty.next(false);
  //           this.btnClicked = false;
  //         }
  //       );
  //   } else {
  //     this.errorTrue = true;
  //   }
  // }

  doInsert(h) {
    if (h.valid) {
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.csadjustment.insertdetail,
          this.service.protoentCSAdjustmentHeader
        )
        .then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.service.protoentCSAdjustmentHeader = success;
            if (
              this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
                .detailStatusValue === "VALD" ||
              this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
                .detailStatusValue === "POST" ||
              this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
                .detailStatusValue === "APPR"
            ) {
              this.dialogRef.close();
            } else {
              if (
                this.service.protoentCSAdjustmentHeader.funMsg != null &&
                this.service.protoentCSAdjustmentHeader.funMsg.errorMessage !=
                  null &&
                this.service.protoentCSAdjustmentHeader.funMsg.errorMessage
                  .length > 0
              ) {
                this.data.constructErrorMsgArr(
                  this.service.protoentCSAdjustmentHeader.funMsg.errorMessage
                );
              }
            }

            // else if (
            //   this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
            //     .funMsg != null &&
            //   this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
            //     .funMsg.errorMessage != null &&
            //   this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
            //     .funMsg.errorMessage.length > 0
            // ) {
            //   this.data.constructErrorMsgArr(
            //     this.service.protoentCSAdjustmentHeader
            //       .protoentCSAdjustmentDetail.funMsg.errorMessage
            //   );
            // }
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
    }
  }
  doRetrieve() {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.csadjustment.retrievedetail,
        this.service.protoentCSAdjustmentHeader
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail =
            success;
          this.data.successMesaage(success);
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.btnClicked = false;
        }
      );
  }
  onNoClick() {
    this.dialog.closeAll();
  }
  checkdelete(val): void {
    this.service.adjustmentDetailId = val.adjustmentDetailId;
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this CS Adjustment Detail",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dodelete();
      }
    });
  }
  dodelete() {
    const obj = {
      data: this.service.adjustmentDetailId,
    };
    this.fullspinner.empty.next(true);
    this.data.postData(AppGlobal.apiPaths.csadjustment.delete, obj).then(
      (success: any) => {
        this.service.protoentCSAdjustmentHeader = success;
        this.fullspinner.empty.next(false);
        this.dialogRef.close(success);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
  }
  getTotalContribution() {
    // const total = Number(this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newEmployerAddContri) + Number(this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newEmployeeAddContri) + Number(this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newComplulsoryContri);
    // this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newTotalContri = total.toString();

    this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
      .newEmployerAddContri === ""
      ? (this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newEmployerAddContri =
          "0")
      : "";
    this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
      .newEmployeeAddContri === ""
      ? (this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newEmployeeAddContri =
          "0")
      : "";
    this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
      .newComplulsoryContri === ""
      ? (this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newComplulsoryContri =
          "0")
      : "";

    const totalcontribution =
      parseFloat(
        this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
          .newEmployerAddContri
      ) +
      parseFloat(
        this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
          .newEmployeeAddContri
      ) +
      parseFloat(
        this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
          .newComplulsoryContri
      );

    this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newTotalContri =
      totalcontribution.toFixed(2);
  }

  getCompulsoryContribution() {
    this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
      .newMonthlyGrossSalary === ""
      ? (this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newMonthlyGrossSalary =
          "0")
      : "";
    const percentage =
      parseFloat(
        this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
          .employerContriRate
      ) +
      parseFloat(
        this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
          .employeeContriRate
      );
    const gSalary = parseFloat(
      this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail
        .newMonthlyGrossSalary
    );
    this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.newComplulsoryContri =
      ((gSalary * percentage) / 100).toFixed(2);

    this.getTotalContribution();
  }

  CheckSurpressWarning(value) {
    value === true
      ? (this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.suppressWaringFlag =
          "Y")
      : (this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail.suppressWaringFlag =
          "N");
  }
  // doCalcCCA() {
  //   this.service.createemployee.grossSalary === ""
  //     ? (this.service.createemployee.grossSalary = "0")
  //     : "";
  //   const percentage =
  //     parseFloat(this.service.createemployee.employerContriRate) +
  //     parseFloat(this.service.createemployee.employeeContriRate);
  //   const gSalary = parseFloat(this.service.createemployee.grossSalary);
  //   this.service.createemployee.complulsoryContri = (
  //     (gSalary * percentage) /
  //     100
  //   ).toFixed(2);
  //   this.CalculateTotalContribution();
  // }
}
