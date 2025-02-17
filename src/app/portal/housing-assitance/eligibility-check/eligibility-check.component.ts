import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertComponent } from 'src/app/common/delete-alert/delete-alert.component';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { ViewPdfComponent } from 'src/app/common/view-pdf/view-pdf.component';
import { AppGlobal } from 'src/app/constants';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-eligibility-check',
  templateUrl: './eligibility-check.component.html',
  styleUrls: ['./eligibility-check.component.scss'],
})
export class EligibilityCheckComponent implements OnInit {
  showstep3 = false;
  housingAssitance = {
    housingAssistanceEligiblityId: 0,
    orgContactId: 0,
    orgId: 0,
    orgBranchId: 0,
    fnpfNo: '',
    tin: '',
    dob: '',
    monthlyRepaymentAmount: '',
    outstandingLoanBalance: '',
    existingHousingLoanAmount: '',
    repaymentPeriod: 0,
    memberEligibilityStatusId: 0,
    memberEligibilityStatusValue: '',
    memberEligibilityAmount: '',
    revisedRepaymentPeriod: 0,
    checkedDate: '',
    isStatementGenerated: '',
    memberImage: '',
    revisedEligibleAmount: '',
    firstName: '',
    memberFullName: '',
    actualRevisedEligibleAmount: '',
    memberEligibilityStatusDescription: '',
    protoHousingAssistanceEligibilityDocument: {}
  };
  loadingTrue = false;
  btnClicked = false;
  errorTrue = false;
  pageId = 'ELIGI';
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;

  fnpfnoRequired = true;
  tinRequired = true;
  dobRequired = true;
  @ViewChild('eligilityCheckSteps', { static: false })
  eligilityCheckSteps: CdkStepper;
  constructor(
    public data: DataService,
    public fullSpinner: FullSpinnerService,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: 'Eligibility Check',
      paths: [
        {
          name: 'Home',
          link: '#',
        },
        {
          name: 'Housing Assistance',
          link: '',
        },
        {
          name: 'Eligibility Check',
          link: '',
        },
      ],
    };
  }

  ngOnInit(): void {
    this.CreateNewEligibilityCheck();
  }

  doClear() {
    this.errorTrue = false;
    this.CreateNewEligibilityCheck();
  }

  CreateNewEligibilityCheck() {
    this.errorTrue = false;
    this.loadingTrue = true;
    this.fullSpinner.empty.next(true);
    this.data
      .getData(AppGlobal.apiPaths.housingassitance.createneweligibilitycheck)
      .then(
        (success: any) => {
          this.housingAssitance = success;
          this.loadingTrue = false;
          this.fullSpinner.empty.next(false);
        },
        (error) => {
          this.loadingTrue = false;
          this.fullSpinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  searchMember(l) {
    if (l.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullSpinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.housingassitance.searchmemberforeligibility,
          this.housingAssitance
        )
        .then(
          (success: any) => {
            this.housingAssitance = success;
            this.housingAssitance.outstandingLoanBalance === '0' ? this.housingAssitance.outstandingLoanBalance = '' : '';
            this.housingAssitance.existingHousingLoanAmount === '0' ? this.housingAssitance.existingHousingLoanAmount = '' : '';
            this.housingAssitance.monthlyRepaymentAmount === '0' ? this.housingAssitance.monthlyRepaymentAmount = '' : '';
            // this.housingAssitance.repaymentPeriod === '0' ? this.housingAssitance.repaymentPeriod = '' : '';
            this.btnClicked = false;
            this.fullSpinner.empty.next(false);
            this.step1Click();
          },
          (error) => {
            this.btnClicked = false;
            this.fullSpinner.empty.next(false);
            this.data.errorMethod(error);
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  checkEligibility(l) {
    if (l.valid) {
      this.showstep3 = false;
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullSpinner.empty.next(true);
      this.housingAssitance.protoHousingAssistanceEligibilityDocument = {};
      this.data
        .postData(
          AppGlobal.apiPaths.housingassitance.checkeligibility,
          this.housingAssitance
        )
        .then(
          (success: any) => {
            this.housingAssitance = success;
            this.showstep3 = true;
            this.btnClicked = false;
            this.fullSpinner.empty.next(false);
          },
          (error) => {
            this.btnClicked = false;
            this.fullSpinner.empty.next(false);
            this.data.errorMethod(error);
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  printEligibiltyStatement() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullSpinner.empty.next(true);
    this.housingAssitance.protoHousingAssistanceEligibilityDocument = {};
    this.data
      .pdf(
        AppGlobal.apiPaths.housingassitance.printmembereligibility,
        this.housingAssitance
      )
      .then(
        (success: any) => {
          this.btnClicked = false;
          this.fullSpinner.empty.next(false);
          // this.checkbtnclick();
          this.housingAssitance.isStatementGenerated = 'Y';
          this.openPDFViewer(success);
        },
        (error) => {
          this.btnClicked = false;
          this.fullSpinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  step1Click() {
    this.step1Completed = true;
    this.eligilityCheckSteps.next();
  }
  checkstep1Required() {
    // console.log(this.housingAssitance.fnpfNo);
    this.fnpfnoRequired = true;
    this.tinRequired = true;
    // this.dobRequired = false;
    if (this.housingAssitance.tin !== '') {
      this.tinRequired = true;
      this.fnpfnoRequired = false;
      this.dobRequired = false;
    }
    if (this.housingAssitance.fnpfNo !== '') {
      this.tinRequired = false;
      this.fnpfnoRequired = true;
      this.dobRequired = false;
    }
    // if (this.housingAssitance.dob !== '') {
    //   this.tinRequired = false;
    //   this.fnpfnoRequired = false;
    //   this.dobRequired = true;
    // }
  }
  // checkbtnclick() {
  //   if (this.housingAssitance.isStatementGenerated === 'Y') {
  //     this.btnClicked = true;
  //   }
  // }
  clickPrev() {
    this.eligilityCheckSteps.previous();
    this.CreateNewEligibilityCheck();
  }
  goBackAlert() {
    if (this.housingAssitance.isStatementGenerated == "N"
      && this.housingAssitance.housingAssistanceEligiblityId > 0 && this.housingAssitance.memberEligibilityStatusValue != 'NOTEL') {
      const dialogRef = this.dialog.open(DeleteAlertComponent, {
        width: "350px",
        data: {
          msg:
            "Are you sure, you want to go back without printing the eligibility statement",
          Otherbtn: true,
          otherbtntext: "Yes"
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.clickPrev();
        }
      });
    } else {
      this.clickPrev();
    }
  }

  openPDFViewer(xurl) {
    const dialogRef = this.dialog.open(ViewPdfComponent, {
      width: '100%',
      height: '85%',
      data: {
        url: xurl,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.logout();
      }
    });
  }
}
