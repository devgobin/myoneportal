import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { AppGlobal } from 'src/app/constants';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-eligiblity-result',
  templateUrl: './eligiblity-result.component.html',
  styleUrls: ['./eligiblity-result.component.scss']
})
export class EligiblityResultComponent implements OnInit {
  housingAssitance = {
    housingAssistanceEligiblityId: 0,
    orgContactId: 0,
    orgId: 0,
    orgBranchId: 0,
    fnpfNo: "",
    tin: "",
    dob: "",
    monthlyRepaymentAmount: "",
    outstandingLoanBalance: "",
    existingHousingLoanAmount: "",
    repaymentPeriod: "0",
    memberEligibilityStatusId: 0,
    memberEligibilityStatusValue: "",
    memberEligibilityAmount: "",
    revisedRepaymentPeriod: 0,
    checkedDate: "",
    isStatementGenerated: "",
    memberImage: "",
    revisedEligibleAmount: "",
  };
  loadingTrue = false;
  btnClicked = false;
  errorTrue = false;
  pageId = "ELIGI";
  constructor(
    public data: DataService,
    public fullSpinner: FullSpinnerService
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.checkbtnclick();
  }

  getInitialData() {
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

  printEligibiltyStatement() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullSpinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.housingassitance.printmembereligibility,
        this.housingAssitance
      )
      .then(
        (success: any) => {
          this.housingAssitance = success;
          this.btnClicked = false;
          this.fullSpinner.empty.next(false);
          this.checkbtnclick();
        },
        (error) => {
          this.btnClicked = false;
          this.fullSpinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  checkbtnclick() {
    if (this.housingAssitance.isStatementGenerated === 'Y') {
      this.btnClicked = true;
    }
  }
}

