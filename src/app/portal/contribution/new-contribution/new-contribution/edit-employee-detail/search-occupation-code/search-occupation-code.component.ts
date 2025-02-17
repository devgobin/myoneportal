import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { newcontributionservice } from "../../new-contribution.service";

@Component({
  selector: "app-search-occupation-code",
  templateUrl: "./search-occupation-code.component.html",
  styleUrls: ["./search-occupation-code.component.scss"],
})
export class SearchOccupationCodeComponent implements OnInit {
  occupationCode: string = "";
  occupation: string = "";
  searchoccupation: string = "";
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: newcontributionservice,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SearchOccupationCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any
  ) {}

  ngOnInit(): void {
    this.LoadOccupationCode();
  }

  getOccupationCode(val, config) {
    debugger;
    if (val === true) {
      config.isChecked = true;
      this.occupationCode = config.constant;
      this.occupation = config.description;
    } else if (val === false) {
      config.isChecked = false;
    }
    this.service.DDL.DDLCSDetailOccupationCode.forEach((element) => {
      if (element.constant !== this.occupationCode) {
        element.isChecked = false;
      }
    });
  }

  LoadOccupationCode() {
    this.service.DDL.DDLCSDetailOccupationCode.forEach((element) => {
      if (element.constant === this.service.createemployee.occupationCode) {
        element.isChecked = true;
      } else {
        element.isChecked = false;
      }
    });
  }

  saveCode() {
    this.service.createemployee.occupationCode = this.occupationCode;
    this.service.createemployee.occupation = this.occupation;
    this.dialogRef.close();
  }

  doClose() {
    this.dialogRef.close();
  }
}
