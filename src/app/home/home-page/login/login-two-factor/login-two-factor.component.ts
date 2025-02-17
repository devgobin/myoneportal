import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { AppGlobal } from 'src/app/constants';
import { DataService } from 'src/app/service/data.service';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-login-two-factor',
  templateUrl: './login-two-factor.component.html',
  styleUrls: ['./login-two-factor.component.scss']
})
export class LoginTwoFactorComponent implements OnInit {
  countDownDate = new Date().getTime() + AppGlobal.resendTime * 60000;
  resetDisabled = false;
  resendText = 'Send';
  timeintervel: any;
  btnClicked = false;
  errorTrue = false;
  login = {
    otp: '',
  };
  constructor(
    public general: GeneralService,
    public fullSpinner: FullSpinnerService,
    public data: DataService,
    public router: Router,
    public storage: Storage
  ) { }

  ngOnInit(): void {
  }


  sendOTP(val) {
    this.btnClicked = true;
    this.fullSpinner.empty.next(true);
    const obj = {
      otpSendType: val,
      portalUserId: this.general.userData.portalUserId,
    };
    this.data.postData(AppGlobal.apiPaths.portalLogin.sendotp, obj).then(
      (success: any) => {
        this.countDownDate = new Date().getTime() + AppGlobal.resendTime * 60000;
        // this.countDownDate = new Date().getTime() + 2 * 60000;
        this.resetDisabled = true;
        this.btnClicked = false;
        this.fullSpinner.empty.next(false);
        this.setTimer();
      },
      (error) => {
        this.data.errorMethod(error);
        this.btnClicked = false;
        this.fullSpinner.empty.next(false);
      }
    );
  }
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
        'Resend In ' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
      // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      //   + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(this.timeintervel);
        this.resendText = 'Send';
        this.resetDisabled = false;
        // this.ontimeout.next();
      }
    }, 1000);
  }

  verifyOTP() {
    if(this.login.otp.length < 4){
      this.errorTrue = true;
      return;
    }
    if (this.login.otp !== '') {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullSpinner.empty.next(true);
      const obj = {
        otp: this.login.otp,
        portalUserId: this.general.userData.portalUserId,
      };
      this.data.postData(AppGlobal.apiPaths.portalLogin.validateotp, obj).then(
        (success: any) => {
          this.btnClicked = false;
          this.fullSpinner.empty.next(false);
          // this.onSubmit();
          this.storage.set('userData', this.general.userData);
          this.router.navigateByUrl('/select-organization');
        },
        (error) => {
          this.data.errorMethod(error);
          this.btnClicked = false;
          this.fullSpinner.empty.next(false);
        }
      );
    } else {
      this.errorTrue = true;
    }
  }

}
