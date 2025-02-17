import { CdkStepper } from "@angular/cdk/stepper";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Storage } from "@ionic/storage";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { MicrofinanceAssistanceService } from "../microfinance-assistance.service";
import { MicrofinanceAssistanceAddressComponent } from "./microfinance-assistance-address/microfinance-assistance-address.component";
import { MicrofinancePostalAddressComponent } from "./microfinance-postal-address/microfinance-postal-address.component";
import { MicrofinanceResidentialAddressComponent } from "./microfinance-residential-address/microfinance-residential-address.component";
import { stringify } from "@angular/compiler/src/util";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { Router } from "@angular/router";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { isBuffer } from "util";

@Component({
  selector: "app-microfinance-assistance-detail",
  templateUrl: "./microfinance-assistance-detail.component.html",
  styleUrls: ["./microfinance-assistance-detail.component.scss"],
})
export class MicrofinanceAssistanceDetailComponent implements OnInit {
  pageId = "MROFD";
  btnClicked = false;
  disabled = false;
  loadingTrue = false;
  errorFnpfNoTrue = false;
  error1True = false;
  error2True = false;
  error3True = false;
  error4True = false;
  error5True = false;
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step4Completed = false;
  step5Completed = false;
  step6Completed = false;
  fileUploading = "";
  currentDate: any;
  @ViewChild("microassistanceSteps", { static: false })
  microassistanceSteps: CdkStepper;
  @ViewChild("MobileNo", { static: false }) MobileNo;
  @ViewChild("homeNo", { static: false }) homeNo;
  @ViewChild("workNo", { static: false }) workNo;
  constructor(
    public service: MicrofinanceAssistanceService,
    public appSettingService: AppSettingsService,
    public data: DataService,
    public storage: Storage,
    public fullspinner: FullSpinnerService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.data.headerName = {
      screenName: "Microbusiness Assistance",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Microbusiness Assistance",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getMicroFinanceInitialData();
  }

  getMicroFinanceInitialData() {
    this.currentDate = new Date();
    if (this.data.token !== "") {
      this.fullspinner.empty.next(true);
      this.data
        .getData(
          AppGlobal.apiPaths.microfinanceAssistance.getMicroFinanceInitialData
        )
        .then(
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
    } else {
      setTimeout(() => {
        this.getMicroFinanceInitialData();
      }, 300);
    }
  }

  init() {
    if (this.data.token !== "") {
      this.storage.get("microfinanceApplicationId").then((val) => {
        this.service.microfinance.microfinanceApplicationId = val;
        if (this.service.microfinance.microfinanceApplicationId > 0) {
          this.getData(this.service.microfinance.microfinanceApplicationId);
        } else {
          this.createData();
        }
      });
    } else {
      setTimeout(() => {
        this.init();
      }, 300);
    }
  }

  createData() {
    this.data.getData(AppGlobal.apiPaths.microfinanceAssistance.create).then(
      (success: any) => {
        this.service.microfinance = success;
        this.service.microfinance.fnpfContributionAmount = "";
        this.service.microfinance.loanAmount = "";
        this.service.microfinance.balanceLoanAmount = "";
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }

  getData(microfinanceApplicationId) {
    const obj = {
      data: microfinanceApplicationId,
    };
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.microfinanceAssistance.open, obj)
      .then(
        (success: any) => {
          this.service.microfinance = success;
          if (this.service.microfinance.fnpfContributionAmount === "0.00") {
            this.service.microfinance.fnpfContributionAmount = "";
          }
          if (this.service.microfinance.loanAmount === "0.00") {
            this.service.microfinance.loanAmount = "";
          }
          if (this.service.microfinance.balanceLoanAmount === "0.00") {
            this.service.microfinance.balanceLoanAmount = "0";
          }
          setTimeout(() => {
            this.MobileNo.checkPattern();
            this.workNo.checkPattern();
            this.homeNo.checkPattern();
          }, 400);
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  clickPrev() {
    this.microassistanceSteps.previous();
  }

  step1Click() {
    this.step1Completed = true;
    this.microassistanceSteps.next();
  }

  step2Click() {
    this.step2Completed = true;
    this.microassistanceSteps.next();
  }

  step3Click() {
    this.step3Completed = true;
    this.microassistanceSteps.next();
  }

  step4Click() {
    this.step4Completed = true;
    this.microassistanceSteps.next();
  }

  step5Click() {
    this.step5Completed = true;
    this.microassistanceSteps.next();
  }

  step6Click() {
    this.step6Completed = true;
    this.microassistanceSteps.next();
  }

  saveApplicantDetails(a) {
    if (
      a.valid &&
      this.service.microfinance.ibusMicroFinanceApplicationApplicant
        .ibusMicroFinanceApplicationResidentialAddress.line1 !== ""
    ) {
      if (
        this.service.microfinance.ibusMicroFinanceApplicationApplicant
          .preferredCommunicationValue === "POSTL"
      ) {
        if (
          this.service.microfinance.ibusMicroFinanceApplicationApplicant
            .ibusMicroFinanceApplicationPostalAddress.line1 !== ""
        ) {
        } else {
          this.error1True = true;
          return;
        }
      }
      this.loadingTrue = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.microfinanceAssistance.saveApplicantDetails,
          this.service.microfinance
        )
        .then(
          (success: any) => {
            this.service.microfinance = success;
            this.step1Click();
            this.fullspinner.empty.next(false);
            this.loadingTrue = false;
          },
          (error: any) => {
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
            this.loadingTrue = false;
          }
        );
    } else {
      this.error1True = true;
      this.errorFnpfNoTrue = true;
      this.loadingTrue = false;
    }
  }

  saveLoanDetails(l) {
    if (l.valid) {
      this.loadingTrue = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.microfinanceAssistance.saveLoanDetails,
          this.service.microfinance
        )
        .then(
          (success: any) => {
            this.service.microfinance = success;
            this.step4Click();
            this.fullspinner.empty.next(false);
            this.loadingTrue = false;
          },
          (error: any) => {
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
            this.loadingTrue = false;
          }
        );
    } else {
      this.error4True = true;
      this.loadingTrue = false;
    }
  }

  saveBusinessDetails(b) {
    if (
      b.valid &&
      this.service.microfinance.ibusMicroFinanceApplicationBusinessDetails
        .ibusMicroFinanceApplicationBusinessAddress.line1 !== ""
    ) {
    } else {
      this.error3True = true;
      return;
    }
    if (b.valid) {
      this.loadingTrue = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.microfinanceAssistance.saveBusinessDetails,
          this.service.microfinance
        )
        .then(
          (success: any) => {
            this.service.microfinance = success;
            this.step3Click();
            this.fullspinner.empty.next(false);
            this.loadingTrue = false;
          },
          (error: any) => {
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
            this.loadingTrue = false;
          }
        );
    } else {
      this.error3True = true;
      this.loadingTrue = false;
    }
  }

  saveBusinessOwnerDetails(o) {
    if (o.valid) {
      this.loadingTrue = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.microfinanceAssistance.saveBusinessOwnerDetails,
          this.service.microfinance
        )
        .then(
          (success: any) => {
            this.service.microfinance = success;
            this.step2Click();
            this.fullspinner.empty.next(false);
            this.loadingTrue = false;
          },
          (error: any) => {
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
            this.loadingTrue = false;
          }
        );
    } else {
      this.error2True = true;
      this.loadingTrue = false;
    }
  }

  getApplicantDetailbyFNPFNo() {
    if (
      this.service.microfinance.ibusMicroFinanceApplicationApplicant
        .applicantFnpfNo !== ""
    ) {
      const obj = {
        data: this.service.microfinance.ibusMicroFinanceApplicationApplicant
          .applicantFnpfNo,
      };
      this.loadingTrue = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.microfinanceAssistance.getApplicantDetailbyFNPFNo,
          this.service.microfinance
        )
        .then(
          (success: any) => {
            this.service.microfinance = success;
            setTimeout(() => {
              this.MobileNo.checkPattern();
              this.workNo.checkPattern();
              this.homeNo.checkPattern();
            }, 400);
            this.fullspinner.empty.next(false);
            this.loadingTrue = false;
          },
          (error: any) => {
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
            this.loadingTrue = false;
          }
        );
    } else {
      this.errorFnpfNoTrue = true;
    }
  }

  printPreFilledForm(l) {
    if (l.valid) {
      this.loadingTrue = true;
      this.fullspinner.empty.next(true);
      this.data
        .pdf(
          AppGlobal.apiPaths.microfinanceAssistance.printPreFilledForm,
          this.service.microfinance
        )
        .then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.loadingTrue = false;
            this.openPDFViewer(success);
          },
          (error: any) => {
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
            this.loadingTrue = false;
          }
        );
    } else {
      this.error4True = true;
      this.loadingTrue = false;
    }
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

