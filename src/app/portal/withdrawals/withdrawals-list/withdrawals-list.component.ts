import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonAlertComponent } from "src/app/common/common-alert/common-alert.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { NewWithdrawalsService } from "../new-withdrawal/new-withdrawals.service";

@Component({
  selector: "app-withdrawals-list",
  templateUrl: "./withdrawals-list.component.html",
  styleUrls: ["./withdrawals-list.component.scss"],
})
export class WithdrawalsListComponent implements OnInit {
  pageId = "WDLIS";
  loadingTrue = false;
  activeIndex: number;
  btnClicked = false;
  pageIndex = 0;
  totalrows = 0;
  pageEvent: any;
  showEmpty = false;

  isOpen = false;
  displayedColumns: string[] = [
    "withdrawalApplicationId",
    "fnpfNo",
    "fullname",
    "istrCurrentStatus",
    "dateOfBirth",
    "createdDate",
    "employmentStatusDescription",
    "paymentMethodDescription",
    "memberConsentDescription",
    "action",
  ];

  searchParams = {
    withdrawalApplicationId: 0,
    withdrawalStatusValue: "",
    totalCount: 0,
    pageSize: 10,
    pageNumber: 1,
  };
  dataSource: any = new MatTableDataSource();

  constructor(
    public data: DataService,
    public fullspinner: FullSpinnerService,
    public withdrawal: NewWithdrawalsService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.data.headerName = {
      screenName: "COVID 19 Withdrawal",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Withdrawals",
          link: "",
        },
        {
          name: "Withdrawal List",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getSearchParams();
  }

  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.withdrawals.searchData).then(
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
    this.loadingTrue = val;
    this.showEmpty = false;
    this.data
      .postData(AppGlobal.apiPaths.withdrawals.getsearchData, this.searchParams)
      .then(
        (success: any) => {
          this.searchParams.totalCount = success.totalCount;
          this.dataSource = new MatTableDataSource(success.searchResult);
          this.totalrows = success.totalCount;
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          if (success.searchResult.length != 0) {
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
        (error) => {
          this.data.errorMethod(error);
          this.loadingTrue = false;
          this.fullspinner.spin.next(false);
          this.setAll(false);
        }
      );
  }

  setAll(val) {
    this.btnClicked = val;
    this.loadingTrue = val;
    this.fullspinner.empty.next(val);
  }

  getPagination(event) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.pageIndex = event.pageIndex;
    this.searchParams.pageSize = event.pageSize;
    this.fullspinner.empty.next(true);
    this.getData(true);
  }

  active(row) {
    this.activeIndex = row;
  }

  doEdit(val) {
    if (
      val.promisWithdrawalApplicationId == 0 &&
      val.withdrawalApplicationId > 0
    ) {
      this.withdrawal.xData.withdrawalApplicationId =
        val.withdrawalApplicationId;
      this.router.navigateByUrl("/app/withdrawal-new");
    } else {
      this.alertSubmittedWithdrawal("Submitted application cannot be opened.");
    }
  }

  doNew() {
    this.withdrawal.xData.withdrawalApplicationId = 0;
    this.router.navigateByUrl("/app/withdrawal-new/new");
  }

  alertSubmittedWithdrawal(xmsg) {
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
}
