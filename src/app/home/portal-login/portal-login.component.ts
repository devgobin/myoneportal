import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { PortalLoginService } from './portal-login.service';
import { DataService } from 'src/app/service/data.service';
import { AppGlobal } from 'src/app/constants';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-portal-login',
  templateUrl: './portal-login.component.html',
  styleUrls: ['./portal-login.component.scss'],
})
export class PortalLoginComponent implements OnInit {
  showTwoFactor = true;
  showOtp = false;
  OtpMode = '1';
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step4Completed = false;
  step5Completed = false;
  step6Completed = false;
  step7Completed = false;

  login = {
    cpassword: '',
    cpin: '',
    otp: '',
  };
  errorTrue = false;
  btnClicked = false;
  misMatcherror = false;

  @ViewChild('registrationSteps', { static: false })
  registrationSteps: CdkStepper;
  @ViewChild('xtransactionPin', { static: false })
  xtransactionPin;

  // parameters

  // https://itgalax.in/FnpfEmpPortal/portal/login?code=LeLdeBsC13o%3D&key=OUdWRPuEKcOG%2BLpK0jp8ul74nVCEDZ5Q

  pathId = {
    id: '',
    datetime: '',
    value: '',
    isFromLink: true,
  };
  countDownDate = new Date().getTime() + AppGlobal.resendTime * 60000;
  resetDisabled = false;
  resendText = 'Send';
  timeintervel: any;
  successTrue = false;

  constructor(
    public portal: PortalLoginService,
    public data: DataService,
    public fullSpinner: FullSpinnerService,
    public route: ActivatedRoute,
    public router: Router,
    public general: GeneralService
  ) {
    // console.log(window.location.href);
    // console.log(this.route.snapshot.queryParamMap.get('code'));
    // console.log(this.route.snapshot.queryParamMap.get('key'));

    var search = [];
    search[0] = window.location.href
      .split(/[&||?]/)
      .filter(function (x) {
        return x.indexOf('=') > -1;
      })
      .map(function (x) {
        return x.split(/=/);
      })
      .map(function (x) {
        x[1] = x[1].replace(/\+/g, ' ');
        return x;
      })
      .reduce(function (acc, current) {
        acc[current[0]] = current[1];
        return acc;
      }, {});

    if (this.general.userData.resetEmailFlag === 'Y') {
      this.getUserDataForFirstTimeLogin();
    } else {
      this.pathId.id = search[0].code;
      this.pathId.datetime = search[0].key;
      this.pathId.value = search[0].value;
      this.getData();
    }
  }

  ngOnInit(): void { }

  setPathId() {
    //this.pathId.id = this.route.snapshot.queryParamMap.get('code');
    //this.pathId.datetime = this.route.snapshot.queryParamMap.get('key');
    this.getData();
  }

  step1Click() {
    this.step1Completed = true;
    this.registrationSteps.next();
  }
  step2Click() {
    this.step2Completed = true;
    this.registrationSteps.next();
  }
  step3Click() {
    this.step3Completed = true;
    this.registrationSteps.next();
  }
  step4Click() {
    this.step4Completed = true;
    this.registrationSteps.next();
  }
  step5Click() {
    let count = 0;
    this.portal.user.portalUserSecurityQuestionList.forEach((element) => {
      if (element.encryptedAnswer !== '') {
        count++;
      }
    });
    if (count > 4) {
      this.step5Completed = true;
      this.registrationSteps.next();
      this.data.clearErrorMsg();
    } else {
      this.data.errorMesaageOnly('Please answer minimum 5 questions.');
    }
  }
  step6Click() {
    this.step6Completed = true;
    this.registrationSteps.next();
  }

  clickPrev() {
    this.registrationSteps.previous();
  }

  // onSubmitPassword(m) {}
  sendotp() {
    this.showTwoFactor = false;
    this.showOtp = true;
  }

  // Methods

  getToken() {
    this.data.getData(AppGlobal.apiPaths.token).then(
      (success: any) => { },
      (error) => { }
    );
  }

