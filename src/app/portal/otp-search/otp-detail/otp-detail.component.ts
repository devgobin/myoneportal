import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { OtpService } from "../otp.service";

@Component({
  selector: "app-otp-detail",
  templateUrl: "./otp-detail.component.html",
  styleUrls: ["./otp-detail.component.scss"],
})
export class OtpDetailComponent implements OnInit {
  btnClicked = false;
  errorTrue = false;
  constructor(public data: DataService,
    public dialog: MatDialog,
    public fullspinner: FullSpinnerService,
   public service: OtpService,
    public route: ActivatedRoute,
    public router: Router) {
    this.data.headerName = {
      screenName: "Order To Third Party Detail",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Order to Third Party",
          link: "",
        },
        {
          name: "Order to Third Party Details",
          link: "",
        },
      ],
    };
  }
  tpoHeaderId = 0;
  ngOnInit(): void {
    if(this.service.otp.tpoHeaderId > 0)
    {
      this.tpoHeaderId = this.service.otp.tpoHeaderId;
      this.service.clearData();
      this.openotp(this.tpoHeaderId)
    }
    else{
      this.router.navigateByUrl("/app/otp");
    }
  }
  openotp(val) {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data.postData(AppGlobal.apiPaths.otp.open, obj).then(
      (success: any) => {
        this.service.otp = success;
        this.service.otp.tpoHeaderId = success.tpoHeaderId;
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }
}
