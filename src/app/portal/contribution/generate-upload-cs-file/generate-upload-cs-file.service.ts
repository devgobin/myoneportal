import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { MessagePortalOverlayRef } from "src/app/common/message-portal/message-portal-overlay";
import { MessagePortalService } from "src/app/common/message-portal/message-portal.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";

@Injectable({
  providedIn: "root",
})
export class GenerateUploadCsFileService {
  loadingTrue = false;
  btnClicked = false;
  newCsFile = {
    csFileId: 0,
    orgId: 0,
    documentFileId: 0,
    statusId: 0,
    statusValue: "",
    pdocumentFile: {
      documentFileId: 0,
      fileType: "",
      fileSize: 0,
      relativePath: "",
      fileName: "",
      uploadbyFullName: "",
      istrFileContent: "",
    },
    statusDescription: "",
    uploadedDatetime: "",
    pcsFileHeader: {
      csFileHeaderId: 0,
      csFileId: 0,
      csHeaderContent: "",
      csCode: "",
      csMonth: "",
      csYear: 0,
      wagesPaidMonth: "",
      wagesPaidYear: "",
      contributionType: "",
      orgRefNo: "",
      orgName: "",
      orgTradeName: "",
      submissionDate: "",
      totalContributionAmount: "",
      totalEmployee: 0,
      totalGrossSalary: "",
      statusId: 0,
      statusValue: "",
      statusDescription: "",
    },
    plstCSDetails: [
      {
        csFileDetailId: 0,
        csFileHeaderId: 0,
        csDetailContent: "",
        fnpfNo: "",
        firstName: "",
        middleName: "",
        lastName: "",
        tin: "",
        grossSalary: "",
        compulsoryContAmount: "",
        employeeAdditionalAmount: "",
        employerAdditionalAmount: "",
        totalContributionAmount: "",
        employementStatus: "",
        employementStatusDate: "",
        occupationCode: "",
        paymentFrequency: "",
        statusId: 0,
        statusValue: "",
        statusDescription: "",
      },
    ],
    pcsFileFooter: {
      csFileFooterId: 0,
      csFileHeaderId: 0,
      noOfRecords: 0,
      statusId: 0,
      statusValue: "",
      statusDescription: "",
    },
  };
  csHeader = [
    { name: "CS Month", required: true },
    { name: "CS Year", required: true },
    { name: "Wages Paid Month", required: true },
    { name: "Wages Paid Year", required: true },
    { name: "Contribution Type", required: true },
    { name: "Org Ref No", required: true },
    { name: "Org Name", required: true },
    { name: "Org Trade Name", required: true },
    { name: "CS Code", required: true },
    { name: "Submission Date", required: true },
    { name: "Total Contribution", required: true },
    { name: "Total Employees", required: true },
    { name: "Total Wages Paid", required: true },
    // "CS Month",
    // "CS Year",
    // "Wages Paid Month",
    // "Wages Paid Year",
    // "Contribution Type",
    // "Org Ref No",
    // "Org Name",
    // "Org Trade Name",
    // "CS Code",
    // "Submission Date",
    // "Total Contribution",
    // "Total Employees",
    // "Total Wages Paid",
  ];
  csBody = [
    { name: "FNPF No.", required: true },
    { name: "First Name", required: true },
    { name: "Middle Name", required: false },
    { name: "Last Name", required: false },
    { name: "TIN", required: true },
    { name: "Contribution $", required: true },
    { name: "Employer Add $", required: false },
    { name: "Employee Add $", required: false },
    { name: "Total Contrib $", required: true },
    { name: "Monthly Gross Salary $", required: true },
    { name: "Employment Status", required: true },
    { name: "Employment Status Date", required: true },
    { name: "Occupation Code", required: false },
    { name: "Pay Frequency", required: false },
    // "*",
    // "First Name",
    // "Middle Name",
    // "Last Name",
    // "TIN",
    // "Contribution $",
    // "Employer Add $",
    // "Employee Add $",
    // "Total Contrib $",
    // "Monthly Gross Salary $",
    // "Employment Status",
    // "Employment Status Date",
    // "Occupation Code",
    // "Pay Frequency",
  ];
  csFooter = [{ name: "Total No of Records in the File", required: true }];
  csFileDetails = {
    pCsheader: {
      rowidentifierId: "",
      rowidentifierValue: "",
      rowidentifierDescription: "",
      rowidentifierSourceId: 0,
      listfilecolumn: [],
      lsterrormessage: [],
      csFileId: 0,
    },
    plstcsdetails: [],
    pCsFooter: {
      rowidentifierId: "",
      rowidentifierValue: "",
      rowidentifierDescription: "",
      rowidentifierSourceId: 1,
      listfilecolumn: [],
      lsterrormessage: [],
      csFileId: 0,
    },
    plsterrormessage: [],
    statusValue: "",
    statusDescription: "",
    totalContribution: "",
    totalWages: "",
    totalEmployee: 0,
  };

