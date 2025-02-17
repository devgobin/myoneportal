import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { MainPipeModule } from "src/app/pipe/main-pipe.module";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { DpoService } from "../../dpo/dpo.service";
import { BulkInvoiceService } from "../bulk-invoice.service";

@Component({
  selector: "app-bulk-invoice-upload",
  templateUrl: "./bulk-invoice-upload.component.html",
  styleUrls: ["./bulk-invoice-upload.component.scss"],
})
export class BulkInvoiceUploadComponent implements OnInit {
  pageId = "UPDBI";
  showEmpty = false;
  errorTrue = false;
  btnClicked = false;
  showDpoRevokeReq = false;
  showDpoConditionalTravelReq = false;
  hideDpoRevokeReqButton = false;
  hideDpoConditionalTravelButton = false;
  showUploadBtn = false;
  @ViewChild("trigger", { static: false }) trigger: CdkOverlayOrigin;
  searchParams = {
    bulkInvoiceUploadDetailId: 0,
    studentId: "",
    studentName: "",
    brn: "",
    termValue: "",
    year: "",
    invoiceNumber: "",
    invoiceDateFrom: "",
    invoiceDateTo: "",
    program: "",
    isortcolumn: "",
    isortorder: true,
    totalCount: 0,
    pageSize: 0,
    pageNumber: 0,
    orderByColumnName: "",
    ascending: true,
    appBulkInvoiceUploadId: 0,
  };
  totalCount = 0;
  isOpen = false;
  activeIndex: number;
  @ViewChild("nativeFileUpload", { static: false })
  navtiveFileUpload: ElementRef;
  @ViewChild("documentDialog", { static: false })
  documentDialog: TemplateRef<any>;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  successTrue = false;
  loadingTrue = false;
  submitStatus = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "studentId",
    "studentName",
    "brn",
    "termValue",
    "year",
    "invoiceNumber",
    "invoiceDate",
    "program",
    "totalInvoiceAmount",
    "statusValue",
  ];
  istrid = "";
  id = "";
  fileUploading = "";
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: BulkInvoiceService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public appSettingService: AppSettingsService,
    public fullSpinner: FullSpinnerService,
    public pipe: MainPipeModule
  ) {
    this.data.headerName = {
      screenName: "Upload Bulk Invoice",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Upload Bulk Invoice",
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
    if (this.service.bulkInvoiceUploadId > 0) {
      this.getinitialDPOdata();
    } else if (this.service.bulkInvoiceUploadId === 0) {
      this.createData();
    }
  }
  getinitialDPOdata() {
    this.fullspinner.empty.next(true);
    this.data
      .getData(AppGlobal.apiPaths.bulkInvoice.getinitialData)
      .then((success: any) => {
        success.data.forEach((element) => {
          this.service.initialData[element.key] = element.value;
        });
        this.fullspinner.empty.next(false);
        this.getSearchParams();
      });
    (error) => {
      this.data.errorMethod(error);
      this.fullspinner.empty.next(false);
    };
  }
  createData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .getData(AppGlobal.apiPaths.bulkInvoice.create)
      .then((success: any) => {
        this.service.bulkInvoiceUpload = success;
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      });
    (error) => {
      this.fullspinner.empty.next(false);
      this.btnClicked = false;
      this.data.errorMethod(error);
    };
  }
  openData(val) {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data.postData(AppGlobal.apiPaths.bulkInvoice.open, obj).then(
      (success: any) => {
        this.service.bulkInvoiceUpload = success;
        this.dataSource = new MatTableDataSource(
          this.service.bulkInvoiceUpload.ilstentBulkInvoiceUploadDetail
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 400);
        this.getinitialDPOdata();
        this.data.successMesaage(success);
        this.fullspinner.empty.next(false);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }
  saveData(l: any) {
    if (this.service.bulkInvoiceUpload.pdocumentFile.fileName === "") {
      this.errorTrue = true;
      return;
    }
    if (l.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.bulkInvoice.submit,
          this.service.bulkInvoiceUpload
        )
        .then(
          (success: any) => {
            this.service.bulkInvoiceUpload = success;
            this.service.bulkInvoiceUploadId =
              this.service.bulkInvoiceUpload.appBulkInvoiceUploadId;
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.data.successMesaage(success);
            this.getinitialDPOdata();
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
  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.bulkInvoice.getSearchDetail).then(
      (success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = 1;
        this.searchParams.pageSize = 10;
        this.searchParams.appBulkInvoiceUploadId =
          this.service.bulkInvoiceUploadId;
        this.fullspinner.empty.next(false);
        this.getData(true);
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  getData(val) {
    this.data.clearErrorMsg();
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.bulkInvoice.searchDetail, this.searchParams)
      .then(
        (success: any) => {
          this.searchParams.totalCount = success.totalCount;
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            success.ilstentProtBulkInvoiceUploadDetailSearchSet
          );
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
          } else if (
            success.ilstentProtBulkInvoiceUploadDetailSearchSet.length != 0
          ) {
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

  pageChanged(event) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize;
    // this.fullspinner.empty.next(true);
    this.getData(true);
  }
  sortData(event) {
    this.searchParams.isortcolumn = event.active;
    this.searchParams.isortorder = event.direction === "asc" ? true : false;
    this.getData(true);
    console.log(event);
  }

  doSearch() {
    this.searchParams.pageNumber = 1;
    this.isOpen = false;
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.studentId = "";
    this.searchParams.studentName = "";
    this.searchParams.brn = "";
    this.searchParams.termValue = "";
    this.searchParams.year = "";
    this.searchParams.invoiceNumber = "";
    this.searchParams.invoiceDateFrom = "";
    this.searchParams.invoiceDateTo = "";
    this.searchParams.program = "";
    this.doSearch();
  }
  active(row) {
    this.activeIndex = row;
  }
  uploadDocument(file) {
    // this.fileUploading =
    //   this.member.newMember.protoWitnessMemberRegistrationDocument.documentTypeValue;
    this.fullspinner.empty.next(true);
    this.service.bulkInvoiceUpload.pdocumentFile.fileType = file.fileType;
    this.service.bulkInvoiceUpload.pdocumentFile.fileSize = file.fileSize;
    this.service.bulkInvoiceUpload.pdocumentFile.relativePath =
      file.relativePath;
    this.service.bulkInvoiceUpload.pdocumentFile.fileName = file.fileName;
    this.service.bulkInvoiceUpload.pdocumentFile.istrFileContent =
      file.istrFileContent;
    this.fileUploading = "";
    this.fullspinner.empty.next(false);
  }

  clearFile() {
    if (
      this.service.bulkInvoiceUpload.pdocumentFile !== null &&
      this.service.bulkInvoiceUpload.pdocumentFile.documentFileId > 0
    ) {
      this.service.bulkInvoiceUpload.pdocumentFile.fileType = "";
      this.service.bulkInvoiceUpload.pdocumentFile.fileSize = 0;
      this.service.bulkInvoiceUpload.pdocumentFile.relativePath = "";
      this.service.bulkInvoiceUpload.pdocumentFile.fileName = "";
      this.service.bulkInvoiceUpload.pdocumentFile.uploadbyFullName = "";
      this.service.bulkInvoiceUpload.pdocumentFile.istrFileContent = "";
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
      this.service.bulkInvoiceUpload.pdocumentFile = obj;
    }
  }

  addNew(val) {
    // this.service.errorTrue = false;
    // this.openBulkInvoiceDetail(val.appBulkInvoiceUploadDetailId);
    // this.dialog.open(this.documentDialog, {
    //   width: "550px",
    //   height: "450px",
    // });
  }
  openBulkInvoiceDetail(val) {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data.postData(AppGlobal.apiPaths.bulkInvoice.openDetail, obj).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.service.bulkInvoiceUpload.ientBulkInvoiceUploadDetail = success;
        this.data.successMesaage(success);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }
  updateData(a: any) {
    if (a.valid) {
      this.service.bulkInvoiceUpload.appBulkInvoiceUploadId =
        this.service.bulkInvoiceUploadId;
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.bulkInvoice.update,
          this.service.bulkInvoiceUpload
        )
        .then(
          (success: any) => {
            this.service.bulkInvoiceUpload = success;
            //this.service.bulkInvoiceUploadId =
            // this.service.bulkInvoiceUpload.appBulkInvoiceUploadId;
            //this.dataSource = new MatTableDataSource(
            //this.service.bulkInvoiceUpload.ilstentBulkInvoiceUploadDetail
            // );
            this.doClose();
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.data.successMesaage(success);
            this.getData(true);
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
  getDate(date) {
    this.service.bulkInvoiceUpload.ientBulkInvoiceUploadDetail.invoiceDate =
      date.split(" ")[0];
  }
  doClose() {
    this.dialog.closeAll();
  }
  triggerClick() {
    this.navtiveFileUpload.nativeElement.click();
  }

  loadImageFromDevice(event) {
    const file = event.target.files[0];
    this.service.bulkInvoiceUpload.pdocumentFile.fileName = file.name;
    this.service.bulkInvoiceUpload.pdocumentFile.fileType = file.name.substring(
      file.name.lastIndexOf(".") + 1
    );
    this.service.bulkInvoiceUpload.pdocumentFile.fileSize = file.size;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img: any = reader.result;
      this.service.bulkInvoiceUpload.pdocumentFile.istrFileContent = img;
      this.fileInput.nativeElement.value = "";
      this.onFileLoad();
    };
    reader.onerror = (error) => {};
  }
  onFileLoad() {
    this.fullSpinner.empty.next(true);
    const obj = {
      data: this.service.bulkInvoiceUpload.pdocumentFile.fileName,
    };
    this.data
      .postData(AppGlobal.apiPaths.contribution.validateFilename, obj)
      .then(
        (success: any) => {
          this.fullSpinner.empty.next(false);
          this.showUploadBtn = true;
        },
        (error) => {
          this.showUploadBtn = false;
          this.fullSpinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  removeFileUpload() {
    this.service.clearNewFile();
    this.fileInput.nativeElement.value = "";
    this.showUploadBtn = false;
  }
}
