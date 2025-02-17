import { CdkStepper } from "@angular/cdk/stepper";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { of } from "rxjs";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { DirectorDetailComponent } from "../director-detail/director-detail.component";
import { EmployerRegistrationService } from "../employer-registration.service";

@Component({
  selector: "app-primary-contact-detail",
  templateUrl: "./primary-contact-detail.component.html",
  styleUrls: ["./primary-contact-detail.component.scss"],
})
export class PrimaryContactDetailComponent implements OnInit {
  activeIndex: number;
  emailRequired = false;
  mobileRequired = false;
  step1Completed = false;
  step2Completed = false;
  step1 = true;
  step2 = false;
  fathernameRequired = true;
  mothernameRequired = true;
  directorSource: any = new MatTableDataSource();
  directordisplayColumns: string[] = ["Select", "tinNo", "fullName"];
  fileUploading = "";
  url = "";
  step1Heading = "Primary Contact Document Upload";

  SelectedDirector = {
    employerRegistrationContactId: 0,
    employerRegistrationId: 0,
    businessAddressId: 0,
    percentageHolding: "",
    faxNo: "",
    workEmailAddress: "",
    fnpfNo: "",
    ocrJsonValue: "",
    contactTypeId: 0,
    contactTypeValue: "",
    isSameAsDirector: "",
    isSameAsPrimaryContact: "",
    tinNo: "",
    fatherName: "",
    motherName: "",
    dob: "",
    genderId: 0,
    genderValue: "",
    birthRegNo: "",
    fullName: "",
    personId: 0,
    designationPosition: "",
    passportNumber: "",
    postalAddress: "",
    idoObjState: "",
    updateSeq: 0,
    contactTypeDescription: "",
    isSelected: "",
    preferredCommunicationId: 0,
    preferredCommunicationValue: "",
    preferredCommunicationDescription: "",
    communicationContactDetail: "",
    workPhoneNumber: "",
    promisMemberName: "",
    preferredEmployerPortalUsername: "",
    isAlreadyHavePortalAccess: "",
    nationalityValue: "",
  };
  constructor(
    public employer: EmployerRegistrationService,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialogRef: MatDialogRef<PrimaryContactDetailComponent>,
    public appSettingService: AppSettingsService,
    public dialog: MatDialog
  ) {}
  @ViewChild("employerregistrationSteps", { static: false })
  employerregistrationSteps: CdkStepper;
  ngOnInit(): void {
    this.employer.newEmployer.plstEmployerRegistrationContacts.forEach(
      (element) => {
        element.isSelected = "N";
      }
    );

    if (
      this.employer.newEmployer.pEmployerRegistrationContacts
        .isSameAsDirector === "Y"
    )
      this.step1Heading = "Select Contacts";
    else this.step1Heading = "Primary Contact Document Upload";

    if (
      this.employer.newEmployer.pEmployerRegistrationContacts
        .employerRegistrationContactId > 0
    ) {
      let updateItem =
        this.employer.newEmployer.plstEmployerRegistrationContacts.find(
          (item) =>
            item.contactTypeValue == "DRTR" &&
            item.birthRegNo ===
              this.employer.newEmployer.pEmployerRegistrationContacts.birthRegNo
        );

      if (updateItem && updateItem !== null && updateItem !== undefined) {
        let index =
          this.employer.newEmployer.plstEmployerRegistrationContacts.indexOf(
            updateItem
          );

        if (index !== -1) {
          const obj = JSON.stringify(updateItem);
          this.SelectedDirector = JSON.parse(obj);
          this.SelectedDirector.isSameAsDirector = "Y";
          updateItem.isSelected = "Y";
          this.employer.newEmployer.plstEmployerRegistrationContacts[index] =
            updateItem;
        }
      }
    }
    this.directorSource = new MatTableDataSource(
      this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
        (e) => e.contactTypeValue === "DRTR"
      )
    );
    this.employer.errorTrue = false;
    this.checkRequired();
  }

  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }
  step1Click() {
    this.step1Completed = true;
    this.employerregistrationSteps.next();
    // this.registrationSteps.selectedIndex = 1;
  }
  step2Click() {
    this.step2Completed = true;
    // this.registrationSteps.selectedIndex = 2;
    this.employerregistrationSteps.next();
  }
  clickPrev() {
    this.employerregistrationSteps.previous();
  }

  tableShow(event) {
    if (event) {
      this.employer.newEmployer.pEmployerRegistrationContacts.isSameAsDirector =
        "Y";
      this.step1Heading = "Select Contact";
    } else {
      this.employer.newEmployer.pEmployerRegistrationContacts.isSameAsDirector =
        "N";
      this.step1Heading = "Primary Contact Document Upload";
    }
  }

  getPirmary(val) {
    const obj = JSON.stringify(val);
    this.SelectedDirector = JSON.parse(obj);
    this.SelectedDirector.isSameAsDirector = "Y";
  }

  uploadEmployerPrimaryDocument(file, document) {
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
      this.savePrimaryDocumentSeparate();
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

  savePrimaryDocumentSeparate() {
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

  savePrimaryDocument() {
    this.data.clearErrorMsg();
    this.employer.errorTrue = false;
    let errorM: any = false;
    this.employer.newEmployer.pEmployerRegistrationContacts.plstEmployerRegistrationContactsDocument.forEach(
      (element) => {
        if (element.isMandatory === "Y") {
          if (element.pDocumentFile.fileName === "") {
            errorM = true;
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
            this.step1 = false;
            this.step2 = true;
            this.employerregistrationSteps.next();
          }
        },
        (error) => {
          this.employer.setAll(false);
          this.data.errorMethod(error);
          this.employer.btnClicked = false;
        }
      );
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

  doClose() {
    this.dialogRef.close();
  }
  clickPrevstep2() {
    this.employerregistrationSteps.previous();
    this.step1 = true;
    this.step2 = false;
  }

  savePrimaryContactDetails(d) {
    if (
      d.valid &&
      this.employer.newEmployer.pEmployerRegistrationContacts
        .businessAddressId != 0
    ) {
      this.data.clearErrorMsg();
      this.employer.errorTrue = false;
      this.employer.btnClicked = true;
      this.employer.fullspinner.empty.next(true);
      // this.employer.newEmployer.pEmployerRegistrationContacts = this.employer.newContacts;
      this.data
        .postData(
          AppGlobal.apiPaths.employerRegistration.contacts.save,
          this.employer.newEmployer
        )
        .then(
          (success: any) => {
            this.employer.newEmployer = success;
            this.employer.setAll(false);
            this.step2Completed = true;
            this.employerregistrationSteps.next();
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
            this.employer.setAll(false);
            this.data.errorMethod(error);
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

  SavePrimaryContactDetailFromDirectors() {
    if (this.SelectedDirector.employerRegistrationId === 0) {
      const message = "Please select contact to continue.";
      this.data.errorMesaageOnly(message);
      return;
    }

    this.employer.newEmployer.pEmployerRegistrationContacts.fnpfNo =
      this.SelectedDirector.fnpfNo;
    this.employer.newEmployer.pEmployerRegistrationContacts.fatherName =
      this.SelectedDirector.fatherName;
    this.employer.newEmployer.pEmployerRegistrationContacts.motherName =
      this.SelectedDirector.motherName;
    this.employer.newEmployer.pEmployerRegistrationContacts.tinNo =
      this.SelectedDirector.tinNo;
    this.employer.newEmployer.pEmployerRegistrationContacts.birthRegNo =
      this.SelectedDirector.birthRegNo;
    this.employer.newEmployer.pEmployerRegistrationContacts.fullName =
      this.SelectedDirector.fullName;
    this.employer.newEmployer.pEmployerRegistrationContacts.workEmailAddress =
      this.SelectedDirector.workEmailAddress;
    this.employer.newEmployer.pEmployerRegistrationContacts.workPhoneNumber =
      this.SelectedDirector.workPhoneNumber;
    this.employer.newEmployer.pEmployerRegistrationContacts.faxNo =
      this.SelectedDirector.faxNo;
    this.employer.newEmployer.pEmployerRegistrationContacts.dob =
      this.SelectedDirector.dob;
    this.employer.newEmployer.pEmployerRegistrationContacts.genderValue =
      this.SelectedDirector.genderValue;
    this.employer.newEmployer.pEmployerRegistrationContacts.businessAddressId =
      this.SelectedDirector.businessAddressId;
    this.employer.newEmployer.pEmployerRegistrationContacts.isSameAsDirector =
      this.SelectedDirector.isSameAsDirector;

    if (
      this.SelectedDirector.designationPosition !== "" &&
      this.SelectedDirector.designationPosition !== null &&
      this.SelectedDirector.designationPosition !== undefined &&
      this.SelectedDirector.designationPosition.length > 0
    ) {
      this.employer.newEmployer.pEmployerRegistrationContacts.designationPosition =
        this.SelectedDirector.designationPosition;
    }

    this.employer.newEmployer.pEmployerRegistrationContacts.preferredEmployerPortalUsername =
      this.SelectedDirector.preferredEmployerPortalUsername;
    this.employer.newEmployer.pEmployerRegistrationContacts.isAlreadyHavePortalAccess =
      "Y";
    this.employer.newEmployer.pEmployerRegistrationContacts.nationalityValue =
      this.SelectedDirector.nationalityValue;
    this.employer.newEmployer.pEmployerRegistrationContacts.personId =
      this.SelectedDirector.personId;
    setTimeout(() => {
      this.employer.setAll(false);
      this.step1Completed = true;
      this.employer.btnClicked = false;
      this.step1 = false;
      this.step2 = true;
      this.employerregistrationSteps.next();
      this.checkRequired();
    }, 300);
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

  active(row) {
    this.activeIndex = row;
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
  clearFNPF() {
    this.employer.newEmployer.pEmployerRegistrationContacts.isAlreadyHavePortalAccess =
      "N";
    this.employer.newEmployer.pEmployerRegistrationContacts.preferredEmployerPortalUsername =
      "";
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
}
