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
import { DataService } from "src/app/service/data.service";
import { ViewReceivedFeesService } from "./view-received-fees.service";

@Component({
  selector: "app-view-received-fees",
  templateUrl: "./view-received-fees.component.html",
  styleUrls: ["./view-received-fees.component.scss"],
})
export class ViewReceivedFeesComponent implements OnInit {
  ShowDownload = "N";
  pageId = "VWRFS";
  showEmpty = false;
  id: any = 0;
  SearchResults: any;
  searchParams = {
    batchNo: 0,
    paymentScheduleId: 0,
    invoiceNo: "",
    studentId: "",
    studentFirstName: "",
    studentMiddleName: "",
    studentLastName: "",
    withdrawalApplicationId: 0,
    chequeReferenceNo: "",
    itemCodeTutionFees: "",
    itemCodeAccommodationFees: "",
    receivedFromDate: "",
    receivedToDate: "",
    withdrawalStatusValue: "",
    recipientOrgId: 0,
    totalCount: 0,
    pagesize: 0,
    pagenumber: 0,
    orderycolumnname: "",
    ascending: true,
    timezone: "",
  };
  totalCount = 0;
  isOpen = false;
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
    "batchNo",
    "invoiceNo",
    "receivedDate",
    "itemDescription",
    "studentId",
    "studentFirstName",
    "withdrawalStatusDescription",
    "appliedamount",
    "chequeAmount",
    "withdrawalApplicationId",
    "chequeReferenceNo",
  ];
  istrid = "";
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: ViewReceivedFeesService,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "View Received Fees",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "View Received Fees",
          link: "",
        },
      ],
    };
    this.route.paramMap.subscribe((params) => {});
  }

  ngOnInit(): void {
    this.getinitialDPOdata();
  }
  getinitialDPOdata() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.viewReceivedFees.getinitialData).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.service.initialData[element.key] = element.value;
        });
        this.fullspinner.empty.next(false);
        this.getSearchParams();
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }
  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.viewReceivedFees.getSearch).then(
      (success: any) => {
        this.searchParams = success;
        this.searchParams.pagenumber = 1;
        this.searchParams.pagesize = 10;
        this.fullspinner.empty.next(false);
        // this.getData(true);
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  getData(val) {
    this.data.clearErrorMsg();
    this.ShowDownload = "N";
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    if (this.searchParams.withdrawalApplicationId! <= 0) {
      this.searchParams.withdrawalApplicationId = 0;
    }
    if (this.searchParams.paymentScheduleId! <= 0) {
      this.searchParams.paymentScheduleId = 0;
    }
    this.data
      .postData(AppGlobal.apiPaths.viewReceivedFees.search, this.searchParams)
      .then(
        (success: any) => {
          this.SearchResults = success;
          this.searchParams.totalCount = this.SearchResults.totalCount;
          this.loadingTrue = false;
          this.ShowDownload = this.SearchResults.showDownloadOption;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            this.SearchResults.ilstprotoentReceivedFees
          );
          // this.dataSource.sort = this.sort;
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
          } else if (this.SearchResults.ilstprotoentReceivedFees.length != 0) {
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
    this.searchParams.pagenumber = event.pageIndex + 1;
    this.searchParams.pagesize = event.pageSize;
    //this.fullspinner.empty.next(true);
    this.getData(true);
  }

  doSearch() {
    this.pageIndex = 0;
    this.paginator.pageIndex = 0;
    this.searchParams.pagenumber = 1;
    this.isOpen = false;
    //this.fullspinner.empty.next(true);
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.batchNo = 0;
    this.searchParams.paymentScheduleId = 0;
    this.searchParams.invoiceNo = "";
    this.searchParams.studentId = "";
    this.searchParams.studentFirstName = "";
    this.searchParams.withdrawalApplicationId = 0;
    this.searchParams.chequeReferenceNo = "";
    this.searchParams.receivedFromDate = "";
    this.searchParams.receivedToDate = "";
    this.searchParams.itemCodeAccommodationFees = "";
    this.searchParams.itemCodeTutionFees = "";
    this.searchParams.withdrawalStatusValue = "";
    this.doSearch();
  }
  active(row) {
    this.activeIndex = row;
  }
  downloadViewReceivedFees() {
    this.fullspinner.empty.next(true);
    this.data.pdf("withdrawal/printreceivedfees", this.searchParams).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.openFileViewer(success);
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.data.errorMethod(error);
      }
    );
  }
  openFileViewer(xurl) {
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
  getTuitionFees(val) {
    if (val === true) {
      this.searchParams.itemCodeTutionFees = "Y";
    } else {
      this.searchParams.itemCodeTutionFees = "N";
    }
  }
  getAccommodationFees(val) {
    if (val === true) {
      this.searchParams.itemCodeAccommodationFees = "Y";
    } else {
      this.searchParams.itemCodeAccommodationFees = "N";
    }
  }
  sortData(event: any) {
    this.searchParams.orderycolumnname = event.active;
    this.searchParams.ascending = event.direction === "asc" ? true : false;
    this.getData(true);
  }

  exporttoexcelreceivedfees() {
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.viewReceivedFees.exportToExcel,
        this.SearchResults
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          const downloadLink = document.createElement("a");
          downloadLink.href =
            "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
            success.data;
          let CDates = new Date().toLocaleDateString();
          let FileName = "Received_Fees_Details" + CDates + ".xlsx";
          downloadLink.download = FileName;
          downloadLink.click();
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }
}
