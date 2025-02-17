import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";

export interface PeriodicElement {
  messageCode: string;
  message: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { messageCode: "354354", message: "anything" },
];
// export interface TableElement {
//   description: string;
//   value: string;
// }
// const TABLE_DATA: TableElement[] = [
//   { description: '354354', value: 'anything', },
// ];
@Component({
  selector: "app-compliance-certificate",
  templateUrl: "./compliance-certificate.component.html",
  styleUrls: ["./compliance-certificate.component.scss"],
})
export class ComplianceCertificateComponent implements OnInit {
  pageId = "COMPL";
  dataSource: any = new MatTableDataSource();
  isOpen = false;
  displayedColumns: string[] = ["messageCode", "messageDescription"];
  activeIndex: number;
  constructor(
    public data: DataService,
    public fullspinner: FullSpinnerService,
    public dialog: MatDialog
  ) {
    this.data.headerName = {
      screenName: "Compliance Certificate",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Compliance Certificate",
          link: "",
        },
      ],
    };
  }

  Complaince = {
    orgId: 0,
    employerStatus: "",
    contributionStatus: "",
    csSubmissionType: "",
    debtStatus: "",
    penalitiesStatus: "",
    suspenseStatus: "",
    unclaimedStatus: "",
    undistributedStatus: "",
    accrualsStatus: "",
    complaintsStatus: "",
    noOfInspections: 0,
    fromYear: 0,
    toYear: 0,
    iblShowGeneratebtn: false,
    lstmessage: [
      {
        messageDescription: "",
        messageCode: 0,
      },
    ],
  };

  ngOnInit(): void {
    this.getData();
  }
  active(row) {
    this.activeIndex = row;
  }

  getData() {
    this.fullspinner.empty.next(true);
    this.data
      .getData(AppGlobal.apiPaths.complaince.GetComplianceCertificateDetail)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.Complaince = success;
          this.dataSource = new MatTableDataSource(this.Complaince.lstmessage);
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  generatecompliancecertificateform() {
    this.fullspinner.empty.next(true);
    this.data
      .pdf(
        AppGlobal.apiPaths.complaince.generatecompliancecertificateform,
        this.Complaince
      )
      .then(
        (success: any) => {
          this.openPDFViewer(success);
          this.fullspinner.empty.next(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
        }
      );
  }

  openPDFViewer(xurl) {
    const dialogRef = this.dialog.open(ViewPdfComponent, {
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.logout();
      }
    });
  }
}
