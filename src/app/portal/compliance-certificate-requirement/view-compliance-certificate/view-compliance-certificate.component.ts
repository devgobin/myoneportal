import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { ComplianceCertificateService } from "../compliance-certificate.service";

@Component({
  selector: "app-view-compliance-certificate",
  templateUrl: "./view-compliance-certificate.component.html",
  styleUrls: ["./view-compliance-certificate.component.scss"],
})
export class ViewComplianceCertificateComponent implements OnInit {
  isOpen = false;
  btnClicked = false;
  loadingTrue = false;
  errorTrue = false;
  showEmpty = false;
  activeIndex!: number;
  pageIndex = 0;
  totalCount = 0;
  type: any = "";

  Selectoption = [
    {
      id: 0,
      code: "string",
      description: "Show All",
      name: "string",
      constant: "ALL",
      fullName: "string",
      data1: "string",
      orderby: 0,
      data2: "string",
      data3: "string",
      comments: "string",
      isChecked: true,
    },
    {
      id: 0,
      code: "string",
      description: "Show Compliant Only",
      name: "string",
      constant: "SHWCO",
      fullName: "string",
      data1: "string",
      orderby: 0,
      data2: "string",
      data3: "string",
      comments: "string",
      isChecked: true,
    },
    {
      id: 0,
      code: "string",
      description: "Show Non Compliant Only",
      name: "string",
      constant: "SHWNO",
      fullName: "string",
      data1: "string",
      orderby: 0,
      data2: "string",
      data3: "string",
      comments: "string",
      isChecked: true,
    },
  ];
  SelectedOption = "ALL";

