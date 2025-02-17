import { Component, OnInit, Inject } from "@angular/core";
import { AddressComponent } from "./address/address.component";
import { MatDialog } from "@angular/material/dialog";
import { CommunicationComponent } from "./communication/communication.component";
import { AppGlobal } from "src/app/constants";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { companyprofileservice } from "./company-profile.service";
import { MatTableDataSource } from "@angular/material/table";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";

@Component({
  selector: "app-company-profile",
  templateUrl: "./company-profile.component.html",
  styleUrls: ["./company-profile.component.scss"],
})
export class CompanyProfileComponent implements OnInit {
  pageId = "COMPR";
  addresssdataSource: any = new MatTableDataSource();
  communicationdataSource: any = new MatTableDataSource();
  addressdisplayedColumns: string[] = ["address", "addresstype", "action"];
  communicationdisplayedColumns: string[] = [
    "communication",
    "details",
    "action",
  ];
  type: any = "new";
  btnClicked = false;
  activeIndex: number;
  selectedAccordion = 1;
  constructor(
    public dialog: MatDialog,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: companyprofileservice
  ) {
    this.data.headerName = {
      screenName: "Company Profile",
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
          name: "Company Profile",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.addressdisplayedColumns = ["address", "addresstype"];
    }
    if (this.data.isMobile) {
      this.communicationdisplayedColumns = ["communication", "details"];
    }
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getInitialData();
    this.getData();
  }

  toggleAccordion(val) {
    this.selectedAccordion = val;
  }

  getInitialData() {
    this.data.getData(AppGlobal.apiPaths.companyprofile.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.service.DDL[element.key] = element.value;
        });
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }

  getData() {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.companyprofile.open).then(
      (success: any) => {
        this.service.detail = success;
        this.addresssdataSource = new MatTableDataSource(success.lstEntAdderss);
        this.communicationdataSource = new MatTableDataSource(
          success.lstEntCommunication
        );
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

  openAddress(val, type?) {
    console.log(val);
    const obj = {
      data: val,
      type: type ? type : "edit",
    };
    const dialogRef = this.dialog.open(AddressComponent, {
      width: "700px",
      height: "500px",
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addresssdataSource = new MatTableDataSource(
          this.service.detail.lstEntAdderss
        );
      }
    });
  }

  newAddress() {
    this.openAddress({}, "new");
  }

  openCommunication(val, type?) {
    const obj = {
      data: val,
      type: type ? type : "edit",
    };
    const dialogRef = this.dialog.open(CommunicationComponent, {
      width: "700px",
      height: "440px",
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.communicationdataSource = new MatTableDataSource(
          this.service.detail.lstEntCommunication
        );
      }
    });
  }

  newCommunication() {
    this.openCommunication({}, "new");
  }

  doDeleteAddress(val): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this Address ",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAddress(val);
      }
    });
  }

  deleteAddress(val) {
    this.fullspinner.empty.next(true);
    this.service.detail.protoentAddress = val;
    this.data
      .postData(
        AppGlobal.apiPaths.companyprofile.deleteaddress,
        this.service.detail
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.detail = success;
          this.addresssdataSource = new MatTableDataSource(
            success.lstEntAdderss
          );
          this.communicationdataSource = new MatTableDataSource(
            success.lstEntCommunication
          );
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  doDeleteCommunication(val): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this Communication ",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCommunication(val);
      }
    });
  }

  deleteCommunication(val) {
    this.service.detail.protoentOrgCommunication = val;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.companyprofile.deletecommunication,
        this.service.detail
      )
      .then(
        (success: any) => {
          if (success.msg) {
            if (Array.isArray(success.msg.errorMessage.msgDescription)) {
              if (success.msg.errorMessage.msgDescription.length !== 0) {
                this.data.errorResponse(success);
                this.fullspinner.empty.next(false);
                return;
              }
            }
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
          }
          this.getData();
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }
  active(row) {
    this.activeIndex = row;
  }
}
