import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { DataService } from "src/app/service/data.service";
import { AppGlobal } from "src/app/constants";
import { MatDialog } from "@angular/material/dialog";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { ComplianceCertificateService } from "./compliance-certificate.service";
@Component({
  selector: "app-compliance-certificate-requirement",
  templateUrl: "./compliance-certificate-requirement.component.html",
  styleUrls: ["./compliance-certificate-requirement.component.scss"],
})
export class ComplianceCertificateRequirementComponent implements OnInit {
  isOpen = false;
  dataSource = new MatTableDataSource();
  showEmpty = false;
  btnClicked = false;
  pageId = "COMPL";
  constructor(
    public router: Router,
    public complianceService: ComplianceCertificateService,
    public fullSpinner: FullSpinnerService,
    public data: DataService,
    public route: ActivatedRoute,
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
  displayedColumns: string[] = ["adjHeaderId", "contHeaderId", "csCode"];
  ngOnInit(): void {
    this.GetComplianceCertificateDetail();
  }
  viewCertificate() {
    this.router.navigateByUrl("/app/view-compliance-certificate");
  }

  GetComplianceCertificateDetail() {
    this.fullSpinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .getData(AppGlobal.apiPaths.complaince.GetComplianceCertificateDetail)
      .then((success: any) => {
        this.complianceService.compliancecertificate = success;

        if (
          this.complianceService.compliancecertificate.iProtoentCompliance
            .oneYearCompliance === "N" &&
          this.complianceService.compliancecertificate.iProtoentCompliance
            .conditionalCompliance === "N"
        ) {
          this.data.errorMesaageOnly(
            "Organization not eligible for compliance letter. Please contact FNPF on 323899 for further information."
          );
        }
        this.fullSpinner.empty.next(false);
        this.btnClicked = false;
      });
    (error) => {
      this.fullSpinner.empty.next(false);
      this.btnClicked = false;
      this.data.errorMethod(error);
    };
  }

  viewComplainceCertificate() {
    this.fullSpinner.empty.next(true);
    this.data
      .pdf(
        AppGlobal.apiPaths.complaince.generatecompliancecertificateform,
        this.complianceService.compliancecertificate.iProtoentCompliance
      )
      .then(
        (success: any) => {
          this.fullSpinner.empty.next(false);
          this.openPDFViewer(success);
        },
        (error: any) => {
          this.data.errorMethod(error);
          this.fullSpinner.empty.next(false);
        }
      );
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
        this.GetComplianceCertificateDetail();
      });
    }
  }
}
