import { Component, OnInit } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-reset-username",
  templateUrl: "./reset-username.component.html",
  styleUrls: ["./reset-username.component.scss"],
})
export class ResetUsernameComponent implements OnInit {
  pageId = "RSUNM";
  clearbtn = false;
  errorTrue = false;
  btnClicked = false;
  successTrue = false;

  resetusername = {
    newusername: "",
    confirmusername: "",
    makeemailusmyusername: "",
    transactionPin: "",
    currentusername: "",
    currentEmailId: "",
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
      screenName: "Change Username",
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
          name: "Change Username",
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
      .postData(AppGlobal.apiPaths.myprofile.getusername, this.resetusername)
      .then(
        (success: any) => {
          this.resetusername = success;
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

  checkDeclartion(value) {
    value === true
      ? (this.resetusername.makeemailusmyusername = "Y")
      : (this.resetusername.makeemailusmyusername = "N");
    this.getusername();
  }

  getusername() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.resetusername,
    };
    this.data
      .postData(
        AppGlobal.apiPaths.myprofile.checkboxusername,
        this.resetusername
      )
      .then(
        (success: any) => {
          this.resetusername = success;
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
          this.successTrue = true;
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }

  onsubmit(ru) {
    if (ru.valid && this.resetusername.transactionPin.length === 4) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      const obj = {
        data: this.resetusername,
      };
      this.data
        .postData(
          AppGlobal.apiPaths.myprofile.resetusername,
          this.resetusername
        )
        .then(
          (success: any) => {
            this.resetusername = success;
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
        msg: "Your username has been reset successfully.",
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
