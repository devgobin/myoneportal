import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { ForgotPasswordService } from './forgot-password.service';
import { DataService } from 'src/app/service/data.service';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { AppGlobal } from 'src/app/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  password = {
    cpsw: '',
  };
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step4Completed = false;
  showTwoFactor = true;
  emailsuccess = false;
  showOtp = false;
  OtpMode = '1';
  cleartransactionpin = false;

  @ViewChild('registrationSteps', { static: false })
  registrationSteps: CdkStepper;
  successTrue = false;
  constructor(
    public forgotpassword: ForgotPasswordService,
    public data: DataService,
    public fullSpinner: FullSpinnerService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.forgotpassword.clearData();
  }

  step2Click() { }

  step3Click() {
    this.step3Completed = true;
    this.registrationSteps.next();
  }

  clickPrev() {
    this.cleartransactionpin = true;
    this.registrationSteps.previous();
  }

  onSubmitConfidencial(c) {
    if (c.valid) {
      this.forgotpassword.errorTrue = false;
      this.forgotpassword.btnClicked = true;
      this.fullSpinner.empty.next(true);
      // const obj = {
      //   data: this.forgotpassword.password.employerRefNo,
      // };
      this.data
        .postData(
          AppGlobal.apiPaths.forgotUserID.validationForgotPassword,
          this.forgotpassword.password
        )
        .then(
          (success: any) => {
            if (success) {
              this.forgotpassword.btnClicked = false;
              this.fullSpinner.empty.next(false);
              this.forgotpassword.password = success;
              if (this.forgotpassword.password.resetEmailFlag === 'Y') {
                this.successTrue = false;
                this.emailsuccess = true;
                return;
              }
              this.step1Completed = true;
              this.registrationSteps.next();
            }
          },
          (error) => {
            this.data.errorMethod(error);
            this.forgotpassword.btnClicked = false;
            this.fullSpinner.empty.next(false);
          }
        );
    } else {
      this.forgotpassword.errorTrue = true;
    }
  }

  onSubmitSecurityQuestion() {
    let count = 0;
    this.forgotpassword.password.portalUserSecurityQuestionList.forEach(
      (element) => {
        if (element.encryptedAnswer === '') {
          count++;
        }
      }
    );
    if (count !== 0) {
      this.data.errorMesaageOnly('Please answer all security questions.');
      return;
    }
    this.data.clearErrorMsg();
    this.forgotpassword.errorTrue = false;
    this.forgotpassword.btnClicked = true;
    this.fullSpinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.forgotPassword.validatesecurityquestion,
        this.forgotpassword.password
      )
      .then(
        (success: any) => {
          if (success) {
            this.forgotpassword.password = success;
            this.forgotpassword.btnClicked = false;
            this.fullSpinner.empty.next(false);
            this.step2Completed = true;
            this.registrationSteps.next();

            this.forgotpassword.password.portalUserSecurityQuestionList.forEach(
              (element) => {
                element.encryptedAnswer = '';
              }
            );
          }
        },
        (error) => {
          this.data.errorMethod(error);
          this.forgotpassword.btnClicked = false;
          this.fullSpinner.empty.next(false);
        }
      );
  }

  onSubmitPin(trp) {
    if (trp.valid) {
      this.forgotpassword.errorTrue = false;
      this.forgotpassword.btnClicked = true;
      this.fullSpinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.forgotPassword.fpassword,
          this.forgotpassword.password
        )
        .then(
          (success: any) => {
            if (success) {
              this.forgotpassword.password = success;
              this.step3Click();
              this.forgotpassword.btnClicked = false;
              this.fullSpinner.empty.next(false);
            }
          },
          (error) => {
            this.data.errorMethod(error);
            this.forgotpassword.btnClicked = false;
            this.fullSpinner.empty.next(false);
          }
        );
    } else {
      this.forgotpassword.errorTrue = true;
    }
  }

  setPassword(sp) {
    if (sp.valid) {
      this.forgotpassword.errorTrue = false;
      this.forgotpassword.btnClicked = true;
      this.fullSpinner.empty.next(true);
      if (this.forgotpassword.setpw.password === sp.value.cpsw) {
        const obj = {
          password: this.forgotpassword.setpw.password,
          portalUserId: this.forgotpassword.password.portalUserId,
          guid: '',
        };
        this.data.postData(AppGlobal.apiPaths.forgotUserID.saveData, obj).then(
          (success: any) => {
            if (success) {
              this.forgotpassword.setpw = success;
              this.step2Completed = true;
              this.forgotpassword.btnClicked = false;
              this.fullSpinner.empty.next(false);
              this.forgotpassword = new ForgotPasswordService();
              this.successTrue = true;
              this.emailsuccess = false;
              //this.router.navigateByUrl('/');
            }
          },
          (error) => {
            this.data.errorMethod(error);
            this.forgotpassword.btnClicked = false;
            this.fullSpinner.empty.next(false);
          }
        );
      } else {
        this.forgotpassword.btnClicked = false;
        this.fullSpinner.empty.next(false);
      }
    } else {
      this.forgotpassword.errorTrue = true;
    }
  }
}