  DDL: any = {
    DDLCSCodeValue: [],
  };

  messagePortalDialog: MessagePortalOverlayRef;
  messagePortalDialogRef: MessagePortalOverlayRef;
  bottom = "30px";
  constructor(
    public data: DataService,
    public fullSpinner: FullSpinnerService,
    public router: Router,
    public messagePoral: MessagePortalService
  ) {}

  createcsFile() {
    this.loadingTrue = true;
    this.fullSpinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.contribution.create).then(
      (success: any) => {
        this.newCsFile = success;
        this.loadingTrue = false;
        this.fullSpinner.empty.next(false);
      },
      (error: any) => {
        this.loadingTrue = false;
        this.fullSpinner.empty.next(false);
        this.data.errorMethod(error);
      }
    );
  }
  uploadcsFile() {
    this.loadingTrue = true;
    this.fullSpinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.contribution.upload, this.newCsFile)
      .then(
        (success: any) => {
          this.csFileDetails = success;
          // this.clearNewCsFile();
          this.loadingTrue = false;
          this.fullSpinner.empty.next(false);
          this.router.navigateByUrl(
            "/app/contribution-schedule-file-upload-details"
          );
        },
        (error: any) => {
          this.loadingTrue = false;
          this.fullSpinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }
  clearNewCsFile() {
    this.newCsFile = {
      csFileId: 0,
      orgId: 0,
      documentFileId: 0,
      statusId: 0,
      statusValue: "",
      pdocumentFile: {
        documentFileId: 0,
        fileType: "",
        fileSize: 0,
        relativePath: "",
        fileName: "",
        uploadbyFullName: "",
        istrFileContent: "",
      },
      statusDescription: "",
      uploadedDatetime: "",
      pcsFileHeader: {
        csFileHeaderId: 0,
        csFileId: 0,
        csHeaderContent: "",
        csCode: "",
        csMonth: "",
        csYear: 0,
        wagesPaidMonth: "",
        wagesPaidYear: "",
        contributionType: "",
        orgRefNo: "",
        orgName: "",
        orgTradeName: "",
        submissionDate: "",
        totalContributionAmount: "",
        totalEmployee: 0,
        totalGrossSalary: "",
        statusId: 0,
        statusValue: "",
        statusDescription: "",
      },
      plstCSDetails: [
        {
          csFileDetailId: 0,
          csFileHeaderId: 0,
          csDetailContent: "",
          fnpfNo: "",
          firstName: "",
          middleName: "",
          lastName: "",
          tin: "",
          grossSalary: "",
          compulsoryContAmount: "",
          employeeAdditionalAmount: "",
          employerAdditionalAmount: "",
          totalContributionAmount: "",
          employementStatus: "",
          employementStatusDate: "",
          occupationCode: "",
          paymentFrequency: "",
          statusId: 0,
          statusValue: "",
          statusDescription: "",
        },
      ],
      pcsFileFooter: {
        csFileFooterId: 0,
        csFileHeaderId: 0,
        noOfRecords: 0,
        statusId: 0,
        statusValue: "",
        statusDescription: "",
      },
    };
  }

  openMessageBox(val?) {
    // this.messagePoral.open();
    this.messagePortalDialog = this.messagePoral.open(
      {
        data: {
          from: "csfile",
          type: val ? val : "error",
          message: this.csFileDetails.plsterrormessage,
        },
      },
      this.bottom
    );
    // this.messagePortalDialogRef.afterClosed().subscribe((result) => {
    //   if (result) {

    //   }
    // });

    // this.messagePoral.open();
    // this.closeDialog();
  }

  clearCSFileDetails() {
    console.log("ok");
    this.csFileDetails = {
      pCsheader: {
        rowidentifierId: "",
        rowidentifierValue: "",
        rowidentifierDescription: "",
        rowidentifierSourceId: 0,
        listfilecolumn: [],
        lsterrormessage: [],
        csFileId: 0,
      },
      plstcsdetails: [],
      pCsFooter: {
        rowidentifierId: "",
        rowidentifierValue: "",
        rowidentifierDescription: "",
        rowidentifierSourceId: 1,
        listfilecolumn: [],
        lsterrormessage: [],
        csFileId: 0,
      },
      plsterrormessage: [],
      statusValue: "",
      statusDescription: "",
      totalContribution: "",
      totalWages: "",
      totalEmployee: 0,
    };
  }
}
