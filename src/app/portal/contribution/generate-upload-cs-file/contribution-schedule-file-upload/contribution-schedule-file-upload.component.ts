import { trigger } from "@angular/animations";
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { CommonAlertComponent } from "src/app/common/common-alert/common-alert.component";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { newcontributionservice } from "../../new-contribution/new-contribution/new-contribution.service";
import { GenerateUploadCsFileService } from "../generate-upload-cs-file.service";

@Component({
  selector: "app-contribution-schedule-file-upload",
  templateUrl: "./contribution-schedule-file-upload.component.html",
  styleUrls: ["./contribution-schedule-file-upload.component.scss"],
})
export class ContributionScheduleFileUploadComponent implements OnInit {
  pageId = "CSFUL";
  loadingTrue = false;
  btnClicked = false;
  showEmpty = false;

  isOpen = false;
  activeIndex: number;
  displayedColumns: string[] = [
    "csFileId",
    "pdocumentFile",
    "uploadedDatetime",
    "statusDescription",
    // "csheaderstatus",
    "action",
  ];
  dataSource: any = new MatTableDataSource();
  searchParams = {
    csFileId: "",
    uploadedDatetimeFrom: "",
    uploadedDatetimeTo: "",
    csCode: "",
    isortcolumn: "",
    isortorder: false,
    totalCount: 0,
    pageSize: 10,
    pageNumber: 1,
  };
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  showUploadBtn = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  @ViewChild("nativeFileUpload", { static: false })
  navtiveFileUpload: ElementRef;
  constructor(
    public data: DataService,
    public csService: GenerateUploadCsFileService,
    public fullSpinner: FullSpinnerService,
    public router: Router,
    public service: newcontributionservice,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "CS File Upload",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Contribution",
          link: "",
        },
        {
          name: "File Upload",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.GetCSFileInitialData();
  }
  active(row) {
    this.activeIndex = row;
  }