  getUserDataForFirstTimeLogin() {
    this.portal.loadingTrue = true;
    this.fullSpinner.spin.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.portalLogin.userinfoforfirstimelogin,
        this.general.userData
      )
      .then(
        (success: any) => {
          this.portal.loadingTrue = false;
          this.fullSpinner.spin.next(false);
          this.portal.user = success;
        },
        (error) => {
          this.portal.loadingTrue = false;
          this.fullSpinner.spin.next(false);
          this.data.errorMethod(error);
          this.router.navigateByUrl('/');
        }
      );
  }

  getData() {
    this.portal.loadingTrue = true;
    this.fullSpinner.spin.next(true);
    this.data
      .postData(AppGlobal.apiPaths.portalLogin.userinfo, this.pathId)
      .then(
        (success: any) => {
          this.portal.loadingTrue = false;
          this.fullSpinner.spin.next(false);
          this.portal.user = success;

          this.general.login.organizationRefNo = this.portal.user.organizationRefNo;
          this.general.login.portalUserId = this.portal.user.employerPortalUserId;
        },
        (error) => {
          this.portal.loadingTrue = false;
          this.fullSpinner.spin.next(false);
          this.data.errorMethod(error);
          this.router.navigateByUrl('/');
        }
      );
  }

  onSubmitUsername(us) {
    if (us.valid) {
      this.portal.errorTrue = false;
      this.portal.btnClicked = true;
      this.fullSpinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.portalLogin.isuseravailable,
          this.portal.user
        )
        .then(
          (success: any) => {
            if (success) {
              this.registrationSteps.next();
              this.portal.btnClicked = false;
              this.fullSpinner.empty.next(false);
              this.step1Completed = true;
            }
          },
          (error) => {
            this.data.errorMethod(error);
            this.portal.btnClicked = false;
            this.fullSpinner.empty.next(false);
          }
        );
    } else {
      this.portal.errorTrue = true;
    }
  }
  sampleData(data) {
    console.log(data);
  }
  onSubmitPassword(pas) {
    console.log(pas);
    // this.registrationSteps.next();
    if (pas.valid) {
      if (this.portal.user.password === this.login.cpassword) {
        this.errorTrue = false;
        this.registrationSteps.next();
        this.step2Completed = true;
      } else {
        this.errorTrue = true;
      }
    } else {
      this.errorTrue = true;
    }
  }
  onSubmitPin(trn) {
    // this.registrationSteps.next();
    if (trn.valid && this.portal.user.transactionPin === this.login.cpin) {
      this.errorTrue = false;
      this.registrationSteps.next();
      this.step3Completed = true;
    } else {
      this.errorTrue = true;
    }
  }

  sendOTP(val) {
    this.portal.btnClicked = true;
    this.fullSpinner.empty.next(true);
    const obj = {
      otpSendType: val,
      portalUserId: this.portal.user.employerPortalUserId,
    };
    this.data.postData(AppGlobal.apiPaths.portalLogin.sendotp, obj).then(
      (success: any) => {
        this.countDownDate = new Date().getTime() + AppGlobal.resendTime * 60000;
        this.resetDisabled = true;
        this.portal.btnClicked = false;
        this.fullSpinner.empty.next(false);
        this.setTimer();
      },
      (error) => {
        this.data.errorMethod(error);
        this.portal.btnClicked = false;
        this.fullSpinner.empty.next(false);
      }
    );
  }
  verifyOTP() {
    if (this.login.otp !== '' && this.portal.user.employerPortalUserId > 0) {
      this.errorTrue = false;
      this.portal.btnClicked = true;
      this.fullSpinner.spin.next(true);
      const obj = {
        otp: this.login.otp,
        portalUserId: this.portal.user.employerPortalUserId,
      };
      this.data.postData(AppGlobal.apiPaths.portalLogin.validateotp, obj).then(
        (success: any) => {
          this.portal.btnClicked = false;
          this.step6Completed = true;
          this.fullSpinner.spin.next(false);
          this.registrationSteps.next();
        },
        (error) => {
          this.data.errorMethod(error);
          this.portal.btnClicked = false;
          this.fullSpinner.spin.next(false);
        }
      );
    } else {
      this.portal.errorTrue = true;
      this.errorTrue = true;
    }
  }

  checkDeclartion(value) {
    value === true
      ? (this.portal.user.tAndCFlag = 'Y')
      : (this.portal.user.tAndCFlag = 'N');
  }

  onSubmit() {
    if (this.portal.user.tAndCFlag === 'N') {
      this.data.errorMesaageOnly('Please accept Terms & Conditions');
      return;
    }
    this.data.clearErrorMsg();
    this.portal.btnClicked = true;
    this.fullSpinner.spin.next(true);
    this.data
      .postData(AppGlobal.apiPaths.portalLogin.submit, this.portal.user)
      .then(
        (success: any) => {
          this.portal.btnClicked = false;
          this.fullSpinner.spin.next(false);
          //  this.successTrue = true;
          // this.router.navigateByUrl('/');
          this.onSubmitOrg();
        },
        (error) => {
          this.portal.btnClicked = false;
          this.fullSpinner.spin.next(false);
          this.data.errorMethod(error);
        }
      );
  }
  validatePassword() {
    this.misMatcherror = this.login.cpassword !== this.portal.user.password;
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
  transactionPinFinished() {
    this.xtransactionPin.doFocus();
    // console.log(this.xtransactionPin);
  }


  onSubmitOrg() {
    if (this.general.login.organizationRefNo !== '' && this.general.login.portalUserId !== 0) {
      this.btnClicked = true;
      this.fullSpinner.empty.next(true);
      this.data
        .postData(AppGlobal.apiPaths.portalLogin.selectOrg, this.general.login)
        .then(
          (success: any) => {
            this.btnClicked = false;
            this.fullSpinner.empty.next(false);
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
            this.fullSpinner.empty.next(false);
            this.data.errorMethod(error);
          }
        );
    }
    // else {
    //   this.data.errorMesaageOnly('Select organization to login.')
    // }
  }
}
