import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { AddressDetailComponent } from "../address-detail/address-detail.component";
import { EmployerRegistrationService } from "../employer-registration.service";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.scss"],
})
export class ContactDetailComponent implements OnInit {
  id = "";
  type: any = "";
  emailRequired = false;
  mobileRequired = false;
  loadingTrue = false;
  constructor(
    public employer: EmployerRegistrationService,
    public data: DataService,
    public dialogRef: MatDialogRef<AddressDetailComponent>,
    public fullspinner: FullSpinnerService,
    public appSettingService: AppSettingsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
    public cdf: ChangeDetectorRef
  ) {
    //this.type = xdata.type;
  }
  @ViewChild("memberMobile", { static: false })
  memberMobile;

  ngOnInit(): void {
    this.init();
  }

  init() {}
  OnChangeContactValue() {
    this.employer.newEmployer.pEmployerRegistraionCommunicationDetails.communicationDetails =
      "";
  }
  openContact(val) {
    debugger
    this.employer.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.loadingTrue = true;
    const obj = {
      data: this.employer.newEmployer.pEmployerRegistraionCommunicationDetails
        .employerRegistrationCommunicationDetailId,
    };
    this.data
      .postData(AppGlobal.apiPaths.employerRegistration.communication.open, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          // employer.newEmployer.pEmployerRegistraionCommunicationDetails.communicationDetails
          this.employer.newEmployer.pEmployerRegistraionCommunicationDetails =
            success;
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.cdf.detectChanges();
          this.loadingTrue =false;
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.employer.btnClicked = false;
          this.loadingTrue = false;
        }
      );
  }
  saveData(c) {
    if (c.valid) {
      this.employer.errorTrue = false;
      this.employer.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.employerRegistration.communication.save,
          this.employer.newEmployer
        )
        .then(
          (success: any) => {
            this.employer.newEmployer = success;
            this.fullspinner.empty.next(false);
            this.employer.btnClicked = false;
            this.doClose();
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.employer.btnClicked = false;
          }
        );
      // if(this.employer.newEmployer.pEmployerRegistraionCommunicationDetails.contactTypeValue ==='PHNE'  )
      // {
      //   this.employer.errorTrue = false;
      //   this.employer.btnClicked = true;
      //   this.fullspinner.empty.next(true);
      //   this.data
      //     .postData(
      //       AppGlobal.apiPaths.employerRegistration.communication.save,
      //       this.employer.newEmployer
      //     )
      //     .then(
      //       (success: any) => {
      //         this.employer.newEmployer = success;
      //         this.fullspinner.empty.next(false);
      //         this.employer.btnClicked = false;
      //         this.doClose();
      //       },
      //       (error) => {
      //         this.data.errorMethod(error);
      //         this.fullspinner.empty.next(false);
      //         this.employer.btnClicked = false;
      //       }
      //     );
      // } else if (this.employer.newEmployer.pEmployerRegistraionCommunicationDetails.contactTypeValue !='PHNE') 
      //   {
      //     this.employer.errorTrue = false;
      //     this.employer.btnClicked = true;
      //     this.fullspinner.empty.next(true);
      //     this.data
      //       .postData(
      //         AppGlobal.apiPaths.employerRegistration.communication.save,
      //         this.employer.newEmployer
      //       )
      //       .then(
      //         (success: any) => {
      //           this.employer.newEmployer = success;
      //           this.fullspinner.empty.next(false);
      //           this.employer.btnClicked = false;
      //           this.doClose();
      //         },
      //         (error) => {
      //           this.data.errorMethod(error);
      //           this.fullspinner.empty.next(false);
      //           this.employer.btnClicked = false;
      //         }
      //       );
      // }
    } else {
      this.employer.errorTrue = true;
    }
  }

  doClose() {
    this.dialogRef.close();
  }
  doClear() {
    this.employer.newEmployer.pEmployerRegistraionCommunicationDetails.contactTypeValue =
      "";
    this.employer.newEmployer.pEmployerRegistraionCommunicationDetails.communicationDetails =
      "";
  }
}
