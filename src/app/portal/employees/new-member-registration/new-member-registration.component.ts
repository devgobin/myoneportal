import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CdkStepper } from "@angular/cdk/stepper";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MemberRegistration } from "./new-member-registration.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { MatDialog } from "@angular/material/dialog";
import { NomineeDetailComponent } from "./nominee-detail/nominee-detail.component";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonAlertComponent } from "src/app/common/common-alert/common-alert.component";
import * as moment from "moment";
import { SuccessAlertComponent } from "../../../common/success-alert/success-alert.component";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { FileViewerComponent } from "src/app/common/file-viewer/file-viewer.component";

@Component({
  selector: "app-new-member-registration",
  templateUrl: "./new-member-registration.component.html",
  styleUrls: ["./new-member-registration.component.scss"],
})
export class NewMemberRegistrationComponent implements OnInit, OnDestroy {
  pageId = "NWMRG";
  errorTrue = false;
  btnClicked = false;
  exerrorTrue = false;
  exbtnClicked = false;
  adderrorTrue = false;
  addbtnClicked = false;
  jointidcard = "Y";
  tinletter = "Y";
  isRadio1 = "N";
  isRadio2 = "N";
  nomineeColumns: string[] = [
    "firstName",
    "dateOfBirth",
    "genderDescription",
    "relationshipDescription",
    "sharePercentage",
    "memberRegistrationId",
  ];
  nomineeSource: any = new MatTableDataSource();
  maxlength = 60;
  errorText = "";
  errorTextmax = "";
  errorTextpro = "";
  errorTextcit = "";
  errorTextloc = "";
  adderrorText = "";
  vilerrorText = "";
  addproerrorText = "";
  towerrorText = "";
  postalerrorText = "";
  // selection = new SelectionModel<PeriodicElement>(true, []);
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step4Completed = false;
  step5Completed = false;
  step6Completed = false;
  step7Completed = false;
  fathernamenoRequired = true;
  mothernamenoRequired = true;

  executorfathernamenoRequired = true;
  executormothernamenoRequired = true;

  executormobilenoRequired = false;
  executoremailRequired = false;

  show = true;

  currentdate = new Date();
  @ViewChild("registrationSteps", { static: false })
  registrationSteps: CdkStepper;
  @ViewChild("xtransactionPin", { static: false })
  xtransactionPin;
  @ViewChild("memberMobile", { static: false })
  memberMobile;

  fileUploading = "";
  activeIndex: number;

  dobrequired = true;
  relrequired = true;
  genderrequired = true;
  tinrequired = true;
  brnrequired = true;
  firstnamerequired = true;

  nbrnRequired = false;
  npassportRequired = false;
  //step1
  mobileRequired = false;
  emailRequired = false;
  //add executor
  emailAERequired = true;
  mobileAERequired = true;

  workpermitissudaterequired = true;

