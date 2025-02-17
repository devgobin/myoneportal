import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { HousingAssistanceService } from "../housing-assitance.service";
@Component({
  selector: "app-housing-assistance-search",
  templateUrl: "./housing-assistance-search.component.html",
  styleUrls: ["./housing-assistance-search.component.scss"],
})
export class HousingAssistanceSearchComponent implements OnInit {
  pageId = "HAASC";
  showEmpty = false;
  searchParams = {
    housingAssistanceApplicationId: "",
    statusValue: "",
    loanAccountNumber: "",
    primaryApplicantFnpfNo: "",
    createdDateFrom: "",
    createdDateTo: "",
    outstandingLoanBalance: "",
    totalMonthlyRepaymentAmount: "",
    totalPaymentPeriod: 0,
    isortcolumn: "",
    isortorder: true,
    totalCount: 0,
    pageSize: 10,
    pageNumber: 1,
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
    "housingAssistanceApplicationId",
    "loanAccountName",
    "loanAccountNumber",
    "fnpfNo",
    "fnpfName",
    "createdDate",
    "statusDescription",
    "submittedByFullName",
    "action",
  ];

  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: HousingAssistanceService
  ) {
    this.data.headerName = {
      screenName: "Housing Assistance",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Housing Assistance",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "housingAssistanceApplicationId",
        "loanAccountName",
        "loanAccountNumber",
        "fnpfNo",
        "statusDescription",
      ];
    }
  }
  ngOnInit(): void {
    this.InitialData();
  }

  InitialData() {
    this.service.clearData();
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.housingassitance.initialdata).then(
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
    this.data.getData(AppGlobal.apiPaths.housingassitance.getsearch).then(
      (success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = 1;
        this.searchParams.pageSize = this.pageSize;
        this.getData(true);
      },
      (error: any) => {
        this.data.errorMethod(error);
      }
    );
  }

  getData(val) {
    this.data.clearErrorMsg();
    //   if ((this.searchParams.createdDateFrom !== '' && this.searchParams.createdDateFrom !== null &&
    //   this.searchParams.createdDateFrom !== undefined) && (this.searchParams.createdDateTo !== '' && this.searchParams.createdDateTo !== null &&
    //     this.searchParams.createdDateTo !== undefined)) {
    //       if (this.searchParams.createdDateFrom > this.searchParams.createdDateTo) {
    //         this.data.errorMesaageOnly('From Date must be less than To Date');
    //         return
    //       }
    // }
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.housingassitance.search, this.searchParams)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          this.dataSource = new MatTableDataSource(success.searchResult);
          this.totalCount = success.totalCount;
          // setTimeout(() => {
          //   // this.dataSource.paginator = this.paginator;
          //   // this.dataSource.sort = this.sort;
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
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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
    this.pageIndex = 0;
    // this.paginator.pageIndex = 0;
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.housingAssistanceApplicationId = "";
    this.searchParams.statusValue = "";
    this.searchParams.loanAccountNumber = "";
    this.searchParams.primaryApplicantFnpfNo = "";
    this.searchParams.createdDateFrom = "";
    this.searchParams.createdDateTo = "";
    this.doSearch();
  }

  newapplication() {
    this.service.ProtoHousingAssitanceApplication.housingAssistanceApplicationId = 0;
    this.router.navigateByUrl("/app/housing-assitance/application");
  }

  editapplication(val) {
    this.service.ProtoHousingAssitanceApplication.housingAssistanceApplicationId =
      val.housingAssistanceApplicationId;
    this.router.navigateByUrl("/app/housing-assitance/application");
  }

  active(row) {
    this.activeIndex = row;
  }
}
