import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { profileservice } from "./profile-detail.service";
import { MatDialog } from "@angular/material/dialog";
import { DefaultLandingPageComponent } from "./default-landing-page/default-landing-page.component";
import { GeneralService } from "src/app/service/general.service";

@Component({
  selector: "app-profile-detail",
  templateUrl: "./profile-detail.component.html",
  styleUrls: ["./profile-detail.component.scss"],
})
export class ProfileDetailComponent implements OnInit {
  pageId = "PRODE";
  btnClicked = false;
  loadingTrue = false;
  errorTrue = false;
  selectedAccordion = 1;
  @ViewChild("termsConditionDialog", { static: false })
  termsConditionDialog: TemplateRef<any>;
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: profileservice,
    public dialog: MatDialog,
    public general: GeneralService
  ) {
    this.data.headerName = {
      screenName: "Profile Detail",
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
          name: "Profile Detail",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getData();
  }
  toggleAccordion(val) {
    this.selectedAccordion = val;
  }

  getData() {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.myprofile.open).then(
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
        this.data.successMesaage(true);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }
  twofactorAuthentication(val) {
    console.log(val.checked);
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    val.checked ? (obj.data = "Y") : (obj.data = "N");
    this.data
      .postData(AppGlobal.apiPaths.myprofile.changetwpfactorauthentication, obj)
      .then(
        (success: any) => {
          this.service.detail.enableTwoFactorAuthentication =
            success.enableTwoFactorAuthentication;
          this.general.userData.enableTwoFactor =
            this.service.detail.enableTwoFactorAuthentication;
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.data.successMesaage(true);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }
  changeDefaultLandingPage(): void {
    const dialogRef = this.dialog.open(DefaultLandingPageComponent, {
      width: "440px",
      height: "250px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  openDialog() {
    this.dialog.open(this.termsConditionDialog, {
      width: "600px",
      height: "570px",
    });
  }
  onNoClick() {
    this.dialog.closeAll();
  }
}
