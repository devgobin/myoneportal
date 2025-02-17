import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { DpoService } from "../../dpo/dpo.service";
import { BulkInvoiceService } from "../bulk-invoice.service";

@Component({
  selector: "app-bulk-invoice-search",
  templateUrl: "./bulk-invoice-search.component.html",
  styleUrls: ["./bulk-invoice-search.component.scss"],
})
export class BulkInvoiceSearchComponent implements OnInit {
  pageId = "BINVS";
  showEmpty = false;
  errorTrue = false;
  showDpoRevokeReq = false;
  showDpoConditionalTravelReq = false;
  hideDpoRevokeReqButton = false;
  hideDpoConditionalTravelButton = false;
  searchParams = {
    bulkInvoiceUploadId: 0,
    orgId: 0,
    uploadedDatetimeFrom: "",
    uploadedDatetimeTo: "",
    isortcolumn: "",
    isortorder: true,
    totalCount: 0,
    pageSize: 0,
    pageNumber: 0,
    orderByColumnName: "",
    ascending: true,
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
    "bulkInvoiceUploadId",
    "uploadedDate",
    "countOfInvoices",
    "action",
  ];
  istrid = "";
  id = "";
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: BulkInvoiceService,
    public route: ActivatedRoute,
    public dialog: MatDialog
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
    this.getinitialDPOdata();
  }
  getinitialDPOdata() {
    this.errorTrue = false;
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
  }
  private disableLoader() {
    this.service.setAll(false);
    this.fullspinner.empty.next(false);
  }

  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.bulkInvoice.getSearch).then(
      (success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = 1;
        this.searchParams.pageSize = 10;
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
    this.fullspinner.empty.next(true);
    this.showEmpty = false;
    this.data
      .postData(AppGlobal.apiPaths.bulkInvoice.search, this.searchParams)
      .then(
        (success: any) => {
          this.searchParams.totalCount = success.totalCount;
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            success.ilstentProtBulkInvoiceUploadSearchSet
          );
          // setTimeout(() => {
          //   this.dataSource.paginator = this.paginator;
          //   this.dataSource.sort = this.sort;
          // }, 400);
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
            success.ilstentProtBulkInvoiceUploadSearchSet.length != 0
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
    this.searchParams.uploadedDatetimeFrom = "";
    this.searchParams.uploadedDatetimeTo = "";
    this.doSearch();
  }
  active(row) {
    this.activeIndex = row;
  }

  onNew() {
    this.service.bulkInvoiceUploadId = 0;
    this.router.navigateByUrl("/app/bulk-invoice-upload");
  }
  onEdit(val) {
    this.service.bulkInvoiceUploadId = val.bulkInvoiceUploadId;
    this.router.navigateByUrl("/app/bulk-invoice-upload");
  }
}
