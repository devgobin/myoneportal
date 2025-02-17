import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { SuspenseService } from "../suspense.service";

@Component({
  selector: "app-suspense-detail",
  templateUrl: "./suspense-detail.component.html",
  styleUrls: ["./suspense-detail.component.scss"],
})
export class SuspenseDetailComponent implements OnInit {
  pageId = "SUSDT";
  loadingTrue = false;
  errorTrue = false;
  photoidentityerror = false;
  constructor(
    public data: DataService,
    public service: SuspenseService,
    public fullspinner: FullSpinnerService,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "Suspense Detail",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Suspense",
          link: "",
        },
        {
          name: "Detail",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    if (this.service.suspense.suspenseAccountId > 0) {
      this.openData(this.service.suspense.suspenseAccountId);
    }
  }

  openData(suspenseId) {
    this.data.clearErrorMsg();
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.suspense.open, this.service.suspense)
      .then(
        (success: any) => {
          this.service.suspense = success;
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  uploadsuspenserefundform() {
    if (
      this.service.suspense.protoSuspenseRefundForm.pdocumentFile.fileName ===
        "" &&
      this.service.suspense.protoSuspenseRefundForm.pdocumentFile
        .istrFileContent === ""
    ) {
      this.errorTrue = true;
      return;
    }
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.suspense.uploadsuspenserefundform,
        this.service.suspense
      )
      .then(
        (success: any) => {
          this.service.suspense = success;
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          if (
            this.service.suspense.protoSuspenseRefundForm != null &&
            this.service.suspense.protoSuspenseRefundForm.pdocumentFile !=
              null &&
            this.service.suspense.protoSuspenseRefundForm.pdocumentFile
              .fileName != null
          ) {
            this.data.successMesaageOnly("File Uploaded Successfully");
          }
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  uploadsuspenseresolutionform() {
    if (
      this.service.suspense.protoSuspenseRefundForm.pdocumentFile.fileName ===
        "" &&
      this.service.suspense.protoSuspenseRefundForm.pdocumentFile
        .istrFileContent === ""
    ) {
      this.errorTrue = true;
      return;
    }
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.suspense.uploadsuspenseresolutionform,
        this.service.suspense
      )
      .then(
        (success: any) => {
          this.service.suspense = success;
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          if (
            this.service.suspense.protoSuspenseRefundForm != null &&
            this.service.suspense.protoSuspenseRefundForm.pdocumentFile !=
              null &&
            this.service.suspense.protoSuspenseRefundForm.pdocumentFile
              .fileName != null
          ) {
            this.data.successMesaageOnly("File Uploaded Successfully");
          }
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  resolvesuspense() {
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.suspense.resolvesuspense,
        this.service.suspense
      )
      .then(
        (success: any) => {
          this.service.suspense = success;
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          if (this.service.suspense.suspenseStatusValue === "RSLD") {
            this.Resolvesuccessalert();
          }
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  Resolvesuccessalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Suspense has been resolved successfully",
        Showbtn1: true,
        button1: "Ok",
        Showbtn2: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }

  generatesuspesnserefundform() {
    this.fullspinner.empty.next(true);
    this.data
      .pdf(
        AppGlobal.apiPaths.suspense.generatesuspesnserefundform,
        this.service.suspense
      )
      .then(
        (success: any) => {
          this.openPDFViewer(success);
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  generatesuspesnseresolutionform() {
    this.fullspinner.empty.next(true);
    this.data
      .pdf(
        AppGlobal.apiPaths.suspense.generatesuspesnseresolutionform,
        this.service.suspense
      )
      .then(
        (success: any) => {
          this.openPDFViewer(success);
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  openPDFViewer(xurl) {
    if (this.data.isMobile) {
      let link = document.createElement("a");
      link.href = xurl;
      link.target = "_blank";
      link.download = "";
      // link.download = this.response.data + '_file.pdf';
      link.dispatchEvent(new MouseEvent("click"));
    } else {
      const dialogRef = this.dialog.open(ViewPdfComponent, {
        width: "100%",
        height: "85%",
        data: {
          url: xurl,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // this.logout();
        }
      });
    }
  }

  getFNPFNo() {
    this.data.clearErrorMsg();
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.suspense.getFNPF, this.service.suspense)
      .then(
        (success: any) => {
          this.service.suspense = success;
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  clearFile() {
    const obj = {
      documentFileId: 0,
      fileType: "",
      fileSize: 0,
      relativePath: "",
      fileName: "",
      istrFileContent: "",
      idoObjState: "",
      updateSeq: 0,
    };
    this.service.suspense.protoSuspenseRefundForm.pdocumentFile = obj;
  }

  uploadDocument(file) {
    this.fullspinner.empty.next(true);
    this.service.suspense.protoSuspenseRefundForm.pdocumentFile = file;
    this.fullspinner.empty.next(false);
  }

  uploadPhotoIdentityDocument(file) {
    this.fullspinner.empty.next(true);
    this.service.suspense.protoPhotoIdentity.pdocumentFile = file;
    this.fullspinner.empty.next(false);
  }

  clearPhotoFile() {
    const obj = {
      documentFileId: 0,
      fileType: "",
      fileSize: 0,
      relativePath: "",
      fileName: "",
      istrFileContent: "",
      idoObjState: "",
      updateSeq: 0,
    };
    this.service.suspense.protoPhotoIdentity.pdocumentFile = obj;
  }

  uploadsuspensephotoidentityform() {
    this.photoidentityerror = true;
    if (
      this.service.suspense.protoPhotoIdentity.pdocumentFile.fileName === "" &&
      this.service.suspense.protoPhotoIdentity.pdocumentFile.istrFileContent ===
        ""
    ) {
      this.photoidentityerror = true;
      return;
    }
    this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.suspense.uploadsuspensephotoidentityform,
        this.service.suspense
      )
      .then(
        (success: any) => {
          this.service.suspense = success;
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          if (
            this.service.suspense.protoPhotoIdentity != null &&
            this.service.suspense.protoPhotoIdentity.pdocumentFile != null &&
            this.service.suspense.protoPhotoIdentity.pdocumentFile.fileName !=
              null
          ) {
            this.data.successMesaageOnly("File Uploaded Successfully");
          }
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "550px",
      disableClose: true,
      data: {
        msg: "Refund for submitted successfully.",
        Showbtn1: true,
        button1: "Okay",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.dialog.closeAll();
    });
  }
}
