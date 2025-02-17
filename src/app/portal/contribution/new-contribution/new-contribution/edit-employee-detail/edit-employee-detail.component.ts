import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { CdkStepper } from "@angular/cdk/stepper";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { newcontributionservice } from "../new-contribution.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { SearchOccupationCodeComponent } from "./search-occupation-code/search-occupation-code.component";

@Component({
  selector: "app-edit-employee-detail",
  templateUrl: "./edit-employee-detail.component.html",
  styleUrls: ["./edit-employee-detail.component.scss"],
})
export class EditEmployeeDetailComponent implements OnInit {
  pageId = "EEMDE";
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  activeIndex: number;
  step1 = true;
  step2 = false;
  step3 = false;
  btnClicked = false;
  errorTrue = false;
  type: any = "";
  fnpfRequired = false;
  fnpfError = false;
  tinRequired = false;
  tinError = false;
  InvalidtinError = false;
  searchoccupation: string = "";
  @ViewChild("registrationSteps", { static: false })
  registrationSteps: CdkStepper;
  @ViewChild("occupationCode", { static: false })
  occupationCode!: TemplateRef<any>;
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: newcontributionservice,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditEmployeeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any
  ) {
    // if (xdata.type === "edit") {
    //   this.service.createemployee = xdata.data;
    // } else {
    this.type = xdata.type;
    // }
  }

  ngOnInit(): void {}
  step1Click() {
    this.step1Completed = true;
    this.registrationSteps.next();
    this.step2 = true;
    this.step1 = false;
    this.step3 = false;
  }
  step2Click() {
    this.step2Completed = true;
    this.registrationSteps.next();
    this.step2 = false;
    this.step1 = false;
    this.step3 = true;
  }
  step3Click() {
    this.step3Completed = true;
  }
  click2Prev() {
    this.registrationSteps.previous();
    this.step2 = false;
    this.step1 = true;
    this.step3 = false;
  }
  click3Prev() {
    this.registrationSteps.previous();
    this.step2 = true;
    this.step1 = false;
    this.step3 = false;
  }

  newData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .postData(
        AppGlobal.apiPaths.contribution.createEmployee,
        this.service.createdetail
      )
      .then(
        (success: any) => {
          this.service.createemployee = success;
          if (success.msg) {
            if (Array.isArray(success.msg.errorMessage)) {
              if (success.msg.errorMessage.length !== 0) {
                this.data.errorResponse(success);
                this.fullspinner.empty.next(false);
                this.btnClicked = false;
              }
            }
          }
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.data.errorMethod(error);
        }
      );
  }

  openData() {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.contribution.openemployee,
        this.service.createemployee
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.createemployee = success;
          if (success.msg) {
            if (Array.isArray(success.msg.errorMessage.msgDescription)) {
              if (success.msg.errorMessage.msgDescription.length !== 0) {
                this.data.errorResponse(success);
                this.fullspinner.empty.next(false);
                this.btnClicked = false;
              }
            }
          }
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }

  saveData(c) {
    this.InvalidtinError = false;
    if (c.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.service.createdetail.protoentCSDetail = this.service.createemployee;
      this.data
        .postData(
          AppGlobal.apiPaths.contribution.insertcsdetail,
          this.service.createdetail
        )
        .then(
          (success: any) => {
            this.service.createdetail = success;
            this.service.createemployee =
              this.service.createdetail.protoentCSDetail;

            //this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            if (
              this.service.createemployee.detailStatusValue === "VALD" ||
              this.service.createemployee.detailStatusValue === "POST" ||
              this.service.createemployee.detailStatusValue === "APPR"
            ) {
              this.dialogRef.close(true);
            } else if (
              this.service.createdetail.funMsg != null &&
              this.service.createdetail.funMsg.errorMessage != null &&
              this.service.createdetail.funMsg.errorMessage.length > 0
            ) {
              this.data.constructErrorMsgArr(
                this.service.createdetail.funMsg.errorMessage
              );
            }
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
      if (
        this.service.createemployee.tin != "" &&
        this.service.createemployee.tin != null &&
        this.service.createemployee.tin != undefined &&
        this.service.createemployee.tin.length < 9
      ) {
        this.InvalidtinError = true;
      }
    }
  }

  onsubmit(em) {
    if (em.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.service.createdetail.protoentCSDetail = this.service.createemployee;
      this.data
        .postData(
          AppGlobal.apiPaths.contribution.submitemployee,
          this.service.createdetail
        )
        .then(
          (success: any) => {
            this.service.createemployee = success;
            if (success.msg) {
              if (Array.isArray(success.msg.errorMessage.msgDescription)) {
                if (success.msg.errorMessage.msgDescription.length !== 0) {
                  this.data.errorResponse(success);
                  this.fullspinner.empty.next(false);
                  this.btnClicked = false;
                }
              }
            }
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
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
  active(row) {
    this.activeIndex = row;
  }
  doCalcCCA() {
    this.service.createemployee.grossSalary === ""
      ? (this.service.createemployee.grossSalary = "0")
      : "";
    const percentage =
      parseFloat(this.service.createemployee.employerContriRate) +
      parseFloat(this.service.createemployee.employeeContriRate);
    const gSalary = parseFloat(this.service.createemployee.grossSalary);
    this.service.createemployee.complulsoryContri = (
      (gSalary * percentage) /
      100
    ).toFixed(2);
    this.CalculateTotalContribution();
  }

  doCalc() {
    console.log("ok");
  }

  CalculateTotalContribution() {
    this.service.createemployee.complulsoryContri === ""
      ? (this.service.createemployee.complulsoryContri = "0")
      : "";
    this.service.createemployee.employeeAddContri === ""
      ? (this.service.createemployee.employeeAddContri = "0")
      : "";
    this.service.createemployee.employerAddContri === ""
      ? (this.service.createemployee.employerAddContri = "0")
      : "";
    const totalcontribution =
      parseFloat(this.service.createemployee.complulsoryContri) +
      parseFloat(this.service.createemployee.employeeAddContri) +
      parseFloat(this.service.createemployee.employerAddContri);
    this.service.createemployee.totalContri = totalcontribution.toFixed(2);
  }

  CheckSurpressWarning(value) {
    value === true
      ? (this.service.createemployee.suppressWaringFlag = "Y")
      : (this.service.createemployee.suppressWaringFlag = "N");
  }

  retrivedata() {
    if (
      this.service.createemployee.fnpfNo === "" &&
      this.service.createemployee.tin === ""
    ) {
      this.fnpfError = true;
      this.tinError = true;
      return;
    }
    this.tinError = false;
    this.fnpfError = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.service.createdetail.protoentCSDetail = this.service.createemployee;
    this.data
      .postData(
        AppGlobal.apiPaths.contribution.retrievecsdetail,
        this.service.createdetail
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.createemployee = success;
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          // this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }
  openCode() {
    const dialogRef = this.dialog.open(SearchOccupationCodeComponent, {
      width: "700px",
      height: "80%",
    });
    dialogRef.afterClosed().subscribe((result) => {});
    this.searchoccupation = "";
  }

  closeDialogue() {
    this.dialogRef.close(true);
  }
}
