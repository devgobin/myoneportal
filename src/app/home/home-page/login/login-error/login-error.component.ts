import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
export interface ErrorDialogData {
  message: any;
}
@Component({
  selector: "app-login-error",
  templateUrl: "./login-error.component.html",
  styleUrls: ["./login-error.component.scss"],
})
export class LoginErrorComponent implements OnInit {
  message = {
    errorMessage: [],
  };
  constructor(
    public dialogRef: MatDialogRef<LoginErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData
  ) {
    this.message = this.data.message;
  }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
