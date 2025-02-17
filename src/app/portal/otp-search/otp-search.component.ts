import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { OtpService } from "./otp.service";

@Component({
  selector: "app-otp-search",
  templateUrl: "./otp-search.component.html",
  styleUrls: ["./otp-search.component.scss"],
})
export class OtpSearchComponent implements OnInit {
  pageId = "OTPSR";
  showEmpty = false;
  searchParams = {
    principalContractor: "",
    subContractor: "",
    status: "",
  };
  totalCount = 0;
  pageNumber = 1;
  isOpen = false;
  activeIndex: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "tpoHeaderId",
    // "principalContractor",
    "effectiveDate",
    "endDate",
    "totalDebtBalance",
    "debtBalancePaid",
    "debtBalanceRemaining",
    "statusDescription",
  ];

  constructor(
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: OtpService,
    public router: Router
  ) {
    this.data.headerName = {
      screenName: "View Order to Third Party",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Order to Third Party",
          link: "",
        },
      ],
    };
  }
  ngOnInit(): void {
    this.InitialData();
  }

  InitialData() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.otp.initialdata).then(
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
    this.data.getData(AppGlobal.apiPaths.otp.getSearch).then(
      (success: any) => {
        this.searchParams = success;
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
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data.postData(AppGlobal.apiPaths.otp.search, this.searchParams).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.loadingTrue = false;
        this.dataSource = new MatTableDataSource(
          success.plstProtoentOrderToThirdParty
        );
        // this.totalCount = success.totalCount;
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
        } else if (success.plstProtoentOrderToThirdParty) {
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
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(true);
  }

  doSearch() {
    // this.pageNumber = 1;
    // this.pageIndex = 0;
    this.isOpen = false;
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams = {
      principalContractor: "",
      subContractor: "",
      status: "",
    };
    this.doSearch();
  }

  active(row) {
    this.activeIndex = row;
  }

  onEdit(val) {
    this.service.otp.tpoHeaderId = val.tpoHeaderId;
    this.router.navigateByUrl("/app/otp-detail");
  }
}
