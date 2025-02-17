import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { NomineeDetailComponent } from "src/app/portal/employees/new-member-registration/nominee-detail/nominee-detail.component";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { EmployerRegistrationService } from "../employer-registration.service";

@Component({
  selector: "app-address-detail",
  templateUrl: "./address-detail.component.html",
  styleUrls: ["./address-detail.component.scss"],
})
export class AddressDetailComponent implements OnInit {
  id = "";
  type: any = "";
  btnClicked = false;
  errorTrue = false;
  constructor(
    public employer: EmployerRegistrationService,
    public data: DataService,
    public dialogRef: MatDialogRef<AddressDetailComponent>,
    public fullspinner: FullSpinnerService,
    public appSettingService: AppSettingsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public xdata: any
  ) {
    // this.type = xdata.addressTypeValue;
  }

  ngOnInit(): void {
    this.init();
  }

  init() {}

  openAddress() {
    this.btnClicked = true;
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
          this.btnClicked = false;
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }

  saveData(c) {
    if (c.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.employerRegistration.address.save,
          this.employer.newEmployer
        )
        .then(
          (success: any) => {
            this.employer.newEmployer = success;
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.employer.addresstype = "new";
            this.doClose();
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
  doClose() {
    this.dialogRef.close();
  }
  doClear() {
    this.employer.newEmployer.pEmployerRegistraionAddress.addressTypeValue = "";
    this.employer.newEmployer.pEmployerRegistraionAddress.countryValue = "";
    this.employer.newEmployer.pEmployerRegistraionAddress.townCity = "";
    this.employer.newEmployer.pEmployerRegistraionAddress.line1 = "";
  }
  doRefresh() {}
}
