import { Component, OnInit, ViewChild } from "@angular/core";
import { CdkStepper } from "@angular/cdk/stepper";
import { DataService } from "src/app/service/data.service";
import { EditEmployeeDetailComponent } from "./edit-employee-detail/edit-employee-detail.component";
import { MatDialog } from "@angular/material/dialog";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { newcontributionservice } from "./new-contribution.service";
import { MatTableDataSource } from "@angular/material/table";
import { DeleteAlertComponent } from "src/app/common/delete-alert/delete-alert.component";
import { NgForm } from "@angular/forms";
import { ViewPdfComponent } from "src/app/common/view-pdf/view-pdf.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
@Component({
  selector: "app-new-contribution",
  templateUrl: "./new-contribution.component.html",
  styleUrls: ["./new-contribution.component.scss"],
})
export class NewContributionComponent implements OnInit {
  pageId = "NEWCO";
  activeIndex: number;
  displayedColumns: string[] = [
    "fnpfNo",
    "firstName",
    "tin",
    "complulsoryContri",
    "employerAddContri",
    "employeeAddContri",
    "totalContri",
    "grossSalary",
    "detailStatusDescription",
    "action",
  ];
  dataSource: any = new MatTableDataSource();
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  btnClicked = false;
  errorTrue = false;
  ShowChildButton = false;
  id = "";
  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public fullspinner: FullSpinnerService,
    public service: newcontributionservice,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.init();
    });
    this.data.headerName = {
      screenName: "New Contribution",
      paths: [
        {
          name: "Home",
          link: "#",
        },
        {
          name: "Contribution",
          link: "",
        },
        {
          name: "New",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.displayedColumns = [
        "fnpfNo",
        "firstName",
        "totalContri",
        "grossSalary",
        "detailStatusDescription",
        "action",
      ];
    }
  }
  ngOnInit(): void {
    this.GetCSHeaderInitialData();
    this.ShowChildButtons();
  }

  init() {
    this.id = this.route.snapshot.paramMap.get("id");
    // console.log(this.id);
    if (this.id) {
      this.service.createdetail.csHeaderId = 0;
    }
    this.dataSource = new MatTableDataSource();
    if (this.service.createdetail.csHeaderId === 0) {
      this.createData();
    } else if (this.service.createdetail.csHeaderId > 0) {
      this.getData(this.service.createdetail.csHeaderId);
    }
  }

  GetCSHeaderInitialData() {
    // this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.contribution.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.service.DDL[element.key] = element.value;
        });
        // this.fullspinner.empty.next(false);
        // this.init();
      },
      (error: any) => {
        this.data.errorMethod(error);
        // this.fullspinner.empty.next(false);
      }
    );
  }

  editemployee(val, type?) {
    const obj = {
      data: val,
      type: type ? type : "edit",
    };
    const dialogRef = this.dialog.open(EditEmployeeDetailComponent, {
      width: "100%",
      height: "97%",
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource = new MatTableDataSource(
          this.service.createdetail.lstprotoentCSDetail
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 400);
      }
    });
  }

  SetCSMonth(val) {
    var SelectedConfig = this.service.DDL.DDLMonthValue.filter(function (obj) {
      return obj.constant === val;
    });

    if (SelectedConfig != null && SelectedConfig.length > 0) {
      var CSMonth = "";
      var month: number = Number(SelectedConfig[0].data1);
      if (month === 12) {
        CSMonth = "01";
      } else {
        month += 1;
        CSMonth = month.toString();
        if (CSMonth.length == 1) {
          CSMonth = "0" + CSMonth;
        }
      }

      var csmonthconfig = this.service.DDL.DDLMonthValue.filter(function (obj) {
        return obj.constant === val;
      });
    }
  }
  newemployee() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data
      .postData(
        AppGlobal.apiPaths.contribution.createEmployee,
        this.service.createdetail
      )
      .then(
        (success: any) => {
          this.service.createemployee = success;
          this.editemployee({}, "new");
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        },
        (error) => {
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.data.errorMethod(error);
        }
      );
  }

  openemployeedetail(val) {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data.postData(AppGlobal.apiPaths.contribution.openemployee, obj).then(
      (success: any) => {
        this.service.createemployee = success;
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.editemployee({}, "edit");
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }

  // openData(val) {
  //   this.service.createemployee = val;
  //   this.btnClicked = true;
  //   this.fullspinner.empty.next(true);
  //   this.data
  //     .postData(
  //       AppGlobal.apiPaths.contribution.openemployee,
  //       this.service.createemployee
  //     )
  //     .then(
  //       (success: any) => {
  //         this.fullspinner.empty.next(false);
  //         this.service.createemployee = success;
  //         this.editemployee({}, 'edit');
  //         if (success.msg) {
  //           if (Array.isArray(success.msg.errorMessage.msgDescription)) {
  //             if (success.msg.errorMessage.msgDescription.length !== 0) {
  //               this.data.errorResponse(success);
  //               this.fullspinner.empty.next(false);
  //               this.btnClicked = false;
  //             }
  //           }
  //         }
  //         this.fullspinner.empty.next(false);
  //         this.btnClicked = false;
  //       //  this.data.successMesaage(success);
  //       },
  //       (error) => {
  //         this.data.errorMethod(error);
  //         this.fullspinner.empty.next(false);
  //         this.btnClicked = false;
  //       }
  //     );
  // }

  openData(val) {
    if (val.csDetailId > 0) this.openemployeedetail(val.csDetailId);
  }

  getDatafrompreviousheader() {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.contribution.getfromprevious,
        this.service.createdetail
      )
      .then(
        (success: any) => {
          this.fullspinner.empty.next(false);
          this.service.createdetail = success;
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
          this.data.successMesaage(success);
        },
        (error) => {
          this.data.errorMethod(error);
          this.fullspinner.empty.next(false);
          this.btnClicked = false;
        }
      );
  }

  createData() {
    this.fullspinner.empty.next(true);
    this.btnClicked = true;
    this.data.getData(AppGlobal.apiPaths.contribution.createData).then(
      (success: any) => {
        this.service.createdetail = success;
        if (
          this.service.DDL.DDLCSCodeValue != null &&
          this.service.DDL.DDLCSCodeValue.length > 0
        )
          this.service.createdetail.csCode =
            this.service.DDL.DDLCSCodeValue[0].constant;
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      },
      (error) => {
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
        this.data.errorMethod(error);
      }
    );
  }

  getData(val) {
    this.btnClicked = true;
    this.fullspinner.empty.next(true);
    const obj = {
      data: val,
    };
    this.data.postData(AppGlobal.apiPaths.contribution.opendata, obj).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.service.createdetail = success;
        this.dataSource = new MatTableDataSource(
          this.service.createdetail.lstprotoentCSDetail
        );
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 400);
        this.btnClicked = false;
        this.data.successMesaage(success);
        this.fullspinner.empty.next(false);
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
        this.btnClicked = false;
      }
    );
  }

  onsubmit(h) {
    if (h.valid) {
      // this.SetCSMonth(this.service.createdetail.wagesPaidMonthValue);
      this.errorTrue = false;
      this.btnClicked = true;
      var path = "";
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.contribution.insertheader,
          this.service.createdetail
        )
        .then(
          (success: any) => {
            this.service.createdetail = success;
            if (this.service.createdetail.lstprotoentCSDetail !== null) {
              this.dataSource = new MatTableDataSource();
              this.dataSource = new MatTableDataSource(
                this.service.createdetail.lstprotoentCSDetail
              );
              setTimeout(() => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }, 400);
            }
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.ShowChildButtons();
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  submitcsheader(h) {
    if (h.valid) {
      // this.SetCSMonth(this.service.createdetail.wagesPaidMonthValue);
      this.errorTrue = false;
      this.btnClicked = true;
      var path = "";
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.contribution.submitheader,
          this.service.createdetail
        )
        .then(
          (success: any) => {
            this.service.createdetail = success;
            if (this.service.createdetail.lstprotoentCSDetail !== null) {
              this.dataSource = new MatTableDataSource(
                this.service.createdetail.lstprotoentCSDetail
              );
              if (
                this.service.createdetail.headerStatusValue === "APPR" ||
                this.service.createdetail.headerStatusValue === "POST"
              ) {
                if (
                  this.service.createdetail.msg.infoMessage.msgDescription ===
                  null
                ) {
                  this.service.createdetail.msg.infoMessage.msgDescription =
                    "New Contribution has been submitted successfully";
                }
                this.successalert();
              }
              setTimeout(() => {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }, 400);
            }
            if (
              this.service.createdetail.headerStatusValue !== "APPR" &&
              this.service.createdetail.headerStatusValue !== "POST"
            ) {
              if (
                this.service.createdetail.funMsg != null &&
                this.service.createdetail.funMsg.errorMessage != null &&
                this.service.createdetail.funMsg.errorMessage.length > 0
              ) {
                this.data.constructErrorMsgArr(
                  this.service.createdetail.funMsg.errorMessage
                );
              }
            }
            //this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "350px",
      disableClose: true,
      data: {
        msg: this.service.createdetail.msg.infoMessage.msgDescription,
        Showbtn1: true,
        button1: "Ok",
        Showbtn2: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
      }
    });
  }

  doDelete(val): void {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      width: "350px",
      data: {
        msg: "Are you sure, you want to delete this Employee Contribution Detail",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEmployee(val);
      }
    });
  }

  deleteEmployee(val) {
    this.service.createdetail.protoentCSDetail = val;
    this.fullspinner.empty.next(true);
    this.data
      .postData(
        AppGlobal.apiPaths.contribution.deleteemployee,
        this.service.createdetail
      )
      .then(
        (success: any) => {
          this.service.createdetail = success;
          this.dataSource = new MatTableDataSource(
            this.service.createdetail.lstprotoentCSDetail
          );
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 400);
          this.fullspinner.empty.next(false);
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

  CheckSurpressWarning(value) {
    value === true
      ? (this.service.createdetail.suppressWaringFlag = "Y")
      : (this.service.createdetail.suppressWaringFlag = "N");
  }

  ShowChildButtons() {
    if (this.service.createdetail.csHeaderId > 0) {
      this.ShowChildButton = true;
    }
    this.ShowChildButton = false;
  }

  viewinvoice() {
    if (
      this.service.createdetail.totalContributionAmount === "" ||
      parseFloat(this.service.createdetail.totalContributionAmount) <= 0
    ) {
      this.data.errorMesaageOnly(
        "Not able to generate invoice for NIL CS received."
      );
      return;
    }
    const obj = {
      data: this.service.createdetail.csHeaderId,
    };
    this.fullspinner.empty.next(true);
    this.data.pdf(AppGlobal.apiPaths.contribution.getinvoice, obj).then(
      (success: any) => {
        this.fullspinner.empty.next(false);
        this.openPDFViewer(success);
        this.service.createdetail.totalContributionAmount;
      },
      (error: any) => {
        console.log(error);
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
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
        if (result) {
          // this.logout();
        }
      });
    }
  }

  viewScreen(val) {
    this.service.clearData();
    this.router.navigateByUrl("/app/cs-adjustment/" + val);
  }
}
