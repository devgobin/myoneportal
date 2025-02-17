import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { StudentRefundsService } from "../student-refunds.service";

@Component({
  selector: "app-add-refund",
  templateUrl: "./add-refund.component.html",
  styleUrls: ["./add-refund.component.scss"],
})
export class AddRefundComponent implements OnInit {
  id: any = 0;
  pageId = "ADDRF";
  showEmpty = false;
  btnClicked = false;
  errorTrue = false;
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
    contributionHeaderId: 0,
  };
  totalCount = 0;
  isOpen = false;
  activeIndex: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  successTrue = false;
  loadingTrue = false;
  invoiceRequired = false;
  invoiceError = false;
  applicationIdRequired = false;
  applicationIdError = false;
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    "contactName",
    "Type",
    "contactType",
    "batchno",
    "contactStatus",
  ];
  selectedRefund = {
    studentId: 0,
    isSelected: "",
    itemCode: "",
    itemDescription: "",
    chequeAmount: 0,
  };
  istrid = "";
  constructor(
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: StudentRefundsService,
    public route: ActivatedRoute
  ) {
    this.data.headerName = {
      screenName: "Add New Refund ",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Add New Refund ",
          link: "",
        },
      ],
    };
    this.route.paramMap.subscribe((params) => { });
  }

  ngOnInit(): void {
    this.init();
  }
  init() {
    if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .unclaimedWithdrawalRefundDetailId > 0
    ) {
      this.openData();
    } else if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .unclaimedWithdrawalRefundDetailId === 0
    ) {
      this.createData();
    }
  }
  createData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .getData(AppGlobal.apiPaths.unclaimedWithdrawalReturns.createDetail)
      .then((success: any) => {
        this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail =
          success;
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      });
    (error) => {
      this.fullspinner.empty.next(false);
      this.btnClicked = false;
      this.data.errorMethod(error);
    };
  }
  openData() {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: this.service.unClaimedWithdrawal
        .iProtoUnclaimedWithdrawalRefundDetail
        .unclaimedWithdrawalRefundDetailId,
    };
    this.data
      .postData(AppGlobal.apiPaths.unclaimedWithdrawalReturns.openDetail, obj)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail =
            success;
          this.data.successMesaage(success);
          this.getData(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }
  getData(ClearData = true) {
    if (
      (this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .withdrawalAppplicationId === null ||
        this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
          .withdrawalAppplicationId === undefined ||
        this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
          .withdrawalAppplicationId === 0 ||
        this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
          .withdrawalAppplicationId <= 0) &&
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .invoiceNo === ""
    ) {
      this.data.errorMesaageOnly("Please enter Application ID or Invoice ID");
      return;
    }
    if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .withdrawalAppplicationId === 0 &&
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .invoiceNo === ""
    ) {
      this.applicationIdError = true;
      this.invoiceError = true;
      return;
    }

    if (ClearData) {
      this.ClearRefundDetail();
    }

    if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .withdrawalAppplicationId! <= 0
    ) {
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.withdrawalAppplicationId = 0;
    }
    this.applicationIdError = false;
    this.invoiceError = false;
    this.fullspinner.empty.next(true);
    this.errorTrue = false;
    this.data
      .postData(
        AppGlobal.apiPaths.unclaimedWithdrawalReturns.searchDetail,
        this.service.unClaimedWithdrawal
      )
      .then(
        (success: any) => {
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.dataSource = new MatTableDataSource(
            success.ilstprotoentReceivedFees
          );
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
        }
      );
  }

  ValidateStudentRefundDetail() {
    let IsValid = true;
    if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .withdrawalPaymentModeId === 0
    ) {
      this.data.errorMesaageOnly("Please select payment detail to proceed.");
      IsValid = false;
      return IsValid;
    }

    if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .refundAmount === "" ||
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .refundAmount === "0"
    ) {
      this.data.errorMesaageOnly("Refund amount cannot be empty or zero.");
      IsValid = false;
      return IsValid;
    }

    return IsValid;
  }

  saveStudentRefund() {
    if (this.ValidateStudentRefundDetail()) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.unclaimedWithdrawalReturns.saveDetail,
          this.service.unClaimedWithdrawal
        )
        .then(
          (success: any) => {
            this.service.unClaimedWithdrawal = success;
            this.router.navigateByUrl("/app/student-refunds/detail");
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.data.successMesaage(success);
          },
          (error) => {
            this.data.errorMethod(error);
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
          }
        );
    }
  }

  saveStudentRefundDetail() {
    if (this.ValidateStudentRefundDetail()) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.unclaimedWithdrawalReturns.saveDetail,
          this.service.unClaimedWithdrawal
        )
        .then(
          (success: any) => {
            this.service.unClaimedWithdrawal = success;
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
            this.data.successMesaage(success);
            this.dataSource = new MatTableDataSource();
            this.createData();
          },
          (error) => {
            this.data.errorMethod(error);
            this.btnClicked = false;
            this.fullspinner.empty.next(false);
          }
        );
      // } else {
      //   this.errorTrue = true;
      // }
    }
  }

  setRefundDetail(val) {
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.withdrawalAppplicationId =
      val.withdrawalApplicationId;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentId =
      val.studentId;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentFirstName =
      val.studentFirstName;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentMiddleName =
      val.studentMiddleName;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentLastName =
      val.studentLastName;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentLastName =
      val.studentLastName;

    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.totalInvoiceAmount =
      val.chequeAmount;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.totalReceivedAmount =
      val.chequeAmount;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.batchNo =
      val.batchNo;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentPersonId =
      val.studentPersonId;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.recipientOrgId =
      val.recipientOrgId;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.remittanceId =
      val.remittanceId;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.recipientOrgRefNo =
      val.recipientOrgRefNo;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.withdrawalPaymentModeId =
      val.withdrawalPaymentModeId;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.withdrawalStatusDescription =
      val.withdrawalStatusDescription;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentPersonId =
      val.studentPersonId;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.invoiceNo =
      val.invoiceNo;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.memberFnpfId =
      val.memberFnpfId;
    this.calculateunclaimedwithdrawalrefunddetailbalaceamount();
  }

  calculateunclaimedwithdrawalrefunddetailbalaceamount() {
    this.errorTrue = false;
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.unclaimedWithdrawalReturns.calculateunclaimedwithdrawalrefunddetailbalaceamount,
        this.service.unClaimedWithdrawal
      )
      .then(
        (success: any) => {
          this.service.unClaimedWithdrawal = success;
          this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.refundAmount =
            this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.balanceAmount;
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.btnClicked = false;
          this.fullspinner.empty.next(false);
        }
      );
  }

  ClearRefundDetail() {
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentId =
      "";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentFirstName =
      "";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentMiddleName =
      "";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentLastName =
      "";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentLastName =
      "";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.refundAmount =
      "0";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.balanceAmount =
      "0";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.totalInvoiceAmount =
      "0";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.totalReceivedAmount =
      "0";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.batchNo = 0;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentPersonId = 0;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.recipientOrgId = 0;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.remittanceId = 0;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.recipientOrgRefNo =
      "";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.withdrawalPaymentModeId = 0;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.withdrawalStatusDescription =
      "";
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.studentPersonId = 0;
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.memberFnpfId =
      "";
  }
  navigateDetail() {
    this.router.navigateByUrl("/app/student-refunds/detail");
  }
  checkRequired() {
    this.applicationIdRequired = true;
    this.invoiceRequired = true;
    if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .withdrawalAppplicationId !== 0
    ) {
      this.applicationIdRequired = true;
      this.invoiceRequired = false;
    }
    if (
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .invoiceNo !== ""
    ) {
      this.applicationIdRequired = false;
      this.invoiceRequired = true;
    }
  }
  active(row) {
    this.activeIndex = row;
  }

  calClulateBalanceAmount() {
    let balanceAmount = 0;
    if (
      this.service.unClaimedWithdrawal &&
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail &&
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .balanceAmount &&
      this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
        .refundAmount
    ) {
      balanceAmount =
        Number(
          this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
            .balanceAmount
        ) -
        Number(
          this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail
            .refundAmount
        );
    }
    this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.balanceAmount = balanceAmount.toString();
    // return this.service.unClaimedWithdrawal.iProtoUnclaimedWithdrawalRefundDetail.balanceAmount;
  }
}
