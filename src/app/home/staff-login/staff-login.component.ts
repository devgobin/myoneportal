import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { DataService } from 'src/app/service/data.service';
import { StaffLoginService } from './staff-login.service';
import { AppGlobal } from 'src/app/constants';
import { NgForm } from '@angular/forms';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss']
})


export class StaffLoginComponent implements OnInit {
  org = {
    empRefNo: ''
  };
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  activeIndex: number;
  @ViewChild('registrationSteps', { static: false }) registrationSteps: CdkStepper;
  displayedColumns: string[] = ['person', 'emailId', 'contactNo', 'employerContactId'];
  // /'employerContactId'
  dataSource: any = new MatTableDataSource();
  selectedEmployer = 0;
  constructor(
    public data: DataService,
    public staffloginservice: StaffLoginService,
    public fullspinner: FullSpinnerService,
    public router: Router,
    public general: GeneralService,
  ) { }

  ngOnInit(): void {
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
  clickPrev() {
    this.registrationSteps.previous();
  }
  submitInformation(s) {
    if (s.valid) {
      this.staffloginservice.errorTrue = false;
      this.staffloginservice.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data.postData(AppGlobal.apiPaths.stafflogin.authenticate, this.staffloginservice.user).then(
        (success: any) => {
          if (success) {
            this.staffloginservice.staffinfo = success;
            this.step1Click();
            this.staffloginservice.btnClicked = false;
            this.fullspinner.empty.next(false);
          }
        },
        (error) => {
          console.log(JSON.stringify(error));
          this.data.errorMethod(error);
          this.staffloginservice.btnClicked = false;
          this.fullspinner.empty.next(false);
        }
      );
    }
    else {
      this.staffloginservice.errorTrue = true;
    }
  }
  onsearchorgname(em) {
    if (em.valid) {
      const obj = {
        data: this.org.empRefNo,
      };
      this.staffloginservice.errorTrue = false;
      this.staffloginservice.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data.postData(AppGlobal.apiPaths.stafflogin.organization, obj).then(
        (success: any) => {
          if (success) {
            this.staffloginservice.orgization = success;
            console.log(success.lstOrgContact);
            this.dataSource = new MatTableDataSource(success.lstOrgContact);
            // this.data.successMesaage(success);
            this.staffloginservice.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.step2Click();
          }
        },
        (error) => {
          this.data.errorMethod(error);
          this.staffloginservice.btnClicked = false;
          this.fullspinner.empty.next(false);
        }
      );
    }
    else {
      this.staffloginservice.errorTrue = true;
    }
  }

  onselectemployercontactcontact() {
      if (this.selectedEmployer === 0) {
        this.data.errorMesaageOnly('Please select contact to login.');
        return;
      }
      this.data.clearErrorMsg();
      this.staffloginservice.staffinfo.selectedContactId = this.selectedEmployer;
      this.staffloginservice.errorTrue = false;
      this.staffloginservice.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data.postData(AppGlobal.apiPaths.stafflogin.selectcontactforlogin, this.staffloginservice.staffinfo).then(
        (success: any) => {
          if (success) {
            this.staffloginservice.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.data.token = success.token;
            this.general.userData=success;
            this.router.navigateByUrl('/app');
          }
        },
        (error) => {
          this.data.errorMethod(error);
          this.staffloginservice.btnClicked = false;
          this.fullspinner.empty.next(false);
        }
      );
  }

  selected(element) {
    this.selectedEmployer = element.employerContactId;
    console.log(this.selectedEmployer);
  }
  active(row) {
    this.activeIndex = row;
  }
}
