import { CdkStepper } from "@angular/cdk/stepper";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { PortalRegistrationService } from "../portal-registration/portal-registration.service";
import { AddressDetailComponent } from "./address-detail/address-detail.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { CsContactDetailComponent } from "./cs-contact-detail/cs-contact-detail.component";
import { DirectorDetailComponent } from "./director-detail/director-detail.component";
import { EmployerRegistrationService } from "./employer-registration.service";
import { PrimaryContactDetailComponent } from "./primary-contact-detail/primary-contact-detail.component";

@Component({
  selector: "app-employer-registration",
  templateUrl: "./employer-registration.component.html",
  styleUrls: ["./employer-registration.component.scss"],
})
export class EmployerRegistrationComponent implements OnInit, AfterViewInit {
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step4Completed = false;
  step5Completed = false;
  step6Completed = false;
  step7Completed = false;
  step8Completed = false;
  step9Completed = false;
  step10Completed = false;
  activeIndex: number;
  url = "";
  type: any = "";
  addressSource: any = new MatTableDataSource();
  contactSource: any = new MatTableDataSource();
  directorSource: any = new MatTableDataSource();
  primarycontactSource: any = new MatTableDataSource();
  cscontactSource: any = new MatTableDataSource();
  addressdisplayColumns: string[] = [
    "addressTypeDescription",
    "countryDescription",
    "townDescription",
    "line1",
    "action",
  ];
  contactdisplayColumns: string[] = [
    "contactTypeDescription",
    "communicationDetails",
    "action",
  ];
  directordisplayColumns: string[] = ["fnpfNo", "tinNo", "fullName", "action"];
  primarycontactdisplayColumns: string[] = [
    "fnpfNo",
    "tinNo",
    "fullName",
    "action",
  ];
  cscontactdisplayColumns: string[] = ["fnpfNo", "tinNo", "fullName", "action"];
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild("employerregistrationSteps", { static: false })
  employerregistrationSteps: CdkStepper;
  @ViewChild("tradeName", { static: false }) tradeName;
  errorTrueStep1 = false;
  errorTrueStep2 = false;
  errorTrueStep3 = false;
  loadingTrue = false;
  mandatory = false;
  others = false;
  businessRegistrationNoRequired = true;
  companyTinRequired = true;
  businessLicenseNoRequired = true;
  fileUploading = "";
  successTrue = false;
  id = "";
  PassportNoRequired = false;
  BirthRegistationNoRequired = false;
  ContactTinNoRequired = false;
  Applicationid = 0;

  otherbusinesstype = false;

