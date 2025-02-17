import { Component, OnInit } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppGlobal } from "src/app/constants";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
@Component({
  selector: "app-reset-mobile-number",
  templateUrl: "./reset-mobile-number.component.html",
  styleUrls: ["./reset-mobile-number.component.scss"],
})
export class ResetMobileNumberComponent implements OnInit {
  pageId = "RSMNO";
  clearbtn = false;
  errorTrue = false;
  btnClicked = false;

  resetmobileno = {
    newMobileNo: "",
    transactionPin: "",
    currentMobileNo: "",
    msg: {
      infoMessage: {
        msgID: 0,
        msgType: 0,
        msgDescription: "",
      },
      hasError: true,
    },
    makemobilenousmyusername: "",
    updateSeq: 0,
  };

  mandatory = true;

  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public routes: Router
  ) {
    this.data.headerName = {
      screenName: "Change Mobile Number",
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
          name: "Change Mobile Number",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.myprofile.getmobileNo, this.resetmobileno)
      .then(
        (success: any) => {
          this.resetmobileno = success;
          this.resetmobileno.newMobileNo = "";
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
          // this.data.successMesaage(true);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }

  onsubmit(re) {
    if (re.valid && this.resetmobileno.transactionPin.length === 4) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      const obj = {
        data: this.resetmobileno,
      };
      this.data
        .postData(
          AppGlobal.apiPaths.myprofile.resetmobileno,
          this.resetmobileno
        )
        .then(
          (success: any) => {
            this.resetmobileno = success;

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
      this.errorTrue = true;
    }
  }
  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Your mobile no has been reset successfully.",
        Showbtn1: true,
        button1: "Close",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.resetmobileno.makemobilenousmyusername === "Y") {
          this.logout();
        } else {
          this.navigateProfile();
        }
      }
    });
  }
  logout() {
    this.routes.navigateByUrl("/");
  }
  navigateProfile() {
    this.routes.navigateByUrl("/app/profile-detail");
  }
}
