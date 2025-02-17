import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { MemberRegistration } from "../new-member-registration/new-member-registration.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { IncompleteMemberRegistrationService } from "./incomplete-member-registration.service";
import { CommonAlertComponent } from "src/app/common/common-alert/common-alert.component";
import { MatSort } from "@angular/material/sort";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";

@Component({
  selector: "app-incomplete-member-registration",
  templateUrl: "./incomplete-member-registration.component.html",
  styleUrls: ["./incomplete-member-registration.component.scss"],
})
export class IncompleteMemberRegistrationComponent implements OnInit {
  pageId = "ICMRG";
  showEmpty = false;
  searchParams = {
    istrmemberName: "",
    idtmfromDate: "",
    idtmendDate: "",
    istrbrn: "",
    istrtin: "",
    istrstatusValue: "",
    isortcolumn: "",
    isortorder: true,
    totalCount: 0,
    pageSize: 10,
    pageNumber: 1,
    orderByColumnName: "",
    ascending: true,
  };

  isOpen = false;
  searchclearflag: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  pageIndex = 0;
  pageSize = 10;
  successTrue = false;
  loadingTrue = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "firstName",
    "fnpfId",
    "createdDate",
    "tin",
    "brn",
    "dateOfBirth",
    "statusDescription",
    "action",
  ];
  activeIndex: number;
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public incompletememregService: IncompleteMemberRegistrationService,
    public member: MemberRegistration,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "New Member Registration Request",
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
          name: "New Request",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "firstName",
        "fnpfId",
        "createdDate",
        "statusDescription",
      ];
    }
  }

  ngOnInit(): void {
    this.getSearchParams();
  }

  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.memberRegistration.getsearch).then(
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
    // this.loadingTrue = val;
    this.showEmpty = false;
    this.data
      .postData(AppGlobal.apiPaths.memberRegistration.search, this.searchParams)
      .then(
        (success: any) => {
          this.searchParams.totalCount = success.totalCount;
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(success.searchResult);
          // setTimeout(() => {
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
    // this.pageIndex = 0;
    //this.paginator.pageIndex = 0;
    this.isOpen = false;
    this.fullspinner.empty.next(true);
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.istrmemberName = "";
    this.searchParams.idtmfromDate = "";
    this.searchParams.idtmendDate = "";
    this.searchParams.istrbrn = "";
    this.searchParams.istrtin = "";
    this.doSearch();
  }

  doEdit(val) {
    if (val.statusValue == "PENSU" && val.memberRegistrationId > 0) {
      this.member.newMember.memberRegistrationId = val.memberRegistrationId;
      this.router.navigateByUrl("/app/new-member-registration");
    } else {
      this.alertUserForApplicaionSubittedAlready(
        "Only Pending Submission request can be opened."
      );
    }
  }

  alertUserForApplicaionSubittedAlready(xmsg) {
    const dialogRef = this.dialog.open(CommonAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: xmsg,
        trueBtnText: "Ok",
        trueBtnColor: "success",
        trueRaised: true,
        falseBtnText: "",
        falseBtnColor: "danger",
        showTrue: true,
        showFalse: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.logout();
      }
    });
  }

  doDelete(val): void {
    if (val.statusValue == "PENSU" && val.memberRegistrationId > 0) {
      const dialogRef = this.dialog.open(DeleteAlertComponent, {
        width: "350px",
        data: {
          msg:
            "Are you sure, you want to delete this Member " +
            val.firstName +
            val.middleName +
            val.lastName +
            "?",
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.delete(val);
        }
      });
    } else {
      this.alertUserForApplicaionSubittedAlready(
        "Only Pending Submission request  can be deleted."
      );
    }
  }

  delete(val) {
    const obj = {
      data: val.memberRegistrationId,
    };
    this.fullspinner.empty.next(true);
    this.data.postData(AppGlobal.apiPaths.memberRegistration.delete, obj).then(
      (success: any) => {
        if (success.msg) {
          if (success.msg.infoMessage.msgDescription.length !== 0) {
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
          }
        }
        this.getData(true);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  active(row) {
    this.activeIndex = row;
  }
}