  submitApplication() {
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.microfinanceAssistance.submitApplication,
        this.service.microfinance
      )
      .then(
        (success: any) => {
          this.service.microfinance = success;
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          this.successalert();
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }
  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Application Submitted Successfully",
        Showbtn1: true,
        button1: "Ok",
        Showbtn2: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigateByUrl("/app/microfinance-assistance");
      }
    });
  }
  generatePaymentLetter() {
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.microfinanceAssistance.generatePaymentLetter,
        this.service.microfinance
      )
      .then(
        (success: any) => {
          this.service.microfinance = success;
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  generateApprovalLetter() {
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.microfinanceAssistance.generateApprovalLetter,
        this.service.microfinance
      )
      .then(
        (success: any) => {
          this.service.microfinance = success;
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  uploadDocument(file, document) {
    this.fileUploading = file.documentTypeValue;
    this.fullspinner.empty.next(true);
    if (
      this.service.microfinance.ilstbusMicroFinanceApplicationDocument.length >
      0
    ) {
      for (
        let i = 0;
        i <
        this.service.microfinance.ilstbusMicroFinanceApplicationDocument.length;
        i++
      ) {
        if (
          this.service.microfinance.ilstbusMicroFinanceApplicationDocument[i]
            .documentTypeValue == document.documentTypeValue
        ) {
          this.service.microfinance.ilstbusMicroFinanceApplicationDocument[
            i
          ].ibusDocumentFile = file;
        }
      }
    }
    this.fullspinner.empty.next(false);
  }

  clearFile(document) {
    const index =
      this.service.microfinance.ilstbusMicroFinanceApplicationDocument
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
      this.service.microfinance.ilstbusMicroFinanceApplicationDocument[
        index
      ].documentFile = obj;
    }
  }

  saveDocumentDetails() {
    let errorM: any = false;
    let msg = "";
    this.service.microfinance.ilstbusMicroFinanceApplicationDocument.forEach(
      (element) => {
        if (element.isMandatory === "Y") {
          if (
            element.ibusDocumentFile.fileName === "" &&
            element.ibusDocumentFile.istrFileContent === ""
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
      this.error5True = true;
      return;
    }
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.microfinanceAssistance.saveDocumentDetails,
        this.service.microfinance
      )
      .then(
        (success: any) => {
          this.service.microfinance = success;
          this.step5Click();
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  openrbusinessaddress() {
    const dialogRef = this.dialog.open(MicrofinanceAssistanceAddressComponent, {
      width: "600px",
      height: "400px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  openresidentialaddress() {
    const dialogRef = this.dialog.open(
      MicrofinanceResidentialAddressComponent,
      {
        width: "600px",
        height: "400px",
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  openpostaladdress() {
    const dialogRef = this.dialog.open(MicrofinancePostalAddressComponent, {
      width: "600px",
      height: "400px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  getAmount() {
    let calculateAmount =
      Number(this.service.microfinance.loanAmount) -
      Number(this.service.microfinance.fnpfContributionAmount);
    if (calculateAmount < 0) {
      calculateAmount = 0;
    }
    this.service.microfinance.balanceLoanAmount = stringify(calculateAmount);
  }

  getBusinessOwnerDetailbyFNPFNo() {
    if (
      this.service.microfinance.ibusMicroFinanceApplicationBusinessDetails
        .ownerFnpfNo !== ""
    ) {
      const obj = {
        data: this.service.microfinance
          .ibusMicroFinanceApplicationBusinessDetails.ownerFnpfNo,
      };
      this.loadingTrue = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.microfinanceAssistance
            .getBusinessOwnerDetailbyFNPFNo,
          this.service.microfinance
        )
        .then(
          (success: any) => {
            this.service.microfinance = success;
            setTimeout(() => {
              this.MobileNo.checkPattern();
              this.workNo.checkPattern();
              this.homeNo.checkPattern();
            }, 400);
            this.fullspinner.empty.next(false);
            this.loadingTrue = false;
          },
          (error: any) => {
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
            this.loadingTrue = false;
          }
        );
    } else {
      this.errorFnpfNoTrue = true;
    }
  }
}
