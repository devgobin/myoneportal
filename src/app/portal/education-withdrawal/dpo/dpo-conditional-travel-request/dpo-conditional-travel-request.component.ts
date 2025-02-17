import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { DpoService } from "../dpo.service";

@Component({
  selector: "app-dpo-conditional-travel-request",
  templateUrl: "./dpo-conditional-travel-request.component.html",
  styleUrls: ["./dpo-conditional-travel-request.component.scss"],
})
export class DpoConditionalTravelRequestComponent implements OnInit {
  pageId = "DPOTR";
  showEmpty = false;
  errorTrue = false;
  id: any = 0;
  fileUploading = "";
  isOpen = false;
  currentDate = new Date();
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
  istrid = "";
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
      screenName: "DPO Conditional Travel Request",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "DPO Conditional Travel Request",
          link: "",
        },
      ],
    };
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }

  ngOnInit(): void {}
  init() {
    //this.id = this.route.snapshot.paramMap.get("id");
    //this.service.dpoId = this.service.dpoHeaderId;
    debugger;
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
        this.service.dpoConditionalTravelRequest = success;
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
    this.data.postData(AppGlobal.apiPaths.dpo.newTravelRequest, obj).then(
      (success: any) => {
        this.service.dpoConditionalTravelRequest = success;
        // this.service.dpoConditionalTravelRequest.plstDpoRequestDocument =
        //   success.plstDpoRequestDocument;
        // this.dataSource = new MatTableDataSource(
        //   this.service.dpoConditionalTravelRequest.plstDpoRequestDocument
        // );
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
  onSubmit(a: any) {
    if (a.valid) {
      let errorM: any = false;
      this.service.dpoConditionalTravelRequest.plstDpoRequestDocument.forEach(
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
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.dpo.saveTravelRequest,
          this.service.dpoConditionalTravelRequest
        )
        .then(
          (success: any) => {
            this.service.dpoConditionalTravelRequest = success;
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
          }
        );
    } else {
      this.errorTrue = true;
    }
  }
  uploadTravelRequestDocument(file, document) {
    this.fileUploading = document.documentTypeValue;
    this.fullspinner.empty.next(true);
    document.pdocumentFile.fileType = file.fileType;
    document.pdocumentFile.fileSize = file.fileSize;
    document.pdocumentFile.relativePath = file.relativePath;
    document.pdocumentFile.fileName = file.fileName;
    document.pdocumentFile.istrFileContent = file.istrFileContent;
    const index =
      this.service.dpoConditionalTravelRequest.plstDpoRequestDocument
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
    if (index !== -1) {
      this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[index] =
        document;
      this.fileUploading = "";
      this.fullspinner.empty.next(false);
    }
  }

  clearFile(document) {
    const index =
      this.service.dpoConditionalTravelRequest.plstDpoRequestDocument
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
    if (index !== -1) {
      if (
        this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[index]
          .pdocumentFile !== null &&
        this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[index]
          .pdocumentFile.documentFileId > 0
      ) {
        this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[
          index
        ].pdocumentFile.fileType = "";
        this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[
          index
        ].pdocumentFile.fileSize = 0;
        this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[
          index
        ].pdocumentFile.relativePath = "";
        this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[
          index
        ].pdocumentFile.fileName = "";
        this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[
          index
        ].pdocumentFile.uploadbyFullName = "";
        this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[
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
          idoObjState: "",
          updateSeq: 0,
        };
        this.service.dpoConditionalTravelRequest.plstDpoRequestDocument[
          index
        ].pdocumentFile = obj;
      }
    }
  }
  reasonForTravel() {
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.dpo.loadConditionalTravelbyReason,
        this.service.dpoConditionalTravelRequest
      )
      .then(
        (success: any) => {
          this.service.dpoConditionalTravelRequest = success;
          this.disableLoader();
        },
        (error) => {
          this.disableLoader();
          this.data.errorMethod(error);
        }
      );
  }
  private disableLoader() {
    this.service.setAll(false);
    this.fullspinner.empty.next(false);
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
  clearDate() {
    this.service.dpoConditionalTravelRequest.destinationArrivalDate = "";
    this.service.dpoConditionalTravelRequest.returnDate = "";
  }
  clearArrivalDate() {
    this.service.dpoConditionalTravelRequest.returnDate = "";
  }
}
