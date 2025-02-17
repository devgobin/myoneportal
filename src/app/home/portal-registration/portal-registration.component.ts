import { CdkStepper } from "@angular/cdk/stepper";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { PortalRegistrationService } from "./portal-registration.service";
import { GeneralService } from "src/app/service/general.service";
import { AppSettingsService } from "src/app/service/app-settings.service";

@Component({
  selector: "app-portal-registration",
  templateUrl: "./portal-registration.component.html",
  styleUrls: ["./portal-registration.component.scss"],
})
export class PortalRegistrationComponent implements OnInit, AfterViewInit {
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;

  @ViewChild("registrationSteps", { static: false })
  registrationSteps: CdkStepper;
  @ViewChild("employerName", { static: false }) employerName;
  errorTrueStep1 = false;
  errorTrueStep2 = false;
  errorTrueStep3 = false;
  btnClicked = false;
  loadingTrue = false;

  businessRegistrationNoRequired = true;
  companyTinRequired = true;
  businessLicenseNoRequired = true;
  fileUploading = "";
  successTrue = false;

  PassportNoRequired = false;
  BirthRegistationNoRequired = false;
  ContactTinNoRequired = false;

  constructor(
    public router: Router,
    public portal: PortalRegistrationService,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public appSettingService: AppSettingsService
  ) { }

  ngOnInit(): void {
    // this.onRegister();
  }

  ngAfterViewInit(): void {
    this.employerName.setFocus();
  }

  step1Click() {
    this.step1Completed = true;
    this.registrationSteps.next();
    // this.registrationSteps.selectedIndex = 1;
  }
  step2Click() {
    this.step2Completed = true;
    // this.registrationSteps.selectedIndex = 2;
    this.registrationSteps.next();
  }
  step3Click() {
    this.step3Completed = true;
    // this.registrationSteps.selectedIndex = 1;
    this.registrationSteps.next();
    this.router.navigateByUrl("/portal/login");
  }

  clickPrev() {
    this.registrationSteps.previous();
  }

  onSubmitOrganization(m) {
    // this.step1Completed = true;
    // this.registrationSteps.next();
    if (m.valid) {
      this.errorTrueStep1 = false;
      this.setAll(true);
      this.data
        .postData(
          AppGlobal.apiPaths.portalRegistration.organization,
          this.portal.register
        )
        .then(
          (success: any) => {
            this.setAll(false);
            this.portal.register = success;
            this.step1Completed = true;
            this.registrationSteps.next();
            this.CheckIsFijiCitizen();
          },
          (error: any) => {
            console.log(error);
            this.setAll(false);
            this.data.errorMethod(error);
          }
        );
    } else {
      this.setAll(false);
      this.errorTrueStep1 = true;
    }
  }

  onSubmitContact(c) {
    if (c.valid) {
      this.errorTrueStep2 = false;
      this.setAll(true);
      this.data
        .postData(
          AppGlobal.apiPaths.portalRegistration.validatecontactdetail,
          this.portal.register
        )
        .then(
          (success: any) => {
            this.setAll(false);
            this.portal.register = success;
            this.errorTrueStep2 = false;
            this.step2Completed = true;
            this.registrationSteps.next();
          },
          (error: any) => {
            console.log(error);
            this.setAll(false);
            this.data.errorMethod(error);
          }
        );
    } else {
      this.errorTrueStep2 = true;
    }
  }

  checkRequired() {
    this.businessRegistrationNoRequired = true;
    this.companyTinRequired = true;
    this.businessLicenseNoRequired = true;
    if (this.portal.register.businessRegistrationNo !== "") {
      this.businessRegistrationNoRequired = true;
      this.companyTinRequired = false;
      this.businessLicenseNoRequired = false;
    }
    if (this.portal.register.companyTin !== "") {
      this.businessRegistrationNoRequired = false;
      this.companyTinRequired = true;
      this.businessLicenseNoRequired = false;
    }
    if (this.portal.register.businessLicenseNo !== "") {
      this.businessRegistrationNoRequired = false;
      this.companyTinRequired = false;
      this.businessLicenseNoRequired = true;
    }
  }

