import { CdkStepper } from "@angular/cdk/stepper";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { EmployerRegistrationService } from "../employer-registration.service";

@Component({
  selector: "app-director-detail",
  templateUrl: "./director-detail.component.html",
  styleUrls: ["./director-detail.component.scss"],
})
export class DirectorDetailComponent implements OnInit {
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step1 = true;
  step2 = false;
  fileUploading = "";
  url = "";
  emailRequired = false;
  mobileRequired = false;
  fathernameRequired = true;
  mothernameRequired = true;
  timeout: any = null;
  constructor(
    public employer: EmployerRegistrationService,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialogRef: MatDialogRef<DirectorDetailComponent>,
    public appSettingService: AppSettingsService,
    public dialog: MatDialog
  ) {}
  @ViewChild("nom", { static: false }) nomineeForm;
  @ViewChild("nomContact", { static: false }) nomineeContactForm;
  @ViewChild("employerregistrationSteps", { static: false })
  employerregistrationSteps: CdkStepper;
  @ViewChild("memberMobile", { static: false })
  memberMobile;

  ngOnInit(): void {
    this.employer.errorTrue = false;
    this.checkRequired();
  }
  step1Click() {
    this.step1Completed = true;
    this.step1 = false;
    this.step2 = true;
    this.employerregistrationSteps.next();
  }
  step2Click() {
    this.step2Completed = true;
    // this.registrationSteps.selectedIndex = 2;
    this.employerregistrationSteps.next();
  }
  clickPrev() {
    this.employerregistrationSteps.previous();
  }
  clickPrevstep2() {
    this.employerregistrationSteps.previous();
    this.step1 = true;
    this.step2 = false;
  }

  uploadEmployerDirectorDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.pDocumentFile = file;
    const index =
      this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
    if (index !== -1) {
      this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
        index
      ] = document;
      this.fileUploading = "";
      this.fullspinner.empty.next(false);