  GetCSFileInitialData() {
    this.loadingTrue = true;
    this.fullSpinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.contribution.csfileinitialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.csService.DDL[element.key] = element.value;
        });
        this.loadingTrue = false;
        this.fullSpinner.empty.next(false);
        this.getSearchData();
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }

  getSearchData() {
    this.loadingTrue = true;
    this.fullSpinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.contribution.getFileSearch).then(
      (success: any) => {
        this.searchParams = success;
        //this.searchParams.pageSize = this.pageSize;
       // this.searchParams.pageNumber = 1;
        this.loadingTrue = false;
        this.fullSpinner.empty.next(false);
        this.filterSearchData();
      },
      (error) => {
        this.loadingTrue = false;
        this.fullSpinner.empty.next(false);
        this.data.errorMethod(error);
      }
    );
  }
  filterSearchData() {
    this.data.clearErrorMsg();
    if (
      this.searchParams.uploadedDatetimeFrom !== "" &&
      this.searchParams.uploadedDatetimeFrom !== null &&
      this.searchParams.uploadedDatetimeFrom !== undefined &&
      this.searchParams.uploadedDatetimeTo !== "" &&
      this.searchParams.uploadedDatetimeTo !== null &&
      this.searchParams.uploadedDatetimeTo !== undefined
    ) {
      if (
        this.searchParams.uploadedDatetimeFrom >
        this.searchParams.uploadedDatetimeTo
      ) {
        this.data.errorMesaageOnly("From Date must be less than To Date");
        return;
      }
    }
    this.btnClicked = true;
    this.showEmpty = false;
    this.fullSpinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.contribution.searchFile, this.searchParams)
      .then(
        (success: any) => {
          this.dataSource = new MatTableDataSource(success.searchResult);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          }, 300);
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
          } else if (success.searchResult.length != 0) {
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
          this.btnClicked = false;
          this.fullSpinner.empty.next(false);
        },
        (error) => {
          this.btnClicked = false;
          this.fullSpinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  triggerClick() {
    this.navtiveFileUpload.nativeElement.click();
    // console.log('trigger');
  }

  loadImageFromDevice(event) {
    const file = event.target.files[0];
    this.csService.newCsFile.pdocumentFile.fileName = file.name;
    this.csService.newCsFile.pdocumentFile.fileType = file.name.substring(
      file.name.lastIndexOf(".") + 1
    );
    this.csService.newCsFile.pdocumentFile.fileSize = file.size;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img: any = reader.result;
      this.csService.newCsFile.pdocumentFile.istrFileContent = img;
      this.fileInput.nativeElement.value = "";
      this.onFileLoad();
    };
    reader.onerror = (error) => {};
  }
  onFileLoad() {
    this.fullSpinner.empty.next(true);
    const obj = {
      data: this.csService.newCsFile.pdocumentFile.fileName,
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
    this.csService.clearNewCsFile();
    this.fileInput.nativeElement.value = "";
    this.showUploadBtn = false;
  }

  openDetails(val) {
    this.loadingTrue = true;
    this.fullSpinner.empty.next(true);
    const obj = {
      data: val.csFileId,
    };
    this.data.postData(AppGlobal.apiPaths.contribution.opencsFile, obj).then(
      (success: any) => {
        this.csService.csFileDetails = success;
        this.loadingTrue = false;
        this.fullSpinner.empty.next(false);
        this.router.navigateByUrl(
          "/app/contribution-schedule-file-upload-details"
        );
      },
      (error: any) => {
        this.loadingTrue = false;
        this.fullSpinner.empty.next(false);
        this.data.errorMethod(error);
      }
    );
  }

  pageChanged(event) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize;
    this.filterSearchData();
  }
  sortData(event) {
    this.searchParams.isortcolumn = event.active;
    this.searchParams.isortorder = event.direction === "asc" ? true : false;
    this.filterSearchData();
    console.log(event);
  }
  doSearch() {
    this.searchParams.pageNumber = 1;
    this.pageIndex = 0;
    if (this.paginator && this.paginator.pageIndex) {
      this.paginator.pageIndex = 0;
    }
    this.isOpen = false;
    this.filterSearchData();
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.uploadedDatetimeFrom = "";
    this.searchParams.uploadedDatetimeTo = "";
    this.searchParams.csCode = "";
    this.doSearch();
  }

  editContribution(val) {
    if (val.csHeaderStatusValue === "REVW" && val.csHeaderId > 0) {
      this.service.clearData();
      this.service.createdetail.csHeaderId = val.csHeaderId;
      this.router.navigateByUrl("/app/new-contribution");
    }
  }

  doDelete(val): void {
    if (val.statusValue == "PENVA" && val.csFileId > 0) {
      const dialogRef = this.dialog.open(DeleteAlertComponent, {
        width: "350px",
        data: {
          msg:
            "Are you sure, you want to delete this cs file " +
            val.pdocumentFile.fileName +
            "?",
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.delete(val);
        }
      });
    } else {
      this.alertUserForApplicaionSubittedAlready(
        "Only Pending Validation cs file  can be deleted."
      );
    }
  }

  alertUserForApplicaionSubittedAlready(xmsg) {
    const dialogRef = this.dialog.open(CommonAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: xmsg,
        trueBtnText: "Ok",
        trueBtnColor: "success",
        trueRaised: true,
        falseBtnText: "",
        falseBtnColor: "danger",
        showTrue: true,
        showFalse: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.logout();
      }
    });
  }

  delete(val) {
    const obj = {
      data: val.csFileId,
    };
    this.fullSpinner.empty.next(true);
    this.data.postData(AppGlobal.apiPaths.contribution.deletecsFile, obj).then(
      (success: any) => {
        if (success.msg) {
          if (success.msg.infoMessage.msgDescription.length !== 0) {
            this.data.successMesaage(success);
            this.fullSpinner.empty.next(false);
          }
        }
        this.getSearchData();
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullSpinner.empty.next(false);
      }
    );
  }
}
