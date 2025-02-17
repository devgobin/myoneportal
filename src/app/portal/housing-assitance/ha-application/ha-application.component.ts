import { CdkStepper } from "@angular/cdk/stepper";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { CommonAlertComponent } from "src/app/common/common-alert/common-alert.component";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { HousingAssistanceService } from "../housing-assitance.service";
import { AddressComponent } from "./address/address.component";
import { ApplicantDetailComponent } from "./applicant-detail/applicant-detail.component";
@Component({
  selector: "app-ha-application",
  templateUrl: "./ha-application.component.html",
  styleUrls: ["./ha-application.component.scss"],
})
export class HaApplicationComponent implements OnInit {
  pageId = "HAADT";
  sample = "";
  btnClicked = false;
  disabled = false;
  errorTrue = false;
  activeIndex: number;
  applicantColumns: string[] = [
    "fnpfNo",
    "firstName",
    "tin",
    "dob",
    "promisApplicationId",
    "applicantApplicationStatusDescription",
    "approvedAmount",
    "requestedAmount",
    "actualMemberEligibility",
    "action",
    "delete",
  ];
  checkColumns: string[] = [
    "checklistTypeDescription",
    "isChecked",
    "orgContactName",
    "checkedDate",
  ];
  applicantSource: any = new MatTableDataSource();
  checkSource: any = new MatTableDataSource();
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step4Completed = false;
  step5Completed = false;
  step6Completed = false;
  fileUploading = "";
  today = new Date();
  yesterday = new Date(this.today);

