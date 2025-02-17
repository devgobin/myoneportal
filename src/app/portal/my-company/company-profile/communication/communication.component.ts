import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { DataService } from 'src/app/service/data.service';
import { companyprofileservice } from '../company-profile.service';
import { AppGlobal } from 'src/app/constants';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {
  pageId = "COMPR";
  type: any = '';
  btnClicked = false;
  errorTrue = false;
  constructor(
    public fullspinner: FullSpinnerService,
    public dialogRef: MatDialogRef<CommunicationComponent>,
    public data: DataService,
    public service: companyprofileservice,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
  ) {
    if (xdata.type === 'edit') {
      this.service.communication = xdata.data;
    }
    else {
      this.type = xdata.type;
    }
  }

  ngOnInit(): void {
    if (this.type === 'edit') {
      // this.getData();
    } else if (this.type === 'new') {
      this.newData();
    }
  }

  getData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    const obj = {
      data: this.service.communication.orgCommunicationId
    }
    this.data.postData(AppGlobal.apiPaths.companyprofile.opencommunication, obj).then((success: any) => {
      this.service.communication = success;
      this.btnClicked = true;
      if (success.msg) {
        if (Array.isArray(success.msg.errorMessage)) {
          if (success.msg.errorMessage.length !== 0) {
            this.data.errorResponse(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = true;
          }
        }
      }
      this.data.successMesaage(success);
      this.fullspinner.empty.next(false);
      this.btnClicked = true;
    }, (error) => {
      this.fullspinner.empty.next(false);
      this.data.errorMethod(error);
    });
  }

  newData() {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.companyprofile.newcommunication).then((success: any) => {
      this.service.communication = success;
      if (success.msg) {
        if (Array.isArray(success.msg.errorMessage)) {
          if (success.msg.errorMessage.length !== 0) {
            this.data.errorResponse(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        }
      }
      // this.data.successMesaage(success);
      this.fullspinner.empty.next(false);
      this.btnClicked = false;
    }, (error) => {
      this.fullspinner.empty.next(false);
      this.btnClicked = false;
      this.data.errorMethod(error);
    });
  }

  onsubmit(c) {
    if (c.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.service.detail.protoentOrgCommunication = this.service.communication;
      this.data.postData(AppGlobal.apiPaths.companyprofile.savecommunication, this.service.detail).then((success: any) => {
        this.fullspinner.empty.next(false);
        this.service.detail = success;
        this.data.successMesaage(success);
        this.close(true);
        this.btnClicked = false;
        this.fullspinner.empty.next(false);
      },
        (error) => {
          this.data.errorMethod(error);
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
        }
      );
    }
    else {
      this.errorTrue = true;
      this.btnClicked = false;
      this.fullspinner.empty.next(false);
    }
  }
  close(val) {
    this.dialogRef.close(val);
  }

  doClear() {
    this.service.communication.orgCommunicationTypeValue = '';
    this.service.communication.communicationDetail = ''
    this.service.communication.orgCommunicationStatusValue = ''
    this.errorTrue = false;
    const data =
    {
      msg: {
        infoMessage: {
          msgDescription: 'Data cleared successfully.'
        }
      }
    };
    this.data.successMesaage(data);
    // this.close(true);
  }
}