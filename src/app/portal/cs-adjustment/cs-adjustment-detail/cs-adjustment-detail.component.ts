import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { CsAdjustmentDetailNewComponent } from "../cs-adjustment-detail-new/cs-adjustment-detail-new.component";
import { CsAdjustmentService } from "../cs-adjustment.service";

@Component({
  selector: "app-cs-adjustment-detail",
  templateUrl: "./cs-adjustment-detail.component.html",
  styleUrls: ["./cs-adjustment-detail.component.scss"],
})
export class CsAdjustmentDetailComponent implements OnInit, OnDestroy {
  fileUploading = "";
  pageId = "CSADT";
  isOpen = false;
  displayedColumns: string[] = [
    "adjDetailId",
    "fnpfId",
    "EmployeeName",
    "oldTotalContri",
    "newTotalContri",
    "detailStatusDescription",
    "action",
  ];
  activeIndex: number;
  btnClicked = false;
  errorTrue = false;
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  id = "";
  newEventSubscribe: any;
  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public service: CsAdjustmentService,
    public fullspinner: FullSpinnerService,
    public route: ActivatedRoute,
    public appSettingService: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params) => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.init();
      this.service.newClicked.next(false);
    });
    this.data.headerName = {
      screenName: "Cs Adjustment Detail",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Cs Adjustment",
          link: "",
        },
        {
          name: "Detail",
          link: "",
        },
      ],
    };
    this.newEventSubscribe = this.service.newClicked.subscribe((res) => {
      console.log(res);
      if (res) {
        this.init();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.newEventSubscribe) {
      this.service.newClicked.next(false);
      console.log("Ng Destroy Called");
      this.newEventSubscribe.unsubscribe();
    }
    // this.service.newClicked.unsubscribe();
    // throw new Error("Method not implemented.");
  }
  ngAfterViewInit(): void {
    // throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    console.log("oko");
    // this.init();
  }
  init() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    if (this.id) {
      this.service.adjustmentHeaderId = 0;
    }
    this.dataSource = new MatTableDataSource();
    if (this.service.adjustmentHeaderId > 0) {
      this.getData(this.service.adjustmentHeaderId);
    } else if (this.service.adjustmentHeaderId === 0) {
      this.createData();
    }
  }
  createData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .getData(AppGlobal.apiPaths.csadjustment.create)
      .then((success: any) => {
        this.service.protoentCSAdjustmentHeader = success;
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
    this.data.postData(AppGlobal.apiPaths.csadjustment.openheader, obj).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.service.protoentCSAdjustmentHeader = success;
        this.dataSource = new MatTableDataSource(
          success.lstprotoentCSAdjustmentDetail
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 400);
        this.data.successMesaage(success);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }

  getCSHeaderbycsheaderid(h) {
    if (h.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.csadjustment.getcsheaderbycsheaderid,
          this.service.protoentCSAdjustmentHeader
        )
        .then(
          (success: any) => {
            this.service.protoentCSAdjustmentHeader = success;
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
    }
  }

  onsubmit(h) {
    if (h.valid) {
      let errorM: any = false;
      let msg = "";
      if (
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments !=
          null &&
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments
          .length > 0
      ) {
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments.forEach(
          (element) => {
            if (element.isMandatory === "Y") {
              if (
                element.pdocumentFile.fileName === "" &&
                element.pdocumentFile.istrFileContent === ""
              ) {
                if (msg === "") {
                  msg = element.docTypeDescription + " is required";
                }
                errorM = true;
              }
            }
          }
        );
        if (errorM === true) {
          this.data.errorMesaageOnly(msg);
          return;
        }
      }
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.csadjustment.submitheader,
          this.service.protoentCSAdjustmentHeader
        )
        .then(
          (success: any) => {
            this.service.protoentCSAdjustmentHeader = success;
            this.dataSource = new MatTableDataSource(
              success.lstprotoentCSAdjustmentDetail
            );
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 400);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;

            if (
              (this.service.protoentCSAdjustmentHeader.headerStatusValue ===
                "VALD" &&
                this.service.protoentCSAdjustmentHeader.actionStatusValue ===
                  "PDAP") ||
              this.service.protoentCSAdjustmentHeader.headerStatusValue ===
                "APPR" ||
              this.service.protoentCSAdjustmentHeader.headerStatusValue ===
                "POST"
            ) {
              this.successalert();
            } else {
              if (
                this.service.protoentCSAdjustmentHeader != null &&
                this.service.protoentCSAdjustmentHeader.funMsg != null &&
                this.service.protoentCSAdjustmentHeader.funMsg.errorMessage !=
                  null &&
                this.service.protoentCSAdjustmentHeader.funMsg.errorMessage
                  .length > 0
              ) {
                this.data.constructErrorMsgArr(
                  this.service.protoentCSAdjustmentHeader.funMsg.errorMessage
                );
              }
            }
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  saveCSAdjHeader(h) {
    if (h.valid) {
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.csadjustment.insertheader,
          this.service.protoentCSAdjustmentHeader
        )
        .then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.service.protoentCSAdjustmentHeader = success;
            if (this.service.protoentCSAdjustmentHeader.adjHeaderId > 0) {
              this.data.successMesaageOnly("Data Saved Successfully");
            }

            if (
              this.service.protoentCSAdjustmentHeader != null &&
              this.service.protoentCSAdjustmentHeader.funMsg != null &&
              this.service.protoentCSAdjustmentHeader.funMsg.errorMessage !=
                null &&
              this.service.protoentCSAdjustmentHeader.funMsg.errorMessage
                .length > 0
            ) {
              this.data.constructErrorMsgArr(
                this.service.protoentCSAdjustmentHeader.funMsg.errorMessage
              );
            }
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  active(row) {
    this.activeIndex = row;
  }

  createNewAdjutmentDetail() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .postData(
        AppGlobal.apiPaths.csadjustment.createnewcsadjustmentdetail,
        this.service.protoentCSAdjustmentHeader
      )
      .then((success: any) => {
        this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail =
          success;
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.newDetail(true);
      });
    (error) => {
      this.fullspinner.empty.next(false);
      this.btnClicked = false;
      this.data.errorMethod(error);
    };
  }

  newDetail(val) {
    const dialogRef = this.dialog.open(CsAdjustmentDetailNewComponent, {
      width: "870px",
      height: "100%",
      data: val,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.dataSource = new MatTableDataSource(
        this.service.protoentCSAdjustmentHeader.lstprotoentCSAdjustmentDetail
      );
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 400);
    });
  }

  openDetail(val) {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val.adjDetailId,
    };
    this.data.postData(AppGlobal.apiPaths.csadjustment.opendetail, obj).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail =
          success;
        this.data.successMesaage(success);
        this.newDetail(true);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }

  // openDetail(val) {
  //   const dialogRef = this.dialog.open(CsAdjustmentDetailNewComponent, {
  //     width: "850px",
  //     height: "90%",
  //     data: val,
  //   });
  // }
  checkdelete(val): void {
    this.service.protoentCSAdjustmentHeader.protoentCSAdjustmentDetail = val;
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this CS Adjustment Detail",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dodelete();
      }
    });
  }
  dodelete() {
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.csadjustment.delete,
        this.service.protoentCSAdjustmentHeader
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.protoentCSAdjustmentHeader = success;
          this.dataSource = new MatTableDataSource(
            this.service.protoentCSAdjustmentHeader.lstprotoentCSAdjustmentDetail
          );
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 400);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  opencancel(): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to Cancel this CS Adjustment ?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cancelCSAdjustment();
      }
    });
  }

  cancelCSAdjustment() {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.csadjustment.cancelheader,
        this.service.protoentCSAdjustmentHeader
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.protoentCSAdjustmentHeader = success;
          if (
            this.service.protoentCSAdjustmentHeader.adjHeaderId > 0 &&
            this.service.protoentCSAdjustmentHeader.headerStatusValue === "CANC"
          ) {
            this.data.successMesaageOnly(
              "CS Adjustment has been cancelled Successfully"
            );
          }
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }

  tabChanged(event) {
    switch (event.index) {
      case 0:
        break;
      case 1:
        break;
    }
  }

  uploadDocument(file, document) {
    this.fileUploading = document.docTypeValue;
    this.fullspinner.empty.next(true);
    document.pdocumentFile.fileType = file.fileType;
    document.pdocumentFile.fileSize = file.fileSize;
    document.pdocumentFile.relativePath = file.relativePath;
    document.pdocumentFile.fileName = file.fileName;
    document.pdocumentFile.istrFileContent = file.istrFileContent;
    const index =
      this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments
        .map((e) => e.docTypeValue)
        .indexOf(document.docTypeValue);
    if (index !== -1) {
      this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
        index
      ] = document;
      this.fileUploading = "";
      this.fullspinner.empty.next(false);
    }
  }

  clearFile(document) {
    const index =
      this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments
        .map((e) => e.docTypeValue)
        .indexOf(document.docTypeValue);
    if (index !== -1) {
      if (
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
          index
        ].pdocumentFile !== null &&
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
          index
        ].pdocumentFile.documentFileId > 0
      ) {
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
          index
        ].pdocumentFile.fileType = "";
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
          index
        ].pdocumentFile.fileSize = 0;
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
          index
        ].pdocumentFile.relativePath = "";
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
          index
        ].pdocumentFile.fileName = "";
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
          index
        ].pdocumentFile.uploadbyFullName = "";
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
          index
        ].pdocumentFile.istrFileContent = "";
      } else {
        const obj = {
          documentFileId: 0,
          fileType: "",
          fileSize: 0,
          relativePath: "",
          fileName: "",
          uploadbyFullName: "",
          istrFileContent: "",
        };
        this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments[
          index
        ].pdocumentFile = obj;
      }
    }
  }

  savedocument() {
    let errorM: any = false;
    let msg = "";
    this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments.forEach(
      (element) => {
        if (element.isMandatory === "Y") {
          if (
            element.pdocumentFile.fileName === "" &&
            element.pdocumentFile.istrFileContent === ""
          ) {
            if (msg === "") {
              msg = element.docTypeDescription + " is required";
            }
            errorM = true;
          }
        }
      }
    );
    if (errorM === true) {
      this.errorTrue = true;
      return;
    }
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.csadjustment.uploadcsadjustmentdocument,
        this.service.protoentCSAdjustmentHeader
      )
      .then(
        (success: any) => {
          this.service.protoentCSAdjustmentHeader.lstprotoadjustmentdocuments =
            success.lstprotoadjustmentdocuments;
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: "Adjustment Submitted Successfully.",
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

  CheckSurpressWarning(value) {
    value === true
      ? (this.service.protoentCSAdjustmentHeader.suppressWaringFlag = "Y")
      : (this.service.protoentCSAdjustmentHeader.suppressWaringFlag = "N");
  }
}
