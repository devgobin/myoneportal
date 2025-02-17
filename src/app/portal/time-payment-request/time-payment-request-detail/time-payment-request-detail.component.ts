import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { TimePaymentRequestService } from "../time-payment-request.service";

@Component({
  selector: "app-time-payment-request-detail",
  templateUrl: "./time-payment-request-detail.component.html",
  styleUrls: ["./time-payment-request-detail.component.scss"],
})
export class TimePaymentRequestDetailComponent implements OnInit {
  dataSource: any = new MatTableDataSource();
  pageId = "TIRDT";
  isOpen = false;
  errorTrue = false;
  id = "";
  displayedColumns: string[] = [
    "check",
    "invoiceTypeDescription",
    "invoiceAmount",
    "invoicePaidAmount",
    "invoiceBalanceAmount",
  ];
  activeIndex: number;
  @ViewChild("termcondition", { static: false })
  termcondition: TemplateRef<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public TimePaymentRequestService: TimePaymentRequestService,
    public fullspinner: FullSpinnerService,
    public route: ActivatedRoute,
    public appSettingService: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params) => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.init();
    });
    this.data.headerName = {
      screenName: "Time Payment Request Detail",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Time Payment Request",
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
    //this.init();
  }

  init() {
    this.id = this.route.snapshot.paramMap.get("id");
    // console.log(this.id);
    if (this.id) {
      this.TimePaymentRequestService.TimePaymentPlan.timePaymentPlanRequestId = 0;
    }
    this.dataSource = new MatTableDataSource();
    if (
      this.TimePaymentRequestService.TimePaymentPlan.timePaymentPlanRequestId >
      0
    ) {
      this.getData(
        this.TimePaymentRequestService.TimePaymentPlan.timePaymentPlanRequestId
      );
    } else if (
      this.TimePaymentRequestService.TimePaymentPlan
        .timePaymentPlanRequestId === 0
    ) {
      this.createData();
    }
  }

  createData() {
    this.fullspinner.empty.next(true);
    this.data
      .getData(
        AppGlobal.apiPaths.timepaymentrequest.createnewtimepaymentrequest
      )
      .then(
        (success: any) => {
          this.TimePaymentRequestService.TimePaymentPlan = success;
          this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes =
            success.plstTimPaymentDocumentTypes;
          this.dataSource = new MatTableDataSource(
            this.TimePaymentRequestService.TimePaymentPlan.plsProtoTimePaymentPlanRequestInvoice
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

  getData(val) {
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data
      .postData(
        AppGlobal.apiPaths.timepaymentrequest.opentimepaymentplanrequest,
        obj
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.TimePaymentRequestService.TimePaymentPlan = success;
          this.dataSource = new MatTableDataSource(
            this.TimePaymentRequestService.TimePaymentPlan.plsProtoTimePaymentPlanRequestInvoice
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
        }
      );
  }

  generatetimepaymentrequestform() {
    let IsInvalid = false;
    if (
      this.TimePaymentRequestService.TimePaymentPlan
        .plsProtoTimePaymentPlanRequestInvoice.length > 0
    ) {
      var validinvoices =
        this.TimePaymentRequestService.TimePaymentPlan.plsProtoTimePaymentPlanRequestInvoice.filter(
          function (obj) {
            return obj.invoiceStatusValue === "OPEN";
          }
        );
      if (validinvoices != null && validinvoices.length === 0) {
        IsInvalid = true;
      }
      if (IsInvalid) {
        this.data.errorMesaageOnly("There are no pending open invoice.");
        return;
      }
    } else {
      this.data.errorMesaageOnly("There are no pending open invoice.");
      return;
    }

    let IsSelected = false;
    this.TimePaymentRequestService.TimePaymentPlan.plsProtoTimePaymentPlanRequestInvoice.forEach(
      (element) => {
        if (element.includedInRequest === "Y") {
          IsSelected = true;
          return;
        }
      }
    );

    if (!IsSelected) {
      this.data.errorMesaageOnly(
        "Please select atleast one invoice detail to proceed further."
      );
      return;
    }
    this.fullspinner.empty.next(true);
    this.data
      .pdf(
        AppGlobal.apiPaths.timepaymentrequest.generatetimepaymentrequestform,
        this.TimePaymentRequestService.TimePaymentPlan
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

  active(row) {
    this.activeIndex = row;
  }

  OpenTermsandCondition() {
    //this.data.errorMesaageOnly("");
    const dialogRef = this.dialog.open(this.termcondition, {
      width: "550px",
      height: "400px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  checkTermsandCondition() {
    let errorM: any = false;
    this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes.forEach(
      (element) => {
        if (element.isMandatory === "Y") {
          if (element.pDocumentFile.fileName !== "") {
            if (
              element.pDocumentFile.fileType == "pdf" ||
              element.pDocumentFile.fileType == "PDF" ||
              element.pDocumentFile.fileType == "jpeg" ||
              element.pDocumentFile.fileType == "JPEG" ||
              element.pDocumentFile.fileType == "jpg" ||
              element.pDocumentFile.fileType == "JPG" ||
              element.pDocumentFile.fileType == "png" ||
              element.pDocumentFile.fileType == "PNG" 
            ) {
              this.OpenTermsandCondition();
            } else {
              this.data.errorMesaageOnly(
                "For enhanced security, we request that you convert the file into PDF or image format."
              );
              return;
            }
          }        
          errorM = true;
          return;
        }
      }
    );

    if (errorM === true) {
      this.errorTrue = true;
      return;
    }
  }

  onsubmit() {
    if (
      this.TimePaymentRequestService.TimePaymentPlan.tAndCFlag === "" ||
      this.TimePaymentRequestService.TimePaymentPlan.tAndCFlag === "N"
    ) {
      this.data.errorMesaageOnly(
        "You have to agree to our terms and conditions in order to proceed."
      );
      return;
    }
    this.errorTrue = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.timepaymentrequest.submittimepaymentrequest,
        this.TimePaymentRequestService.TimePaymentPlan
      )
      .then(
        (success: any) => {
          this.TimePaymentRequestService.TimePaymentPlan = success;
          this.dialog.closeAll();
          this.fullspinner.empty.next(false);
          this.successalert();
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "550px",
      disableClose: true,
      data: {
        msg: "Application submitted successfully.",
        Showbtn1: true,
        button1: "Ok",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.dialog.closeAll();
    });
  }

  // clearFile() {
  //   const obj = {
  //     documentFileId: 0,
  //     fileType: "",
  //     fileSize: 0,
  //     relativePath: "",
  //     fileName: "",
  //     istrFileContent: "",
  //     idoObjState: "",
  //     updateSeq: 0,
  //   };
  //   this.TimePaymentRequestService.TimePaymentPlan.protoTimePaymentPlanRequestDocument.pDocumentFile =
  //     obj;
  // }

  clearFile(document) {
    const index =
      this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
    if (index !== -1) {
      if (
        this.TimePaymentRequestService.TimePaymentPlan
          .plstTimPaymentDocumentTypes[index].pDocumentFile !== null &&
        this.TimePaymentRequestService.TimePaymentPlan
          .plstTimPaymentDocumentTypes[index].pDocumentFile.documentFileId > 0
      ) {
        this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes[
          index
        ].pDocumentFile.fileType = "";
        this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes[
          index
        ].pDocumentFile.fileSize = 0;
        this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes[
          index
        ].pDocumentFile.relativePath = "";
        this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes[
          index
        ].pDocumentFile.fileName = "";
        this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes[
          index
        ].pDocumentFile.istrFileContent = "";
      } else {
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
        this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes[
          index
        ].pDocumentFile = obj;
      }
    }
  }

  uploadDocument(file, document) {
    this.fullspinner.empty.next(true);
    document.pDocumentFile.fileType = file.fileType;
    document.pDocumentFile.fileSize = file.fileSize;
    document.pDocumentFile.relativePath = file.relativePath;
    document.pDocumentFile.fileName = file.fileName;
    document.pDocumentFile.istrFileContent = file.istrFileContent;
    const index =
      this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
    if (index !== -1) {
      this.TimePaymentRequestService.TimePaymentPlan.plstTimPaymentDocumentTypes[
        index
      ] = document;
      this.fullspinner.empty.next(false);
    }
  }

  // uploadDocument(file) {
  //   this.fullspinner.empty.next(true);
  //   this.TimePaymentRequestService.TimePaymentPlan.protoTimePaymentPlanRequestDocument.pDocumentFile =
  //     file;
  //   this.fullspinner.empty.next(false);
  // }

  checkDeclartion(value) {
    value === true
      ? (this.TimePaymentRequestService.TimePaymentPlan.tAndCFlag = "Y")
      : (this.TimePaymentRequestService.TimePaymentPlan.tAndCFlag = "N");
  }

  SelectInvoice(check, val) {
    const index =
      this.TimePaymentRequestService.TimePaymentPlan.plsProtoTimePaymentPlanRequestInvoice
        .map((e) => e.invoiceTypeValue)
        .indexOf(val.invoiceTypeValue);
    check === true
      ? (this.TimePaymentRequestService.TimePaymentPlan.plsProtoTimePaymentPlanRequestInvoice[
          index
        ].includedInRequest = "Y")
      : (this.TimePaymentRequestService.TimePaymentPlan.plsProtoTimePaymentPlanRequestInvoice[
          index
        ].includedInRequest = "N");
    // this.dataSource = new MatTableDataSource(
    //   this.TimePaymentRequestService.TimePaymentPlan.plsProtoTimePaymentPlanRequestInvoice
    // );
    // setTimeout(() => {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // }, 400);
  }
}
