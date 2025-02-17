import { Component, OnInit } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-reset-email",
  templateUrl: "./reset-email.component.html",
  styleUrls: ["./reset-email.component.scss"],
})
export class ResetEmailComponent implements OnInit {
  pageId = "RSEMA";
  clearbtn = false;
  errorTrue = false;
  btnClicked = false;
  resetusernamevalue = "";
  resetemail = {
    newMail: "",
    resetmyusername: "",
    transactionPin: "",
    currentMail: "",
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
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.data.headerName = {
      screenName: "Change Email",
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
          name: "Change Email",
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
      .postData(AppGlobal.apiPaths.myprofile.getemail, this.resetemail)
      .then(
        (success: any) => {
          this.resetemail = success;
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
    if (re.valid && this.resetemail.transactionPin.length === 4) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      const obj = {
        data: this.resetemail,
      };
      this.data
        .postData(AppGlobal.apiPaths.myprofile.resetemail, this.resetemail)
        .then(
          (success: any) => {
            this.resetemail = success;
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
            if (this.resetusernamevalue === "Y") {
              this.logoutAlert();
            } else {
              this.successalert();
            }
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
        msg: "Your email has been reset successfully.",
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
  resetmyusername(val) {
    this.resetusernamevalue = val;
  }
  logoutAlert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Your username reset successfully to the new Email ID.",
        Showbtn1: true,
        button1: "Logout",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logout();
      }
    });
  }
  logout() {
    this.router.navigateByUrl("/");
  }
}
