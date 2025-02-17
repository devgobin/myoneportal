import { Component, OnInit } from '@angular/core';
import { FullSpinnerService } from '../../../../common/full-spinner/full-spinner.service';
import { DataService } from '../../../../service/data.service';
import { AppGlobal } from '../../../../constants';
import { profileservice } from '../profile-detail.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GeneralService } from 'src/app/service/general.service';
import { PortalLoginService } from '../../../../home/portal-login/portal-login.service';

@Component({
  selector: 'app-default-landing-page',
  templateUrl: './default-landing-page.component.html',
  styleUrls: ['./default-landing-page.component.scss']
})
export class DefaultLandingPageComponent implements OnInit {
  pageId = "DLPPD";
  errorTrue = false;
  btnClicked = false;
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: profileservice,
    public dialogRef: MatDialogRef<DefaultLandingPageComponent>,
    public general: GeneralService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(dlp) {
    if (dlp.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      const obj = {
        data: this.service.detail.defaultLandingPage,
      };
      this.data
        .postData(AppGlobal.apiPaths.myprofile.updatedefaultlandingpage, obj)
        .then(
          (success: any) => {
            //this.service.detail =success;
            if (success.msg) {
              if (Array.isArray(success.msg.errorMessage.msgDescription)) {
                if (success.msg.errorMessage.msgDescription.length !== 0) {
                  this.data.errorResponse(success);
                  this.fullspinner.empty.next(false);
                  this.btnClicked = false;
                }
              }
            }
            
            this.service.detail.defaultLandingPage = success.defaultLandingPage;
            this.service.detail.defaultLandingPageName = success.defaultLandingPageName;

            this.general.userData.defaultLandingPageName = this.service.detail. defaultLandingPageName;
            this.general.userData.defaultLandingPage = success.defaultLandingPage;
            
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.data.successMesaage(success);
            this.dialogRef.close(true);
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
      console.log('error')
    }
  }
  close(val) {
    this.dialogRef.close(val);
  }
}
