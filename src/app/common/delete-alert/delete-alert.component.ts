import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  msg: string;
  Otherbtn?: boolean;
  otherbtntext: string;
  warning?: boolean;
  listofMessage :[];
}
@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss']
})
export class DeleteAlertComponent implements OnInit {
  Otherbtn = false;
  warning = false;
 
  constructor(
    public dialogRef: MatDialogRef<DeleteAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  } 

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  close() {
    this.dialogRef.close(true);
  }

}
