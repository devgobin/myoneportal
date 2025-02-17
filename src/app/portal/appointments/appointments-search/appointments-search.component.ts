import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "src/app/service/data.service";
import { appointmentservice } from "../appointments.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { NgForm } from "@angular/forms";
import { FullSpinnerService } from "../../../common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";

@Component({
  selector: "app-appointments-search",
  templateUrl: "./appointments-search.component.html",
  styleUrls: ["./appointments-search.component.scss"],
})
export class AppointmentsSearchComponent implements OnInit {
  loadingTrue = false;
  showEmpty = false;

  searchParams = {
    fromDate: "",
    toDate: "",
    isortcolumn: "",
    isortorder: true,
    totalCoun: 0,
    pageSize: 0,
    pageNumber: 0,
    orgRefNo: "",
    employerPortalUserId: 0,
  };
  viewAppointmentParams = {
    AppointmentStatus: [],
  };
  pageId = "APISR";
  isOpen = false;
  searchclearflag: boolean = false;
  displayedColumns: string[] = [
    "appointmentRefNo",
    "appointmentDate",
    "fromTime",
    "toTime",
    "branch",
    "category",
    "status",
    "message",
  ];
  activeIndex: number;
  dataSource: any = new MatTableDataSource();
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  constructor(
    public router: Router,
    public data: DataService,
    public service: appointmentservice,
    public fullspinner: FullSpinnerService
  ) {
    this.data.headerName = {
      screenName: "Appointments",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Appointments",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "appointmentRefNo",
        "appointmentDate",
        "fromTime",
        "toTime",
        "branch",
        "category",
        "status",
      ];
    }
  }

  ngOnInit(): void {
    this.initialdata();
  }

  initialdata() {
    this.data.getData(AppGlobal.apiPaths.appointment.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.viewAppointmentParams[element.key] = element.value;
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
    this.data.getData(AppGlobal.apiPaths.appointment.getsearch).then(
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
    if (
      this.searchParams.fromDate !== "" &&
      this.searchParams.fromDate !== null &&
      this.searchParams.fromDate !== undefined &&
      this.searchParams.toDate !== "" &&
      this.searchParams.toDate !== null &&
      this.searchParams.toDate !== undefined
    ) {
      if (this.searchParams.fromDate > this.searchParams.toDate) {
        this.data.errorMesaageOnly("From Date must be less than To Date");
        return;
      }
    }
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(val);
    this.data

      .postData(AppGlobal.apiPaths.appointment.search, this.searchParams)
      .then(
        (success: any) => {
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            success.ilstProtoAppointmentSearchResultset
          );
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            //this.dataSource.sortingDataAccessor = (item, property) => {
            // };
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
          } else if (success.ilstProtoAppointmentSearchResultset.length != 0) {
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
    this.searchParams.fromDate = "";
    this.searchParams.toDate = "";
    this.doSearch();
  }

  newAppointment() {
    this.service.clearData();
    this.service.createappointment.appointmentId = 0;
    this.router.navigateByUrl("/app/appointments-detail");
  }
  openAppointment(val) {
    //this.service.clearData();
    this.service.createappointment.appointmentId = val;
    this.router.navigateByUrl("/app/appointments-detail");
  }
}
