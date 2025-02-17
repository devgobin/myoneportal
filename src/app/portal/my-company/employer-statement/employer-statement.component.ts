import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { newcontributionservice } from "../../contribution/new-contribution/new-contribution/new-contribution.service";

@Component({
  selector: "app-employer-statement",
  templateUrl: "./employer-statement.component.html",
  styleUrls: ["./employer-statement.component.scss"],
})
export class EmployerStatementComponent implements OnInit {
  pageId = "GEMST";
  isOpen = false;
  displayedColumns: string[] = ["id", "file", "date", "status", "action"];
  dataSource: any = new MatTableDataSource();
  activeIndex: number;
  btnClicked = false;
  errorTrue = false;
  @ViewChild("l", { static: false }) public l: NgForm;

  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public fullspinner: FullSpinnerService,
    public service: newcontributionservice
  ) {
    this.data.headerName = {
      screenName: "Employer Statement",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Employer Statement",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getemployerstatementsearch();
  }
  active(row) {
    this.activeIndex = row;
  }
  employerstatementsearch = {
    orgRefNo: "",
    aYear: 0,
    fromDate: "",
    toDate: "",
    statusValue: "",
    typeValue: "",
  };

  getemployerstatementsearch() {
    this.fullspinner.empty.next(true);
    this.data
      .getData(AppGlobal.apiPaths.payment.getemployerstatementsearch)
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.employerstatementsearch = success;
        },
        (error: any) => {
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
        }
      );
  }

  getemployerstatement(a) {
    if (a.valid) {
      if (this.employerstatementsearch.aYear < 2016) {
        this.data.errorMesaageOnly(
          "Remittance Year must be greater than equal to 2016."
        );
        return;
      }
      this.fullspinner.empty.next(true);
      this.data
        .pdf(
          AppGlobal.apiPaths.payment.getemployerstatement,
          this.employerstatementsearch
        )
        .then(
          (success: any) => {
            this.fullspinner.empty.next(false);
            this.openPDFViewer(success);
          },
          (error: any) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  openPDFViewer(xurl) {
    if (this.data.isMobile) {
      let link = document.createElement("a");
      link.href = xurl;
      link.target = "_blank";
      link.download = "";
      // link.download = this.response.data + '_file.pdf';
      link.dispatchEvent(new MouseEvent("click"));
    } else {
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
}
