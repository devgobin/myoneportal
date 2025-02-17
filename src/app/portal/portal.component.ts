import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from "@angular/router";
import { Storage } from "@ionic/storage";
import { CommonAlertComponent } from "../common/common-alert/common-alert.component";
import { FullSpinnerService } from "../common/full-spinner/full-spinner.service";
import { AppGlobal } from "../constants";
import { AppSettingsService } from "../service/app-settings.service";
import { DataService } from "../service/data.service";
import { GeneralService } from "../service/general.service";
import { GenerateUploadCsFileService } from "./contribution/generate-upload-cs-file/generate-upload-cs-file.service";
import { LiveBotComponent } from "./live-bot/live-bot.component";
import { DefaultLandingPageComponent } from "./my-profile/profile-detail/default-landing-page/default-landing-page.component";
import { profileservice } from "./my-profile/profile-detail/profile-detail.service";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-portal",
  templateUrl: "./portal.component.html",
  styleUrls: ["./portal.component.scss"],
})
export class PortalComponent implements OnInit {
  sideBarOpen = true;
  btnClicked = false;
  fsview = false;
  showchange = true;
  @ViewChild("livebot") livebot: LiveBotComponent;
  @ViewChild("drawer") drawer: MatSidenav;
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public data: DataService,
    public general: GeneralService,
    public csFile: GenerateUploadCsFileService,
    public fullspinner: FullSpinnerService,
    public service: profileservice,
    public storage: Storage,
    public appSetting: AppSettingsService
  ) {
    this.data.bottom = "30px";
    // this.router.events.subscribe((val) => {
    //   if (this.drawer) {
    //     this.drawer.close();
    //   }
    //   // if (val instanceof NavigationStart) {
    //   //   if (this.drawer) {
    //   //     this.drawer.close();
    //   //   }
    //   // }
    //   // if (val instanceof NavigationEnd) {
    //   //   this.drawer.close();
    //   // }
    // });
  }

  ngOnInit(): void {
    if (
      this.general.userData.entOrgContact.lstprotoentOrganization.length === 1
    ) {
      this.showchange = false;
    }
    this.storage.get("sideBarOpen").then((val) => {
      if (val !== "") {
        console.log(val);
        this.sideBarOpen = val;
      }
    });
  }

  sideBarExpand() {
    this.sideBarOpen = !this.sideBarOpen;
    this.storage.set("sideBarOpen", this.sideBarOpen);
  }

  logout() {
    sessionStorage.clear();
    window.location.assign(this.appSetting.environment.baseAppPath);
    // this.router.navigateByUrl('/');
  }
  landingPage() {
    this.router.navigateByUrl(this.general.userData.defaultLandingPage);
  }
  confirmLogout() {
    const dialogRef = this.dialog.open(CommonAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Are you sure you want to logout ?",
        trueBtnText: "Yes",
        trueBtnColor: "medium",
        trueRaised: false,
        falseBtnText: "No",
        falseRaised: true,
        falseBtnColor: "danger",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logout();
      }
    });
  }

  @HostListener("document:fullscreenchange", ["$event"]) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (!document.fullscreenElement) {
      this.fsview = false;
    }
  }

  openFullscreen() {
    // Use this.divRef.nativeElement here to request fullscreen
    // const elem = this.fullview.nativeElement;
    const elem = document.documentElement;
    if (document.fullscreenElement) {
      this.fsview = false;
      document.exitFullscreen();
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      this.fsview = true;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    }
  }

  changeDefaultLandingPage(): void {
    this.service.detail.defaultLandingPage =
      this.general.userData.defaultLandingPage;
    this.service.detail.defaultLandingPageName =
      this.general.userData.defaultLandingPageName;

    this.service.detail.lstprotoDefaultLandingPage =
      this.general.userData.lstprotoDefaultLandingPage;

    const dialogRef = this.dialog.open(DefaultLandingPageComponent, {
      width: "440px",
      height: "250px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
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
          this.service.detail = success;
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
  changeEmployer() {
    this.router.navigateByUrl("/select-organization");
  }
  readMessage() {
    this.closeNav();
    this.router.navigateByUrl("/app/message-search/1");
  }
  openBot() {
    this.livebot.openBot();
  }
  closeNav() {
    this.drawer.close();
  }
}
