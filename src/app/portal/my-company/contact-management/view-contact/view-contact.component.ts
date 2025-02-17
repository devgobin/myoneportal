import { Component, OnInit, ViewChild } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { viewcontactservice } from "./view-contact.service";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-contact",
  templateUrl: "./view-contact.component.html",
  styleUrls: ["./view-contact.component.scss"],
})
export class ViewContactComponent implements OnInit {
  pageId = "VIEWC";
  successTrue = false;
  btnClicked = false;
  loadingTrue = false;
  errorTrue = false;
  @ViewChild('mobileNumber', { static: false })
  mobileNumber;
  showCheckbox = true;
  showCheckboxcscode = true;
  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public contactservice: viewcontactservice,
    public dialog: MatDialog,
    public router: Router
  ) {
    // this.contactservice.clearContact();
    this.data.headerName = {
      screenName: "View Contact Detail",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "My Company",
          link: "",
        },
        {
          name: "View Contact Detail",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getInitialData();
    this.getData();
  }
  getInitialData() {
    this.data
      .getData(AppGlobal.apiPaths.contact.geteditemployercontactinitialdata)
      .then(
        (success: any) => {
          success.data.forEach((element) => {
            this.contactservice.DDL[element.key] = element.value;
          });
        },
        (error: any) => {
          this.data.errorMethod(error);
        }
      );
  }
  getData() {
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.contactservice.contact.employerContactId,
    };
    this.data
      .postData(AppGlobal.apiPaths.contact.openregisteredcontact, obj)
      .then(
        (success: any) => {
          setTimeout(() => {
            this.mobileNumber.checkPattern();
          }, 400);
          if (
            success.msg === null ||
            success.msg.errorMessage === null ||
            success.msg.errorMessage.length === 0
          ) {
            this.contactservice.contact = success;
            console.log(this.contactservice);
            console.log(this.contactservice.contact);
            this.fullspinner.empty.next(false);
          }
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  Update(u) {
    if (u.valid && this.contactservice.contact.orgAddressId !== 0) {
      this.errorTrue = false;
      this.fullspinner.empty.next(true);
      this.btnClicked = true;
      this.data
        .postData(
          AppGlobal.apiPaths.contact.editcontact,
          this.contactservice.contact
        )
        .then(
          (success: any) => {
            this.contactservice.contact = success;
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
      this.fullspinner.empty.next(false);
      this.btnClicked = false;
    }
  }
  generatecontactpin() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .postData(
        AppGlobal.apiPaths.contact.generatecontactpin,
        this.contactservice.contact
      )
      .then(
        (success: any) => {
          this.contactservice.contact = success;
          this.fullspinner.empty.next(false);
          this.data.successMesaage(success);
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

  UnblockAccount() {
    if (this.contactservice.contact.person.personId > 0) {
      const obj = {
        data: this.contactservice.contact.person.personId,
      };
      this.fullspinner.empty.next(true);
      this.data.postData(AppGlobal.apiPaths.contact.unlockaccount, this.contactservice.contact).then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.data.successMesaageOnly(success.msg.infoMessage.msgDescription);
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
  statustoggle(val) {
    console.log(val.checked);
  }
  checkDeclartionCSCode(value, contact, index) {
    console.log(value)
    if (value === false) {
      const dialogRef = this.dialog.open(DeleteAlertComponent, {
        width: "350px",
        data: {
          msg:
            "Are you sure, you want to deactivate",
          Otherbtn: true,
          otherbtntext: "Yes"
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.checkcode(value, contact);
        }
        else {
          this.showCheckboxcscode = false;
          console.log(this.contactservice.contact.lstprotoentCSCode[index].isActive);
          this.contactservice.contact.lstprotoentCSCode[index].isActive = "Y";
          setTimeout(() => {
            this.showCheckboxcscode = true;
          }, 100);
          console.log(value);
        }
      });
    }
    else {
      this.checkcode(value, contact);
    }
  }
  checkcode(value, contact) {
    console.log(value);
    value === true
      ? (contact.isActive = "Y")
      : (contact.isActive = "N");
    this.getCSCode(contact);
  }
  getCSCode(contact) {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.contactservice.contact.protoentCSCode = contact;
    this.data
      .postData(
        AppGlobal.apiPaths.contact.editcontaddorinactivateemployercontactbycscodeact,
        this.contactservice.contact
      )
      .then(
        (success: any) => {
          this.contactservice.contact = success;

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
          this.data.successMesaage(success);

        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          contact.isActive = "N";
        }
      );
  }
  checkDeclartionContactType(value, contact, index) {
    console.log(value)

    if (value === false && this.contactservice.contact.primaryContactDeactivated === "Y" && contact.contactType === 'PRMY') {
      const dialogRef = this.dialog.open(DeleteAlertComponent, {
        width: "350px",
        data: {
          msg:
            "Are you sure, you want to deactivate and logout.",
          Otherbtn: true,
          otherbtntext: "Yes"
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.check(value, contact);
        }
        else {
          this.showCheckbox = false;
          this.contactservice.contact.lstprotoListOfContactType[index].isActive = "Y";
          setTimeout(() => {
            this.showCheckbox = true;
          }, 100);
          console.log(value);
        }
      });
    }
    else if (value === false && contact.contactType === 'PRMY' && (this.contactservice.contact.primaryContactDeactivated === "" || this.contactservice.contact.primaryContactDeactivated === "N")) {
      const dialogRef = this.dialog.open(DeleteAlertComponent, {
        width: "350px",
        data: {
          msg:
            "Are you sure, you want to deactivate.",
          Otherbtn: true,
          otherbtntext: "Yes"
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.check(value, contact);
        }
        else {
          this.showCheckbox = false;
          this.contactservice.contact.lstprotoListOfContactType[index].isActive = "Y";
          setTimeout(() => {
            this.showCheckbox = true;
          }, 100);
          console.log(value);
        }
      });
    }
    else if (value === false && contact.contactType !== 'PRMY') {
      const dialogRef = this.dialog.open(DeleteAlertComponent, {
        width: "350px",
        data: {
          msg:
            "Are you sure, you want to deactivate.",
          Otherbtn: true,
          otherbtntext: "Yes"
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.check(value, contact);
        }
        else {
          this.showCheckbox = false;
          this.contactservice.contact.lstprotoListOfContactType[index].isActive = "Y";
          setTimeout(() => {
            this.showCheckbox = true;
          }, 100);
          console.log(value);
        }
      });
    }
    else {
      this.check(value, contact);
    }
  }
  check(value, contact) {
    console.log(value);
    value === true
      ? (contact.isActive = "Y")
      : (contact.isActive = "N");
    console.log(contact.isActive);
    this.getContactType(contact);
  }
  getContactType(contact) {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.contactservice.contact.protoListOfContactType = contact;
    this.data
      .postData(
        AppGlobal.apiPaths.contact.addorinactivateemployercontactbycontacttype,
        this.contactservice.contact
      )
      .then(
        (success: any) => {
          this.contactservice.contact = success;
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.successTrue = true;
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          if (contact.isActive == 'Y') {
            contact.isActive = 'N';
          } else {
            contact.isActive = 'Y';
          }
        }
      );
  }
  logout() {
    this.router.navigateByUrl("/");
  }
}

