import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { MessageService } from "../message.service";

@Component({
  selector: "app-send-meesage-detail",
  templateUrl: "./send-meesage-detail.component.html",
  styleUrls: ["./send-meesage-detail.component.scss"],
})
export class SendMeesageDetailComponent implements OnInit {
  pageId = "SENDM";
  loadingTrue = false;
  errorTrue = false;
  btnClicked = false;
  maxlength = 500;
  errorText = "";
  @ViewChild("l", { static: false }) public l: NgForm;
  constructor(
    public dialog: MatDialog,
    public data: DataService,
    public fullspinner: FullSpinnerService,
    public service: MessageService
  ) {}

  viewAppointmentParams = {
    DDLAppointmentMessagetypeValue: [],
    DDLAppointmentMessageStatusValue: [],
    DDLAppointmentMessageDeliveryStatusValue: [],
    DDLAppointmentMessageCategory: [],
    DDLAppointmentMessageTransactionType: [],
    DDLAppointmentMessageReason: [],
  };

  ngOnInit(): void {
    this.initialdata();
  }

  initialdata() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.message.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.viewAppointmentParams[element.key] = element.value;
        });
        if (this.service.messageId > 0) {
          this.openData();
        } else {
          if(this.service.createMessage.isBusinessMessage === false)
          {
          this.createData();
          }
          else{
                this.createDataforbusinesspremises();
              }
        }
        //this.createData();
        //}
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  createData() {
    this.btnClicked = true;
    this.data.getData(AppGlobal.apiPaths.message.create).then(
      (success: any) => {
        this.service.createMessage = success;
        this.maxlength = this.service.createMessage.sendMsgContent;
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

  createDataforbusinesspremises() {
    this.btnClicked = true;
    this.data.getData(AppGlobal.apiPaths.message.createmessageforcompanyporfile).then(
      (success: any) => {
        this.service.createMessage = success;
        this.maxlength = this.service.createMessage.sendMsgContent;
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

  openData() {
    const obj = {
      data: this.service.messageId,
    };
    this.btnClicked = true;
    this.data.postData(AppGlobal.apiPaths.message.openSend, obj).then(
      (success: any) => {
        this.service.createMessage = success;
        this.btnClicked = false;
        if (this.service.createMessage.deliveryStatusValue === "SENT") {
          this.btnClicked = true;
        }
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
        this.deleteData();
      }
    });
  }

  deleteData() {
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.service.createMessage.messageId,
    };
    this.btnClicked = true;
    this.data.postData(AppGlobal.apiPaths.message.delete, obj).then(
      (success: any) => {
        this.data.successMesaage(success);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.onNoClick();
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.data.errorMethod(error);
      }
    );
  }

  onSubmit(l) {
    if (
      this.service.createMessage.messageContent.length >
      this.service.createMessage.sendMsgContent
    ) {
      this.errorText =
        "Maximum " + this.service.createMessage.sendMsgContent + " characters";
    }
    if (l.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(AppGlobal.apiPaths.message.save, this.service.createMessage)
        .then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.service.createMessage = success;
            this.data.successMesaage(success);
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  sendMessage(l) {
    if (
      this.service.createMessage.messageContent.length >
      this.service.createMessage.sendMsgContent
    ) {
      this.errorText =
        "Maximum " + this.service.createMessage.sendMsgContent + " characters";
    }
    if (l.valid) {
      this.loadingTrue = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(AppGlobal.apiPaths.message.send, this.service.createMessage)
        .then(
          (success: any) => {
            this.service.createMessage = success;
            this.loadingTrue = false;
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.onNoClick();
          },
          (error: any) => {
            this.loadingTrue = false;
            this.fullspinner.empty.next(false);
            this.data.errorMethod(error);
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  onNoClick() {
    this.dialog.closeAll();
  }
}
