import { Component, OnInit } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { GeneralService } from "src/app/service/general.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  pageId = "RSPWD";
  clearbtn = false;
  errorTrue = false;
  btnClicked = false;
  successTrue = false;
  resetpassword = {
    password: "",
    guid: "",
    portalUserId: 0,
    msg: {
      infoMessage: {
        msgID: 0,
        msgType: 0,
        msgDescription: "",
      },
      hasError: true,
    },
    newPassword: "",
    confirmPassword: "",
    transactionPin: "",
    currentPassword: "",
    updateSeq: 0,
  };

  constructor(
    public general: GeneralService,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.data.headerName = {
      screenName: "Reset Password",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "My Profile",
          link: "",
        },
        {
          name: "Reset Password",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {}

  onsubmit(rp) {
    if (rp.valid && this.resetpassword.transactionPin.length === 4) {
      console.log("okay2");
      if (
        this.general.userData.passwordExpiredFlag === "Y" &&
        this.general.userData.portalUserId > 0
      ) {
        console.log("okay3");
        this.errorTrue = false;
        this.btnClicked = true;
        this.fullspinner.empty.next(true);
        this.resetpassword.portalUserId = this.general.userData.portalUserId;
        this.data
          .postData(
            AppGlobal.apiPaths.portalLogin.resetpassword,
            this.resetpassword
          )
          .then(
            (success: any) => {
              this.resetpassword = success;
              if (success.msg) {
                if (Array.isArray(success.msg.errorMessage.msgDescription)) {
                  if (success.msg.errorMessage.msgDescription.length !== 0) {
                    this.data.errorResponse(success);
                    this.fullspinner.empty.next(false);
                    this.btnClicked = false;
                  }
                }
                this.fullspinner.empty.next(false);
                this.btnClicked = false;
                this.successalert();
              }
            },
            (error) => {
              this.data.errorMethod(error);
              this.fullspinner.empty.next(false);
              this.btnClicked = false;
            }
          );
      } else {
        this.errorTrue = false;
        this.btnClicked = true;
        this.fullspinner.empty.next(true);
        const obj = {
          data: this.resetpassword,
        };
        this.data
          .postData(
            AppGlobal.apiPaths.myprofile.resetpassword,
            this.resetpassword
          )
          .then(
            (success: any) => {
              this.resetpassword = success;
              if (success.msg) {
                if (Array.isArray(success.msg.errorMessage.msgDescription)) {
                  if (success.msg.errorMessage.msgDescription.length !== 0) {
                    this.data.errorResponse(success);
                    this.fullspinner.empty.next(false);
                    this.btnClicked = false;
                  }
                }
                this.fullspinner.empty.next(false);
                this.btnClicked = false;
                this.successalert();
              }
            },
            (error) => {
              this.data.errorMethod(error);
              this.fullspinner.empty.next(false);
              this.btnClicked = false;
            }
          );
      }
    } else {
      this.errorTrue = true;
    }
  }

  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Your password has been reset successfully.",
        Showbtn1: true,
        button1: "Logout",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logout();
      }
    });
  }
  logout() {
    this.router.navigateByUrl("/");
  }
}
