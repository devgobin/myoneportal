import { Component, OnInit, ViewChild } from "@angular/core";
import { CdkStepper } from "@angular/cdk/stepper";
import { Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { organizationcontactdetailservice } from "./organization-contact-detail.service";
import { SuccessAlertComponent } from "../../../../common/success-alert/success-alert.component";
import { MatDialog } from "@angular/material/dialog";
import { NgForm } from "@angular/forms";
import { AppSettingsService } from "src/app/service/app-settings.service";

@Component({
  selector: "app-organization-contact-detail",
  templateUrl: "./organization-contact-detail.component.html",
  styleUrls: ["./organization-contact-detail.component.scss"],
})
export class OrganizationContactDetailComponent implements OnInit {
  pageId = "ORGCD";
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  fileUploading = "";
  @ViewChild("registrationSteps", { static: false })
  registrationSteps: CdkStepper;
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild("mobilenumber", { static: false })
  mobilenumber;
  successTrue = false;
  btnClicked = false;
  loadingTrue = false;
  errorTrue = false;
  registered = false;

  brnRequired = false;
  ppnRequired = false;

  degnRequired = false;
  cscRequired = false;
  hpClicked = false;

  constructor(
    public router: Router,
    public contactservice: organizationcontactdetailservice,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public appSettingService: AppSettingsService
  ) {
    if (this.contactservice.contact.employerContactId === 0) {
      this.data.headerName = {
        screenName: "Add Organization Contacts",
        paths: [
          {
            name: "Home",
            link: "/app",
          },
          {
            name: "Organization Contacts",
            link: "/app/organization-contact-list",
          },
          {
            name: "Add",
            link: "",
          },
        ],
      };
    } else {
      this.data.headerName = {
        screenName: "Edit Organization Contacts",
        paths: [
          {
            name: "Home",
            link: "/app",
          },
          {
            name: "Organization Contacts",
            link: "/app/organization-contact-list",
          },
          {
            name: "Edit",
            link: "",
          },
        ],
      };
    }
  }

  ngOnInit(): void {
    this.getInitialData();
    this.LoadContactDetail();
  }
  getInitialData() {
    this.data.getData(AppGlobal.apiPaths.contact.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.contactservice.DDL[element.key] = element.value;
        });
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }
  LoadContactDetail() {
    if (this.contactservice.contact.employerContactId > 0) {
      const obj = {
        data: this.contactservice.contact.employerContactId,
      };
      this.fullspinner.empty.next(true);
      this.data.postData(AppGlobal.apiPaths.contact.open, obj).then(
        (success: any) => {
          setTimeout(() => {
            this.mobilenumber.checkPattern();
          }, 400);
          this.fullspinner.empty.next(false);
          this.contactservice.contact = success;
          this.CheckIfBRNRequiredOrNot();
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
        }
      );
    } else {
      this.fullspinner.empty.next(true);
      this.data.getData(AppGlobal.apiPaths.contact.new).then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.contactservice.contact = success;
          this.contactservice.contact.holdingPercentage = "";
          this.mobilenumber.clearValue();
          this.successTrue = true;
        },
        (error) => {
          this.data.errorMethod(error);
        }
      );
    }
  }
  submitInformation(m) {
    if (m.valid) {
      this.errorTrue = false;
      this.setAll(true);
      this.data
        .postData(
          AppGlobal.apiPaths.contact.submitInformation,
          this.contactservice.contact
        )
        .then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.contactservice.contact = success;
            this.contactservice.contact.holdingPercentage === "0.00"
              ? (this.contactservice.contact.holdingPercentage = "")
              : "";
            this.contactservice.contact.holdingPercentage === "0"
              ? (this.contactservice.contact.holdingPercentage = "")
              : "";
            this.successTrue = true;
            this.btnClicked = false;
            this.data.successMesaage(success);
            this.step1Click();
            this.setAll(false);
            this.CheckRequired();
          },
          (error) => {
            this.data.errorMethod(error);
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.setAll(false);
          }
        );
    } else {
      this.setAll(false);
      this.errorTrue = true;
    }
  }
  submitEmploymentInformation(m) {
    if (m.valid && this.contactservice.contact.businessAddressId !== 0) {
      this.errorTrue = false; 
      this.setAll(true);
      this.data
        .postData(
          AppGlobal.apiPaths.contact.submitemployementinformation,
          this.contactservice.contact
        )
        .then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.contactservice.contact = success;
            this.contactservice.contact.holdingPercentage === "0.00"
              ? (this.contactservice.contact.holdingPercentage = "")
              : "";
            this.contactservice.contact.holdingPercentage === "0"
              ? (this.contactservice.contact.holdingPercentage = "")
              : "";
            console.log(
              "value is" + this.contactservice.contact.holdingPercentage
            );
            this.successTrue = true;
            this.step2Click();
            this.registered = true;
            this.loadDocument();
            this.btnClicked = false;
          },
          (error) => {
            this.data.errorMethod(error);
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.setAll(false);
          }
        );
    } else {
      this.setAll(false);
      this.errorTrue = true;
    }
  }
  step1Click() {
    this.step1Completed = true;
    this.registrationSteps.next();
  }
  setAll(val) {
    this.btnClicked = val;
    this.loadingTrue = val;
    this.fullspinner.empty.next(val);
  }
  submit(emp) {
    if (emp.valid) {
      if(this.contactservice.contact.businessAddressId > 0 
        || this.contactservice.contact.businessAddressId !== 0) { 
      this.errorTrue = false;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.contact.submit,
          this.contactservice.contact
        )
        .then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.contactservice.contact = success;
            this.successTrue = true;
            this.contactservice.contact.holdingPercentage === "0.00"
              ? (this.contactservice.contact.holdingPercentage = "")
              : "";
            this.contactservice.contact.holdingPercentage === "0"
              ? (this.contactservice.contact.holdingPercentage = "")
              : "";
            console.log(
              "value is" + this.contactservice.contact.holdingPercentage
            );
            this.data.successMesaage(success);
            this.step2Click();
            this.successalert();
            this.registered = true;
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.setAll(false);
          }
        );
    } 
  }else {
      this.errorTrue = true;
    }
  }
  step2Click() {
    this.step2Completed = true;
    this.registrationSteps.next();
  }
  step3Click() {
    this.step2Completed = true;
    this.registrationSteps.next();
  }
  clickPrev() {
    this.registrationSteps.previous();
    this.fullspinner.empty.next(false);
    this.btnClicked = false;
    this.errorTrue = false;
  }
  loadDocument() {
    this.errorTrue = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.contact.loademployercontactdocument,
        this.contactservice.contact
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.contactservice.contact = success;
          this.successTrue = true;
          //this.data.successMesaage(success);
          this.step2Click();
          this.registered = true;
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.setAll(false);
        }
      );
  }
  uploadMemberDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.pdocumentFile.fileType = file.fileType;
    document.pdocumentFile.fileSize = file.fileSize;
    document.pdocumentFile.relativePath = file.relativePath;
    document.pdocumentFile.fileName = file.fileName;
    document.pdocumentFile.istrFileContent = file.istrFileContent;
    const index = this.contactservice.contact.lstProtoEmployerContactDocument
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      this.contactservice.contact.lstProtoEmployerContactDocument[
        index
      ] = document;
      this.fileUploading = "";
      this.fullspinner.empty.next(false);
    }
  }
  clearFile(document) {
    const index = this.contactservice.contact.lstProtoEmployerContactDocument
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      if (
        this.contactservice.contact.lstProtoEmployerContactDocument[index]
          .pdocumentFile !== null &&
        this.contactservice.contact.lstProtoEmployerContactDocument[index]
          .pdocumentFile.documentFileId > 0
      ) {
        this.contactservice.contact.lstProtoEmployerContactDocument[
          index
        ].pdocumentFile.fileType = "";
        this.contactservice.contact.lstProtoEmployerContactDocument[
          index
        ].pdocumentFile.fileSize = 0;
        this.contactservice.contact.lstProtoEmployerContactDocument[
          index
        ].pdocumentFile.relativePath = "";
        this.contactservice.contact.lstProtoEmployerContactDocument[
          index
        ].pdocumentFile.fileName = "";
        this.contactservice.contact.lstProtoEmployerContactDocument[
          index
        ].pdocumentFile.uploadbyFullName = "";
        this.contactservice.contact.lstProtoEmployerContactDocument[
          index
        ].pdocumentFile.istrFileContent = "";
      } else {
        const obj = {
          documentFileId: 0,
          fileType: "",
          fileSize: 0,
          relativePath: "",
          fileName: "",
          uploadbyFullName: "",
          istrFileContent: "",
        };
        this.contactservice.contact.lstProtoEmployerContactDocument[
          index
        ].pdocumentFile = obj;
      }
    }
  }
  documentSubmited() {
    let errorM: any = false;
    this.contactservice.contact.lstProtoEmployerContactDocument.forEach(
      (element) => {
        if (element.isMandatory === "Y") {
          if (element.pdocumentFile.fileName === "") {
            errorM = true;
            return;
          }
        }
      }
    );
    if (errorM === true) {
      this.errorTrue = true;
      return;
    }

    this.errorTrue = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.contact.submit, this.contactservice.contact)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.contactservice.contact = success;
          this.successTrue = true;
          this.data.successMesaage(success);
          this.step3Click();
          this.successalert();
          this.registered = true;
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.setAll(false);
        }
      );
  }
  CheckIfBRNRequiredOrNot() {
    this.brnRequired = false;
    this.ppnRequired = false;
    if (this.contactservice.contact.nationalityValue === "FJI") {
      this.brnRequired = true;
    } else if (
      this.contactservice.contact.nationalityValue !== "FJI" &&
      this.contactservice.contact.nationalityValue !== ""
    ) {
      this.ppnRequired = true;
    }
  }
  CheckRequired() {
    this.degnRequired = false;
    this.cscRequired = false;
    this.hpClicked = false;
    if (this.contactservice.contact.contactTypeValue === "CSCT") {
      this.cscRequired = true;
      this.degnRequired = true;
    } else if (this.contactservice.contact.contactTypeValue === "SHLR") {
      this.hpClicked = true;
    } else if (
      this.contactservice.contact.contactTypeValue === "PRMY" ||
      this.contactservice.contact.contactTypeValue === "OTHR"
    ) {
      this.degnRequired = true;
    }
  }
  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Successfully Completed",
        Showbtn1: true,
        button1: "Back",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.navigateProfile();
      }
    });
  }
  navigateProfile() {
    this.router.navigateByUrl("/app/organization-contact-list");
  }
}
