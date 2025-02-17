import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { GeneralService } from "src/app/service/general.service";

@Component({
  selector: "app-login-select-organization",
  templateUrl: "./login-select-organization.component.html",
  styleUrls: ["./login-select-organization.component.scss"],
})
export class LoginSelectOrganizationComponent implements OnInit {
  btnClicked = false;
  emailsuccess = false;
  login = {
    portalUserId: 0,
    organizationRefNo: "",
  };

  constructor(
    public general: GeneralService,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.data.isLoggedIn = false;
    if (
      this.general.userData.entOrgContact.lstprotoentOrganization.length === 1
    ) {
      this.login.organizationRefNo =
        this.general.userData.entOrgContact.lstprotoentOrganization[0].orgRefNo;
      this.onSubmit();
    }
  }

  onSubmit() {
    if (
      this.login.organizationRefNo !== "" &&
      this.general.userData.portalUserId !== 0
    ) {
      this.data.clearErrorMsg();
      this.login.portalUserId = this.general.userData.portalUserId;
      this.general.login = this.login;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(AppGlobal.apiPaths.portalLogin.selectOrg, this.login)
        .then(
          (success: any) => {
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.data.token = success.token;
            this.general.userData = success;
            this.general.userData.organizationRefNo =
              this.login.organizationRefNo;
            this.data.isLoggedIn = true;
            sessionStorage.setItem(
              "FNPFPortalUserData",
              JSON.stringify(success)
            );
            if (this.general.userData.resetEmailFlag === "Y") {
              this.router.navigateByUrl("/portal/login");
            } else if (
              this.general.userData.passwordExpiredFlag === "Y" ||
              this.general.userData.passwordResetFlag === "Y"
            ) {
              this.router.navigateByUrl("/reset/password");
            } else {
              // if(this.general.userData.totalUnreadMessageCount > 0)
              // {
              //   this.data.successMesaageOnly("You have"+"  "+ this.general.userData.totalUnreadMessageCount + " " +"Unread Message(s) from FNPF")
              // }
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
            }
          },
          (error: any) => {
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
          }
        );
    } else {
      this.data.errorMesaageOnly("Select organization to login.");
    }
  }
}
