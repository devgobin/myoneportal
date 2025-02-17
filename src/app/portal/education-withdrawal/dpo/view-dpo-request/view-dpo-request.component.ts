import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { DpoService } from "../dpo.service";

@Component({
  selector: "app-view-dpo-request",
  templateUrl: "./view-dpo-request.component.html",
  styleUrls: ["./view-dpo-request.component.scss"],
})
export class ViewDpoRequestComponent implements OnInit {
  showEmpty = false;
  showDpoRevokeReq = false;
  showDpoConditionalTravelReq = false;
  isOpen = false;
  btnClicked = false;
  loadingTrue = false;
  errorTrue = false;
  activeIndex!: number;
  pageIndex = 0;
  pageSize = 10;
  totalCount = 0;
  searchclearflag: boolean = false;
  searchParams = {
    dpoId: 0,
    dpoOrgRefNo: "",
    dpoOrgName: "",
    requestTypeValue: "",
    submittedFromDate: "",
    submittedToDate: "",
    statusValue: "",
    isortcolumn: "",
    isortorder: true,
    totalCount: 0,
    pageSize: 0,
    pageNumber: 0,
    orderByColumnName: "",
    ascending: true,
  };
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  displayedColumns: string[] = [
    "dpoOrgRefNo",
    "dpoOrgName",
    "dpoId",
    "submittedBy",
    "submittedDate",
    "requestTypeValue",
    "status",
    "action",
  ];
  pageId = "VADPO";
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: DpoService,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "View Departure Probation Order Request",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "View Departure Probation Order Request",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "dpoOrgName",
        "dpoId",
        "submittedDate",
        "status",
      ];
    }
    this.route.paramMap.subscribe((params) => {});
  }
  ngOnInit(): void {
    this.getinitialDPOdata();
    this.getSearchParams();
  }
  getinitialDPOdata() {
    this.errorTrue = false;
    this.data
      .getData(AppGlobal.apiPaths.dpo.getinitialDPOdata)
      .then((success: any) => {
        success.data.forEach((element) => {
          this.service.initialData[element.key] = element.value;
        });
        // this.getSearchParams();
      });
  }
  private disableLoader() {
    this.service.setAll(false);
    this.fullspinner.empty.next(false);
  }
  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.dpo.requestgetSearch).then(
      (success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = 1;
        this.searchParams.pageSize = 10;
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
    if (this.searchParams.dpoId! <= 0) {
      this.searchParams.dpoId = 0;
    }
    this.data
      .postData(AppGlobal.apiPaths.dpo.requestSearch, this.searchParams)
      .then(
        (success: any) => {
          this.searchParams.totalCount = success.totalCount;
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            success.ilstDepartureProhibitionOrderSearchSet
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
            success.ilstDepartureProhibitionOrderSearchSet.length != 0
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
    this.fullspinner.empty.next(true);
    this.getData(true);
  }
  sortData(event) {
    this.searchParams.isortcolumn = event.active;
    this.searchParams.isortorder = event.direction === "asc" ? true : false;
    this.fullspinner.empty.next(true);
    this.getData(true);
    console.log(event);
  }

  doSearch() {
    this.searchParams.pageNumber = 1;
    this.isOpen = false;
    this.fullspinner.empty.next(true);
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.dpoOrgRefNo = "";
    this.searchParams.dpoOrgName = "";
    this.searchParams.dpoId = 0;
    this.searchParams.requestTypeValue = "";
    this.searchParams.submittedFromDate = "";
    this.searchParams.submittedToDate = "";
    this.searchParams.statusValue = "";
    this.doSearch();
  }
  onEdit(val: any) {
    debugger;
    this.service.dpoRequestId = val.dpoRequestId;
    if (val.requestTypeValue === "Revoke Request") {
      this.router.navigateByUrl("/app/revoke-request");
    } else if (val.requestTypeValue === "Conditional Travel Request") {
      this.router.navigateByUrl("/app/conditional-travel-request");
    }
  }
  openTravelRequest() {
    if (this.showDpoConditionalTravelReq !== true) {
      const message = "Please select  one DPO.";
      this.data.errorMesaageOnly(message);
      return;
    }
    this.router.navigateByUrl("/app/conditional-travel-request");
  }
  active(row) {
    this.activeIndex = row;
  }
}
