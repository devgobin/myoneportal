import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import * as moment from "moment";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { newcontributionservice } from "../../new-contribution/new-contribution/new-contribution.service";

@Component({
  selector: "app-view-submitted-contribution",
  templateUrl: "./view-submitted-contribution.component.html",
  styleUrls: ["./view-submitted-contribution.component.scss"],
})
export class ViewSubmittedContributionComponent implements OnInit {
  pageId = "VSUBC";
  showEmpty = false;
  searchParams = {
    orgId: 0,
    orgRefNo: "",
    fromDate: "",
    toDate: "",
    csCode: "",
    csMonth: "",
    csYear: 0,
    wagesMonth: "",
    wagesYear: 0,
    headerStatus: "",
    lstprotoentCSCode: [],
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
  searchclearflag: boolean = false;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "csHeaderId",
    "csCode",
    "csMonthDescription",
    "year",
    "wagesPaidMonthDescription",
    "wagesPaidYear",
    "receivedDate",
    "dueDate",
    "totalContributionAmount",
    "headerStatusDescription",
    "action",
  ];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: newcontributionservice
  ) {
    this.data.headerName = {
      screenName: "View Submitted Contribution List",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Contribution",
          link: "",
        },
        {
          name: "View",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "csHeaderId",
        "csMonthDescription",
        "year",
        "dueDate",
        "totalContributionAmount",
        "headerStatusDescription",
        "action",
      ];
    }
  }
  ngOnInit(): void {
    this.GetCSHeaderInitialData();
  }

  GetCSHeaderInitialData() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.contribution.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.service.DDL[element.key] = element.value;
          console.log(this.service.DDL.DDLCSHeaderStatusValue);
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
    this.data.getData(AppGlobal.apiPaths.contribution.getsearch).then(
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
    //   this.data.clearErrorMsg();
    //   if ((this.searchParams.fromDate !== '' && this.searchParams.fromDate !== null &&
    //   this.searchParams.fromDate !== undefined) && (this.searchParams.toDate !== '' && this.searchParams.toDate !== null &&
    //     this.searchParams.toDate !== undefined)) {
    //       if (this.searchParams.fromDate >= this.searchParams.toDate) {
    //         this.data.errorMesaageOnly('From Received Date must be less than To Received Date');
    //         return
    //       }
    // }
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(true);
    this.data
      .postData(AppGlobal.apiPaths.contribution.search, this.searchParams)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.loadingTrue = false;
          this.dataSource = new MatTableDataSource(success.protoentCSHeaders);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.sortingDataAccessor = (item, property) => {
              switch (property) {
                case "year":
                case "csMonthDescription":
                case "wagesPaidYear":
                case "wagesPaidMonthDescription":
                  let mDate = this.months.indexOf(
                    item.csMonthDescription && item.wagesPaidMonthDescription
                  );
                  let monthDight = 0;
                  mDate !== -1 ? (monthDight = mDate + 1) : "";
                  let monthDightParsed = "";
                  monthDight < 10
                    ? (monthDightParsed = "0" + monthDight)
                    : (monthDightParsed = monthDight.toString());
                  let praseDate =
                    item.year + "-" + monthDightParsed + "-01" &&
                    item.wagesPaidYear + "-" + monthDightParsed + "-01";
                  return new Date(praseDate);
                case "totalContributionAmount":
                  let totalCSAmount = 0;
                  totalCSAmount = parseFloat(item.totalContributionAmount);
                  return totalCSAmount;
                case "receivedDate":
                  const xdate = moment(item.receivedDate, "DD/MM/YYYY").format(
                    "YYYY-MM-DD"
                  );
                  return new Date(xdate);
                case "dueDate":
                  const ydate = moment(item.dueDate, "DD/MM/YYYY").format(
                    "YYYY-MM-DD"
                  );
                  return new Date(ydate);
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
          } else if (success.protoentCSHeaders.length != 0) {
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
    //this.searchParams.pageNumber = event.pageIndex + 1;
    ///this.searchParams.pageSize = event.pageSize;
    this.getData(true);
  }

  doSearch() {
    // this.searchParams.pageNumber = 1;
    // this.pageIndex = 0;
    // this.paginator.pageIndex = 0;
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.csCode = "";
    this.searchParams.csMonth = "";
    this.searchParams.csYear = 0;
    this.searchParams.wagesMonth = "";
    this.searchParams.wagesYear = 0;
    this.searchParams.fromDate = "";
    this.searchParams.toDate = "";
    this.searchParams.headerStatus = "";
    this.doSearch();
  }

  newContribution() {
    this.service.clearData();
    this.service.createdetail.csHeaderId = 0;
    this.router.navigateByUrl("/app/new-contribution/new");
  }

  editContribution(val) {
    this.service.clearData();
    this.service.createdetail.csHeaderId = val.csHeaderId;
    this.router.navigateByUrl("/app/new-contribution");
  }

  active(row) {
    this.activeIndex = row;
  }
}
