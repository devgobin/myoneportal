import { Component, OnInit } from "@angular/core";
import { resetsecurityquesservice } from "./reset-security-questions.service";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-reset-security-questions",
  templateUrl: "./reset-security-questions.component.html",
  styleUrls: ["./reset-security-questions.component.scss"],
})
export class ResetSecurityQuestionsComponent implements OnInit {
  pageId="RSSQU";
  btnClicked = false;
  errorTrue = false;
  successTrue = false;
  constructor(
    public service: resetsecurityquesservice,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.data.headerName = {
      screenName: "Change Security Questions",
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
          name: "Change Security Questions",
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
    this.data.getData(AppGlobal.apiPaths.myprofile.loadsecurityques).then(
      (success: any) => {
        this.service.detail = success;
        this.service.detail.transactionPin = "";
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

  onsubmit() {
    let count = 0;
    this.service.detail.portalUserSecurityQuestionList.forEach((element) => {
      if (element.encryptedAnswer !== "") {
        count++;
      }
    });
    if (count > 4) {
      this.data.clearErrorMsg();
      if (this.service.detail.transactionPin.length > 3) {
        // console.log(this.service.detail.transactionPin.length);
        // console.log("validation checked");
        this.errorTrue = false;
        this.btnClicked = true;
        this.fullspinner.empty.next(true);
        this.data
          .postData(
            AppGlobal.apiPaths.myprofile.resetsecurityques,
            this.service.detail
          )
          .then(
            (success: any) => {
              this.service.detail = success;
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
        // console.log(this.service.detail.transactionPin.length);
      }
    } else {
      this.data.errorMesaageOnly("Please answer minimum 5 questions.");
    }
  }
  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Your security questions has been reset successfully.",
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
}
