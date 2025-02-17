import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { GenerateUploadCsFileService } from "../generate-upload-cs-file.service";
import { CsDetailsPopComponent } from "./cs-details-pop/cs-details-pop.component";

@Component({
  selector: "app-contribution-schedule-file-upload-details",
  templateUrl: "./contribution-schedule-file-upload-details.component.html",
  styleUrls: ["./contribution-schedule-file-upload-details.component.scss"],
})
export class ContributionScheduleFileUploadDetailsComponent
  implements OnInit, OnDestroy
{
  pageId = "CSFUD";
  @ViewChild("fullview", { static: false }) fullview: ElementRef;
  fsview = false;
  loadingTrue = false;
  constructor(
    public data: DataService,
    public csService: GenerateUploadCsFileService,
    public dialog: MatDialog,
    public fullSpinner: FullSpinnerService,
    public sData: DataService,
    public router: Router
  ) {
    this.data.headerName = {
      screenName: "CS File Upload Details",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Contribution",
          link: "",
        },
        {
          name: "File Upload Details",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    if (this.data.message.errorMessage.length > 0) {
      this.data.openMessageBox();
    }
    // this.csService.createcsFile();
    // setTimeout(() => {
    //   this.csService.uploadcsFile();
    // }, 1000);
  }
  ngOnDestroy() {
    this.csService.clearCSFileDetails();
  }

  openHeader() {
    this.viewEditDetails(
      "CS Header Information",
      this.csService.csHeader,
      this.csService.csFileDetails.pCsheader
    );
  }

  openBody(val) {
    console.log(val);
    this.viewEditDetails("CS Details", this.csService.csBody, val);
  }

  openFooter() {
    this.viewEditDetails(
      "CS Footer Information",
      this.csService.csFooter,
      this.csService.csFileDetails.pCsFooter
    );
  }

  viewEditDetails(xtitle, xheader, xrow) {
    const dialogRef = this.dialog.open(CsDetailsPopComponent, {
      width: "800px",
      height: "400px",
      // disableClose: true,
      data: {
        title: xtitle,
        header: xheader,
        row: xrow,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  SubmitCSFile() {
    this.fullSpinner.empty.next(true);
    this.sData
      .postData(
        AppGlobal.apiPaths.contribution.submitFile,
        this.csService.csFileDetails
      )
      .then(
        (success: any) => {
          this.csService.csFileDetails = success;
          this.fullSpinner.empty.next(false);
          if (this.csService.csFileDetails.statusValue === "SUBMT") {
            this.successalert();
          }
        },
        (error: any) => {
          this.fullSpinner.empty.next(false);
          this.sData.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "550px",
      disableClose: true,
      data: {
        msg: "File submitted successfully.Contribution schedule will be generated within next 2 hours. Please check after some time",
        Showbtn1: true,
        button1: "Close",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigateByUrl("/app/contribution-schedule-file-upload");
      }
    });
  }

  newCSDetail() {
    const obj = {
      columnValue: "",
      lsterrormessage: [],
    };
    let csDetailRow = {
      rowidentifierId: "02",
      rowidentifierValue: "",
      rowidentifierDescription: "",
      rowidentifierSourceId: 0,
      listfilecolumn: [],
      lsterrormessage: [],
      csFileId: this.csService.csFileDetails.pCsheader.csFileId,
    };
    this.csService.csBody.forEach((element) => {
      csDetailRow.listfilecolumn.push(obj);
    });
    // this.csService.csFileDetails.plstcsdetails.push(csDetailRow);
    this.openBody(csDetailRow);
  }

  openDelete(val): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this row ?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCSDetailRow(val);
      }
    });
  }

  deleteCSDetailRow(val) {
    this.fullSpinner.empty.next(true);
    // const obj = {
    //   data: val,
    // };
    this.data
      .postData(AppGlobal.apiPaths.contribution.csDetailRowDelete, val)
      .then(
        (success: any) => {
          this.fullSpinner.empty.next(false);
          this.csService.csFileDetails = success;
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullSpinner.empty.next(false);
        }
      );
  }
}
