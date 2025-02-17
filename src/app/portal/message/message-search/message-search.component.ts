import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { GeneralService } from "src/app/service/general.service";
import { flattenDiagnosticMessageText } from "typescript";
import { MessageService } from "../message.service";
import { RecievedMessageDetailComponent } from "../recieved-message-detail/recieved-message-detail.component";
import { SendMeesageDetailComponent } from "../send-meesage-detail/send-meesage-detail.component";

@Component({
  selector: "app-message-search",
  templateUrl: "./message-search.component.html",
  styleUrls: ["./message-search.component.scss"],
})
export class MessageSearchComponent implements OnInit {
  pageId = "MSGSR";
  showEmpty = false;
  receivedFilter = false;
  sentFilter = true;
  id = "0";
  senddataSource: any = new MatTableDataSource();
  senddisplayedColumns: string[] = [
    "sendOrRecieveDate",
    "category",
    "content",
    "sendStatus",
    "action",
  ];

  receiveddataSource: any = new MatTableDataSource();
  receiveddisplayedColumns: string[] = [
    "sendOrRecieveDate",
    "category",
    "content",
    "receiveStatus",
    "action",
  ];

  searchParams = {
    messageId: 0,
    messageTypeValue: "",
    sendFromDate: "",
    sendToDate: "",
    receivedFromDate: "",
    receivedToDate: "",
    messageStatusValue: "",
    deliveryStatusValue: "",
  };

  viewAppointmentParams = {
    AppointmentStatus: [],
  };
  isOpen = false;
  activeIndex: number;
  searchclearflag: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  pageIndex = 0;
  pageSize = 10;
  loadingTrue = false;
  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public service: MessageService,
    public generalservice: GeneralService,
    public fullspinner: FullSpinnerService,
    public route: ActivatedRoute
  ) {
    this.data.headerName = {
      screenName: "Message",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Message",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.senddisplayedColumns = [
        "sendOrRecieveDate",
        "category",
        "content",
        "sendStatus",
      ];
    }
    if (this.data.isMobile) {
      this.receiveddisplayedColumns = [
        "sendOrRecieveDate",
        "category",
        "content",
        "receiveStatus",
      ];
    }
    this.route.paramMap.subscribe((params) => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.initialdata();
    });
  }

  ngOnInit(): void {
    // this.initialdata();
  }

  initialdata() {
    this.fullspinner.empty.next(true);
    let id = this.route.snapshot.paramMap.get("id");
    console.log(id);
    if (id !== null) {
      this.id = id;
    }
    this.data.getData(AppGlobal.apiPaths.message.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.viewAppointmentParams[element.key] = element.value;
        });
        this.fullspinner.empty.next(false);
        this.getSearchParams();
      },
      (error) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  getSearchParams() {
    this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.message.getsearch).then(
      (success: any) => {
        this.searchParams = success;
        this.fullspinner.empty.next(false);
        if (this.id === "0") {
          this.getSendData(true);
        } else {
          this.getReceivedData(true);
        }
      },
      (error: any) => {
        this.data.errorMethod(error);
        this.fullspinner.empty.next(false);
      }
    );
  }

  getSendData(val) {
    this.data.clearErrorMsg();
    if (
      this.searchParams.sendFromDate !== "" &&
      this.searchParams.sendFromDate !== null &&
      this.searchParams.sendFromDate !== undefined &&
      this.searchParams.sendToDate !== "" &&
      this.searchParams.sendToDate !== null &&
      this.searchParams.sendToDate !== undefined
    ) {
      if (this.searchParams.sendFromDate > this.searchParams.sendToDate) {
        this.data.errorMesaageOnly("From Date must be less than To Date");
        return;
      }
    }
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(val);
    this.data
      .postData(AppGlobal.apiPaths.message.getallSend, this.searchParams)
      .then(
        (success: any) => {
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.senddataSource = new MatTableDataSource(
            success.ilstProtoAppointmentMessageSearchhResultset
          );
          setTimeout(() => {
            this.senddataSource.paginator = this.paginator;
            this.senddataSource.sort = this.sort;
            //this.senddataSource.sortingDataAccessor = (item, property) => {};
            //this.dataSource.sort.sort({ id: 'employmentStartDate', start: 'desc', disableClear: false });
          }, 400);
          this.getunreadmessagecount();
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
          } else if (
            success.ilstProtoAppointmentMessageSearchhResultset.length != 0
          ) {
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

  getReceivedData(val) {
    this.data.clearErrorMsg();
    this.loadingTrue = val;
    this.showEmpty = false;
    this.fullspinner.empty.next(val);
    this.data
      .postData(AppGlobal.apiPaths.message.getallreceived, this.searchParams)
      .then(
        (success: any) => {
          this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.receiveddataSource = new MatTableDataSource(
            success.ilstProtoAppointmentMessageSearchhResultset
          );
          setTimeout(() => {
            this.receiveddataSource.paginator = this.paginator;
            this.receiveddataSource.sort = this.sort;
          }, 400);
          this.getunreadmessagecount();
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
          } else if (
            success.ilstProtoAppointmentMessageSearchhResultset.length != 0
          ) {
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
          this.fullspinner.empty.next(false);
          this.data.errorMethod(error);
          this.loadingTrue = false;
        }
      );
  }

  active(row) {
    this.activeIndex = row;
  }

  newSend() {
    this.service.messageId = 0;
    const dialogRef = this.dialog.open(SendMeesageDetailComponent, {
      width: "1000px",
      height: "480px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getSearchParams();
    });
  }

  openSend(val) {
    this.service.messageId = val;
    const dialogRef = this.dialog.open(SendMeesageDetailComponent, {
      width: "1000px",
      height: "480px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getSendData(true);
    });
  }

  openRecieve(val) {
    this.service.messageId = val;
    const dialogRef = this.dialog.open(RecievedMessageDetailComponent, {
      width: "400px",
      height: "450px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getReceivedData(true);
    });
  }

  tabChanged(event) {
    switch (event.index) {
      case 0:
        this.sentFilter = true;
        this.receivedFilter = false;
        this.getSendData(true);
        break;
      case 1:
        this.sentFilter = false;
        this.receivedFilter = true;
        this.getReceivedData(true);
        break;
    }
  }

  dosentSearch() {
    this.isOpen = false;
    this.filterBtn.close();
    this.getSendData(true);
  }

  doreceivedSearch() {
    this.isOpen = false;
    this.filterBtn.close();
    this.getReceivedData(true);
  }

  dosentClear() {
    this.searchclearflag = true;
    this.searchParams = {
      messageId: 0,
      messageTypeValue: "",
      sendFromDate: "",
      sendToDate: "",
      receivedFromDate: "",
      receivedToDate: "",
      messageStatusValue: "",
      deliveryStatusValue: "",
    };
    this.dosentSearch();
  }

  doreceivedClear() {
    this.searchclearflag = true;
    this.searchParams = {
      messageId: 0,
      messageTypeValue: "",
      sendFromDate: "",
      sendToDate: "",
      receivedFromDate: "",
      receivedToDate: "",
      messageStatusValue: "",
      deliveryStatusValue: "",
    };
    this.doreceivedSearch();
  }

  getunreadmessagecount() {
    this.data
      .getData(AppGlobal.apiPaths.message.getunreadmessagecount)
      .then((success: any) => {
        this.generalservice.userData.totalUnreadMessageCount = success.data;
      });
  }
}
