import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { GeneralService } from "src/app/service/general.service";
import { DataService } from "../service/data.service";
import { MatDialog } from "@angular/material/dialog";
import { PortalRegistrationService } from "../home/portal-registration/portal-registration.service";
import { AppGlobal } from "../constants";

@Component({
  selector: "app-administrative-login",
  templateUrl: "./administrative-login.component.html",
  styleUrls: ["./administrative-login.component.scss"],
})
export class AdministrativeLoginComponent implements OnInit {
  url: any = "";
  obj = {
    strPortalUserId: "",
    organizationRefNo: "",
    userLoginId: "",
    thirdPartyStaffId: ""
  };
  constructor(
    // public fullspinner: FullSpi
    public router: Router,
    public general: GeneralService,
    public data: DataService,
    public dialog: MatDialog,
    public prtalregistration: PortalRegistrationService,
    public storage: Storage
  ) {}

  ngOnInit(): void {
    this.GetResetpasswordFromURl();
  }
  public GetResetpasswordFromURl() {
    var search = [];
    this.url = window.location.origin + window.location.pathname;

    search[0] = window.location.search
      .split(/[&||?]/)
      .filter(function (x) {
        return x.indexOf("=") > -1;
      })
      .map(function (x) {
        return x.split(/=/);
      })
      .map(function (x) {
        x[1] = x[1].replace(/\+/g, " ");
        return x;
      })
      .reduce(function (acc, current) {
        acc[current[0]] = current[1];
        return acc;
      }, {});

    this.obj.strPortalUserId = search[0].code;
    this.obj.organizationRefNo = search[0].key;
    this.obj.userLoginId = search[0].value;
    this.obj.thirdPartyStaffId = search[0].staff;
    this.onSubmit();
  }

  async onSubmit() {
    this.data
      .postData(
        AppGlobal.apiPaths.portalLogin.employerportalthirdpartylogin,
        this.obj
      )
      .then(
        (success: any) => {
          //this.btnClicked = false;
          //this.fullspinner.empty.next(false);
          this.data.token = success.token;
          this.general.userData = success;
          this.general.userData.organizationRefNo = success.organizationRefNo;
          sessionStorage.setItem("FNPFPortalUserData", JSON.stringify(success));
          // if (this.general.userData.resetEmailFlag === "Y") {
          //   this.router.navigateByUrl("/portal/login");
          // } else if (this.general.userData.passwordExpiredFlag === "Y" ||
          // this.general.userData.passwordResetFlag === 'Y') {
          //   this.router.navigateByUrl("/reset/password");
          // } else {
            if (
              this.general.userData.defaultLandingPage !== undefined &&
              this.general.userData.defaultLandingPage !== null &&
              this.general.userData.defaultLandingPage !== ""
            ) {
              this.router.navigateByUrl(
                this.general.userData.defaultLandingPage
              );
            } else {
              this.router.navigateByUrl("/app");
            }
          //}
        },
       (error) => {
          this.data.errorMethod(error);
          this.router.navigateByUrl('/');
        }
      );
  }

  openErrorMessage(val) {
    // const dialogRef = this.dialog.open(LoginErrorComponent, {
    //   width: "400px",
    //   height: "240px",
    //   disableClose: true,
    //   data: {
    //     message: val.error,
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     console.log(result);
    //   }
    // });
  }
}