  dataSource: any = new MatTableDataSource();
  paiddataSource: any = new MatTableDataSource();
  debtdataSource: any = new MatTableDataSource();
  penaltiesdataSource: any = new MatTableDataSource();
  complaindataSource: any = new MatTableDataSource();
  invoicedataSource: any = new MatTableDataSource();
  suspensedataSource: any = new MatTableDataSource();
  unclaimeddataSource: any = new MatTableDataSource();
  undistributeddataSource: any = new MatTableDataSource();
  creditmemodataSource: any = new MatTableDataSource();
  accuralsdataSource: any = new MatTableDataSource();
  inspectiondataSource: any = new MatTableDataSource();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("paidSort") public paidSort: MatSort;
  @ViewChild("debtSort") public debtSort: MatSort;
  @ViewChild("penaltiesSort") public penaltiesSort: MatSort;
  @ViewChild("suspenseSort") public suspenseSort: MatSort;
  @ViewChild("unclaimedSort") public unclaimedSort: MatSort;
  @ViewChild("undistributedSort") public undistributedSort: MatSort;
  @ViewChild("accuralsSort") public accuralsSort: MatSort;
  @ViewChild("complainSort") public complainSort: MatSort;
  @ViewChild("creditmemoSort") public creditmemoSort: MatSort;
  @ViewChild("inspectionsort") public inspectionsort: MatSort;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild("paidpaginator", { static: false })
  paidpaginator: MatPaginator;
  @ViewChild("debtpaginator", { static: false })
  debtpaginator: MatPaginator;
  @ViewChild("penaltiespaginator", { static: false })
  penaltiespaginator: MatPaginator;
  @ViewChild("suspensepaginator", { static: false })
  suspensepaginator: MatPaginator;
  @ViewChild("unclaimedpaginator", { static: false })
  unclaimedpaginator: MatPaginator;
  @ViewChild("undistributedpaginator", { static: false })
  undistributedpaginator: MatPaginator;
  @ViewChild("invoicepaginator", { static: false })
  invoicepaginator: MatPaginator;
  @ViewChild("complaintpaginator", { static: false })
  complaintpaginator: MatPaginator;
  @ViewChild("acuralspaginator", { static: false })
  acuralspaginator: MatPaginator;
  @ViewChild("creditmemopaginator", { static: false })
  creditmemopaginator: MatPaginator;
  @ViewChild("inspectionpaginator", { static: false })
  inspectionpaginator: MatPaginator;

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
  ];
  paiddisplayedColumns: string[] = [
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
  ];
  debtdisplayedColumns: string[] = [
    "invoiceId",
    "invoiceTypeDescription",
    "csMonthDescription",
    "csYear",
    "invoiceDate",
    "totalAmount",
    "statusDescription",
  ];
  penaltiesdisplayedColumns: string[] = [
    "invoiceId",
    "invoiceTypeDescription",
    "csMonthDescription",
    "csYear",
    "invoiceDate",
    "totalAmount",
    "statusDescription",
  ];
  suspensedisplayedColumns: string[] = [
    "suspenseAccountId",
    "fnpfId",
    "firstName",
    "csMonthDescription",
    "csYear",
    "wagesMonthDescription",
    "wagesYear",
    "suspenseAmt",
    "suspenseStatusDescription",
  ];
  unclaimeddisplayedColumns: string[] = [
    "unclaimId",
    "unclaimDate",
    "unclaimAmt",
    "unclaimSourceDescription",
    "unclaimSourceRefId",
    "statusDescription",
  ];
  undistributeddisplayedColumns: string[] = [
    "depositId",
    "dueAmt",
    "excessAmt",
    "createdDate",
    "monthDescription",
    "year",
    "remittanceStatusDescription",
  ];
  invoicedisplayedColumns: string[] = [
    "invoiceId",
    "invoiceTypeDescription",
    "csMonthDescription",
    "csYear",
    "invoiceDate",
    "totalAmount",
    "statusDescription",
  ];
  complaindisplayedColumns: string[] = [
    "complaintRefNo",
    "complaintDate",
    "complaintStatusDescription",
  ];
  accuralsColumns: string[] = [
    "csMonthDescription",
    "year",
    "wagesPaidMonthDescription",
    "wagesPaidYear",
    "headerStatusDescription",
  ];
  InspectionColumns: string[] = [
    "inspectionDate",
    "statusDescription",
  ];
  tabChanged(event) {}
  constructor(
    public complianceService: ComplianceCertificateService,
    public fullSpinner: FullSpinnerService,
    public data: DataService
  ) {
    this.data.headerName = {
      screenName: "Compliance Certificate Detail",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Compliance Certificate",
          link: "",
        },
        {
          name: "View Detail",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.init();
    }, 100);
  }
  init() {
    this.fullSpinner.empty.next(true);
    this.dataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstlastContributionThroughPortal
    );
    this.paiddataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstlstContributionSubmittedandpaid
    );
    this.debtdataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstDept
    );
    this.penaltiesdataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstPenalties
    );
    this.suspensedataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstProtoentSuspense
    );
    this.unclaimeddataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstProtoentUnclaim
    );
    this.undistributeddataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstprotoentReceiptDetail
    );

    this.creditmemodataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstProtoentCreditMemo
    );

    this.invoicedataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstProtoentViewInvoice
    );
    this.complaindataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstComplaints
    );

    this.accuralsdataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstAccurals
    );

    this.inspectiondataSource = new MatTableDataSource(
      this.complianceService.compliancecertificate.ilstProtoInspectionCase
    );

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paiddataSource.paginator = this.paidpaginator;
      this.paiddataSource.sort = this.paidSort;
      this.debtdataSource.paginator = this.debtpaginator;
      this.debtdataSource.sort = this.debtSort;
      this.penaltiesdataSource.paginator = this.penaltiespaginator;
      this.penaltiesdataSource.sort = this.penaltiesSort;
      this.suspensedataSource.paginator = this.suspensepaginator;
      this.suspensedataSource.sort = this.suspenseSort;
      this.unclaimeddataSource.paginator = this.unclaimedpaginator;
      this.unclaimeddataSource.sort = this.unclaimedSort;
      this.undistributeddataSource.paginator = this.undistributedpaginator;
      this.undistributeddataSource.sort = this.undistributedSort;
      this.accuralsdataSource.paginator = this.acuralspaginator;
      this.accuralsdataSource.sort = this.accuralsSort;
      this.accuralsdataSource.sortingDataAccessor = (item, property) => {
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
          default:
            return item[property];
        }
      };
      this.complaindataSource.paginator = this.complaintpaginator;
      this.complaindataSource.sort = this.complainSort;
      this.creditmemodataSource.paginator = this.creditmemopaginator;
      this.creditmemodataSource.sort = this.creditmemoSort;
      this.inspectiondataSource.paginator = this.inspectionpaginator;
      this.inspectiondataSource.sort = this.inspectionsort;
    }, 400);
    this.fullSpinner.empty.next(false);
  }
}
