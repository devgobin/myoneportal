import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"],
})
export class EmployeeListComponent implements OnInit {
  pageId = "VWEMP";
  loadingTrue = false;
  showEmpty = false;
  searchParams = {
    orgId: 0,
    orgRefNo: "",
    fromDate: "",
    toDate: "",
    status: "",
    isActiveEmployment: true,
    fnfpId: "",
  };
  viewEmpParams = {
    EMPStatus: [],
  };
  isOpen = false;
  activeIndex: number;
  searchclearflag: boolean = false;
  displayedColumns: string[] = [
    "fnpfNo",
    "firstName",
    "employmentStartDate",
    "employmentEndDate",
  ];

  dataSource: any = new MatTableDataSource();
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  constructor(
    public data: DataService,
    public fullspinner: FullSpinnerService
  ) {
    this.viewEmpParams.EMPStatus = [];

    this.data.headerName = {
      screenName: "Employee List",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Employees",
          link: "",
        },
        {
          name: "List",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.initialdata();
  }

  initialdata() {
    this.data.getData(AppGlobal.apiPaths.employee.getinitialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.viewEmpParams[element.key] = element.value;
        });
        this.getSearchParams();
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  getSearchParams() {
    this.data.getData(AppGlobal.apiPaths.employee.getSearchParams).then(
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
    this.fullspinner.empty.next(val);
    this.data
      .postData(AppGlobal.apiPaths.employee.search, this.searchParams)
      .then(
        (success: any) => {
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(success.plstEmployees);
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.sortingDataAccessor = (item, property) => {
              switch (property) {
                case "employmentStartDate":
                  const xdate = moment(
                    item.employmentStartDate,
                    "DD/MM/YYYY"
                  ).format("YYYY-MM-DD");
                  return new Date(xdate);
                  break;
                case "fnpfNo":
                  return item.fnpfNo;
                case "firstName":
                  return item.firstName;
                default:
                  return item;
              }
            };
            this.dataSource.sort.sort({
              id: "employmentStartDate",
              start: "desc",
              disableClear: false,
            });
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
          } else if (success.plstEmployees.length != 0) {
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
          this.fullspinner.empty.next(false);
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  active(row) {
    this.activeIndex = row;
  }

  doSearch() {
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    // this.searchParams.fromDate = "";
    // this.searchParams.toDate = "";
    // console.log(this.searchParams.status)
    // this.searchParams.status = "";
    // console.log(this.searchParams.status)
    this.searchParams.fnfpId = "";
    this.doSearch();
  }
}
