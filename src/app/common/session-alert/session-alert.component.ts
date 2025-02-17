import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface sessionData {
  msg: string;
}
@Component({
  selector: 'app-session-alert',
  templateUrl: './session-alert.component.html',
  styleUrls: ['./session-alert.component.scss']
})
export class SessionAlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SessionAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sessionData
  ) { 
    console.log(this.data);
    // this.data.falseRaised ? this.falseRaised = this.data.falseRaised : '';
    // this.data.trueRaised ? this.trueRaised = this.data.trueRaised : '';
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  valueClicked(val) {
    this.dialogRef.close(val);
  }

}
