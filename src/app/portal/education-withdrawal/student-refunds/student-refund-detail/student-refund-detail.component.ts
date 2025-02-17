import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { RefundService } from "src/app/portal/refund-search/refund.service";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { StudentRefundsService } from "../student-refunds.service";

@Component({
  selector: "app-student-refund-detail",
  templateUrl: "./student-refund-detail.component.html",
  styleUrls: ["./student-refund-detail.component.scss"],
})
export class StudentRefundDetailComponent implements OnInit {
  pageId = "STRDT";
  id: any = 0;
  showEmpty = false;
  fileUploading = "";
  refNoRequired = false;
  refNoError = false;
  searchParams = {
    unclaimedWithdrawalRefundDetailId: 0,
    unclaimedWithdrawalRefundId: 0,
    withdrawalAppplicationId: 0,
    invoiceNo: "",
    studentFirstName: "",
    postingStatusValue: "",
    isortcolumn: "",
    isortorder: true,
    totalCount: 0,
    pageSize: 0,
    pageNumber: 0,
  };
  totalCount = 0;
  isOpen = false;
  btnClicked = false;
  errorTrue = false;
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
    "withdrawalAppplicationId",
    "studentId",
    "studentName",
    "fnpfId",
    "batchNo",
    "invoiceId",
    "totalInvoiceAmount",
    "totalReceivedAmount",
    "refundAmount",
    "withdrawalStatusDescription",
    "postingStatusDescription",
    "action",
  ];
  istrid = "";
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: StudentRefundsService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public appSettingService: AppSettingsService
  ) {
    this.data.headerName = {
      screenName: "Refund Details",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Refund Details",
          link: "",
        },
      ],
    };
    this.route.paramMap.subscribe((params) => {});
  }

  ngOnInit(): void {
    this.init();
  }
  init() {
    if (this.service.unClaimedWithdrawal.unclaimedWithdrawalRefundId > 0) {
      this.getData(
        this.service.unClaimedWithdrawal.unclaimedWithdrawalRefundId
      );
    } else if (
      this.service.unClaimedWithdrawal.unclaimedWithdrawalRefundId === 0
    ) {
      this.createData();
    }
  }
  createData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .getData(AppGlobal.apiPaths.unclaimedWithdrawalReturns.create)
      .then((success: any) => {
        this.service.unClaimedWithdrawal = success;
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
      .postData(AppGlobal.apiPaths.unclaimedWithdrawalReturns.open, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.unClaimedWithdrawal = success;
          this.data.successMesaage(success);
          this.getSearchParams();
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }
  saveRefund() {
    // if (l.valid) {
    if (this.service.unClaimedWithdrawal.referenceNo === "") {
      this.refNoError = true;
      return;
    }
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.unclaimedWithdrawalReturns.save,
        this.service.unClaimedWithdrawal
      )
      .then(
        (success: any) => {
          this.service.unClaimedWithdrawal = success;
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
        }
      );
    // } else {
    //   this.errorTrue = true;
    // }
  }
  onSubmit() {
    if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument
        .pDocumentFile.fileName === "" &&
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument
        .pDocumentFile.istrFileContent === ""
    ) {
      this.data.errorMesaageOnly(
        "Please upload the Remittance Advice Document."
      );
      return;
    }

    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.unclaimedWithdrawalReturns.submit,
        this.service.unClaimedWithdrawal
      )
      .then(
        (success: any) => {
          this.service.unClaimedWithdrawal = success;
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
          this.data.successMesaage(success);
          this.doSearch();
        },
        (error) => {
          this.data.errorMethod(error);
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
        }
      );
  }
  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data
      .getData(AppGlobal.apiPaths.unclaimedWithdrawalReturns.getSearchRefund)
      .then(
        (success: any) => {
          this.searchParams = success;
          this.searchParams.pageNumber = 1;
          this.searchParams.pageSize = 10;
          this.fullspinner.empty.next(false);
          this.search();
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  search(val = false) {
    this.data.clearErrorMsg();
    this.showEmpty = false;
    if (this.service.unClaimedWithdrawal.unclaimedWithdrawalRefundId > 0) {
      this.searchParams.unclaimedWithdrawalRefundId =
        this.service.unClaimedWithdrawal.unclaimedWithdrawalRefundId;
      if (this.searchParams.withdrawalAppplicationId! <= 0) {
        this.searchParams.withdrawalAppplicationId = 0;
      }
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.unclaimedWithdrawalReturns.searchRefund,
          this.searchParams
        )
        .then(
          (success: any) => {
            this.searchParams.totalCount = success.totalCount;

            this.loadingTrue = false;
            this.fullspinner.empty.next(false);
            this.service.unClaimedWithdrawal.ilstProtoUnclaimedWithdrawalRefundDetail =
              success.result;
            this.dataSource = new MatTableDataSource(
              this.service.unClaimedWithdrawal.ilstProtoUnclaimedWithdrawalRefundDetail
            );
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 400);

            if (this.searchclearflag === true) {
              const xdata = {
                msg: {
                  infoMessage: {
                    msgDescription: "Data cleared successfully.",
                  },
                },
              };
              this.data.successMesaage(xdata);
              this.searchclearflag = false;
            } else if (success.result.length != 0 && val) {
              const xdata = {
                msg: {
                  infoMessage: {
                    msgDescription: "Search executed successfully.",
                  },
                },
              };
              this.data.successMesaage(xdata);
            } else {
              this.showEmpty = true;
            }
          },
          (error: any) => {
            this.data.errorMethod(error);
            this.loadingTrue = false;
            this.fullspinner.empty.next(false);
          }
        );
    }
  }

  pageChanged(event) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize;
    this.fullspinner.empty.next(true);
    this.search();
  }

  sortData(event) {
    this.searchParams.isortcolumn = event.active;
    this.searchParams.isortorder = event.direction === "asc" ? true : false;
    this.fullspinner.empty.next(true);
    this.search();
  }

  doSearch(val = false) {
    this.searchParams.pageNumber = 1;
    this.isOpen = false;
    this.search(val);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.withdrawalAppplicationId = 0;
    this.searchParams.studentFirstName = "";
    this.searchParams.invoiceNo = "";
    this.searchParams.postingStatusValue = "";
    this.doSearch(true);
  }
  addRefund() {
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.unclaimedWithdrawalRefundDetailId = 0;
    this.router.navigateByUrl("/app/add-refund");
  }
  openDetail(val) {
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.unclaimedWithdrawalRefundDetailId =
      val.unclaimedWithdrawalRefundDetailId;
    this.router.navigateByUrl("/app/add-refund");
  }
  openDelete(val): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this refund detail ?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(val);
      }
    });
  }

  delete(val) {
    this.service.setAll(true);
    this.fullspinner.empty.next(true);
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail =
      val;
    this.data
      .postData(
        AppGlobal.apiPaths.unclaimedWithdrawalReturns.delete,
        this.service.unClaimedWithdrawal
      )
      .then(
        (success: any) => {
          this.service.unClaimedWithdrawal = success;
          this.disableLoader();
          this.search();
        },
        (error) => {
          this.data.errorMethod(error);
          this.disableLoader();
        }
      );
  }
  private disableLoader() {
    this.service.setAll(false);
    this.fullspinner.empty.next(false);
  }

  active(row) {
    this.activeIndex = row;
  }
  uploadDocument(file) {
    this.fileUploading =
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.documentTypeValue;
    this.fullspinner.empty.next(true);
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.fileType =
      file.fileType;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.fileSize =
      file.fileSize;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.relativePath =
      file.relativePath;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.fileName =
      file.fileName;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.istrFileContent =
      file.istrFileContent;
    this.fileUploading = "";
    this.fullspinner.empty.next(false);
  }

  clearFile() {
    if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument
        .pDocumentFile !== null &&
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument
        .pDocumentFile.documentFileId > 0
    ) {
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.fileType =
        "";
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.fileSize = 0;
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.relativePath =
        "";
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.fileName =
        "";
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.uploadbyFullName =
        "";
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile.istrFileContent =
        "";
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
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDocument.pDocumentFile =
        obj;
    }
  }
  viewReceipt(val) {
    this.fullspinner.empty.next(true);
    this.data.pdf("withdrawal/viewreceipt", val).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.openPDFViewer(success);
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }
  openPDFViewer(xurl) {
    const dialogRef = this.dialog.open(ViewPdfComponent, {
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  generateRefundStatement(val) {
    this.fullspinner.empty.next(true);
    this.data.pdf("withdrawal/generaterefundstatement", val).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.openPDFViewer(success);
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }
}
