import { CdkStepper } from "@angular/cdk/stepper";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { AesService } from "src/app/service/aes.service";
import { DataService } from "src/app/service/data.service";
import { GeneralService } from "src/app/service/general.service";
import { PortalRegistrationService } from "../../portal-registration/portal-registration.service";
import { LoginErrorComponent } from "./login-error/login-error.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @ViewChild("slidebox", { static: false }) slidebox: CdkStepper;
  @ViewChild("mainslide", { static: false }) mainslide: CdkStepper;
  @ViewChild("twofactor", { static: false }) twofactor: CdkStepper;
  resendText = "";
  timeintervel: any;
  countDownDate = new Date().getTime() + AppGlobal.resendTime * 60000;
  resetDisabled = true;
  register = {
    employerRefNo: "",
  };
  errorTrue = false;
  loadingTrue = false;
  btnClicked = false;

  loginerrorTrue = false;
  loginerrorText = "";
  errorText = "";
  OtpMode = "1";
  user = {
    username: "",
    password: "",
    guid: "",
  };
  loginsuccess: any;

  passwordText = "password";

  constructor(
    public router: Router,
    public general: GeneralService,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public prtalregistration: PortalRegistrationService,
    public storage: Storage,
    public aes: AesService
  ) {}

  ngOnInit(): void {
    this.getToken();
    this.data.isLoggedIn = false;
    // this.openErrorMessage();
    // this.setTimer();
    // this.fullspinner.empty.next(true);
    // $(document).ready(function(){
    //   $('#txtInput').bind("paste",function(e) {
    //       e.preventDefault();
    //   });
    // });
  }

  getToken() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.token).then(
      (success: any) => {
        this.storage.set("encryptkey", success.data).then(() => {
          this.fullspinner.empty.next(false);
        });
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.data.errorMethod(error);
      }
    );
  }

  showPassword() {
    this.passwordText === "password"
      ? (this.passwordText = "text")
      : (this.passwordText = "password");
  }

  async onSubmit(l) {
    if (l.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      const obj = {
        username: "",
        password: "",
        guid: "",
      };
      await this.aes.encrypt(this.user.username).then((val: any) => {
        obj.username = val;
      });
      await this.aes.encrypt(this.user.password).then((val: any) => {
        obj.password = val;
      });
      await this.storage.get("encryptkey").then((val) => {
        if (val) {
          obj.guid = val[2];
        } else {
          obj.guid = "";
        }
      });
      this.data.postData(AppGlobal.apiPaths.portalLogin.login, obj).then(
        (success: any) => {
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.general.userData = success;
          if (this.general.userData.enableTwoFactor === "Y") {
            this.router.navigateByUrl("/login/two-factor-authentication");
          } else {
            this.storage.set("userData", this.general.userData);
            this.router.navigateByUrl("/select-organization");
          }
        },
        (error: any) => {
          console.log(error);
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          if (error.status === 400) {
            this.openErrorMessage(error);
          } else {
            this.data.errorMethod(error);
          }
        }
      );
    } else {
      this.errorTrue = true;
    }
  }

  goToApp() {
    this.router.navigateByUrl("/app");
  }

  goToAction(type, action) {
    switch (type) {
      case "main":
        // this.openTwoFactor();
        // action === 'next' ? this.mainslide.next() : this.mainslide.previous();
        break;
      case "slidebox":
        action === "next" ? this.slidebox.next() : this.slidebox.previous();
        break;
      case "twofactor":
        action === "next" ? this.twofactor.next() : this.twofactor.previous();
        this.resendOTP();
        break;
      default:
        break;
    }
  }

  resendOTP() {
    this.countDownDate = new Date().getTime() + AppGlobal.resendTime * 60000;
    this.resetDisabled = true;
    this.setTimer();
  }

  resendTextFn() {}

  setTimer() {
    this.timeintervel = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = this.countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      this.resendText =
        "Resend In " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
      // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      //   + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(this.timeintervel);
        this.resendText = "Resend One Time Passcode";
        this.resetDisabled = false;
        // this.ontimeout.next();
      }
    }, 1000);
  }

  onRegister(r) {
    // this.router.navigateByUrl('/register');
    if (r.valid) {
      this.errorTrue = false;
      this.loadingTrue = true;
      this.fullspinner.empty.next(true);
      const obj = {
        data: this.register.employerRefNo,
      };
      this.data.postData(AppGlobal.apiPaths.portalRegistration.new, obj).then(
        (success: any) => {
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.prtalregistration.register = success;
          this.clearAll();
          this.router.navigateByUrl("/register");
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
        }
      );
    } else {
      this.errorText = "Organization Reference No is Required";
      this.errorTrue = true;
    }
  }
  empRegister() {
    this.router.navigateByUrl("/employer-registration/");
  }
  clearAll() {
    this.register = {
      employerRefNo: "",
    };
  }

  openErrorMessage(val) {
    const dialogRef = this.dialog.open(LoginErrorComponent, {
      width: "400px",
      height: "240px",
      disableClose: true,
      data: {
        message: val.error,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  // openTwoFactor(): void {
  //   const dialogRef = this.dialog.open(LoginTwoFactorComponent, {
  //     width: '400px',
  //     height: '400px',
  //     disableClose: true,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       console.log(result);
  //     }
  //   });
  // }
}
