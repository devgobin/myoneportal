import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { MicrofinanceAssistanceService } from "../microfinance-assistance.service";

@Component({
  selector: "app-microfinance-assistance-search",
  templateUrl: "./microfinance-assistance-search.component.html",
  styleUrls: ["./microfinance-assistance-search.component.scss"],
})
export class MicrofinanceAssistanceSearchComponent implements OnInit {
  pageId = "MROFS";
  showEmpty = false;
  searchParams = {
    microfinanceApplicationId: 0,
    toDate: "",
    submittedDateFrom: "",
    submittedDateTo: "",
    raisedDateFrom: "",
    raisedDateTo: "",
    applicationStatusValue: "",
    applicationTypeValue: "",
    lenderOrgId: 0,
    raisedOrgContactId: 0,
    applicantFnpfNo: "",
    isortcolumn: "",
    isortorder: true,
    totalCount: 0,
    pageSize: 0,
    pageNumber: 0,
  };
  isOpen = false;
  activeIndex: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  searchclearflag: boolean = false;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "applicationNo",
    "loanAccountNo",
    "applicantFnpfNo",
    "requestedAmount",
    "applicationStatus",
    "createdBy",
    "createdDate",
    "action",
  ];

  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: MicrofinanceAssistanceService,
    public storage: Storage
  ) {
    this.data.headerName = {
      screenName: "Microbusiness Assistance List",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Microbusiness Assistance",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "applicationNo",
        "loanAccountNo",
        "applicantFnpfNo",
        "requestedAmount",
        "applicationStatus",
      ];
    }
  }
  ngOnInit(): void {
    this.getMicroFinanceInitialData();
  }

  getMicroFinanceInitialData() {
    this.fullspinner.empty.next(true);
    this.data
      .getData(
        AppGlobal.apiPaths.microfinanceAssistance.getMicroFinanceInitialData
      )
      .then(
        (success: any) => {
          success.data.forEach((element) => {
            this.service.DDL[element.key] = element.value;
          });
          this.fullspinner.empty.next(false);
          this.getSearchParams();
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  getSearchParams() {
    this.data
      .getData(AppGlobal.apiPaths.microfinanceAssistance.getMicroFinanceSearch)
      .then(
        (success: any) => {
          this.searchParams = success;
          this.getData(true);
        },
        (error: any) => {
          this.data.errorMethod(error);
        }
      );
  }

  getData(val) {
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.microfinanceAssistance.searchMicroFinanceApplication,
        this.searchParams
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          this.dataSource = new MatTableDataSource(
            success.ilstProtoMicrofinanceApplicationResultset
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
          } else if (
            success.ilstProtoMicrofinanceApplicationResultset.length != 0
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
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  pageChanged(event) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize;
    this.getData(true);
  }

  doSearch() {
    this.searchParams.pageNumber = 1;
    this.pageIndex = 0;
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams = {
      microfinanceApplicationId: 0,
      toDate: "",
      submittedDateFrom: "",
      submittedDateTo: "",
      raisedDateFrom: "",
      raisedDateTo: "",
      applicationStatusValue: "",
      applicationTypeValue: "",
      lenderOrgId: 0,
      raisedOrgContactId: 0,
      applicantFnpfNo: "",
      isortcolumn: "",
      isortorder: true,
      totalCount: 0,
      pageSize: 0,
      pageNumber: 0,
    };
    this.doSearch();
  }

  getPagination(event) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.pageIndex = event.pageIndex;
    this.searchParams.pageSize = event.pageSize;
    this.getData(true);
  }

  newMicrofinance() {
    this.service.clearData();
    this.service.microfinance.microfinanceApplicationId = 0;
    this.storage.set("microfinanceApplicationId", 0);
    this.router.navigateByUrl("/app/microfinance-assistance/details");
  }

  editMicrofinance(val) {
    this.service.clearData();
    this.service.microfinance.microfinanceApplicationId =
      val.microfinanceApplicationId;
    this.storage.set(
      "microfinanceApplicationId",
      val.microfinanceApplicationId
    );
    this.router.navigateByUrl("/app/microfinance-assistance/details");
  }

  active(row) {
    this.activeIndex = row;
  }

  doRefresh(val) {
    const obj = {
      data: val.microfinanceApplicationId,
    };
    // this.loadingTrue = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.microfinanceAssistance.open, obj)
      .then(
        (success: any) => {
          this.dataSource.data.forEach((element) => {
            if (
              val.microfinanceApplicationId ===
              element.microfinanceApplicationId
            ) {
              element.applicationNo = success.applicationRefNo;
              element.loanAccountNo = success.loanAccountNo;
              element.applicantFnpfNo =
                success.ibusMicroFinanceApplicationApplicant.applicantFnpfNo;
              element.requestedAmount =
                success.ibusMicroFinanceApplicationApplicant.requestedAmount;
              element.applicantionStatus = success.statusDescription;
              element.createdBy = success.createdBy;
              element.createdDate = success.createdDate;
            }
          });
          this.fullspinner.empty.next(false);
          // this.loadingTrue = false;
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }
}
