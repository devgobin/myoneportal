import { Component, OnInit, ViewChild } from "@angular/core";
import { CdkStepper } from "@angular/cdk/stepper";
import { MemberRegistration } from "../new-member-registration.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { FileViewerComponent } from "src/app/common/file-viewer/file-viewer.component";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";

@Component({
  selector: "app-nominee-detail",
  templateUrl: "./nominee-detail.component.html",
  styleUrls: ["./nominee-detail.component.scss"],
})
export class NomineeDetailComponent implements OnInit {
  pageId = "NWMRG";
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step1 = true;
  step3 = false;
  step2 = false;
  fathernamenoRequired = true;
  mothernamenoRequired = true;

  mobilenoRequired = false;
  emailRequired = false;
  maxlength = 60;
  adderrorText = "";
  vilerrorText = "";
  addproerrorText = "";
  towerrorText = "";
  postalerrorText = "";
  currentdate = new Date();
  @ViewChild("registrationSteps", { static: false })
  registrationSteps: CdkStepper;
  @ViewChild("nom", { static: false }) nomineeForm;
  @ViewChild("nomContact", { static: false }) nomineeContactForm;
  fileUploading = "";
  constructor(
    public member: MemberRegistration,
    public data: DataService,
    public dialogRef: MatDialogRef<NomineeDetailComponent>,
    public fullspinner: FullSpinnerService,
    public appSettingService: AppSettingsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.member.errorTrue = false;
    this.checkRequired();
  }

  clickPrevstep2() {
    this.registrationSteps.previous();
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
  }

  clickPrevstep3() {
    this.registrationSteps.previous();
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
  }

