import { FullSpinnerService } from "./../../common/full-spinner/full-spinner.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";

@Component({
  selector: "app-valid-compliance-letter",
  templateUrl: "./valid-compliance-letter.component.html",
  styleUrls: ["./valid-compliance-letter.component.scss"],
})
export class ValidComplianceLetterComponent implements OnInit {
  istrid = "";
  validCompliance = {
    orgId: 0,
    orgRefNo: "",
    employerStatus: "",
    usingEmployerPortal: "",
    lastContributionSubmittedThroughEmployersPortal: "",
    lastContributionSubmittedAndPaid: "",
    debtExists: "",
    unpaidPenalities: "",
    unresolvedSuspense: "",
    unclaimedFundsExists: "",
    undistributedFundsExists: "",
    accruals: "",
    complaints: "",
    fromYear: 0,
    toYear: 0,
    showGeneratebtn: "",
    oneYearCompliance: "",
    conditionalCompliance: "",
    orgName: "",
    generatedDate: "",
    tradeName: "",
    expiryDate: "",
    conditionalvaliditydate: "",
    alreadyGenerated: "",
    postaladdress: "",
    complianceRefNo: "",
    dtmGeneratedDate: "",
    dtmExpiryDate: "",
    qrCodeBase64: "",
    iblShowGeneratebtn: "",
    lstmessage: [
      {
        messageDescription: "",
        messageCode: 0,
      },
    ],
  };
  isError = false;
  constructor(
    public route: ActivatedRoute,
    public fullspinner: FullSpinnerService,
    public data: DataService
  ) {
    this.route.paramMap.subscribe((params) => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.init();
    });
  }

  ngOnInit(): void {}
  init() {
    this.route.paramMap.subscribe((params) => {
      if (params.get("id")) {
        this.istrid = params.get("id");
      }
    });
    if (this.istrid != null && this.istrid !== "") {
      this.getcompliancecertificatestatus();
    }
  }
  getcompliancecertificatestatus() {
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.istrid,
    };
    this.data
      .postData(
        AppGlobal.apiPaths.complaince.getcompliancecertificatestatus,
        obj
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.validCompliance = success;
          this.data.successMesaage(success);
        },
        (error) => {
          this.isError = true;
          this.fullspinner.empty.next(false);
        }
      );
  }
}
