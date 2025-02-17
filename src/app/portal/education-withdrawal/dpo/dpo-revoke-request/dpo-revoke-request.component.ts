import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { DpoService } from "../dpo.service";

@Component({
  selector: "app-dpo-revoke-request",
  templateUrl: "./dpo-revoke-request.component.html",
  styleUrls: ["./dpo-revoke-request.component.scss"],
})
export class DpoRevokeRequestComponent implements OnInit {
  pageId = "DPORR";
  showEmpty = false;
  errorTrue = false;
  btnClicked = false;
  id = "";
  totalCount = 0;
  isOpen = false;
  selectedIndex: number;
  activeIndex: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "appointmentRefNo",
    "organizationName",
    "action",
  ];
  istrid = "";
  fileUploading = "";
  @ViewChild("documentDialog", { static: false })
  documentDialog: TemplateRef<any>;
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: DpoService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public appSettingService: AppSettingsService
  ) {
    this.data.headerName = {
      screenName: "DPO Revoke Request",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "DPO Revoke Request",
          link: "",
        },
      ],
    };
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }

  ngOnInit(): void { }
  init() {
    // this.id = this.route.snapshot.paramMap.get("id");
    //this.service.dpoId = this.service.dpoHeaderId;
    if (this.service.dpoRequestId > 0) {
      this.openData(this.service.dpoRequestId);
    } else {
      this.createData(this.service.dpoId);
    }
  }
  openData(val) {
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data.postData(AppGlobal.apiPaths.dpo.openRequest, obj).then(
      (success: any) => {
        this.service.dpoRevokeRequest = success;
        this.dataSource = new MatTableDataSource(
          this.service.dpoRevokeRequest.plstDpoRequestDocument
        );
        this.data.successMesaage(success);
        this.fullspinner.empty.next(false);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }
  createData(val) {
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data.postData(AppGlobal.apiPaths.dpo.newRequest, obj).then(
      (success: any) => {
        this.service.dpoRevokeRequest = success;
        this.service.dpoRevokeRequest.plstDpoRequestDocument =
          success.plstDpoRequestDocument;
        this.dataSource = new MatTableDataSource(
          this.service.dpoRevokeRequest.plstDpoRequestDocument
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 400);
        this.fullspinner.empty.next(false);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  uploadRevokeRequestDocument(file) {
    this.fileUploading =
      this.service.dpoRevokeRequestDocument.documentTypeValue;
    this.fullspinner.empty.next(true);
    this.service.dpoRevokeRequestDocument.pdocumentFile.fileType =
      file.fileType;
    this.service.dpoRevokeRequestDocument.pdocumentFile.fileSize =
      file.fileSize;
    this.service.dpoRevokeRequestDocument.pdocumentFile.relativePath =
      file.relativePath;
    this.service.dpoRevokeRequestDocument.pdocumentFile.fileName =
      file.fileName;
    this.service.dpoRevokeRequestDocument.pdocumentFile.istrFileContent =
      file.istrFileContent;
    this.fileUploading = "";
    this.fullspinner.empty.next(false);
  }

  clearFile() {
    if (
      this.service.dpoRevokeRequestDocument.pdocumentFile !== null &&
      this.service.dpoRevokeRequestDocument.pdocumentFile.documentFileId > 0
    ) {
      this.service.dpoRevokeRequestDocument.pdocumentFile.fileType = "";
      this.service.dpoRevokeRequestDocument.pdocumentFile.fileSize = 0;
      this.service.dpoRevokeRequestDocument.pdocumentFile.relativePath = "";
      this.service.dpoRevokeRequestDocument.pdocumentFile.fileName = "";
      this.service.dpoRevokeRequestDocument.pdocumentFile.uploadbyFullName = "";
      this.service.dpoRevokeRequestDocument.pdocumentFile.istrFileContent = "";
    } else {
      const obj = {
        documentFileId: 0,
        fileType: "",
        fileSize: 0,
        relativePath: "",
        fileName: "",
        uploadbyFullName: "",
        istrFileContent: "",
        idoObjState: "",
        updateSeq: 0,
      };
      this.service.dpoRevokeRequestDocument.pdocumentFile = obj;
    }
  }
  viewDocument(val) {
    if (val.pdocumentFile.fileName !== "") {
      if (val && val.pdocumentFile && val.pdocumentFile.documentFileId > 0) {
        const obj = {
          data: val.pdocumentFile.documentFileId,
        };
        this.fullspinner.empty.next(true);
        this.data.postData(AppGlobal.apiPaths.dpo.openImage, obj).then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.openFileViewer(success);
          },
          (error: any) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
          }
        );
      } else if (
        val &&
        val.pdocumentFile &&
        val.pdocumentFile.istrFileContent
      ) {
        this.openFileViewer(val.pdocumentFile);
      }
    }
  }

  openFileViewer(xurl) {
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
          url: xurl.istrFileContent,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
        }
      });
    }
  }
  onSubmit(l: any) {
    if (l.valid) {
      let errorM: any = false;
      this.service.dpoRevokeRequest.plstDpoRequestDocument.forEach(
        (element) => {
          if (element.isMandatory === "Y") {
            if (element.pdocumentFile.fileName === "") {
              errorM = true;
              return;
            }
          }
        }
      );
      if (errorM === true) {
        this.errorTrue = true;
        return;
      }
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.dpo.submitRequest,
          this.service.dpoRevokeRequest
        )
        .then(
          (success: any) => {
            this.service.dpoRevokeRequest = success;
            this.btnClicked = false;
            this.dialog.closeAll();
            this.fullspinner.empty.next(false);
            this.data.successMesaage(success);
          },
          (error) => {
            this.data.errorMethod(error);
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
          }
        );
    } else {
      this.errorTrue = true;
    }
  }
  successAlert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "550px",
      disableClose: true,
      data: {
        msg: this.service.dpoRevokeRequest.msg.infoMessage,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }
  addNew() {
    this.service.errorTrue = false;
    this.createNewReceiptForDpoRevokeRequest();
    this.dialog.open(this.documentDialog, {
      width: this.data.isMobile ? "320px" : "550px",
      height: "320px",
    });
  }

  addToList(val: any) {
    if (val.pdocumentFile.fileName === "") {
      this.service.errorTrue = true;
      return;
    }
    this.service.dpoRevokeRequest.plstDpoRequestDocument.push(val);
    this.dataSource = new MatTableDataSource(
      this.service.dpoRevokeRequest.plstDpoRequestDocument
    );
    this.onNoClick();
  }
  createNewReceiptForDpoRevokeRequest() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.dpo.newReceipt).then(
      (success: any) => {
        this.service.dpoRevokeRequestDocument = success;
        this.fullspinner.empty.next(false);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }
  onNoClick() {
    this.dialog.closeAll();
  }

  active(row) {
    this.activeIndex = row;
  }

  openDelete(val, index): void {
    this.service.dpoRevokeRequest.ientDpoRequestDocument = val;
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this receipt ?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteNominee(index, val.appDpoRequestDocumentId);
      }
    });
  }

  deleteNominee(index: any, appDpoRequestDocumentId: any) {
    if (appDpoRequestDocumentId > 0) {
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.dpo.deleteRequest,
          this.service.dpoRevokeRequest
        )
        .then(
          (success: any) => {
            this.service.dpoRevokeRequest = success;
            this.dataSource = new MatTableDataSource(
              this.service.dpoRevokeRequest.plstDpoRequestDocument
            );
            this.fullspinner.empty.next(false);
            this.data.successMesaage(success);
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
          }
        );
    } else {
      if (this.service.dpoRevokeRequest.plstDpoRequestDocument.length > 0) {
        this.service.dpoRevokeRequest.plstDpoRequestDocument.splice(index, 1);
        this.dataSource = new MatTableDataSource(
          this.service.dpoRevokeRequest.plstDpoRequestDocument
        );
      }
    }
  }
}
