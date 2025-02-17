import { ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { EMPTY } from "rxjs";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { AppGlobal } from "src/app/constants";
import { DataService } from "src/app/service/data.service";
import { organizationcontactdetailservice } from "../organization-contact-detail/organization-contact-detail.service";
import { organizationcontactservice } from "./organization-contact.service";
import { NgForm } from "@angular/forms";
import { viewcontactservice } from "../view-contact/view-contact.service";
import { MatSort } from "@angular/material/sort";
import { FilterButtonComponent } from "src/app/common/filter-button/filter-button.component";

@Component({
  selector: "app-organization-contact",
  templateUrl: "./organization-contact.component.html",
  styleUrls: ["./organization-contact.component.scss"],
})
export class OrganizationContactComponent implements OnInit {
  pageId = "ORGCL";
  showEmpty = false;
  searchParams = {
    istrfirstName: "",
    istrmiddleName: "",
    istrlastName: "",
    idtmbeginDate: "",
    idtmendDate: "",
    istrRegistrationStatusValue: "",
    totalCount: 0,
    pageSize: 10,
    pageNumber: 1,
    isortcolumn: "",
    isortorder: true,
    ascending: true,
  };
  isOpen = false;
  activeIndex: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: false }) matsort: MatSort;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("l", { static: false }) public l: NgForm;
  @ViewChild(FilterButtonComponent, { static: false })
  filterBtn: FilterButtonComponent;
  pageIndex = 0;
  pageSize = 10;
  searchclearflag: boolean = false;
  successTrue = false;
  loadingTrue = false;
  pendingdataSource: any = new MatTableDataSource();
  pendingdisplayedColumns: string[] = [
    "firstName",
    "contactTypeDescription",
    "contactNo",
    "emailId",
    "startDate",
    "endDate",
    "statusValue",
    "action",
  ];
  approveddataSource: any = new MatTableDataSource();
  approveddisplayedColumns: string[] = [
    "firstName",
    "fnpfNo",
    "commaSeparatedContactType",
    "contactNo",
    "emailId",
    "registeredStatus",
    "action",
  ];

  constructor(
    public router: Router,
    public contactservice: organizationcontactservice,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public contactdetailservice: organizationcontactdetailservice,
    public editcontactdetailservice: viewcontactservice
  ) {
    this.data.headerName = {
      screenName: "Organization Contact",
      paths: [
        {
          name: "Home",
          link: "/app",
        },
        {
          name: "Organization Contact",
          link: "",
        },
      ],
    };
    if (this.data.isMobile) {
      this.approveddisplayedColumns = [
        "firstName",
        "commaSeparatedContactType",
        "contactNo",
        "registeredStatus",
      ];
    }
    if (this.data.isMobile) {
      this.pendingdisplayedColumns = [
        "firstName",
        "contactTypeDescription",
        "contactNo",
        "statusValue",
      ];
    }
  }

  ngOnInit(): void {
    this.viewApproval(true);
  }

  getSearchParams() {
    // this.fullspinner.empty.next(true);
    this.data.getData(AppGlobal.apiPaths.contact.getsearch).then(
      (success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = 1;
        this.searchParams.pageSize = 10;
        this.getData(true);
      },
      (error: any) => {
        this.data.errorMethod(error);
        // this.fullspinner.empty.next(false);
      }
    );
  }

  getData(val) {
    this.data.clearErrorMsg();
    this.fullspinner.empty.next(true);
    // this.loadingTrue = val;
    this.showEmpty = false;
    this.data
      .postData(AppGlobal.apiPaths.contact.search, this.searchParams)
      .then(
        (success: any) => {
          this.searchParams.totalCount = success.totalCount;
          // this.loadingTrue = false;
          this.fullspinner.empty.next(false);
          this.pendingdataSource = new MatTableDataSource(success.searchResult);
          console.log(this.pendingdataSource);
          // setTimeout(() => {
          //   this.matsort.active = this.searchParams.isortcolumn;
          //   this.matsort.direction = this.searchParams.isortorder
          //     ? "asc"
          //     : "desc";
          // }, 500);

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
          // this.loadingTrue = false;
          this.fullspinner.empty.next(false);
        }
      );
  }

  pageChanged(event) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize;
    this.getData(true);
  }
  sortData(event) {
    this.searchParams.isortcolumn = event.active;
    this.searchParams.isortorder = event.direction === "asc" ? true : false;
    this.getData(true);
    console.log(event);
  }
  doSearch() {
    this.searchParams.pageNumber = 1;
    this.pageIndex = 0;
    // this.paginator.pageIndex = 0;
    this.isOpen = false;
    this.filterBtn.close();
    this.getData(true);
  }

  doClear() {
    this.searchclearflag = true;
    this.searchParams.istrfirstName = "";
    this.searchParams.istrmiddleName = "";
    this.searchParams.istrlastName = "";
    this.searchParams.idtmbeginDate = "";
    this.searchParams.idtmendDate = "";
    this.doSearch();
  }

  NewContact() {
    this.contactdetailservice.contact.employerContactId = 0;

    this.router.navigateByUrl("/app/edit-organization-contact");
  }

  ViewContact(Contact) {
    this.editcontactdetailservice.clearContact();
    this.contactdetailservice.contact.employerContactId =
      Contact.employerContactId;
    if (
      Contact.registrationStatusValue === "PENRG" ||
      Contact.registrationStatusValue === "CANCL" ||
      Contact.registrationStatusValue === "REGIS"
    ) {
      this.router.navigateByUrl("/app/edit-organization-contact");
    } else {
      this.editcontactdetailservice.contact.employerContactId =
        Contact.employerContactId;
      this.router.navigateByUrl("/app/view-contact");
    }
  }

  viewApproval(val) {
    this.fullspinner.empty.next(true);
    this.data.clearErrorMsg();
    this.isOpen = false;
    this.loadingTrue = val;
    this.showEmpty = false;
    this.data.getData(AppGlobal.apiPaths.contact.viewapproval).then(
      (success: any) => {
        this.searchParams.totalCount = success.totalCount;
        this.approveddataSource = new MatTableDataSource(success.lstOrgContact);
        setTimeout(() => {
          this.approveddataSource.paginator = this.paginator;
          this.approveddataSource.sort = this.sort;
          this.approveddataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case "firstName":
                console.log(item.person.firstName);
                return item.person.firstName;
              case "fnpfNo":
                return item.person.fnpfNo;
              default:
                return item[property];
            }
          };
        }, 300);
        this.loadingTrue = false;
        this.fullspinner.empty.next(false);
        if (success.lstOrgContact.length != 0) {
          const xdata = {
            msg: {
              infoMessage: {
                msgDescription: "List executed successfully.",
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
        this.fullspinner.empty.next(false);
        this.loadingTrue = false;
      }
    );
  }

  active(row) {
    this.activeIndex = row;
  }

  tabChanged(event) {
    switch (event.index) {
      case 0:
        this.viewApproval(true);
        break;
      default:
        this.getSearchParams();
        break;
    }
    console.log(event);
  }
}
