import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { PhoneControlComponent } from "src/app/common/form-input/phone-control/phone-control.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { HousingAssistanceService } from "../../housing-assitance.service";
import { PostalAddressComponent } from "../postal-address/postal-address.component";
import { ResidentialAddressComponent } from "../residential-address/residential-address.component";
@Component({
  selector: "app-applicant-detail",
  templateUrl: "./applicant-detail.component.html",
  styleUrls: ["./applicant-detail.component.scss"],
})
export class ApplicantDetailComponent implements OnInit {
  fileUploading = "";
  loadingTrue = true;
  errorTrue = false;
  fnpfError = false;
  btnClicked = false;
  activeIndex: number;
  type: any = "";
  @ViewChild("phonecontrol", { static: false })
  phonecontrol: PhoneControlComponent;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: HousingAssistanceService,
    public dialogRef: MatDialogRef<ApplicantDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
    public appSettingService: AppSettingsService
  ) {
    // this.service.ProtoHousingAssitanceApplication.pApplicant = xdata.data;
  }

  ngOnInit(): void {
    this.init();
  }
  init() {
    if (
      this.service.ProtoHousingAssitanceApplication.pApplicant
        .housingAssistanceApplicantId > 0
    ) {
      this.type = "edit";
      this.getData(
        this.service.ProtoHousingAssitanceApplication.pApplicant
          .housingAssistanceApplicantId
      );
    } else if (
      this.service.ProtoHousingAssitanceApplication.pApplicant
        .housingAssistanceApplicantId === 0
    ) {
      this.type = "new";
      this.createData();
    }
  }
  openpostaladdress(): void {
    const dialogRef = this.dialog.open(PostalAddressComponent, {
      width: "600px",
      height: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  openresidentialaddress(): void {
    const dialogRef = this.dialog.open(ResidentialAddressComponent, {
      width: "600px",
      height: "500px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
  active(row) {
    this.activeIndex = row;
  }
  createData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .postData(AppGlobal.apiPaths.housingassitance.applicantcreate, this.service.ProtoHousingAssitanceApplication)
      .then((success: any) => {
        this.service.ProtoHousingAssitanceApplication.pApplicant = success;
        this.service.ProtoHousingAssitanceApplication.pApplicant.requestedAmount =
          "";
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      });
    (error) => {
      this.fullspinner.empty.next(false);
      this.btnClicked = false;
      this.data.errorMethod(error);
    };
  }
  getData(val) {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data
      .postData(AppGlobal.apiPaths.housingassitance.applicantopen, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.ProtoHousingAssitanceApplication.pApplicant = success;
          this.btnClicked = false;
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }

  getApplicantbyFNPF(h) {
    if (
      this.service.ProtoHousingAssitanceApplication.pApplicant.fnpfNo !== ""
    ) {
      this.fnpfError = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.housingassitance.getapplicantbyfnpfno,
          this.service.ProtoHousingAssitanceApplication
        )
        .then(
          (success: any) => {
            this.service.ProtoHousingAssitanceApplication.pApplicant = success;
            this.service.ProtoHousingAssitanceApplication.pApplicant.requestedAmount =
              "";
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            setTimeout(() => {
              this.phonecontrol.checkPattern();
            }, 100);
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.fnpfError = true;
    }
  }

  onsubmit(h) {
    let errorM: any = false;
    let msg = "";
    this.service.ProtoHousingAssitanceApplication.pApplicant.plstDocument.forEach(
      (element) => {
        if (element.isMandatory === "Y") {
          if (
            element.pDocumentFile.fileName === "" &&
            element.pDocumentFile.istrFileContent === ""
          ) {
            if (msg === "") {
              msg = element.documentTypeDescription + " is required";
            }
            errorM = true;
          }
        }
      }
    );
    if (errorM === true) {
      this.errorTrue = true;
      this.fnpfError = true;
      return;
    }

    if (
      this.service.ProtoHousingAssitanceApplication.pApplicant
        .pResidentialAddress.line1 === ""
    ) {
      this.data.errorMesaageOnly("Residential address is mandatory.");
      return;
    }

    if (
      this.service.ProtoHousingAssitanceApplication.pApplicant
        .modeOfCommunicationValue === "POSTL"
    ) {
      if (
        this.service.ProtoHousingAssitanceApplication.pApplicant.pPostalAddress
          .line1 === ""
      ) {
        this.data.errorMesaageOnly("Postal address is mandatory.");
        return;
      }
    }

    if (h.valid) {
      this.fnpfError = false;
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.housingassitance.applicantsave,
          this.service.ProtoHousingAssitanceApplication
        )
        .then(
          (success: any) => {
            this.service.ProtoHousingAssitanceApplication = success;
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.dialogRef.close();
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
      this.fnpfError = true;
    }
  }
  checkdelete(val): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this Applicant",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dodelete(val);
      }
    });
  }
  dodelete(val) {
    const obj = {
      data: val.housingAssistanceApplicantId,
    };
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.housingassitance.applicantdelete, obj)
      .then(
        (success: any) => {
          this.service.ProtoHousingAssitanceApplication = success;
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
  }
  uploadDocument(file, document) {
    this.fileUploading = file.documentTypeValue;
    this.fullspinner.empty.next(true);
    if (
      this.service.ProtoHousingAssitanceApplication.pApplicant.plstDocument
        .length > 0
    ) {
      for (
        let i = 0;
        i <
        this.service.ProtoHousingAssitanceApplication.pApplicant.plstDocument
          .length;
        i++
      ) {
        if (
          this.service.ProtoHousingAssitanceApplication.pApplicant.plstDocument[
            i
          ].documentTypeValue == document.documentTypeValue
        ) {
          this.service.ProtoHousingAssitanceApplication.pApplicant.plstDocument[
            i
          ].pDocumentFile = file;
        }
      }
    }
    this.fullspinner.empty.next(false);
  }
  clearFile(document) {
    const index = this.service.ProtoHousingAssitanceApplication.pApplicant.plstDocument
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      const obj = {
        documentFileId: 0,
        fileType: "",
        fileSize: "",
        relativePath: "",
        fileName: "",
        istrFileContent: "",
      };
      this.service.ProtoHousingAssitanceApplication.pApplicant.plstDocument[
        index
      ].pDocumentFile = obj;
    }
  }

  CheckIsPrimary(value) {
    value === true
      ? (this.service.ProtoHousingAssitanceApplication.pApplicant.isPrimary =
        "Y")
      : (this.service.ProtoHousingAssitanceApplication.pApplicant.isPrimary =
        "N");
  }
}
