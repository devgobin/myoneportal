import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { companyprofileservice } from "../company-profile.service";
import { AppGlobal } from "src/app/constants";
import { MomentPipe } from "../../../../pipe/moment.pipe";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { Router } from "@angular/router";
import { SendMeesageDetailComponent } from "src/app/portal/message/send-meesage-detail/send-meesage-detail.component";
import { Thumbs } from "swiper";
import { MessageService } from "src/app/portal/message/message.service";
import { GeneralService } from "src/app/service/general.service";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})
export class AddressComponent implements OnInit {
  pageId = "COMPR";
  errorTrue = false;
  type: any = "";
  btnClicked = false;
  createdDate = "";
  maxlength = 500;
  Isbusinesspremiseseditable =  true;
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: companyprofileservice,
    public router: Router,
    public messageservice : MessageService,
    public generalservice : GeneralService,
    public dialogRef: MatDialogRef<AddressComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
    public dialog: MatDialog
  ) {
    if (xdata.type === "edit") {
      this.service.address = xdata.data;
      const momentPipe = new MomentPipe();
      this.createdDate = momentPipe.transform(
        this.service.address.createdDate,
        "DD-MM-YYYY",
        "DD MMM YYYY"
      );
      console.log(this.service.address);
    } else {
      this.type = xdata.type;
    }
  }
  viewAppointmentParams = {
    DDLAppointmentMessagetypeValue: [],
    DDLAppointmentMessageStatusValue: [],
    DDLAppointmentMessageDeliveryStatusValue: [],
    DDLAppointmentMessageCategory: [],
    DDLAppointmentMessageTransactionType: [],
    DDLAppointmentMessageReason: [],
  };
  ngOnInit(): void {
    if (this.type === "edit") {
      // this.getData();
      console.log(this.service.address);
    } else if (this.type === "new") {
      this.newData();
    }
  }

  getData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    const obj = {
      data: this.service.address.addressId,
    };
    this.data.postData(AppGlobal.apiPaths.companyprofile.openaddress, obj).then(
      (success: any) => {
        this.service = success;
        if (success.msg) {
          if (Array.isArray(success.msg.errorMessage)) {
            if (success.msg.errorMessage.length !== 0) {
              this.data.errorResponse(success);
              this.fullspinner.empty.next(false);
              this.btnClicked = true;
            }
          }
        }
        // this.data.successMesaage(success);
        this.fullspinner.empty.next(false);
        this.btnClicked = true;
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.data.errorMethod(error);
        this.btnClicked = true;
      }
    );
  }

  newData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data.getData(AppGlobal.apiPaths.companyprofile.newaddress).then(
      (success: any) => {
        this.service.address = success;
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
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.data.errorMethod(error);
      }
    );
  }

  onsubmit(a) {
    if (a.valid) {
      if (this.service.address.addressType  !== 'BSPM') {

        this.errorTrue = false;
        this.btnClicked = true;
        this.fullspinner.empty.next(true);
        this.service.detail.protoentAddress = this.service.address;
        this.data
          .postData(
            AppGlobal.apiPaths.companyprofile.saveaddress,
            this.service.detail
          )
          .then(
            (success: any) => {
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
            }
          );
      } else {
        if(this.generalservice.userData.isbusinessPremisesEditable)
        {
        this.doDelete();
        }
        else{
          this.data.errorMesaageOnly("You are not authorized to made changes in Business Premises");
        }
      }
    } else {
      this.errorTrue = true;
      this.btnClicked = false;
      this.fullspinner.empty.next(false);
    }
  }
  close(val) {
    this.dialogRef.close(val);
  }

  doClear() {
    this.service.address.line1 = "";
    this.service.address.line2 = "";
    this.service.address.city = "";
    this.service.address.province = "";
    this.service.address.island = "";
    this.errorTrue = false;

    const data = {
      msg: {
        infoMessage: {
          msgDescription: "Data cleared successfully.",
        },
      },
    };
    this.data.successMesaage(data);
    // this.close(true);
  }
  doDelete(): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Primary Contact may not amend the Business Premises Address."+
        "Do you want send us a message with your new address details",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newSend();
      }
    });
  }
  newSend() {
    this.messageservice.messageId = 0;
    this.messageservice.createMessage.isBusinessMessage = true;
    const dialogRef = this.dialog.open(SendMeesageDetailComponent, {
      width: "1000px",
      height: "480px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

      }
      this.messageservice.createMessage.isBusinessMessage = false;
      this.messageservice.createMessage.reasonTypeValue='';
      this.messageservice.createMessage.transactionTypeValue = '';
      this.messageservice.createMessage.categoryValue = '';
      this.messageservice.createMessage.messageContent = '';
        });
  }

}
