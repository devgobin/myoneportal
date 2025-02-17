import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";

import { Router } from "@angular/router";

import { SandboxComponent } from "../common/sandbox/sandbox.component";
import { AppSettingsService } from "../service/app-settings.service";

import { DataService } from "../service/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  navOpen = false;

  constructor(
    public data: DataService,
    public router: Router,
    public dialog: MatDialog,
    public appSetting: AppSettingsService
  ) {
    this.data.bottom = "0";
  }

  ngOnInit(): void {
    if (this.appSetting.environment.sandboxMode) {
      this.openSandboxMode();
    }

    // setTimeout(() => {
    //   this.data.constructErrorMsg('this is sample');
    // }, 1000);
  }

  isOpen() {
    this.navOpen = !this.navOpen;
  }

  onActivate(event) {
    setTimeout(
      () => {
        window.scroll(0, 0);
      },

      200
    );
  }

  logout() {
    this.router.navigateByUrl("/");
  }

  openSandboxMode() {
    const dialogRef = this.dialog.open(SandboxComponent, {
      width: "400px",
      disableClose: true,
      panelClass: "sandbox-dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