  setAll(val) {
    this.btnClicked = val;
    this.loadingTrue = val;
    this.fullspinner.empty.next(val);
  }

  // unwanted Methods
  // onRegister() {
  //   // this.router.navigateByUrl('/register');
  //   const obj = {
  //     data: 'w2345',
  //   };
  //   this.data.postData(AppGlobal.apiPaths.portalRegistration.new, obj).then(
  //     (success: any) => {
  //       this.portal.register = success;
  //       this.portal.employerPortalRegistrationDocument =
  //         success.employerPortalRegistrationDocument;
  //     },
  //     (error: any) => {}
  //   );
  // }

  uploadDocument(file, document) {
    this.fileUploading = file.documentTypeValue;
    this.fullspinner.empty.next(true);
    //document.documentFileList = [];
    // document.documentFileList.push(file);
    if (this.portal.register.employerPortalRegistrationDocument.length > 0) {
      for (
        let i = 0;
        i < this.portal.register.employerPortalRegistrationDocument.length;
        i++
      ) {
        if (
          this.portal.register.employerPortalRegistrationDocument[i]
            .documentTypeValue == document
        ) {
          this.portal.register.employerPortalRegistrationDocument[
            i
          ].documentFile = file;
        }
      }
    }
    this.fullspinner.empty.next(false);
    // this.data
    //   .postData(AppGlobal.apiPaths.portalRegistration.document, document)
    //   .then(
    //     (success: any) => {
    //       this.fileUploading = '';
    //       this.fullspinner.empty.next(false);
    //       const index = this.portal.register.employerPortalRegistrationDocument
    //         .map((e) => e.documentTypeValue)
    //         .indexOf(success.documentTypeValue);
    //       if (index !== -1) {
    //         this.portal.register.employerPortalRegistrationDocument[
    //           index
    //         ] = success;
    //       }
    //     },
    //     (error) => {
    //       this.fileUploading = '';
    //       this.fullspinner.empty.next(false);
    //       this.data.errorMethod(error);
    //     }
    //   );
    // console.log(file);
  }

  onSubmit() {
    let errorM: any = false;
    let msg = "";
    this.portal.register.employerPortalRegistrationDocument.forEach(
      (element) => {
        if (element.isMandatory === "Y") {
          if (
            element.documentFile.fileName === "" ||
            element.documentFile.istrFileContent === ""
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
      this.portal.register.errorTrue = true;
      return;
    }
    // for(let i=0;i<)
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.portalRegistration.submit,
        this.portal.register
      )
      .then(
        (success: any) => {
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.portal.register = success;
          this.successTrue = true;
        },
        (error) => {
          console.log(error);
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  clearFile(document) {
    const index = this.portal.register.employerPortalRegistrationDocument
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
      this.portal.register.employerPortalRegistrationDocument[
        index
      ].documentFile = obj;
    }
  }
  CheckedorNot(value) {
    value === true
      ? (this.portal.register.isFijiCitizen = "Y")
      : (this.portal.register.isFijiCitizen = "N");
    console.log("called");
    console.log(value);
    if (this.portal.register.isFijiCitizen === "Y") {
      this.BirthRegistationNoRequired = true;
      this.PassportNoRequired = false;
    } else {
      this.PassportNoRequired = true;
      this.BirthRegistationNoRequired = false;
    }
  }

  CheckIsFijiCitizen() {
    if (this.portal.register.isFijiCitizen === "Y") {
      this.BirthRegistationNoRequired = true;
      this.PassportNoRequired = false;
    } else {
      this.PassportNoRequired = true;
      this.BirthRegistationNoRequired = false;
    }
  }
}
