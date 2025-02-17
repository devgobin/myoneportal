import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  msg: string;
  trueBtnText: string;
  trueBtnColor: string;
  trueRaised?: boolean,
  showTrue?: boolean,
  falseBtnText: string;
  falseBtnColor: string;
  falseRaised?: boolean,
  showFalse?: boolean,
}
@Component({
  selector: 'app-common-alert',
  templateUrl: './common-alert.component.html',
  styleUrls: ['./common-alert.component.scss']
})
export class CommonAlertComponent implements OnInit {
  trueRaised = true;
  falseRaised = false;
  constructor(
    public dialogRef: MatDialogRef<CommonAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 
    if(this.data.showFalse === undefined){
      this.data.showFalse = true;
    }
    if(this.data.showTrue === undefined){
      this.data.showTrue = true;
    }
    // console.log(this.data);
    // this.data.falseRaised ? this.falseRaised = this.data.falseRaised : '';
    // this.data.trueRaised ? this.trueRaised = this.data.trueRaised : '';
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  valueClicked(val) {
    this.dialogRef.close(val);
  }
}