  id = "";
  constructor(
    public member: MemberRegistration,
    public data: DataService,
    public fullspinner: FullSpinnerService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    public appSettingService: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params) => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.initialdata();
      this.CheckWorPermitRequired();
    });
    this.data.headerName = {
      screenName: "New Member Registration",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Employees",
          link: "",
        },
        {
          name: "New",
          link: "",
        },
      ],
    };
    this.route.paramMap.subscribe((params) => {
      // On Page reload call this function;
      console.log("got hit");
      // this.init();
    });
  }

  ngOnInit(): void {
    // this.data.errorMesaageOnly('Please enter atleast one Nominee');
    // this.initialdata();
    this.member.errorTrue = false;
  }

  ngOnDestroy(): void {
    this.member.clearNewMember();
    this.member.clearNewNominee();
    this.xtransactionPin.clear();
  }

  step1Click() {
    this.step1Completed = true;
    this.registrationSteps.next();
  }

  step2Click() {
    this.step2Completed = true;
    this.registrationSteps.next();
  }
  step4Click() {
    this.member.errorTrue = false;
    this.step4Completed = true;
    this.registrationSteps.next();
    this.step5Completed = true;
    this.registrationSteps.next();
  }
  step5Click() {
    this.member.errorTrue = false;
    this.step5Completed = true;
    this.registrationSteps.next();
  }
  step3SkipClick() {
    this.member.errorTrue = false;
    this.step3Completed = true;
    this.registrationSteps.next();
  }

  clickPrev() {
    this.registrationSteps.previous();
  }

  // Methods
  step3Click() {
    let SharePercentage: number = 0.0;
    for (let element of this.member.newMember.plstMemberNominees) {
      SharePercentage += parseFloat(element.sharePercentage);
    }

    if (this.member.newMember.optOutOfNominee === "N") {
      if (this.member.newMember.plstMemberNominees.length == 0) {
        const message = "Please enter atleast one Nominee";
        this.data.errorMesaageOnly(message);
        return;
      } else {
        if (SharePercentage !== 100) {
          const message = "Total Nominees share should be " + 100 + "%";
          this.data.errorMesaageOnly(message);
          return;
        }
        this.data.clearErrorMsg();
      }
    }

    this.member.errorTrue = false;
    this.member.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.nominee.validatemembernominee,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.step3Completed = true;
          this.member.btnClicked = false;
          this.registrationSteps.next();
        },
        (error) => {
          this.disableLoader();
          this.member.btnClicked = false;
          this.data.errorMethod(error);
        }
      );
  }
  checkExecutorFatherRequired() {
    this.executorfathernamenoRequired = true;
    this.executormothernamenoRequired = true;
    if (this.member.newMember.pMemberExecutor.fatherName !== "") {
      this.executorfathernamenoRequired = true;
      this.executormothernamenoRequired = false;
    }
    if (this.member.newMember.pMemberExecutor.motherName !== "") {
      this.executorfathernamenoRequired = false;
      this.executormothernamenoRequired = true;
    }
  }

  OnChangePreferredCommunicationValueExecutor(val) {
    this.executormobilenoRequired = true;
    this.executoremailRequired = true;
    if (val === "PHN") {
      this.executormobilenoRequired = true;
      this.executoremailRequired = false;
    } else if (val === "EML") {
      this.executormobilenoRequired = false;
      this.executoremailRequired = true;
    } else {
      this.executormobilenoRequired = false;
      this.executoremailRequired = false;
    }
  }

  initialdata() {
    this.member.errorTrue = false;
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.memberRegistration.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.member.memberParams[element.key] = element.value;
        });

        this.LoadMemberRegistrationDetail();
      },
      (error) => {
        this.data.errorMethod(error);
        this.disableLoader();
      }
    );
  }

  getData() {
    this.data.getData(AppGlobal.apiPaths.memberRegistration.new).then(
      (success: any) => {
        this.member.newMember = success;
        this.disableLoader();
      },
      (error) => {
        this.data.errorMethod(error);
        this.disableLoader();
      }
    );
  }

  LoadMemberRegistrationDetail() {
    this.id = this.route.snapshot.paramMap.get("id");
    // console.log(this.id);
    if (this.id) {
      this.member.newMember.memberRegistrationId = 0;
    }
    this.nomineeSource = new MatTableDataSource();
    if (this.member.newMember.memberRegistrationId > 0) {
      const obj = {
        data: this.member.newMember.memberRegistrationId,
      };
      this.data.postData(AppGlobal.apiPaths.memberRegistration.open, obj).then(
        (success: any) => {
          this.member.newMember = success;
          setTimeout(() => {
            this.memberMobile.checkPattern();
          }, 400);

          // console.log(success);
          // console.log('Mobile Number is ' + this.member.newMember.mobileNo)
          this.nomineeSource = new MatTableDataSource(
            this.member.newMember.plstMemberNominees
          );
          this.checkRequired();
          this.checkemailorphoneRequired();
          this.checkemailorphoneinAddExecutor();
          this.disableLoader();
          this.data.successMesaage(success);
          this.checkExecutorFatherRequired();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
    } else {
      this.getData();
    }
  }

  private disableLoader() {
    this.member.setAll(false);
    this.fullspinner.empty.next(false);
  }

  saveData(m) {
    this.member.errorTrue = false;
    if (m.valid) {
      if (this.member.newMember.politicallyExposedPerson === "") {
        const message = "Please select Politically Exposed option.";
        this.data.errorMesaageOnly(message);
        return;
      }
      if (this.member.newMember.associateToPoliticallyExposedPerson === "") {
        const message =
          "Please select Relative/Associate of a Politically Exposed  option.";
        this.data.errorMesaageOnly(message);
        return;
      }
      this.member.errorTrue = false;
      this.member.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.memberRegistration.save,
          this.member.newMember
        )
        .then(
          (success: any) => {
            this.member.newMember = success;
            this.disableLoader();
            this.step2Completed = true;
            this.registrationSteps.next();
          },
          (error) => {
            this.disableLoader();
            this.data.errorMethod(error);
          }
        );
    } else {
      if (this.member.newMember.politicallyExposedPerson === "") {
        this.isRadio1 = "Y";
      }

      this.member.errorTrue = true;

      if (this.member.newMember.associateToPoliticallyExposedPerson === "") {
        this.isRadio2 = "Y";
      }
    }
  }

  uploadMemberDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.pdocumentFile.fileType = file.fileType;
    document.pdocumentFile.fileSize = file.fileSize;
    document.pdocumentFile.relativePath = file.relativePath;
    document.pdocumentFile.fileName = file.fileName;
    document.pdocumentFile.istrFileContent = file.istrFileContent;
    const index = this.member.newMember.plstMemberDocuments
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      this.member.newMember.plstMemberDocuments[index] = document;
      this.fileUploading = "";
      this.fullspinner.empty.next(false);
    }
  }

  clearFile(document) {
    const index = this.member.newMember.plstMemberDocuments
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      if (
        this.member.newMember.plstMemberDocuments[index].pdocumentFile !==
          null &&
        this.member.newMember.plstMemberDocuments[index].pdocumentFile
          .documentFileId > 0
      ) {
        this.member.newMember.plstMemberDocuments[
          index
        ].pdocumentFile.fileType = "";
        this.member.newMember.plstMemberDocuments[
          index
        ].pdocumentFile.fileSize = 0;
        this.member.newMember.plstMemberDocuments[
          index
        ].pdocumentFile.relativePath = "";
        this.member.newMember.plstMemberDocuments[
          index
        ].pdocumentFile.fileName = "";
        this.member.newMember.plstMemberDocuments[
          index
        ].pdocumentFile.uploadbyFullName = "";
        this.member.newMember.plstMemberDocuments[
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
        this.member.newMember.plstMemberDocuments[index].pdocumentFile = obj;
      }
    }
  }

  documentSubmited() {
    if (
      this.member.newMember.memberTypeValue === "" ||
      this.member.newMember.memberTypeValue === null ||
      this.member.newMember.memberTypeValue === undefined ||
      this.member.newMember.memberTypeValue.length === 0
    ) {
      this.member.errorTrue = true;
      return;
    }
    let errorM: any = false;
    this.member.newMember.plstMemberDocuments.forEach((element) => {
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

    this.member.errorTrue = false;
    this.member.btnClicked = true;
    this.fullspinner.empty.next(true);

    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.save,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.member.newMember = success;
          this.step2Completed = true;
          this.registrationSteps.next();
        },
        (error) => {
          this.member.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  saveAddress(ad) {
    if (this.member.newMember.pMemberAddress.line1.length > this.maxlength) {
      this.adderrorText = "Maximum " + this.maxlength + " characters";
    } else {
      this.adderrorText = "";
    }
    if (this.member.newMember.pMemberAddress.line2.length > this.maxlength) {
      this.vilerrorText = "Maximum " + this.maxlength + " characters";
    } else {
      this.vilerrorText = "";
    }
    if (this.member.newMember.pMemberAddress.province.length > this.maxlength) {
      this.addproerrorText = "Maximum " + this.maxlength + " characters";
    } else {
      this.addproerrorText = "";
    }
    if (this.member.newMember.pMemberAddress.city.length > this.maxlength) {
      this.towerrorText = "Maximum " + this.maxlength + " characters";
    } else {
      this.towerrorText = "";
    }
    if (
      this.member.newMember.pMemberAddress.postalAddress.length > this.maxlength
    ) {
      this.postalerrorText = "Maximum " + this.maxlength + " characters";
    } else {
      this.postalerrorText = "";
    }
    if (ad.valid) {
      this.adderrorTrue = false;
      this.addbtnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.memberRegistration.address.save,
          this.member.newMember
        )
        .then(
          (success: any) => {
            this.member.newMember = success;
            this.addbtnClicked = false;
            this.disableLoader();
            this.step6Completed = true;
            this.adderrorText = "";
            this.registrationSteps.next();
            this.member.errorTrue = false;
          },
          (error) => {
            this.disableLoader();
            this.data.errorMethod(error);
          }
        );
    } else {
      this.adderrorTrue = true;
    }
  }

  getNewNominee() {
    if (this.member.newMember.optOutOfNominee === "Y") {
      const message =
        "Opt out of Nominee is selected, you are not allowed to enter nominee detail.";
      this.data.errorMesaageOnly(message);
      return;
    }

    this.member.setAll(true);
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.memberRegistration.nominee.new).then(
      (success: any) => {
        this.member.newNominee = success;
        this.member.newNominee.sharePercentage = "";
        this.disableLoader();
        this.newNominee();
      },
      (error) => {
        this.data.errorMethod(error);
        this.disableLoader();
      }
    );
  }

  newNominee(): void {
    const dialogRef = this.dialog.open(NomineeDetailComponent, {
      width: "900px",
      height: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.nomineeSource = new MatTableDataSource(
        this.member.newMember.plstMemberNominees
      );
    });
  }

  openNominee(nominee) {
    this.member.setAll(true);
    this.fullspinner.empty.next(true);
    const obj = {
      data: nominee.memberRegistrationNomineeId,
    };
    this.data
      .postData(AppGlobal.apiPaths.memberRegistration.nominee.open, obj)
      .then(
        (success: any) => {
          this.member.newNominee = success;
          this.disableLoader();
          this.newNominee();
        },
        (error) => {
          this.data.errorMethod(error);
          this.disableLoader();
        }
      );
  }

  openDelete(val): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg:
          "Are you sure, you want to delete this Nominee " +
          val.firstName +
          "?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteNominee(val);
      }
    });
  }

  deleteNominee(nominee) {
    this.member.setAll(true);
    this.fullspinner.empty.next(true);
    this.member.newMember.pMemberNominee = nominee;
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.nominee.delete,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.newMember = success;
          this.member.newNominee = success.pMemberNominee;
          this.nomineeSource = new MatTableDataSource(
            this.member.newMember.plstMemberNominees
          );
          this.disableLoader();
        },
        (error) => {
          this.data.errorMethod(error);
          this.disableLoader();
        }
      );
  }

  optNominee(value) {
    value === true
      ? (this.member.newMember.optOutOfNominee = "Y")
      : (this.member.newMember.optOutOfNominee = "N");

    if (this.member.newMember.plstMemberNominees.length > 0) {
      let SharePercentage: number = 0.0;
      for (let element of this.member.newMember.plstMemberNominees) {
        SharePercentage += parseFloat(element.sharePercentage);
      }

      if (SharePercentage == 100) {
        this.show = false;
        value = false;
        this.member.newMember.optOutOfNominee = "N";
        setTimeout(() => {
          this.show = true;
        }, 100);
        const message =
          "You are not allowed to select Opt out of Nominee, since the share percentage of nominees is " +
          SharePercentage +
          "%";
        this.data.errorMesaageOnly(message);
        return;
      }
    }

    this.member.setAll(true);
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.update,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.newMember = success;
          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  checkDeclartion(value) {
    value === true
      ? (this.member.newMember.acceptDeclaration = "Y")
      : (this.member.newMember.acceptDeclaration = "N");
  }

  checkPoliticalyExposed(value) {
    value === true
      ? (this.member.newMember.politicallyExposedPerson = "Y")
      : (this.member.newMember.politicallyExposedPerson = "N");
  }

  clearExecutorFile(document) {
    const index =
      this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
    if (index !== -1) {
      if (
        this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[index]
          .pdocumentFile !== null &&
        this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[index]
          .pdocumentFile.documentFileId > 0
      ) {
        this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[
          index
        ].pdocumentFile.fileType = "";
        this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[
          index
        ].pdocumentFile.fileSize = 0;
        this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[
          index
        ].pdocumentFile.relativePath = "";
        this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[
          index
        ].pdocumentFile.fileName = "";
        this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[
          index
        ].pdocumentFile.uploadbyFullName = "";
        this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[
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
        this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[
          index
        ].pdocumentFile = obj;
      }
    }
  }

  uploadDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.pdocumentFile = file;
    this.data
      .postData(AppGlobal.apiPaths.memberRegistration.document, document)
      .then(
        (success: any) => {
          this.fileUploading = "";
          this.fullspinner.empty.next(false);
          this.member.newMember = success;
        },
        (error) => {
          this.fileUploading = "";
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
    // console.log(file);
  }

  uploadExecutorDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.pdocumentFile.fileType = file.fileType;
    document.pdocumentFile.fileSize = file.fileSize;
    document.pdocumentFile.relativePath = file.relativePath;
    document.pdocumentFile.fileName = file.fileName;
    document.pdocumentFile.istrFileContent = file.istrFileContent;
    const index =
      this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
    if (index !== -1) {
      this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments[index] =
        document;
      this.fileUploading = "";
      this.fullspinner.empty.next(false);
    }
  }

  savememberexecutoranduploadexecutordocument() {
    let errorM: any = false;
    this.member.newMember.pMemberExecutor.plstMemberExecutorDocuments.forEach(
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
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.executor
          .savememberexecutoranduploadexecutordocument,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.newMember = success;
          this.btnClicked = false;
          this.exerrorTrue = false;
          this.disableLoader();
          if (
            this.member.newMember.funMsg &&
            this.member.newMember.funMsg.errorMessage &&
            this.member.newMember.funMsg.errorMessage.length > 0
          ) {
            this.warningExecutorDoc(this.member.newMember.funMsg.errorMessage);
          } else {
            this.step4Completed = true;
            this.registrationSteps.next();
          }
        },
        (error) => {
          this.btnClicked = false;
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  saveExecutor(e) {
    if (
      this.member.newMember.pMemberExecutor.pExecutorAddress.line1.length >
      this.maxlength
    ) {
      this.errorTextmax = "Maximum " + this.maxlength + " characters";
    } else {
      this.errorTextmax = "";
    }
    if (
      this.member.newMember.pMemberExecutor.pExecutorAddress.province.length >
      this.maxlength
    ) {
      this.errorTextpro = "Maximum " + this.maxlength + " characters";
    } else {
      this.errorTextpro = "";
    }
    if (
      this.member.newMember.pMemberExecutor.pExecutorAddress.line2.length >
      this.maxlength
    ) {
      this.errorTextloc = "Maximum " + this.maxlength + " characters";
    } else {
      this.errorTextloc = "";
    }
    if (
      this.member.newMember.pMemberExecutor.pExecutorAddress.city.length >
      this.maxlength
    ) {
      this.errorTextcit = "Maximum " + this.maxlength + " characters";
    } else {
      this.errorTextcit = "";
    }
    if (e.valid) {
      if (this.member.newMember.pMemberExecutor.tin.length > 0) {
        if (
          this.member.newMember.pMemberExecutor.tin.length < 9 ||
          this.member.newMember.pMemberExecutor.tin.length > 10
        ) {
          const message = "Please enter valid TIN";
          this.data.errorMesaageOnly(message);
          return;
        }
      }
      // if (
      //   (this.executormobilenoRequired && this.member.newMember.pMemberExecutor.mobileNo.length <= 9) ||
      //   this.member.newMember.pMemberExecutor.mobileNo.length > 10
      // ) {
      //   const message = "Please enter valid Phone Number";
      //   this.data.errorMesaageOnly(message);
      //   return;
      // }
      this.exerrorTrue = false;
      this.exbtnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.memberRegistration.executor.save,
          this.member.newMember
        )
        .then(
          (success: any) => {
            this.member.newMember = success;
            this.exbtnClicked = false;
            this.disableLoader();
            this.step5Completed = true;
            this.registrationSteps.next();
            this.adderrorTrue = false;
          },
          (error) => {
            this.exbtnClicked = false;
            this.disableLoader();
            this.data.errorMethod(error);
          }
        );
    } else {
      this.exerrorTrue = true;
    }
  }
  clickExPrev() {
    this.registrationSteps.previous();
    this.errorTrue = false;
  }
  clickAddPrev() {
    this.registrationSteps.previous();
    this.exerrorTrue = false;
  }
  active(row) {
    this.activeIndex = row;
  }

  Confirm(cm) {
    this.data.clearErrorMsg();

    if (
      this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile
        .fileName === ""
    ) {
      this.member.errorTrue = true;
      return;
    }

    if (
      this.member.newMember.acceptDeclaration === "N" ||
      this.member.newMember.acceptDeclaration === ""
    ) {
      this.data.errorMesaageOnly("Please accept declaration.");
      // this.data.openAlert("", "bg-danger");
      if (!cm.valid) {
        this.member.errorTrue = true;
      }
      return;
    }

    if (this.member.newMember.transactionPin.length < 4) {
      this.data.errorMesaageOnly("Please enter transaction PIN.");
      return;
    }
    if (cm.valid) {
      this.member.errorTrue = false;
      this.member.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.memberRegistration.submit,
          this.member.newMember
        )
        .then(
          (success: any) => {
            this.member.newMember = success;
            this.member.btnClicked = false;
            this.disableLoader();
            this.successalert();
          },
          (error) => {
            this.disableLoader();
            this.data.errorMethod(error);
          }
        );
    } else {
      this.member.errorTrue = true;
    }
  }

  ViewEmployee() {
    this.router.navigateByUrl("/app/employee-list");
  }

  registerNewMember() {
    this.member.clearNewMember();
    this.member.clearNewNominee();
    this.nomineeSource = new MatTableDataSource();
    // selection = new SelectionModel<PeriodicElement>(true, []);
    this.step1Completed = false;
    this.step2Completed = false;
    this.step3Completed = false;
    this.step4Completed = false;
    this.step5Completed = false;
    this.step6Completed = false;
    this.step7Completed = false;
    this.fileUploading = "";
    this.registrationSteps.reset();
    this.getData();
    this.checkRequired();
    this.checkemailorphoneRequired();
    this.checkemailorphoneinAddExecutor();
    this.CheckIfBRNAndPassportRequiredOrNot();
  }

  saveDraft() {
    if (this.member.newMember.memberRegistrationId > 0) {
      this.member.errorTrue = false;
      this.member.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.memberRegistration.update,
          this.member.newMember
        )
        .then(
          (success: any) => {
            this.member.newMember = success;
            this.disableLoader();
            this.draftContinue();
          },
          (error) => {
            this.disableLoader();
            this.data.errorMethod(error);
          }
        );
    }
  }

  saveDraftDocuments() {
    // return;
    this.member.errorTrue = false;
    this.member.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.save,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.newMember = success;
          this.disableLoader();
          this.draftContinue();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }
  savememberregistrationanduploadmemberdocument() {
    if (
      this.member.newMember.memberTypeValue === "" ||
      this.member.newMember.memberTypeValue === null ||
      this.member.newMember.memberTypeValue === undefined ||
      this.member.newMember.memberTypeValue.length === 0
    ) {
      this.member.errorTrue = true;
      return;
    }
    let errorM: any = false;
    this.member.newMember.plstMemberDocuments.forEach((element) => {
      if (element.isMandatory === "Y" && element.eitherValue === "") {
        if (element.pdocumentFile.fileName === "") {
          errorM = true;
          return;
        }
      }
      if (element.isMandatory === "Y" && element.eitherValue !== "") {
        let index = this.member.newMember.plstMemberDocuments
          .map((e: any) => {
            return e.documentTypeValue;
          })
          .indexOf(element.eitherValue);
        if (index > -1) {
          if (
            element.pdocumentFile.fileName === "" &&
            this.member.newMember.plstMemberDocuments[index].pdocumentFile
              .fileName === ""
          ) {
            errorM = true;
            return;
          }
        }
      }
    });
    if (errorM === true) {
      this.member.errorTrue = true;
      return;
    }

    this.member.errorTrue = false;
    this.member.btnClicked = true;
    this.fullspinner.empty.next(true);

    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration
          .savememberregistrationanduploadmemberdocument,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.newMember = success;
          this.isRadio1 = "N";
          this.isRadio2 = "N";
          if (this.member.newMember.memberTypeValue === "LOCAL") {
            if (this.member.newMember.mobileNo.length > 7) {
              this.member.newMember.mobileNo =
                this.member.newMember.mobileNo.substring(3, 10);
            }
          }

          this.member.btnClicked = false;
          this.fullspinner.empty.next(false);
          if (
            this.member.newMember.funMsg &&
            this.member.newMember.funMsg.errorMessage &&
            this.member.newMember.funMsg.errorMessage.length > 0
          ) {
            this.warningMemberDoc(this.member.newMember.funMsg.errorMessage);
          } else {
            this.step1Completed = true;
            this.registrationSteps.next();
          }
        },
        (error) => {
          this.member.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  savememberregistrationanduploadmemberdocumentdraft() {
    if (
      this.member.newMember.memberTypeValue === "" ||
      this.member.newMember.memberTypeValue === null ||
      this.member.newMember.memberTypeValue === undefined ||
      this.member.newMember.memberTypeValue.length === 0
    ) {
      this.member.errorTrue = true;
      return;
    }
    let errorM: any = false;
    this.member.newMember.plstMemberDocuments.forEach((element) => {
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

    this.member.errorTrue = false;
    this.member.btnClicked = true;
    this.fullspinner.empty.next(true);

    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration
          .savememberregistrationanduploadmemberdocument,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.member.newMember = success;
        },
        (error) => {
          this.member.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }
  saveDraftNominee() {
    // return;
    this.member.errorTrue = false;
    this.member.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.update,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.newMember = success;
          this.disableLoader();
          this.draftContinue();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  saveDraftAddress() {
    // return;
    this.member.errorTrue = false;
    this.member.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.address.update,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.member.newMember = success;
          this.disableLoader();
          this.draftContinue();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  saveDraftExecutor() {
    let isexecutorEntered = "N";
    if (
      this.member.newMember.pMemberExecutor.firstName != "" ||
      this.member.newMember.pMemberExecutor.middleName != "" ||
      this.member.newMember.pMemberExecutor.lastName != "" ||
      this.member.newMember.pMemberExecutor.brn != "" ||
      this.member.newMember.pMemberExecutor.genderValue != "" ||
      this.member.newMember.pMemberExecutor.tin != "" ||
      this.member.newMember.pMemberExecutor.relationshipValue != "" ||
      this.member.newMember.pMemberExecutor.dateOfBirth != "" ||
      this.member.newMember.pMemberExecutor.mobileNo != "" ||
      this.member.newMember.pMemberExecutor.emailId != ""
    ) {
      isexecutorEntered = "Y";
    }

    if (
      this.member.newMember.pMemberExecutor.memberRegistrationExecutorId > 0 ||
      isexecutorEntered === "Y"
    ) {
      this.member.errorTrue = false;
      this.member.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.memberRegistration.executor.update,
          this.member.newMember
        )
        .then(
          (success: any) => {
            this.member.newMember = success;
            this.disableLoader();
            this.draftContinue();
          },
          (error) => {
            this.disableLoader();
            this.data.errorMethod(error);
          }
        );
    } else {
      this.member.errorTrue = false;
      this.disableLoader();
      this.draftContinue();
    }
  }

  draftContinue() {
    const dialogRef = this.dialog.open(CommonAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Would you like to continue or start as new",
        trueBtnText: "Start New",
        trueBtnColor: "success",
        trueRaised: true,
        falseBtnText: "Continue",
        falseBtnColor: "medium",
        falseRaised: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.registerNewMember();
      }
    });
  }

  checkRequired() {
    this.fathernamenoRequired = true;
    this.mothernamenoRequired = true;
    if (this.member.newMember.fatherName !== "") {
      this.fathernamenoRequired = true;
      this.mothernamenoRequired = false;
    }
    if (this.member.newMember.motherName !== "") {
      this.fathernamenoRequired = false;
      this.mothernamenoRequired = true;
    }
  }

  CheckIfBRNAndPassportRequiredOrNot() {
    this.nbrnRequired = false;
    this.npassportRequired = false;

    if (
      this.member.newMember.nationalityValue === "" ||
      this.member.newMember.citizenshipValue === ""
    ) {
      return;
    }

    if (
      this.member.newMember.nationalityValue === "FJI" &&
      this.member.newMember.citizenshipValue === "FJI"
    ) {
      this.nbrnRequired = true;
    } else if (
      this.member.newMember.nationalityValue !== "FJI" &&
      this.member.newMember.citizenshipValue === "FJI"
    ) {
      this.npassportRequired = true;
    } else if (
      this.member.newMember.nationalityValue === "FJI" &&
      this.member.newMember.citizenshipValue !== "FJI"
    ) {
      this.npassportRequired = true;
      this.nbrnRequired = true;
    } else if (
      this.member.newMember.nationalityValue !== "FJI" &&
      this.member.newMember.citizenshipValue !== "FJI"
    ) {
      this.npassportRequired = true;
    }
    // if (val === "FJI") {
    //   this.nbrnRequired = true;
    // }
  }

  checkemailorphoneRequired() {
    this.emailRequired = true;
    this.mobileRequired = true;
    if (this.member.newMember.mobileNo !== "") {
      this.mobileRequired = true;
      this.emailRequired = false;
    }
    if (this.member.newMember.emailId !== "") {
      this.mobileRequired = false;
      this.emailRequired = true;
    }
  }

  checkemailorphoneinAddExecutor() {
    this.emailAERequired = true;
    this.mobileAERequired = true;
    if (this.member.newMember.pMemberExecutor.mobileNo !== "") {
      this.mobileAERequired = true;
      this.emailAERequired = false;
    }
    if (this.member.newMember.pMemberExecutor.emailId !== "") {
      this.mobileAERequired = false;
      this.emailAERequired = true;
    }
  }

  skipStepNominee(): void {
    if (this.member.newMember.optOutOfNominee === "N") {
      const message =
        "No Nominee Added.Please select Opt out of Nominee option or add nominee.";
      this.data.errorMesaageOnly(message);
      return;
    }

    this.member.errorTrue = false;
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to skip this Member Nomination Step",
        Otherbtn: true,
        otherbtntext: "Yes",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.step3SkipClick();
      }
    });
  }
  skipStepExecutor(): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to skip this Add Executor Step",
        Otherbtn: true,
        otherbtntext: "Yes",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.member.newMember.pMemberExecutor.firstName = "";
        this.member.newMember.pMemberExecutor.middleName = "";
        this.member.newMember.pMemberExecutor.lastName = "";
        this.member.newMember.pMemberExecutor.brn = "";
        this.member.newMember.pMemberExecutor.tin = "";
        this.member.newMember.pMemberExecutor.genderValue = "";
        this.member.newMember.pMemberExecutor.dateOfBirth = "";
        this.member.newMember.pMemberExecutor.mobileNo = "";
        this.member.newMember.pMemberExecutor.emailId = "";
        this.member.newMember.pMemberExecutor.nationalityValue = "";
        this.member.newMember.pMemberExecutor.relationshipValue = "";
        this.member.newMember.pMemberExecutor.fatherName = "";
        this.member.newMember.pMemberExecutor.motherName = "";
        this.member.newMember.pMemberExecutor.preferredCommunicationValue = "";

        this.member.newMember.pMemberExecutor.pExecutorAddress.line1 = "";
        this.member.newMember.pMemberExecutor.pExecutorAddress.province = "";
        this.member.newMember.pMemberExecutor.pExecutorAddress.line2 = "";
        this.member.newMember.pMemberExecutor.pExecutorAddress.countryValue =
          "";
        this.member.newMember.pMemberExecutor.pExecutorAddress.city = "";
        this.step4Click();
      }
    });
    this.exerrorTrue = false;
    this.adderrorTrue = false;
  }
  skipStepExecutorDetail(): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to skip this Add Executor Step",
        Otherbtn: true,
        otherbtntext: "Yes",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.member.newMember.pMemberExecutor.firstName = "";
        this.member.newMember.pMemberExecutor.middleName = "";
        this.member.newMember.pMemberExecutor.lastName = "";
        this.member.newMember.pMemberExecutor.brn = "";
        this.member.newMember.pMemberExecutor.tin = "";
        this.member.newMember.pMemberExecutor.genderValue = "";
        this.member.newMember.pMemberExecutor.dateOfBirth = "";
        this.member.newMember.pMemberExecutor.mobileNo = "";
        this.member.newMember.pMemberExecutor.emailId = "";
        this.member.newMember.pMemberExecutor.nationalityValue = "";
        this.member.newMember.pMemberExecutor.relationshipValue = "";
        this.member.newMember.pMemberExecutor.fatherName = "";
        this.member.newMember.pMemberExecutor.motherName = "";
        this.member.newMember.pMemberExecutor.preferredCommunicationValue = "";

        this.member.newMember.pMemberExecutor.pExecutorAddress.line1 = "";
        this.member.newMember.pMemberExecutor.pExecutorAddress.province = "";
        this.member.newMember.pMemberExecutor.pExecutorAddress.line2 = "";
        this.member.newMember.pMemberExecutor.pExecutorAddress.countryValue =
          "";
        this.member.newMember.pMemberExecutor.pExecutorAddress.city = "";
        this.step5Click();
      }
    });
    this.exerrorTrue = false;
    this.adderrorTrue = false;
  }
  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "550px",
      disableClose: true,
      data: {
        msg: this.member.newMember.infoMsg,
        Showbtn1: true,
        button1: "View Employee",
        Showbtn2: true,
        button2: "Register Another Member",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.ViewEmployee();
      } else if (result === false) {
        this.xtransactionPin.clear();
        this.registerNewMember();
      }
    });
  }
  // viewpayment(val) {
  //   const obj = {
  //     data: val,
  //   };
  //   this.fullspinner.empty.next(true);
  //   this.data.pdf(AppGlobal.apiPaths.payment.generatepayment, val).then(
  //     (success: any) => {
  //       this.fullspinner.empty.next(false);
  //       this.openPDFViewer(success);
  //       // console.log(success);
  //     },
  //     (error: any) => {
  //       this.data.errorMethod(error);
  //       this.fullspinner.empty.next(false);
  //     }
  //   );
  // }

  selectType() {}

  OnChangeMemberType() {
    {
      this.member.errorTrue = false;
      this.member.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.memberRegistration
            .loadmemberregistrationdocumentbasedonmembertype,
          this.member.newMember
        )
        .then(
          (success: any) => {
            this.member.newMember = success;
            this.CheckWorPermitRequired();
            this.disableLoader();
          },
          (error) => {
            this.disableLoader();
            this.data.errorMethod(error);
          }
        );
    }
  }

  CheckWorPermitRequired() {
    if (this.member.newMember.memberTypeValue === "EXPRT") {
      this.workpermitissudaterequired = true;
    } else {
      this.workpermitissudaterequired = false;
    }
  }
  checkEmailOrPhoneRequired(val) {
    this.emailRequired = true;
    this.mobileRequired = true;
    if (val === "EML") {
      this.emailRequired = true;
      this.mobileRequired = false;
    } else if (val === "PHN") {
      this.mobileRequired = true;
      this.emailRequired = false;
    } else {
      this.emailRequired = false;
      this.mobileRequired = false;
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
  cancelDoc() {
    this.member.errorTrue = false;
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to cancel the application",
        Otherbtn: true,
        otherbtntext: "Yes",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.member.newMember.memberRegistrationId > 0) {
          this.cancelmemberregistration();
        } else {
          this.memberRegSearch();
        }
      }
    });
  }

  cancelmemberregistration() {
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.memberRegistration.cancelmemberregistration,
        this.member.newMember
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.memberRegSearch();
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  memberRegSearch() {
    this.router.navigateByUrl("/app/incomplete-member-registration");
  }

  uploadMemberWitnessDocument(file) {
    this.fileUploading =
      this.member.newMember.protoWitnessMemberRegistrationDocument.documentTypeValue;
    this.fullspinner.empty.next(true);
    this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.fileType =
      file.fileType;
    this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.fileSize =
      file.fileSize;
    this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.relativePath =
      file.relativePath;
    this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.fileName =
      file.fileName;
    this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.istrFileContent =
      file.istrFileContent;
    this.fileUploading = "";
    this.fullspinner.empty.next(false);
  }

  clearWitnessFile() {
    if (
      this.member.newMember.protoWitnessMemberRegistrationDocument
        .pdocumentFile !== null &&
      this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile
        .documentFileId > 0
    ) {
      this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.fileType =
        "";
      this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.fileSize = 0;
      this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.relativePath =
        "";
      this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.fileName =
        "";
      this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.uploadbyFullName =
        "";
      this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile.istrFileContent =
        "";
    } else {
      const obj = {
        documentFileId: 0,
        fileType: "",
        fileSize: 0,
        relativePath: "",
        fileName: "",
        uploadbyFullName: "",
        istrFileContent: "",
        idoObjState: "",
        updateSeq: 0,
      };
      this.member.newMember.protoWitnessMemberRegistrationDocument.pdocumentFile =
        obj;
    }
  }
  warningExecutorDoc(val) {
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
        this.step4Completed = true;
        this.registrationSteps.next();
      }
    });
  }
  warningMemberDoc(val) {
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
      }
    });
  }

  radioChange1(event) {
    this.isRadio1 = "N";
  }

  radioChange2(event) {
    this.isRadio2 = "N";
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
          value.pdocumentFile.fileName === "" &&
          items[index].pdocumentFile.fileName === ""
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
