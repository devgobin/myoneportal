import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { CommonAlertComponent } from "src/app/common/common-alert/common-alert.component";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { DpoService } from "../dpo.service";

@Component({
  selector: "app-view-dpo",
  templateUrl: "./view-dpo.component.html",
  styleUrls: ["./view-dpo.component.scss"],
})
export class ViewDpoComponent implements OnInit {
  pageId = "VWDPO";
  showEmpty = false;
  errorTrue = false;
  showDpoRevokeReq = false;
  showDpoConditionalTravelReq = false;
  hideDpoRevokeReqButton = true;
  hideDpoConditionalTravelButton = true;
  searchParams = {
    dpoId: 0,
    orgRefNo: "",
    contactTypeValue: "",
    statusValue: "",
    fromDate: "",
    toDate: "",
    selectedDPO: "",
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
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "selectedDPO",
    "dpoHeaderId",
    "orgRefNo",
    "tradeName",
    "contactTypeDescription",
    "invoiceAmount",
    "dpoEffectiveDate",
    "upliftStatusDescription",
  ];
  istrid = "";
  id = "";
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: DpoService,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "View Departure Probation Order",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "View Departure Probation Order",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "selectedDPO",
        "dpoHeaderId",
        "tradeName",
        "dpoEffectiveDate",
        "upliftStatusDescription",
      ];
    }
    this.route.paramMap.subscribe((params) => {});
  }

  ngOnInit(): void {
    this.getinitialDPOdata();
  }
  getinitialDPOdata() {
    this.errorTrue = false;
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.dpo.getinitialDPOdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.service.initialData[element.key] = element.value;
        });
        this.fullspinner.empty.next(false);
        this.loadAllDPOByLoggedInContact();
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.data.errorMethod(error);
      }
    );
  }
  private disableLoader() {
    this.service.setAll(false);
    this.fullspinner.empty.next(false);
  }
  loadAllDPOByLoggedInContact() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.service.dpoId = 0;
    }
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.dpo.load).then(
      (success: any) => {
        this.service.viewDpo = success;
        this.dataSource = new MatTableDataSource(
          this.service.viewDpo.ilstentDPOHeader
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case "orgRefNo":
                return item.ientOrganization.orgRefNo;
              case "tradeName":
                return item.ientOrganization.tradeName;
              case "contactTypeDescription":
                return item.ientOrganization.contactTypeDescription;
              case "upliftStatusDescription":
                return item.lentDPODetail.upliftStatusDescription;
              default:
                return item[property];
            }
          };
        }, 400);

        this.disableLoader();
        this.data.successMesaage(success);
        this.getSearchParams();
      },
      (error) => {
        this.disableLoader();
        this.data.errorMethod(error);
      }
    );
  }
  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.dpo.getSearch).then(
      (success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = 1;
        this.searchParams.pageSize = 10;
        this.fullspinner.empty.next(false);
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
    this.fullspinner.empty.next(true);
    this.data.postData(AppGlobal.apiPaths.dpo.search, this.searchParams).then(
      (success: any) => {
        this.searchParams.totalCount = success.totalCount;
        this.loadingTrue = false;
        this.fullspinner.empty.next(false);
        this.dataSource = new MatTableDataSource(success.ilstentDPOHeader);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case "orgRefNo":
                return item.ientOrganization.orgRefNo;
              case "tradeName":
                return item.ientOrganization.tradeName;
              case "contactTypeDescription":
                return item.ientOrganization.contactTypeDescription;
              case "upliftStatusDescription":
                return item.lentDPODetail.upliftStatusDescription;
              default:
                return item[property];
            }
          };
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
        } else if (success.ilstentDPOHeader.length != 0) {
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
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.dpoId = 0;
    this.searchParams.orgRefNo = "";
    this.searchParams.contactTypeValue = "";
    this.searchParams.fromDate = "";
    this.searchParams.toDate = "";
    this.searchParams.statusValue = "";
    this.doSearch();
  }
  openRevokeRequest() {
    if (this.showDpoRevokeReq !== true) {
      const message = "Please select  one DPO.";
      this.data.errorMesaageOnly(message);
      return;
    }
    this.service.dpoRequestId = 0;
    this.router.navigateByUrl("/app/revoke-request");
  }
  openTravelRequest() {
    if (this.showDpoConditionalTravelReq !== true) {
      const message = "Please select  one DPO.";
      this.data.errorMesaageOnly(message);
      return;
    }
    this.service.dpoRequestId = 0;
    this.router.navigateByUrl("/app/conditional-travel-request");
  }
  active(row) {
    this.activeIndex = row;
  }

  getPrimary(val, debtAmt, dpo) {
    this.hideDpoConditionalTravelButton = false;
    this.hideDpoRevokeReqButton = false;

    this.service.dpoId = val;
    if (dpo.lentDPODetail.upliftStatusValue == "REVK") {
      this.hideDpoConditionalTravelButton = false;
      this.hideDpoRevokeReqButton = false;
    }

    if (dpo.lentDPODetail.upliftStatusValue == "PLCD") {
      if (debtAmt == 0) {
        this.hideDpoRevokeReqButton = true;
        this.hideDpoConditionalTravelButton = true;
      } else {
        this.hideDpoRevokeReqButton = false;
        this.hideDpoConditionalTravelButton = true;
      }
    }
    this.showDpoRevokeReq = true;
    this.showDpoConditionalTravelReq = true;
  }
}
