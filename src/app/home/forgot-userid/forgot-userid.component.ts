import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { ForgotUseridService } from './forgot-userid.service';
import { AppGlobal } from 'src/app/constants';
import { DataService } from 'src/app/service/data.service';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-userid',
  templateUrl: './forgot-userid.component.html',
  styleUrls: ['./forgot-userid.component.scss']
})
export class ForgotUseridComponent implements OnInit {
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step4Completed = false;
  emailsuccess = false;
  @ViewChild('registrationSteps', { static: false }) registrationSteps: CdkStepper;

  user = {
    cpin: ''
  };

  constructor(
    public forgotuserid: ForgotUseridService,
    public data: DataService,
    public fullSpinner: FullSpinnerService,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log("calling");
    this.forgotuserid.clearData();
  }

  step2Click() {

  }
  step3Click() {
    this.step3Completed = true;
    this.registrationSteps.next();
  }
  step4Click() {
    this.step4Completed = true;
    this.router.navigateByUrl("/");
  }
  clickPrev() {
    this.registrationSteps.previous();
  }
  onSubmitConfidencial(c) {
    if (c.valid) {
      this.forgotuserid.errorTrue = false;
      this.forgotuserid.btnClicked = true;
      this.fullSpinner.empty.next(true);
      this.data
        .postData(AppGlobal.apiPaths.forgotUserID.validationForgotUserID, this.forgotuserid.userid).then((success: any) => {
          if (success) {
            this.forgotuserid.btnClicked = false;
            this.fullSpinner.empty.next(false);
            this.forgotuserid.userid = success;
            if (this.forgotuserid.userid.resetEmailFlag === 'Y') {
              this.emailsuccess = true;
              return;
            }
            this.step1Completed = true;
            this.registrationSteps.next();
          }
        },
          (error) => {
            this.data.errorMethod(error);
            this.forgotuserid.btnClicked = false;
            this.fullSpinner.empty.next(false);
          }
        );
    } else {
      this.forgotuserid.errorTrue = true;
    }
  }

  onSubmitSecurityQuestion() {
    let count = 0;
    this.forgotuserid.userid.portalUserSecurityQuestionList.forEach(element => {
      if (element.encryptedAnswer === '') {
        count++;
      }
    });
    if (count !== 0) {
      this.data.errorMesaageOnly('Please answer all security questions.');
      return;
    }
    this.data.clearErrorMsg();
    this.forgotuserid.errorTrue = false;
    this.forgotuserid.btnClicked = true;
    this.fullSpinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.forgotPassword.validatesecurityquestion, this.forgotuserid.userid).then((success: any) => {
        if (success) {
          this.forgotuserid.userid = success;
          this.forgotuserid.btnClicked = false;
          this.fullSpinner.empty.next(false);
          this.step2Completed = true;
          this.registrationSteps.next();

          this.forgotuserid.userid.portalUserSecurityQuestionList.forEach(element => {
            element.encryptedAnswer = ''
          });
        }
      },
        (error) => {
          this.data.errorMethod(error);
          this.forgotuserid.btnClicked = false;
          this.fullSpinner.empty.next(false);
        }
      );
  }

  onSubmitPin(trp) {
    if (trp.valid) {
      this.forgotuserid.errorTrue = false;
      this.forgotuserid.btnClicked = true;
      this.fullSpinner.empty.next(true);
      this.data
        .postData(AppGlobal.apiPaths.forgotUserID.userid, this.forgotuserid.userid).then((success: any) => {
          if (success) {
            this.forgotuserid.userid = success;
            this.step3Click();
            this.forgotuserid.btnClicked = false;
            this.fullSpinner.empty.next(false);
          }
        },
          (error) => {
            this.data.errorMethod(error);
            this.forgotuserid.btnClicked = false;
            this.fullSpinner.empty.next(false);
          }
        );
    } else {
      this.forgotuserid.errorTrue = true;
    }
  }
}