  savemembernomineeandnomineedocument() {
    let errorM: any = false;
    this.member.newNominee.plstMemberNomineeDocuments.forEach((element) => {
      if (element.isMandatory === "Y") {
        if (element.pdocumentFile.fileName === "") {
          errorM = true;
          return;
        }
      }
    });
    if (errorM === true) {
      this.member.errorTrue = true;
      return;
    }

    this.data.clearErrorMsg();
    this.member.newMember.pMemberNominee = this.member.newNominee;
    this.member.errorTrue = false;
    this.member.btnClicked = true;
    this.member.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.nominee
          .savemembernomineeandnomineedocument,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.newMember = success;
          this.member.newNominee = success.pMemberNominee;
          this.member.setAll(false);
       
          if (
            this.member.newMember.funMsg &&
            this.member.newMember.funMsg.errorMessage &&
            this.member.newMember.funMsg.errorMessage.length > 0
          ) {
            this.warningDoc(this.member.newMember.funMsg.errorMessage);
          }
          else{
            this.step1Completed = true;
            this.registrationSteps.next();
            this.step1 = false;
            this.step2 = true;
            this.step3 = false;
          }
        },
        (error) => {
          this.member.setAll(false);
          this.data.errorMethod(error);
        }
      );
  }

  checkRequired() {
    this.fathernamenoRequired = true;
    this.mothernamenoRequired = true;
    if (this.member.newNominee.fatherName !== "") {
      this.fathernamenoRequired = true;
      this.mothernamenoRequired = false;
    }
    if (this.member.newNominee.motherName !== "") {
      this.fathernamenoRequired = false;
      this.mothernamenoRequired = true;
    }
  }

  OnChangePreferredCommunicationValue(val) {
    this.mobilenoRequired = true;
    this.emailRequired = true;
    if (val === "PHN") {
      this.mobilenoRequired = true;
      this.emailRequired = false;
    } else if (val === "EML") {
      this.mobilenoRequired = false;
      this.emailRequired = true;
    } else {
      this.mobilenoRequired = false;
      this.emailRequired = false;
    }
  }

  saveNominee() {
    if (this.nomineeForm.valid) {
      if (
        this.member.newNominee.sharePercentage === null ||
        this.member.newNominee.sharePercentage === undefined ||
        parseInt(this.member.newNominee.sharePercentage) <= 0
      ) {
        const message = "Nominee share percentage should be greater than 0";
        this.data.errorMesaageOnly(message);
        return;
      }
      // if (
      //   (this.mobilenoRequired && this.member.newNominee.nomineeContactPhone.length <= 9) ||
      //   this.member.newNominee.nomineeContactPhone.length > 10
      // ) {
      //   const message = "Please enter valid Phone Number";
      //   this.data.errorMesaageOnly(message);
      //   return;
      // }
      if (this.member.newNominee.tin.length > 0) {
        if (
          this.member.newNominee.tin.length < 9 ||
          this.member.newNominee.tin.length > 10
        ) {
          const message = "Please enter valid TIN";
          this.data.errorMesaageOnly(message);
          return;
        }
      }

      this.data.clearErrorMsg();
      this.member.errorTrue = false;
      this.member.btnClicked = true;
      this.member.fullspinner.empty.next(true);
      this.member.newMember.pMemberNominee = this.member.newNominee;
      this.data
        .postData(
          AppGlobal.apiPaths.memberRegistration.nominee.save,
          this.member.newMember
        )
        .then(
          (success: any) => {
            this.member.newMember = success;
            this.member.newNominee = success.pMemberNominee;
            this.member.setAll(false);
            this.step2Completed = true;
            this.registrationSteps.next();
            this.step1 = false;
            this.step2 = false;
            this.step3 = true;
          },
          (error) => {
            this.member.setAll(false);
            this.data.errorMethod(error);
          }
        );
    } else {
      this.member.errorTrue = true;
    }
  }

  uploadMemberNomineeDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.pdocumentFile.fileType = file.fileType;
    document.pdocumentFile.fileSize = file.fileSize;
    document.pdocumentFile.relativePath = file.relativePath;
    document.pdocumentFile.fileName = file.fileName;
    document.pdocumentFile.istrFileContent = file.istrFileContent;
    document.memberRegistrationNomineeId =
      this.member.newNominee.memberRegistrationNomineeId;
    const index = this.member.newNominee.plstMemberNomineeDocuments
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      this.member.newNominee.plstMemberNomineeDocuments[index] = document;
      this.fileUploading = "";
      this.fullspinner.empty.next(false);
    }
  }

  clearFile(document) {
    const index = this.member.newNominee.plstMemberNomineeDocuments
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      if (
        this.member.newNominee.plstMemberNomineeDocuments[index]
          .pdocumentFile !== null &&
        this.member.newNominee.plstMemberNomineeDocuments[index].pdocumentFile
          .documentFileId > 0
      ) {
        this.member.newNominee.plstMemberNomineeDocuments[
          index
        ].pdocumentFile.fileType = "";
        this.member.newNominee.plstMemberNomineeDocuments[
          index
        ].pdocumentFile.fileSize = 0;
        this.member.newNominee.plstMemberNomineeDocuments[
          index
        ].pdocumentFile.relativePath = "";
        this.member.newNominee.plstMemberNomineeDocuments[
          index
        ].pdocumentFile.fileName = "";
        this.member.newNominee.plstMemberNomineeDocuments[
          index
        ].pdocumentFile.uploadbyFullName = "";
        this.member.newNominee.plstMemberNomineeDocuments[
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
        this.member.newNominee.plstMemberNomineeDocuments[index].pdocumentFile =
          obj;
      }
    }
  }

  documentSubmited() {
    let errorM: any = false;
    this.member.newNominee.plstMemberNomineeDocuments.forEach((element) => {
      if (element.isMandatory === "Y") {
        if (element.pdocumentFile.fileName === "") {
          errorM = true;
          return;
        }
      }
    });
    if (errorM === true) {
      this.member.errorTrue = true;
      return;
    }

    this.member.newMember.pMemberNominee = this.member.newNominee;
    this.member.errorTrue = false;
    this.member.btnClicked = true;
    this.member.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.nominee.document,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.newMember = success;
          this.member.newNominee = success.pMemberNominee;
          this.member.setAll(false);
          this.step3Completed = true;
          this.dialogRef.close(true);
        },
        (error) => {
          this.member.setAll(false);
          this.data.errorMethod(error);
        }
      );
  }

  saveNomineeContactDetails() {
    if (this.member.newNominee.pNomineeAddress.line1.length > this.maxlength) {
      this.adderrorText = "Maximum " + this.maxlength + " characters";
    } else {
      this.adderrorText = "";
    }
    if (this.member.newNominee.pNomineeAddress.line2.length > this.maxlength) {
      this.vilerrorText = "Maximum " + this.maxlength + " characters";
    } else {
      this.vilerrorText = "";
    }
    if (
      this.member.newNominee.pNomineeAddress.province.length > this.maxlength
    ) {
      this.addproerrorText = "Maximum " + this.maxlength + " characters";
    } else {
      this.addproerrorText = "";
    }
    if (this.member.newNominee.pNomineeAddress.city.length > this.maxlength) {
      this.towerrorText = "Maximum " + this.maxlength + " characters";
    } else {
      this.towerrorText = "";
    }
    if (this.nomineeContactForm.valid) {
      this.data.clearErrorMsg();
      this.member.errorTrue = false;
      this.member.btnClicked = true;
      this.member.fullspinner.empty.next(true);
      this.member.newMember.pMemberNominee = this.member.newNominee;
      this.data
        .postData(
          AppGlobal.apiPaths.memberRegistration.nominee.savenomineecontact,
          this.member.newMember
        )
        .then(
          (success: any) => {
            this.member.newMember = success;
            this.member.newNominee = success.pMemberNominee;
            this.member.setAll(false);
            this.step3Completed = true;
            this.dialogRef.close(true);
          },
          (error) => {
            this.member.setAll(false);
            this.data.errorMethod(error);
          }
        );
    } else {
      this.member.errorTrue = true;
    }
  }

  viewDocument(val) {
    if (val.pdocumentFile.fileName !== "") {
      if (val && val.pdocumentFile && val.pdocumentFile.documentFileId > 0) {
        const obj = {
          data: val.pdocumentFile.documentFileId,
        };
        this.fullspinner.empty.next(true);
        this.data
          .postData(
            AppGlobal.apiPaths.memberRegistration.openimagebydocumentfileid,
            obj
          )
          .then(
            (success: any) => {
              this.fullspinner.empty.next(false);
              this.openFileViewer(success);
            },
            (error: any) => {
              this.data.errorMethod(error);
              this.fullspinner.empty.next(false);
            }
          );
      } else if (
        val &&
        val.pdocumentFile &&
        val.pdocumentFile.istrFileContent
      ) {
        this.openFileViewer(val.pdocumentFile);
      }
    }
  }

  openFileViewer(xurl) {
    const dialogRef = this.dialog.open(ViewPdfComponent, {
      width: "100%",
      height: "85%",
      data: {
        url: xurl.istrFileContent,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  warningDoc(val) {
    this.member.errorTrue = false;
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        Otherbtn: true,
        otherbtntext: "Proceed",
        warning: true,
        listofMessage: val,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.step1Completed = true;
        this.registrationSteps.next();
        this.step1 = false;
        this.step2 = true;
        this.step3 = false;
      }
    });
  }
}