      this.employer.newEmployer.pEmployerRegistrationContacts.pEmployerRegistrationContactsDocument =
        this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
          index
        ];
      this.saveDirectorDocumentSeparate();
    }
  }

  clearFile(document) {
    const index =
      this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
    if (index !== -1) {
      if (
        this.employer.newEmployer.pEmployerRegistrationContacts
          .plstEmployerRegistrationContactsDocument[index].pDocumentFile !==
          null &&
        this.employer.newEmployer.pEmployerRegistrationContacts
          .plstEmployerRegistrationContactsDocument[index].pDocumentFile
          .documentFileId > 0
      ) {
        this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
          index
        ].pDocumentFile.fileType = "";
        this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
          index
        ].pDocumentFile.fileSize = 0;
        this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
          index
        ].pDocumentFile.relativePath = "";
        this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
          index
        ].pDocumentFile.fileName = "";
        this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
          index
        ].pDocumentFile.uploadbyFullName = "";
        this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
          index
        ].pDocumentFile.istrFileContent = "";

        this.employer.newEmployer.pEmployerRegistrationContacts.pEmployerRegistrationContactsDocument =
          this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
            index
          ];
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
        this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument[
          index
        ].pDocumentFile = obj;
      }
    }
  }
  onKeySearch(event: any) {
    if (
      this.employer.newEmployer.pEmployerRegistrationContacts.fnpfNo !== "" &&
      (this.employer.newEmployer.pEmployerRegistrationContacts.fnpfNo.length ===
        7 ||
        this.employer.newEmployer.pEmployerRegistrationContacts.fnpfNo.length >=
          9)
    ) {
      this.loadcontactbyfnpfno();
    } else {
      this.employer.newEmployer.pEmployerRegistrationContacts.isAlreadyHavePortalAccess =
        "N";
      this.employer.newEmployer.pEmployerRegistrationContacts.preferredEmployerPortalUsername =
        "";
    }
  }
  loadcontactbyfnpfno() {
    this.data.clearErrorMsg();
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.employer.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.loadcontactbyfnpfno,
        this.employer.newEmployer.pEmployerRegistrationContacts
      )
      .then(
        (success: any) => {
          this.employer.newEmployer.pEmployerRegistrationContacts = success;
          this.employer.setAll(false);
          this.employer.btnClicked = false;
          if (
            this.employer.newEmployer.pEmployerRegistrationContacts.funMsg !=
              null &&
            this.employer.newEmployer.pEmployerRegistrationContacts.funMsg
              .errorMessage != null &&
            this.employer.newEmployer.pEmployerRegistrationContacts.funMsg
              .errorMessage.length > 0
          ) {
            this.data.constructErrorMsgArr(
              this.employer.newEmployer.pEmployerRegistrationContacts.funMsg
                .errorMessage
            );
          }
        },
        (error) => {
          this.employer.newEmployer.pEmployerRegistrationContacts.isAlreadyHavePortalAccess =
            "N";
          this.employer.newEmployer.pEmployerRegistrationContacts.preferredEmployerPortalUsername =
            "";
          this.employer.setAll(false);
          this.data.errorMethod(error);
          this.employer.btnClicked = false;
        }
      );
  }

  clearFNPF() {
    this.employer.newEmployer.pEmployerRegistrationContacts.isAlreadyHavePortalAccess =
      "N";
    this.employer.newEmployer.pEmployerRegistrationContacts.preferredEmployerPortalUsername =
      "";
  }

  saveDirectorDocumentSeparate() {
    this.data.clearErrorMsg();
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.employer.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.uploadseparate,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          if (
            this.employer.newEmployer.funMsg &&
            this.employer.newEmployer.funMsg.errorMessage &&
            this.employer.newEmployer.funMsg.errorMessage.length > 0
          ) {
            this.warningDoc(
              this.employer.newEmployer.funMsg.errorMessage,
              false
            );
          }
          this.employer.setAll(false);
          this.employer.btnClicked = false;
        },
        (error) => {
          this.employer.setAll(false);
          this.data.errorMethod(error);
          this.employer.btnClicked = false;
        }
      );
  }

  saveDirectorDocument() {
    this.data.clearErrorMsg();

    this.employer.errorTrue = false;
    let errorM: any = false;
    this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument.forEach(
      (element) => {
        // if (element.isMandatory === "Y") {
        //   if (element.pDocumentFile.fileName === "") {
        //     errorM = true;
        //   }
        // }
        if (element.isMandatory === "Y" && element.eitherValue === "") {
          if (element.pDocumentFile.fileName === "") {
            errorM = true;
            return;
          }
        }
        if (element.isMandatory === "Y" && element.eitherValue !== "") {
          let index =
            this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument
              .map((e: any) => {
                return e.documentTypeValue;
              })
              .indexOf(element.eitherValue);
          if (index > -1) {
            if (
              element.pDocumentFile.fileName === "" &&
              this.employer.newEmployer.pEmployerRegistrationContacts
                .plstEmployerRegistrationContactsDocument[index].pDocumentFile
                .fileName === ""
            ) {
              errorM = true;
              return;
            }
          }
        }
      }
    );
    if (errorM) {
      this.employer.errorTrue = true;
      return;
    }
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.employer.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.upload,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.employer.setAll(false);
          this.employer.btnClicked = false;

          if (
            this.employer.newEmployer.funMsg &&
            this.employer.newEmployer.funMsg.errorMessage &&
            this.employer.newEmployer.funMsg.errorMessage.length > 0
          ) {
            this.warningDocumentScreen(
              this.employer.newEmployer.funMsg.errorMessage,
              false
            );
          } else {
            this.step1Completed = true;
            this.employerregistrationSteps.next();
            this.step1 = false;
            this.step2 = true;
          }
        },
        (error) => {
          this.employer.setAll(false);
          this.data.errorMethod(error);
          this.employer.btnClicked = false;
        }
      );
  }
  doClose() {
    this.dialogRef.close();
  }
  saveDirectorContactDetails(m) {
    console.log();
    if (
      m.valid &&
      this.employer.newEmployer.pEmployerRegistrationContacts
        .businessAddressId != 0
    ) {
      this.employer.errorTrue = false;
      this.employer.btnClicked = true;
      this.employer.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.employerRegistration.contacts.save,
          this.employer.newEmployer
        )
        .then(
          (success: any) => {
            this.employer.newEmployer = success;
            this.employer.setAll(false);
            this.employer.btnClicked = false;
            if (
              this.employer.newEmployer.funMsg &&
              this.employer.newEmployer.funMsg.errorMessage &&
              this.employer.newEmployer.funMsg.errorMessage.length > 0
            ) {
              this.warningName(
                this.employer.newEmployer.funMsg.errorMessage,
                false
              );
            } else {
              this.doClose();
            }
          },
          (error) => {
            this.data.errorMethod(error);
            this.employer.setAll(false);
            this.employer.btnClicked = false;
          }
        );
    } else {
      this.employer.errorTrue = true;
    }
  }
  viewDocument(val) {
    if (val.pDocumentFile.fileName !== "") {
      if (val && val.pDocumentFile && val.pDocumentFile.documentFileId > 0) {
        const obj = {
          data: val.pDocumentFile.documentFileId,
        };
        this.fullspinner.empty.next(true);
        this.data
          .postData(AppGlobal.apiPaths.employerRegistration.view, obj)
          .then(
            (success: any) => {
              if (success && success.istrFileContent) {
                this.openFileViewer(success.istrFileContent);
              }
              this.fullspinner.empty.next(false);
            },
            (error: any) => {
              this.data.errorMethod(error);
              this.fullspinner.empty.next(false);
            }
          );
      } else if (
        val &&
        val.pDocumentFile &&
        val.pDocumentFile.istrFileContent
      ) {
        this.openFileViewer(val.pDocumentFile.istrFileContent);
      }
    }
  }
  openFileViewer(xurl) {
    const dialogRef = this.dialog.open(ViewPdfComponent, {
      width: "60%",
      height: "60%",
      data: {
        url: xurl,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  checkemailorphoneRequired() {
    this.emailRequired = true;
    this.mobileRequired = true;
    if (
      this.employer.newEmployer.pEmployerRegistrationContacts
        .workPhoneNumber !== ""
    ) {
      this.mobileRequired = true;
      this.emailRequired = false;
    }
    if (
      this.employer.newEmployer.pEmployerRegistrationContacts
        .workEmailAddress !== ""
    ) {
      this.mobileRequired = false;
      this.emailRequired = true;
    }
  }

  warningDoc(val, showotherbtn) {
    this.employer.errorTrue = false;
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        Otherbtn: showotherbtn,
        otherbtntext: "Cancel",
        warning: true,
        listofMessage: val,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      } else {
        this.clearFile(
          this.employer.newEmployer.pEmployerRegistrationContacts
            .pEmployerRegistrationContactsDocument
        );
      }
    });
  }

  warningName(val, showotherbtn) {
    this.employer.errorTrue = false;
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        Otherbtn: showotherbtn,
        otherbtntext: "Cancel",
        warning: true,
        listofMessage: val,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.doClose();
      }
    });
  }

  warningDocumentScreen(val, showotherbtn) {
    this.employer.errorTrue = false;
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        Otherbtn: showotherbtn,
        otherbtntext: "Cancel",
        warning: true,
        listofMessage: val,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.step1Completed = true;
        this.employerregistrationSteps.next();
        this.step1 = false;
        this.step2 = true;
      }
    });
  }
  checkRequired() {
    this.fathernameRequired = true;
    this.mothernameRequired = true;
    if (
      this.employer.newEmployer.pEmployerRegistrationContacts.fatherName !== ""
    ) {
      this.fathernameRequired = true;
      this.mothernameRequired = false;
    }
    if (
      this.employer.newEmployer.pEmployerRegistrationContacts.motherName !== ""
    ) {
      this.fathernameRequired = false;
      this.mothernameRequired = true;
    }
  }
  checkFileMandatory(value: any, items: any) {
    if (value.isMandatory === "Y" && value.eitherValue === "") {
      return true;
    }
    if (value.isMandatory === "Y" && value.eitherValue !== "") {
      let index = items
        .map((e: any) => {
          return e.documentTypeValue;
        })
        .indexOf(value.eitherValue);
      if (index > -1) {
        if (
          value.pDocumentFile.fileName === "" &&
          items[index].pDocumentFile.fileName === ""
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
