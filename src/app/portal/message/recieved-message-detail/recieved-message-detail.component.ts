import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertComponent } from 'src/app/common/delete-alert/delete-alert.component';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { AppGlobal } from 'src/app/constants';
import { DataService } from 'src/app/service/data.service';
import { GeneralService } from 'src/app/service/general.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-recieved-message-detail',
  templateUrl: './recieved-message-detail.component.html',
  styleUrls: ['./recieved-message-detail.component.scss']
})
export class RecievedMessageDetailComponent implements OnInit {
  pageId = "RECMD";
  errorTrue = true;
  btnClicked = true;
  loadingTrue = true;
  constructor(
    public dialog: MatDialog,
    public data: DataService,
    public service: MessageService,
    public fullspinner: FullSpinnerService,
    public generalservice: GeneralService,
  ) {

  }

  ngOnInit(): void {
    this.openData();
  }


  openData() {
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.service.messageId
    }
    this.btnClicked = true;
    this.data.postData(AppGlobal.apiPaths.message.openReceived, obj).then(
      (success: any) => {
        this.service.createMessage = success;
        this.generalservice.userData.totalUnreadMessageCount = success.totalUnreadMessageCount;
        this.btnClicked = false;
        this.fullspinner.empty.next(false);
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.data.errorMethod(error);
      }
    );
  }

  checkdelete(): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this message ?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete();
      }
    });
  }


  delete() {
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.service.createMessage.messageId
    }
    this.data.postData(AppGlobal.apiPaths.message.delete, obj).then((success: any) => {
      if (success.msg) {
        if (success.msg.infoMessage.msgDescription.length !== 0) {
          this.data.successMesaage(success);
        }
      }
      this.fullspinner.empty.next(false);
      this.onNoClick();
    },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  markAsUnRead() {
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.service.createMessage.messageId
    };
    this.data
      .postData(AppGlobal.apiPaths.message.markasunread, obj)
      .then(
        (success: any) => {
          this.service.createMessage = success;
          this.generalservice.userData.totalUnreadMessageCount = success.totalUnreadMessageCount;
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.data.successMesaage(success);
          this.onNoClick();
        },
        (error: any) => {
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }


  onNoClick() {
    this.dialog.closeAll();
  }
}