  @ViewChild("registrationSteps", { static: false })
  registrationSteps: CdkStepper;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: HousingAssistanceService,
    public appSettingService: AppSettingsService
  ) { }

  ngOnInit(): void {
    this.GetInitialData();
  }

  GetInitialData() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.housingassitance.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.service.DDL[element.key] = element.value;
        });
        this.fullspinner.empty.next(false);
        this.init();
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  init() {
    if (
      this.service.ProtoHousingAssitanceApplication
        .housingAssistanceApplicationId > 0
    ) {
      this.getData(
        this.service.ProtoHousingAssitanceApplication
          .housingAssistanceApplicationId
      );
    } else if (
      this.service.ProtoHousingAssitanceApplication
        .housingAssistanceApplicationId === 0
    ) {
      this.createData();
    }
  }

  step1Click() {
    this.step1Completed = true;
    this.registrationSteps.next();
  }
  step2Click() {
    this.step2Completed = true;
    this.registrationSteps.next();
  }
  step3Click() {
    this.step3Completed = true;
    this.registrationSteps.next();
  }
  step4Click() {
    this.step4Completed = true;
    this.registrationSteps.next();
  }
  step5Click() {
    this.step5Completed = true;
    this.registrationSteps.next();
  }
  step6Click() {
    this.step6Completed = true;
  }
  clickPrev() {
    this.registrationSteps.previous();
  }
  active(row) {
    this.activeIndex = row;
  }
  openaddress(val): void {
    const dialogRef = this.dialog.open(AddressComponent, {
      width: "600px",
      height: "500px",
      data: val,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  openApplicant(val) {
    this.service.ProtoHousingAssitanceApplication.pApplicant = val;
    this.OpenApplicant();
  }

  CreateNewApplicant() {
    this.service.ProtoHousingAssitanceApplication.pApplicant.housingAssistanceApplicantId = 0;
    this.OpenApplicant();
  }
  OpenApplicant(): void {
    // this.service.ProtoHousingAssitanceApplicant.housingAssistanceApplicantId = val.housingAssistanceApplicantId;
    const dialogRef = this.dialog.open(ApplicantDetailComponent, {
      width: "90%",
      height: "90%",
      data: this.service.ProtoHousingAssitanceApplication.pApplicant,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.applicantSource = new MatTableDataSource(
        this.service.ProtoHousingAssitanceApplication.plstApplicants
      );
      setTimeout(() => {
        this.applicantSource.paginator = this.paginator;
        this.applicantSource.sort = this.sort;
      }, 400);
    });
  }
  createData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .getData(AppGlobal.apiPaths.housingassitance.create)
      .then((success: any) => {
        this.service.ProtoHousingAssitanceApplication = success;
        this.service.ProtoHousingAssitanceApplication.pLoadDetail
          .totalLoanAmount === "0"
          ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.totalLoanAmount =
            "")
          : "";

        this.service.ProtoHousingAssitanceApplication.pLoadDetail
          .originalLoanAmount === "0"
          ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.originalLoanAmount =
            "")
          : "";

        this.service.ProtoHousingAssitanceApplication.pLoadDetail
          .existingHousingLoanAmount === "0"
          ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.existingHousingLoanAmount =
            "")
          : "";

        this.service.ProtoHousingAssitanceApplication.pLoadDetail
          .monthlyRepaymentAmount === "0"
          ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.monthlyRepaymentAmount =
            "")
          : "";

        this.service.ProtoHousingAssitanceApplication.pLoadDetail
          .repaymentPeriod === 0
          ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.repaymentPeriod = null)
          : null;

        this.service.ProtoHousingAssitanceApplication.pLoadDetail
          .remainingPaymentPeriod === 0
          ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.remainingPaymentPeriod = null)
          : null;

        this.service.ProtoHousingAssitanceApplication.pLoadDetail
          .variableInterstRate === "0"
          ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.variableInterstRate =
            "")
          : "";
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      });
    (error) => {
      this.fullspinner.empty.next(false);
      this.btnClicked = false;
      this.data.errorMethod(error);
    };
  }
    getData(val) {
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      const obj = {
        data: val,
      };
      this.data.postData(AppGlobal.apiPaths.housingassitance.open, obj).then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.ProtoHousingAssitanceApplication = success;
          if (
            this.service.ProtoHousingAssitanceApplication.statusValue === "PENSB"
          ) {
            this.btnClicked = false;
            this.disabled = false;
          } else {
            this.btnClicked = true;
            this.disabled = true;
          }
          this.service.ProtoHousingAssitanceApplication.pLoadDetail
            .totalLoanAmount === "0"
            ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.totalLoanAmount =
              "")
            : "";

          this.service.ProtoHousingAssitanceApplication.pLoadDetail
            .originalLoanAmount === "0"
            ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.originalLoanAmount =
              "")
            : "";

          this.service.ProtoHousingAssitanceApplication.pLoadDetail
            .existingHousingLoanAmount === "0"
            ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.existingHousingLoanAmount =
              "")
            : "";

          this.service.ProtoHousingAssitanceApplication.pLoadDetail
            .monthlyRepaymentAmount === "0"
            ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.monthlyRepaymentAmount =
              "")
            : "";

          // this.service.ProtoHousingAssitanceApplication.pLoadDetail.repaymentPeriod === 0 ? this.service.ProtoHousingAssitanceApplication.pLoadDetail.repaymentPeriod = null : null;

          // this.service.ProtoHousingAssitanceApplication.pLoadDetail.remainingPaymentPeriod === 0 ? this.service.ProtoHousingAssitanceApplication.pLoadDetail.remainingPaymentPeriod = null : null;

          this.service.ProtoHousingAssitanceApplication.pLoadDetail
            .variableInterstRate === "0"
            ? (this.service.ProtoHousingAssitanceApplication.pLoadDetail.variableInterstRate =
              "")
            : "";

          this.applicantSource = new MatTableDataSource(
            this.service.ProtoHousingAssitanceApplication.plstApplicants
          );
          this.checkSource = new MatTableDataSource(
            this.service.ProtoHousingAssitanceApplication.plstChecklist
          );
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
    }
  onsubmit(h) {
    if (h.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.housingassitance.save,
          this.service.ProtoHousingAssitanceApplication
        )
        .then(
          (success: any) => {
            this.service.ProtoHousingAssitanceApplication = success;
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.step1Click();
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
  updateData(p) {
    if (p.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.housingassitance.update,
          this.service.ProtoHousingAssitanceApplication
        )
        .then(
          (success: any) => {
            this.service.ProtoHousingAssitanceApplication = success;
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
  savepropertyData(p) {
    if (p.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.housingassitance.saveproperty,
          this.service.ProtoHousingAssitanceApplication
        )
        .then(
          (success: any) => {
            this.service.ProtoHousingAssitanceApplication = success;
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.step2Click();
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

  checkdelete(val): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this Applicant",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dodelete(val);
      }
    });
  }
  dodelete(val) {
    this.fullspinner.empty.next(true);
    this.service.ProtoHousingAssitanceApplication.pApplicant = val;
    this.data
      .postData(AppGlobal.apiPaths.housingassitance.applicantdelete, this.service.ProtoHousingAssitanceApplication)
      .then(
        (success: any) => {
          this.service.ProtoHousingAssitanceApplication = success;
          this.applicantSource = new MatTableDataSource(
            this.service.ProtoHousingAssitanceApplication.plstApplicants
          );
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }
  savedocument() {
    let errorM: any = false;
    let msg = "";
    this.service.ProtoHousingAssitanceApplication.plstDocument.forEach(
      (element) => {
        if (element.isMandatory === "Y") {
          if (
            element.pDocumentFile.fileName === "" &&
            element.pDocumentFile.istrFileContent === ""
          ) {
            if (msg === "") {
              msg = element.documentTypeDescription + " is required";
            }
            errorM = true;
          }
        }
      }
    );
    if (errorM === true) {
      this.errorTrue = true;
      return;
    }
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.housingassitance.document,
        this.service.ProtoHousingAssitanceApplication
      )
      .then(
        (success: any) => {
          this.service.ProtoHousingAssitanceApplication = success;
          this.checkSource = new MatTableDataSource(
            this.service.ProtoHousingAssitanceApplication.plstChecklist
          );
          this.data.successMesaage(success);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.step4Click();
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }
  uploadDocument(file, document) {
    this.fileUploading = file.documentTypeValue;
    this.fullspinner.empty.next(true);
    if (this.service.ProtoHousingAssitanceApplication.plstDocument.length > 0) {
      for (
        let i = 0;
        i < this.service.ProtoHousingAssitanceApplication.plstDocument.length;
        i++
      ) {
        if (
          this.service.ProtoHousingAssitanceApplication.plstDocument[i]
            .documentTypeValue == document.documentTypeValue
        ) {
          this.service.ProtoHousingAssitanceApplication.plstDocument[
            i
          ].pDocumentFile = file;
        }
      }
    }
    this.fullspinner.empty.next(false);
  }
  clearFile(document) {
    const index = this.service.ProtoHousingAssitanceApplication.plstDocument
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      const obj = {
        documentFileId: 0,
        fileType: "",
        fileSize: "",
        relativePath: "",
        fileName: "",
        istrFileContent: "",
      };
      this.service.ProtoHousingAssitanceApplication.plstDocument[
        index
      ].documentFile = obj;
    }
  }

  printEligibiltyStatement() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .pdf(AppGlobal.apiPaths.housingassitance.printprefilledform, this.service.ProtoHousingAssitanceApplication)
      .then(
        (success: any) => {
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.openPDFViewer(success);
        },
        (error) => {
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  PrintConditionalApprovalLetter() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .pdf(AppGlobal.apiPaths.housingassitance.printconditionalapprovalform,this.service.ProtoHousingAssitanceApplication)
      .then(
        (success: any) => {
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.openPDFViewer(success);
        },
        (error) => {
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  PrintApprovalLetter() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .getpdf(AppGlobal.apiPaths.housingassitance.printapprovalform)
      .then(
        (success: any) => {
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.openPDFViewer(success);
        },
        (error) => {
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  openPDFViewer(xurl) {
    const dialogRef = this.dialog.open(ViewPdfComponent, {
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.logout();
      }
    });
  }

  submitwithdrawalapplication() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.housingassitance.submitwithdrawalapplication,
        this.service.ProtoHousingAssitanceApplication
      )
      .then(
        (success: any) => {
          this.service.ProtoHousingAssitanceApplication = success;
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.step6Click();
          this.successalert();
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }

  savewithdrawalhousingchecklist(val) {
    // if (p.valid)
    {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.service.ProtoHousingAssitanceApplication.pcheckList=val;
      this.data
        .postData(
          AppGlobal.apiPaths.housingassitance.savewithdrawalhousingchecklist,
          this.service.ProtoHousingAssitanceApplication
        )
        .then(
          (success: any) => {
            this.service.ProtoHousingAssitanceApplication = success;
            this.checkSource = new MatTableDataSource(
              this.service.ProtoHousingAssitanceApplication.plstChecklist
            );
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    }
    // else {
    //   this.errorTrue = true;
    // }
  }

  CheckCheckList(checklist, value) {
    value === true ? (checklist.isChecked = "Y") : (checklist.isChecked = "N");
    this.savewithdrawalhousingchecklist(checklist);
  }

  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "550px",
      disableClose: true,
      data: {
        msg: "Application submitted successfully.",
        Showbtn1: true,
        button1: "Back",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.navigateProfile();
    });
  }
  navigateProfile() {
    this.router.navigateByUrl("/app/housing-assistance");
  }

  CheckCheckListMandatory() {
    let errorM: any = false;
    let msg = "";
    this.service.ProtoHousingAssitanceApplication.plstChecklist.forEach(
      (element) => {
        if (element.isMandatory === "Y") {
          if (element.isChecked === "N") {
            errorM = true;
          }
        }
      }
    );
    if (errorM === true) {
      this.data.errorMesaageOnly(
        "Please complete all mandatory checklist (* marked) to proceed further."
      );
      this.errorTrue = true;
      return;
    }

    this.step5Click();
  }

  validateapplicants() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.housingassitance.validateapplicants,
        this.service.ProtoHousingAssitanceApplication
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.step3Click();
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }

  cancelApplicationAlert(): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg:
          "Cancelled application cannot be modified or submitted. Are you sure, you want to cancel this Application ?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cancelHousingApplication();
      }
    });
  }

  cancelHousingApplication() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.housingassitance.cancel,
        this.service.ProtoHousingAssitanceApplication
      )
      .then(
        (success: any) => {
          this.service.ProtoHousingAssitanceApplication = success;
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
  }
}
