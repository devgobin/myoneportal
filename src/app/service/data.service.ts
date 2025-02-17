import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import * as moment from "moment";
import { Storage } from "@ionic/storage";
import { SnackbarComponent } from "../common/snackbar/snackbar.component";
import { MessagePortalOverlayRef } from "../common/message-portal/message-portal-overlay";
import { MessagePortalService } from "../common/message-portal/message-portal.service";
import { ConnectionService } from "./connection.service";
import { GeneralService } from "./general.service";
import { MatDialog } from "@angular/material/dialog";
import { SessionAlertComponent } from "../common/session-alert/session-alert.component";
import { Router } from "@angular/router";
import { CommonAlertComponent } from "../common/common-alert/common-alert.component";
import { AppSettingsService } from "./app-settings.service";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
@Injectable({
  providedIn: "root",
})
export class DataService {
  pattern = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%|"'~^&*-]).{8,}$/;
  basePath = "";
  errorText = "";
  token = "";
  configSuccess: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: "right",
    verticalPosition: "top",
    panelClass: "",
  };
  messagePortalDialog: MessagePortalOverlayRef;

  message = {
    infoMessage: null,
    errorMessage: [],
    hasError: false,
  };

  headerName = {
    screenName: "",
    paths: [],
  };
  bottom = "0";
  isMobile = true;
  isLoggedIn = false;
  layoutChanges: any;
  orientationChanges: any;
  isPortrait = false;
  constructor(
    public http: HttpClient,
    public storage: Storage,
    private snackBar: MatSnackBar,
    public messagePoral: MessagePortalService,
    public connection: ConnectionService,
    public general: GeneralService,
    public dialog: MatDialog,
    public router: Router,
    public appSetting: AppSettingsService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.connection.networkStatus();
    this.basePath = this.appSetting.environment.basePath;
    this.layoutChanges = this.breakpointObserver.observe([
      "(max-width: 1199px)",
    ]);
    this.orientationChanges = this.breakpointObserver.observe([
      // Breakpoints.HandsetLandscape,
      "(max-height: 400px )",
    ]);
  }

  init(): void {
    this.isMobile = this.breakpointObserver.isMatched("(max-width: 1199px)");
    this.layoutChanges.subscribe((result) => {
      // console.log(result);
      this.isMobile = this.breakpointObserver.isMatched("(max-width: 1199px)");
      // console.log(this.isMobile);
    });
    this.orientationChanges.subscribe((result) => {
      console.log(result);
      if (result.matches) {
        // this.isPortrait = true;
      } else {
        // this.isPortrait = false;
      }
    });

    console.log(this.isMobile);
    const userData = JSON.parse(sessionStorage.getItem("FNPFPortalUserData"));
    // console.log(userData);
    if (userData) {
      this.general.userData = userData;
      this.token = userData.token;
    }
  }

  getLocation(lat, long) {
    return new Promise((resolve, reject) => {
      const path =
        "https://nominatim.openstreetmap.org/reverse?lat=" +
        lat +
        "&lon=" +
        long +
        "&format=jsonv2";
      this.http.get(path).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          // this.errorResponse(err);
          reject(err);
        }
      );
    });
  }
  getData(path) {
    return new Promise((resolve, reject) => {
      const header = new HttpHeaders({ Authorization: "Bearer " + this.token });
      this.http.get(this.basePath + path, { headers: header }).subscribe(
        (res) => {
          this.clearMessage();
          resolve(res);
        },
        (err) => {
          // this.errorResponse(err);
          reject(err);
        }
      );
    });
  }
  homePage(path) {
    return new Promise((resolve, reject) => {
      const header = new HttpHeaders({ Authorization: "Bearer " + this.token });
      this.http.get(path, { headers: header }).subscribe(
        (res) => {
          this.clearMessage();
          resolve(res);
        },
        (err) => {
          // this.errorResponse(err);
          reject(err);
        }
      );
    });
  }
  postData(path, credentials) {
    return new Promise((resolve, reject) => {
      const header = new HttpHeaders({ Authorization: "Bearer " + this.token });
      this.http
        .post(this.basePath + path, credentials, { headers: header })
        .subscribe(
          (res) => {
            this.clearMessage();
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  pdf(path, credentials) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        Authorization: "Bearer " + this.token,
      });
      this.http
        .post(this.basePath + path, credentials, {
          headers: headers,
          responseType: "blob",
        })
        .subscribe(
          (res) => {
            const resp = new Blob([res], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(resp);
            resolve(fileURL);
            // this.openBrowser(fileURL);
            // window.open(fileURL, '_blank');
          },
          (err) => {
            reject(err);
          }
        );
    });

    const headers = new HttpHeaders({ Authorization: "Basic " + this.token });
  }

  getpdf(path) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        Authorization: "Bearer " + this.token,
      });
      this.http
        .get(this.basePath + path, { headers: headers, responseType: "blob" })
        .subscribe(
          (res) => {
            const resp = new Blob([res], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(resp);
            resolve(fileURL);
            // this.openBrowser(fileURL);
            // window.open(fileURL, '_blank');
          },
          (err) => {
            reject(err);
          }
        );
    });

    const headers = new HttpHeaders({ Authorization: "Basic " + this.token });
  }

  errorMethod(err) {
    // console.log(err);
    switch (err.status) {
      case 400:
        this.message = err.error;
        this.openMessageBox();

        // this.errorText = err.statusText;
        // this.navCtrl.navigateRoot('/error-notification/' + err.status);
        break;
      case 401:
        this.confirmSessionOut("");
        break;
      case 500:
        this.internalServerError(err.error);
        break;
      case 501:
        this.internalServerError(err.error);
        break;
      case 503:
        this.internalServerError(err.error);
        break;
      case 0:
        if (err.statusText === "Unknown Error") {
          this.internalServerError("");
          break;
        }
      default:
        break;
    }
  }
  errorResponse(err) {
    let msg = "";
    err.errorMessage.forEach((element) => {
      msg !== ""
        ? (msg = msg + ", " + element)
        : (msg = msg + element.msgDescription);
    });
    this.openAlert(msg, "bg-danger");
  }

  successMesaage(success) {
    if (
      success.msg &&
      success.msg.infoMessage &&
      success.msg.infoMessage.msgDescription
    ) {
      this.openAlert(success.msg.infoMessage.msgDescription, "bg-success");
    }
  }
  successMesaageOnly(success) {
    // this.openAlert(success.msg.infoMessage, 'bg-success');
    this.openAlert(success, "bg-success");
  }
  errorMesaage(HttpErrorResponse) {
    this.openAlert(
      HttpErrorResponse.error.errorMessage[0].msgDescription,
      "bg-danger"
    );
  }
  errorMesaageOnly(msg) {
    this.constructErrorMsg(msg);
  }

  getToken() {
    this.storage.get("userData").then((val) => {
      if (val) {
        this.token = val.token;
      }
    });
  }

  openAlert(message, panelclass) {
    // console.log(val);
    this.configSuccess.panelClass = panelclass;
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        button: true,
      },
      ...this.configSuccess,
    });
  }

  dateValidate(one, two) {
    return moment(two, "DD-MM-YYYY hh:mm").isSameOrAfter(
      moment(one, "DD-MM-YYYY hh:mm"),
      "day"
    );
  }

  openMessageBox(val?) {
    // this.messagePoral.open();
    this.messagePortalDialog = this.messagePoral.open(
      {
        data: {
          from: "common",
          type: val ? val : "",
          message: this.message,
        },
      },
      this.bottom
    );
    // this.messagePoral.open();
    // this.closeDialog();
  }

  clearMessage() {
    this.message = {
      infoMessage: null,
      errorMessage: [],
      hasError: false,
    };
  }

  confirmSessionOut(msg) {
    let xmsg = "";
    msg !== ""
      ? (xmsg = msg)
      : (xmsg = "Your session expired. Please login again to continue.");
    const dialogRef = this.dialog.open(SessionAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: xmsg,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigateByUrl("/");
      }
    });
  }

  internalServerError(msg) {
    console.log(msg);
    let xmsg = "";
    msg !== "" && msg != null
      ? (xmsg = msg)
      : (xmsg =
          "Bula, We are currently facing some technical issues with the Portal right now.Please try again after some time, or contact the FNPF Helpdesk team on 323 8330.");
    console.log(xmsg);
    const dialogRef = this.dialog.open(CommonAlertComponent, {
      width: "450px",
      disableClose: true,
      data: {
        msg: xmsg,
        trueBtnText: "Ok",
        trueBtnColor: "danger",
        trueRaised: true,
        falseBtnText: "",
        falseBtnColor: "danger",
        showTrue: true,
        showFalse: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  constructErrorMsg(val) {
    this.message.hasError = true;
    this.message.errorMessage = [];
    const obj = {
      msgID: 0,
      msgType: 0,
      msgDescription: val,
    };
    this.message.errorMessage.push(obj);
    this.openMessageBox();
  }
  constructErrorMsgArr(val) {
    this.message.hasError = true;
    this.message.errorMessage = val;
    this.openMessageBox();
  }

  clearErrorMsg() {
    this.message = {
      infoMessage: null,
      errorMessage: [],
      hasError: false,
    };
  }
  postDocumentData(path: any, body: any, options?: any) {
    let header = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    return this.http.post(this.basePath + path, body, {
      headers: header,
      responseType: "blob",
    });
  }
  encode(val) {
    return new Promise((resolve) => {
      const obj = {
        data: val,
      };
      let response = encodeURIComponent(btoa(JSON.stringify(obj)));
      resolve(response);
    });
  }

  decode(val) {
    return new Promise((resolve) => {
      const urlJson = atob(decodeURIComponent(val));
      const urlValue = JSON.parse(urlJson);
      resolve(urlValue.data);
    });
  }
}
