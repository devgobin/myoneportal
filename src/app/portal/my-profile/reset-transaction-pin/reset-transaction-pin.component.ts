import { Component, OnInit, ViewChild } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-reset-transaction-pin",
  templateUrl: "./reset-transaction-pin.component.html",
  styleUrls: ["./reset-transaction-pin.component.scss"],
})
export class ResetTransactionPinComponent implements OnInit {
  pageId = "RSTSP";
  clearbtn = false;
  errorTrue = false;
  btnClicked = false;
  successTrue = false;
  resettransactionpin = {
    currentpin: "",
    newpin: "",
    confirmpin: "",
    password: "",
    msg: {
      infoMessage: {
        msgID: 0,
        msgType: 0,
        msgDescription: "",
      },
      hasError: true,
    },
    updateSeq: 0,
  };
  @ViewChild("fcurrentpin", { static: false })
  fcurrentpin;
  @ViewChild("snewpin", { static: false })
  snewpin;
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.data.headerName = {
      screenName: "Reset Transaction PIN",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "My Profile",
          link: "",
        },
        {
          name: "Reset Transaction PIN",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {}

  onsubmit(rtp) {
    console.log("ok");
    if (
      this.resettransactionpin.newpin === this.resettransactionpin.currentpin &&
      this.resettransactionpin.currentpin.length > 0 &&
      this.resettransactionpin.newpin.length > 0
    ) {
      // console.log("ok");
      this.data.errorMesaageOnly("New PIN must be Different from Current PIN");
      return;
    }
    // console.log("ok1");
    if (rtp.valid)
      if (
        this.resettransactionpin.newpin === this.resettransactionpin.confirmpin
      ) {
        this.errorTrue = false;
        this.btnClicked = true;
        this.fullspinner.empty.next(true);
        const obj = {
          data: this.resettransactionpin,
        };
        this.data
          .postData(
            AppGlobal.apiPaths.myprofile.resettrnpin,
            this.resettransactionpin
          )
          .then(
            (success: any) => {
              this.resettransactionpin = success;
              if (success.msg) {
                if (Array.isArray(success.msg.errorMessage.msgDescription)) {
                  if (success.msg.errorMessage.msgDescription.length !== 0) {
                    this.data.errorResponse(success);
                    this.fullspinner.empty.next(false);
                    this.btnClicked = false;
                  }
                }
              }
              this.fullspinner.empty.next(false);
              this.btnClicked = false;
              this.successalert();
            },
            (error) => {
              this.data.errorMethod(error);
              this.fullspinner.empty.next(false);
              this.btnClicked = false;
            }
          );
      } else {
      }
    else {
      this.errorTrue = true;
    }
  }
  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Your transaction PIN has been reset successfully.",
        Showbtn1: true,
        button1: "Close",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.navigateProfile();
      }
    });
  }
  navigateProfile() {
    this.router.navigateByUrl("/app/profile-detail");
  }
  currentPINFinished() {
    this.fcurrentpin.doFocus();
  }
  newPINFinished() {
    this.snewpin.doFocus();
  }
}