  constructor(
    public employer: EmployerRegistrationService,
    public data: DataService,
    public fullspinner: FullSpinnerService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    public appSettingService: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.initialdata();
    });
    this.data.headerName = {
      screenName: "New Employer Registration",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Employer Registration Detail",
          link: "",
        },
      ],
    };
    this.route.paramMap.subscribe((params) => {});
  }

  ngOnInit(): void {
    let paramsId = this.route.snapshot.paramMap.get("id");
    if (
      paramsId &&
      paramsId !== "" &&
      paramsId !== null &&
      paramsId !== undefined
    ) {
      this.Applicationid = Number(paramsId);
    }
    console.log(this.Applicationid);
    this.employer.errorTrue = false;
  }

  ngAfterViewInit(): void {
    //this.tradeName.setFocus();
  }

  step1Click() {
    this.step1Completed = true;
    this.employerregistrationSteps.next();
  }
  step2Click() {
    this.step2Completed = true;
    this.employerregistrationSteps.next();
  }
  step3Click() {
    this.step3Completed = true;
    this.employerregistrationSteps.next();
  }
  step4Click() {
    this.step4Completed = true;
    this.employerregistrationSteps.next();
  }
  step5Click() {
    this.step5Completed = true;
    this.employerregistrationSteps.next();
  }
  step6Click() {
    this.step6Completed = true;
    this.employerregistrationSteps.next();
  }
  step7Click() {
    this.step7Completed = true;
    this.employerregistrationSteps.next();
  }
  step8Click() {
    this.step8Completed = true;
    this.employerregistrationSteps.next();
  }
  step9Click() {
    this.step9Completed = true;
    this.employerregistrationSteps.next();
  }
  step10Click() {
    this.step10Completed = true;
    this.successTrue = true;
    this.employerregistrationSteps.next();
  }
  clickPrev() {
    this.employerregistrationSteps.previous();
    this.successTrue = false;
  }
  private disableLoader() {
    this.employer.setAll(false);
    this.fullspinner.empty.next(false);
  }

  initialdata() {
    this.employer.errorTrue = false;
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.employerRegistration.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.employer.initialData[element.key] = element.value;
        });
        this.disableLoader();
        this.init();
      },
      (error) => {
        this.data.errorMethod(error);
        this.disableLoader();
      }
    );
  }

  init() {
    if (this.Applicationid > 0) {
      this.employer.newEmployer.employerRegistrationId = this.Applicationid;
      this.openEmployerRegistrationdata();
    } else {
      this.newemployer();
    }
  }

  OnChangeconstitutionOfBusinessValue(val) {
    if (val === "OTHR") {
      this.otherbusinesstype = true;
    } else {
      this.otherbusinesstype = false;
    }
  }

  openEmployerRegistrationdata() {
    this.employer.setAll(true);
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.employer.newEmployer.employerRegistrationId,
    };
    this.data.postData(AppGlobal.apiPaths.employerRegistration.open, obj).then(
      (success: any) => {
        this.employer.newEmployer = success;
        this.addressSource = new MatTableDataSource(
          this.employer.newEmployer.plstEmployerRegistraionAddress
        );
        this.contactSource = new MatTableDataSource(
          this.employer.newEmployer.plstEmployerRegistraionCommunicationDetails
        );
        this.directorSource = new MatTableDataSource(
          this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
            (e) => e.contactTypeValue === "DRTR"
          )
        );
        this.primarycontactSource = new MatTableDataSource(
          this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
            (e) => e.contactTypeValue === "PRMY"
          )
        );
        this.cscontactSource = new MatTableDataSource(
          this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
            (e) => e.contactTypeValue === "CSCT"
          )
        );
        this.disableLoader();
      },
      (error) => {
        this.data.errorMethod(error);
        this.disableLoader();
      }
    );
  }

  newemployer() {
    this.data.getData(AppGlobal.apiPaths.employerRegistration.new).then(
      (success: any) => {
        this.employer.newEmployer = success;
        this.disableLoader();
      },
      (error) => {
        this.data.errorMethod(error);
        this.disableLoader();
      }
    );
  }

  verifyEmployer(a) {
    if (a.valid) {
      if (
        this.employer.newEmployer.constitutionOfBusinessValue === "OTHR" &&
        this.employer.newEmployer.constitutionOfBusinessOtherDesc === ""
      ) {
        this.employer.otherbusinesstype = true;
        return;
      }
      this.employer.errorTrue = false;
      this.employer.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.employerRegistration.verify,
          this.employer.newEmployer
        )
        .then(
          (success: any) => {
            this.employer.newEmployer = success;
            this.employer.otherbusinesstype = false;
            this.disableLoader();
            this.step2Completed = true;
            this.step1Click();
          },
          (error) => {
            this.disableLoader();
            this.data.errorMethod(error);
          }
        );
    } else {
      this.employer.errorTrue = true;
      if (
        this.employer.newEmployer.constitutionOfBusinessValue === "OTHR" &&
        this.employer.newEmployer.constitutionOfBusinessOtherDesc === ""
      ) {
        this.employer.otherbusinesstype = true;
      }
    }
  }
  saveData(b) {
    if (b.valid) {
      if (
        this.employer.newEmployer.tin.length < 9 ||
        this.employer.newEmployer.tin.length > 10
      ) {
        const message = "Please enter valid TIN";
        this.data.errorMesaageOnly(message);
        return;
      }

      this.employer.errorTrue = false;
      this.employer.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.employerRegistration.update,
          this.employer.newEmployer
        )
        .then(
          (success: any) => {
            this.employer.newEmployer = success;
            this.employer.btnClicked = false;
            this.disableLoader();
            this.step5Completed = true;
            this.employerregistrationSteps.next();
          },
          (error) => {
            this.disableLoader();
            this.data.errorMethod(error);
          }
        );
    } else {
      this.employer.errorTrue = true;
    }
  }
  validateAddress() {
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.address.validate,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.disableLoader();
          this.step6Completed = true;
          this.employerregistrationSteps.next();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }
  validateCommunication() {
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.communication.validate,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.disableLoader();
          this.step7Completed = true;
          this.employerregistrationSteps.next();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }
  validateDirectorContacts() {
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.validatedirector,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.disableLoader();
          this.step8Completed = true;
          this.employerregistrationSteps.next();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }
  validatePrimaryContacts() {
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.validateprimary,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.disableLoader();
          this.step9Completed = true;
          this.employerregistrationSteps.next();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }
  validateCSContacts() {
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.validatecs,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.disableLoader();
          this.step10Completed = true;
          this.employerregistrationSteps.next();
          //this.downloademployerregistrationform();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }
  uploadEmployerDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.pDocumentFile = file;
    const index = this.employer.newEmployer.plstEmployerRegistrationDocument
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      this.employer.newEmployer.plstEmployerRegistrationDocument[index] =
        document;
      this.fileUploading = "";
      this.fullspinner.empty.next(false);
    }
  }

  documentFileId: 49966;
  fileName: "Birth Certificate.jpg";
  fileSize: 1194405;
  fileType: "jpg";
  ibyteImageContent: null;
  idoObjState: "Selected";
  istrFileContent: "";
  relativePath: "D:\\Generated Files\\EmployerRegistrationDocuments\\202207090000001\\42";
  updateSeq: 0;
  uploadbyFullName: "";

  clearFile(document) {
    const index = this.employer.newEmployer.plstEmployerRegistrationDocument
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      if (
        this.employer.newEmployer.plstEmployerRegistrationDocument[index] !==
        null
      ) {
        this.employer.newEmployer.plstEmployerRegistrationDocument[
          index
        ].pDocumentFile.fileName = "";
        this.employer.newEmployer.plstEmployerRegistrationDocument[
          index
        ].pDocumentFile.fileSize = 0;
        this.employer.newEmployer.plstEmployerRegistrationDocument[
          index
        ].pDocumentFile.relativePath = "";
        this.employer.newEmployer.plstEmployerRegistrationDocument[
          index
        ].pDocumentFile.fileType = "";
        this.employer.newEmployer.plstEmployerRegistrationDocument[
          index
        ].pDocumentFile.istrFileContent = "";
      } else {
        const obj = {
          fileName: "",
          fileType: "",
          fileSize: 0,
          relativePath: "",
          istrFileContent: "",
        };
        this.employer.newEmployer.plstEmployerRegistrationDocument[
          index
        ].pDocumentFile = obj;
      }
    }
  }

  documentSubmited() {
    this.employer.errorTrue = false;
    let errorM: any = false;
    this.employer.newEmployer.plstEmployerRegistrationDocument.forEach(
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

    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);

    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.upload,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.btnClicked = false;
          this.fullspinner.empty.next(false);
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
          } else {
            this.step4Completed = true;
            this.employerregistrationSteps.next();
          }
        },
        (error) => {
          this.employer.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
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

  active(row) {
    this.activeIndex = row;
  }

  //Address

  newAddress() {
    this.employer.newEmployer.pEmployerRegistraionAddress.employerRegistrationAddressId = 0;
    this.employer.addresstype = "new";
    this.fullspinner.empty.next(true);
    this.employer.btnClicked = true;
    this.data.getData(AppGlobal.apiPaths.employerRegistration.address.new).then(
      (success: any) => {
        this.employer.newEmployer.pEmployerRegistraionAddress = success;
        this.fullspinner.empty.next(false);
        this.employer.btnClicked = false;

        const dialogRef = this.dialog.open(AddressDetailComponent, {
          width: "650px",
          height: "300px",
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.addressSource = new MatTableDataSource(
            this.employer.newEmployer.plstEmployerRegistraionAddress
          );
        });
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.employer.btnClicked = false;
        this.data.errorMethod(error);
      }
    );
  }

  editAddress(val) {
    this.employer.addresstype = "edit";
    this.employer.newEmployer.pEmployerRegistraionAddress.employerRegistrationAddressId =
      val;
    this.employer.btnClicked = false;
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.employer.newEmployer.pEmployerRegistraionAddress
        .employerRegistrationAddressId,
    };
    this.data
      .postData(AppGlobal.apiPaths.employerRegistration.address.open, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.employer.newEmployer.pEmployerRegistraionAddress = success;
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.data.successMesaage(success);
          const dialogRef = this.dialog.open(AddressDetailComponent, {
            width: "650px",
            height: "300px",
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.addressSource = new MatTableDataSource(
              this.employer.newEmployer.plstEmployerRegistraionAddress
            );
          });
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
        }
      );
  }

  checkDeleteData(element): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this address detail",
        // content: this.subscription.subscriptionName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAddress(element);
      }
    });
  }

  deleteAddress(element): void {
    this.fullspinner.empty.next(true);
    this.employer.newEmployer.pEmployerRegistraionAddress = element;
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.address.delete,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.addressSource = new MatTableDataSource(
            this.employer.newEmployer.plstEmployerRegistraionAddress
          );
          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  // Employer Communication

  newContact() {
    this.employer.newEmployer.pEmployerRegistraionCommunicationDetails.employerRegistrationCommunicationDetailId = 0;
    this.employer.communicationtype = "new";
    this.fullspinner.empty.next(true);
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.data
      .getData(AppGlobal.apiPaths.employerRegistration.communication.new)
      .then(
        (success: any) => {
          this.employer.newEmployer.pEmployerRegistraionCommunicationDetails =
            success;
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          const dialogRef = this.dialog.open(ContactDetailComponent, {
            width: "650px",
            height: "300px",
          });

          dialogRef.afterClosed().subscribe((result) => {
            this.contactSource = new MatTableDataSource(
              this.employer.newEmployer.plstEmployerRegistraionCommunicationDetails
            );
          });
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.data.errorMethod(error);
        }
      );
  }

  editContact(val) {
    this.employer.communicationtype = "edit";
    this.employer.errorTrue = false;
    this.employer.newEmployer.pEmployerRegistraionCommunicationDetails.employerRegistrationCommunicationDetailId =
      val;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.employer.newEmployer.pEmployerRegistraionCommunicationDetails
        .employerRegistrationCommunicationDetailId,
    };
    this.data
      .postData(AppGlobal.apiPaths.employerRegistration.communication.open, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.employer.newEmployer.pEmployerRegistraionCommunicationDetails =
            success;
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.data.successMesaage(success);

          const dialogRef = this.dialog.open(ContactDetailComponent, {
            width: "650px",
            height: "300px",
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.contactSource = new MatTableDataSource(
              this.employer.newEmployer.plstEmployerRegistraionCommunicationDetails
            );
          });
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
        }
      );
  }

  checkDeleteContactData(element): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this contact detail",
        // content: this.subscription.subscriptionName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteContact(element);
      }
    });
  }

  deleteContact(element): void {
    this.fullspinner.empty.next(true);
    this.employer.newEmployer.pEmployerRegistraionCommunicationDetails =
      element;
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.communication.delete,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.contactSource = new MatTableDataSource(
            this.employer.newEmployer.plstEmployerRegistraionCommunicationDetails
          );
          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  // Director

  newDirector() {
    this.fullspinner.empty.next(true);
    this.employer.btnClicked = true;
    const obj = {
      data: this.employer.newEmployer.employerRegistrationId,
    };
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.newdirector,
        obj
      )
      .then(
        (success: any) => {
          this.employer.newEmployer.pEmployerRegistrationContacts = success;
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          const dialogRef = this.dialog.open(DirectorDetailComponent, {
            width: "1000px",
            height: "600px",
          });

          dialogRef.afterClosed().subscribe((result) => {
            this.directorSource = new MatTableDataSource(
              this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
                (e) => e.contactTypeValue === "DRTR"
              )
            );
          });
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.data.errorMethod(error);
        }
      );
  }

  editDirector(val) {
    this.employer.newEmployer.pEmployerRegistrationContacts.employerRegistrationContactId =
      val;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.employer.newEmployer.pEmployerRegistrationContacts
        .employerRegistrationContactId,
    };
    this.data
      .postData(AppGlobal.apiPaths.employerRegistration.contacts.open, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.employer.newEmployer.pEmployerRegistrationContacts = success;
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.data.successMesaage(success);
          const dialogRef = this.dialog.open(DirectorDetailComponent, {
            width: "1000px",
            height: "600px",
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.directorSource = new MatTableDataSource(
              this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
                (e) => e.contactTypeValue === "DRTR"
              )
            );
          });
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
        }
      );
  }

  checkDeleteDirectorData(element): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this contact detail",
        // content: this.subscription.subscriptionName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletedirector(element);
      }
    });
  }

  deletedirector(element): void {
    this.fullspinner.empty.next(true);
    this.employer.newEmployer.pEmployerRegistrationContacts = element;
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.delete,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.directorSource = new MatTableDataSource(
            this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
              (e) => e.contactTypeValue === "DRTR"
            )
          );

          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  uploadDirectorDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.documentFileType = file.fileType;
    document.documentFileSize = file.fileSize;
    document.documentFileRelativePath = file.relativePath;
    document.documentFileName = file.fileName;
    document.documentFileContent = file.istrFileContent;
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
    }
  }

  //Primary Contact

  newPrimaryContact() {
    this.fullspinner.empty.next(true);
    this.employer.btnClicked = true;
    this.employer.newEmployer.sameAsDirectors = "N";
    const obj = {
      data: this.employer.newEmployer.employerRegistrationId,
    };
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.newprimary,
        obj
      )
      .then(
        (success: any) => {
          this.employer.newEmployer.pEmployerRegistrationContacts = success;
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;

          const dialogRef = this.dialog.open(PrimaryContactDetailComponent, {
            width: "1000px",
            height: "600px",
          });

          dialogRef.afterClosed().subscribe((result) => {
            this.primarycontactSource = new MatTableDataSource(
              this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
                (e) => e.contactTypeValue === "PRMY"
              )
            );
          });
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.data.errorMethod(error);
        }
      );
  }

  editPrimaryContact(val) {
    this.employer.newEmployer.pEmployerRegistrationContacts.employerRegistrationContactId =
      val;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.employer.newEmployer.pEmployerRegistrationContacts
        .employerRegistrationContactId,
    };
    this.data
      .postData(AppGlobal.apiPaths.employerRegistration.contacts.open, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.employer.newEmployer.pEmployerRegistrationContacts = success;
          if (
            success.isSameAsDirector != null &&
            success.isSameAsDirector != "" &&
            success.isSameAsDirector === "Y"
          ) {
            this.employer.newEmployer.sameAsDirectors = "Y";
          } else {
            this.employer.newEmployer.sameAsDirectors = "N";
          }
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.data.successMesaage(success);
          const dialogRef = this.dialog.open(PrimaryContactDetailComponent, {
            width: "1000px",
            height: "600px",
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.primarycontactSource = new MatTableDataSource(
              this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
                (e) => e.contactTypeValue === "PRMY"
              )
            );
          });
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
        }
      );
  }

  checkDeletePrimaryContact(element): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this contact detail",
        // content: this.subscription.subscriptionName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePrimaryContact(element);
      }
    });
  }

  deletePrimaryContact(element): void {
    this.fullspinner.empty.next(true);
    this.employer.newEmployer.pEmployerRegistrationContacts = element;
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.delete,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.primarycontactSource = new MatTableDataSource(
            this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
              (e) => e.contactTypeValue === "PRMY"
            )
          );
          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  uploadPrimaryContactDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.documentFileType = file.fileType;
    document.documentFileSize = file.fileSize;
    document.documentFileRelativePath = file.relativePath;
    document.documentFileName = file.fileName;
    document.documentFileContent = file.istrFileContent;
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
    }
  }
  // CS Contact

  newCSContact() {
    this.fullspinner.empty.next(true);
    this.employer.newEmployer.sameAsDirectorsAndPrimary = "N";
    this.employer.btnClicked = true;
    const obj = {
      data: this.employer.newEmployer.employerRegistrationId,
    };
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.newcscontact,
        obj
      )
      .then(
        (success: any) => {
          this.employer.newEmployer.pEmployerRegistrationContacts = success;
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;

          const dialogRef = this.dialog.open(CsContactDetailComponent, {
            width: "1000px",
            height: "600px",
          });

          dialogRef.afterClosed().subscribe((result) => {
            this.cscontactSource = new MatTableDataSource(
              this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
                (e) => e.contactTypeValue === "CSCT"
              )
            );
          });
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.employer.btnClicked = false;
          this.data.errorMethod(error);
        }
      );
  }

  editCSContact(val) {
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data
      .postData(AppGlobal.apiPaths.employerRegistration.contacts.open, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.employer.newEmployer.pEmployerRegistrationContacts = success;
          if (
            success.isSameAsPrimaryContact != null &&
            success.isSameAsPrimaryContact != "" &&
            success.isSameAsPrimaryContact === "Y"
          ) {
            this.employer.newEmployer.sameAsDirectorsAndPrimary = "Y";
          } else {
            this.employer.newEmployer.sameAsDirectorsAndPrimary = "N";
          }
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.data.successMesaage(success);
          this.employer.newEmployer.pEmployerRegistrationContacts.employerRegistrationContactId =
            val;
          const dialogRef = this.dialog.open(CsContactDetailComponent, {
            width: "1000px",
            height: "600px",
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.cscontactSource = new MatTableDataSource(
              this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
                (e) => e.contactTypeValue === "CSCT"
              )
            );
          });
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
        }
      );
  }

  checkDeleteCSContact(element): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this contact detail",
        // content: this.subscription.subscriptionName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCSContact(element);
      }
    });
  }

  deleteCSContact(element): void {
    this.fullspinner.empty.next(true);
    this.employer.newEmployer.pEmployerRegistrationContacts = element;
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.contacts.delete,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.cscontactSource = new MatTableDataSource(
            this.employer.newEmployer.plstEmployerRegistrationContacts.filter(
              (e) => e.contactTypeValue === "CSCT"
            )
          );

          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  uploadCSContactDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.documentFileType = file.fileType;
    document.documentFileSize = file.fileSize;
    document.documentFileRelativePath = file.relativePath;
    document.documentFileName = file.fileName;
    document.documentFileContent = file.istrFileContent;
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
    }
  }

  Submitemployerregistration(): void {
    this.data.clearErrorMsg();

    if (
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo
        .pDocumentFile.fileName === ""
    ) {
      this.employer.errorTrue = true;
      return;
    }

    if (
      this.employer.newEmployer.acceptDeclaration === "" ||
      this.employer.newEmployer.acceptDeclaration === "N"
    ) {
      const message = "Please accept the declaration.";
      this.data.errorMesaageOnly(message);
      return;
    }
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.submit,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.successTrue = true;
          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  Cancelemployerregistration(): void {
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.cancel,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.step10Completed = true;
          this.employerregistrationSteps.next();
          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  downloademployerregistrationform(): void {
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .pdf(
        AppGlobal.apiPaths.employerRegistration.generateform,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.loadingTrue = false;
          this.openPDFViewer(success);
          this.disableLoader();
        },
        (error: any) => {
          this.employer.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  openPDFViewer(xurl) {
    const dialogRef = this.dialog.open(ViewPdfComponent, {
      width: "100%",
      height: "70%",
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

  Uploademployerregistrationform(): void {
    this.employer.errorTrue = false;
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.employerRegistration.generateform,
        this.employer.newEmployer
      )
      .then(
        (success: any) => {
          this.employer.newEmployer = success;
          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }

  CheckDeclaration(value) {
    value === true
      ? (this.employer.newEmployer.acceptDeclaration = "Y")
      : (this.employer.newEmployer.acceptDeclaration = "N");
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
        this.step4Completed = true;
        this.employerregistrationSteps.next();
      }
    });
  }

  uploadEmployerDeclarationDocument(file) {
    this.fileUploading =
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.documentTypeValue;
    this.fullspinner.empty.next(true);
    this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.fileType =
      file.fileType;
    this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.fileSize =
      file.fileSize;
    this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.relativePath =
      file.relativePath;
    this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.fileName =
      file.fileName;
    this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.istrFileContent =
      file.istrFileContent;
    this.fileUploading = "";
    this.fullspinner.empty.next(false);
  }

  clearEmployerDeclarationFile() {
    if (
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo
        .pDocumentFile !== null &&
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo
        .pDocumentFile.documentFileId > 0
    ) {
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.fileType =
        "";
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.fileSize = 0;
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.relativePath =
        "";
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.fileName =
        "";
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.uploadbyFullName =
        "";
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile.istrFileContent =
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
      this.employer.newEmployer.pEmployerRegistrationDocumentWithCompanyLogo.pDocumentFile =
        obj;
    }
  }
}
