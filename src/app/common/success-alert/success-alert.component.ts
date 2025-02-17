import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
export interface DialogData {
  msg: string;
  button1: string;
  button2: string;
  Showbtn1?: boolean;
  Showbtn2?: boolean;
}
@Component({
  selector: "app-success-alert",
  templateUrl: "./success-alert.component.html",
  styleUrls: ["./success-alert.component.scss"],
})
export class SuccessAlertComponent implements OnInit {
  Showbtn1 = true;
  Showbtn2 = false;
  constructor(
    public dialogRef: MatDialogRef<SuccessAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public router: Router
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {}

  OnClicked(val) {
    this.dialogRef.close(val);
  }
}
