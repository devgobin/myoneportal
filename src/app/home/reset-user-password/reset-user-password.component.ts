import { Component, OnInit } from '@angular/core';
import { SuccessAlertComponent } from '../../common/success-alert/success-alert.component';
import { AppGlobal } from '../../constants';
import { FullSpinnerService } from '../../common/full-spinner/full-spinner.service';
import { DataService } from '../../service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-reset-user-password',
  templateUrl: './reset-user-password.component.html',
  styleUrls: ['./reset-user-password.component.scss']
})
export class ResetUserPasswordComponent implements OnInit {
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
      errorMessage: [],
      hasError: true,
    },
    newPassword: "",
    confirmPassword: "",
    transactionPin: "",
    currentPassword: "",
  };

  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public router: Router,
    public general: GeneralService
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

  ngOnInit(): void { }

  onsubmit(rp) {
    if (rp.valid) {
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
              this.fullspinner.empty.next(false);
              this.btnClicked = false;
              // this.successalert();
              this.onSubmitOrg();
            }
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
  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Your password has been reset successfully.",
        Showbtn1: true,
        button1: "Logout"
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

  onSubmitOrg() {
    if (this.general.login.organizationRefNo !== '' && this.general.login.portalUserId !== 0) {
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(AppGlobal.apiPaths.portalLogin.selectOrg, this.general.login)
        .then(
          (success: any) => {
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.data.token = success.token;
            this.general.userData = success;
            this.general.userData.organizationRefNo = this.general.login.organizationRefNo;
            sessionStorage.setItem('FNPFPortalUserData', JSON.stringify(success));
            if (this.general.userData.resetEmailFlag === 'Y') {
              this.router.navigateByUrl('/portal/login');
            }
            else if (this.general.userData.passwordExpiredFlag === 'Y' ||
            this.general.userData.passwordResetFlag === 'Y') {
              this.router.navigateByUrl('/reset/password');
            }
            else {
              if (this.general.userData.defaultLandingPage !== undefined && this.general.userData.defaultLandingPage !== null && this.general.userData.defaultLandingPage !== '') {
                this.router.navigateByUrl(this.general.userData.defaultLandingPage);
              }
              else {
                this.router.navigateByUrl('/app');
              }
            }
          },
          (error: any) => {
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
          }
        );
    }
    // else {
    //   this.data.errorMesaageOnly('Select organization to login.')
    // }
  }
}

