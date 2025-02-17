import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CommonAlertComponent } from "src/app/common/common-alert/common-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { GenerateUploadCsFileService } from "../../generate-upload-cs-file.service";
export interface CSDialogData {
  title: "";
  header: any;
  row: any;
}
@Component({
  selector: "app-cs-details-pop",
  templateUrl: "./cs-details-pop.component.html",
  styleUrls: ["./cs-details-pop.component.scss"],
})
export class CsDetailsPopComponent implements OnInit {
  xConstData = {
    title: "",
    header: [],
    row: [],
  };
  xData = {
    title: "",
    header: [],
    row: {
      rowidentifierId: 1,
      rowidentifierValue: "HEADER",
      rowidentifierDescription: "Header",
      rowidentifierSourceId: 1,
      listfilecolumn: [],
      csFileId: 0,
    },
  };
  selectedError = [];
  loadingTrue = false;
  constructor(
    public dialogRef: MatDialogRef<CsDetailsPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CSDialogData,
    public dialog: MatDialog,
    public fullSpinner: FullSpinnerService,
    public sData: DataService,
    public csService: GenerateUploadCsFileService
  ) {
    this.xConstData = JSON.parse(JSON.stringify(this.data));
    this.xData = JSON.parse(JSON.stringify(this.data));
    console.log(this.xData);
  }

  ngOnInit(): void {}
  insertRow(i) {
    if (this.xData.header.length > this.xData.row.listfilecolumn.length) {
      const obj = {
        columnValue: "",
        lsterrormessage: [],
      };
      this.xData.row.listfilecolumn.splice(i, 0, obj);
    }
  }

  removeRow(i) {
    if (this.xData.row.listfilecolumn[i].columnValue === "") {
      this.xData.row.listfilecolumn.splice(i, 1);
    } else {
      this.confirmErase(i);
    }
  }

  confirmErase(i) {
    const dialogRef = this.dialog.open(CommonAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Entered Data will be remove. Are you sure",
        trueBtnText: "Yes",
        trueBtnColor: "success",
        trueRaised: true,
        falseBtnText: "No",
        falseBtnColor: "medium",
        falseRaised: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.xData.row.listfilecolumn.splice(i, 1);
      }
    });
  }

  resetData() {
    this.xData = JSON.parse(JSON.stringify(this.xConstData));
  }

  setError(val) {
    this.selectedError = val;
    // console.log(this.selectedError);
  }
  clearOut() {
    this.selectedError = [];
  }

  saveData() {
    debugger;
    this.fullSpinner.empty.next(true);
    this.sData
      .postData(AppGlobal.apiPaths.contribution.updateFile, this.xData.row)
      .then(
        (success: any) => {
          this.csService.csFileDetails = success;
          this.fullSpinner.empty.next(false);
          this.dialogRef.close(true);
        },
        (error: any) => {
          this.fullSpinner.empty.next(false);
          this.sData.errorMethod(error);
        }
      );
  }

  close() {
    this.dialogRef.close();
  }
}
