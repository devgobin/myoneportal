import { CdkStepper } from "@angular/cdk/stepper";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";
import { SuccessAlertComponent } from "src/app/common/success-alert/success-alert.component";
import { AppGlobal } from "src/app/constants";
import { AppSettingsService } from "src/app/service/app-settings.service";
import { DataService } from "src/app/service/data.service";
import { NewWithdrawalsService } from "./new-withdrawals.service";
export interface PeriodicElement {
  check: string;
  bank: string;
  account: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { check: "", bank: "KVB", account: "5467567567" },
  { check: "", bank: "KVB", account: "5467567567" },
  { check: "", bank: "KVB", account: "5467567567" },
];

@Component({
  selector: "app-new-withdrawal",
  templateUrl: "./new-withdrawal.component.html",
  styleUrls: ["./new-withdrawal.component.scss"],
})
export class NewWithdrawalComponent implements OnInit, OnDestroy {
  pageId = "NWPAG";

  // core
  loadingTrue = false;
  btnClicked = false;
  memberBtnClicked = false;
  errorTrue = false;
  fnpfNo = "";
  fnpfNoEmpty = false;
  fnpfChecked = false;

  BANameRequired = false;
  BANRequired = false;
  bnRequired = false;
  btnaddnewrequired = true;

  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step4Completed = false;
  activeIndex: number;
  @ViewChild("withdrawalSteps", { static: false }) withdrawalSteps: CdkStepper;
  @ViewChild("xtransactionPin", { static: false })
  xtransactionPin;
  paymentdataSource = new MatTableDataSource();
  addpaymentdetail = false;
  id = "";
  addNewBtnText = "Add New";
  addNewBtnShow = false;
  addNewPaymentDetailShow = false;
  mobileLimitError = false;

  paymentdisplayedColumns: string[] = ["check", "bank", "account"];

  constructor(
    public data: DataService,
    public withdrawals: NewWithdrawalsService,
    public fullspinner: FullSpinnerService,
    public router: Router,
    public dialog: MatDialog,
    public appSettingService: AppSettingsService,
    public route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      // fetch your new parameters here, on which you are switching the routes and call ngOnInit()
      this.initialdata();
    });
    this.data.headerName = {
      screenName: "COVID 19 Withdrawal New",
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
          name: "New",
          link: "",
        },
      ],
    };
  }

  ngOnInit(): void {
    // this.initialdata();
  }

  ngOnDestroy(): void {
    this.xtransactionPin.clear();
    this.withdrawals.clearWithdrawal();
  }

  initialdata() {
    this.setAll(true);
    this.data.getData(AppGlobal.apiPaths.withdrawals.initialdata).then(
      (success: any) => {
        success.data.forEach((element) => {
          this.withdrawals.selectParams[element.key] = element.value;
        });

        this.LoadWithdrawalApplicationDetails();
      },
      (error) => {
        this.data.errorMethod(error);
        this.setAll(false);
      }
    );
  }

  LoadWithdrawalApplicationDetails() {
    this.id = this.route.snapshot.paramMap.get("id");
    // console.log(this.id);
    if (this.id) {
      this.withdrawals.xData.withdrawalApplicationId = 0;
    }
    if (this.withdrawals.xData.withdrawalApplicationId > 0) {
      const obj = {
        data: this.withdrawals.xData.withdrawalApplicationId,
      };
      this.data.postData(AppGlobal.apiPaths.withdrawals.open, obj).then(
        (success: any) => {
          this.withdrawals.xData = success;
          this.withdrawals.xData.bankOrgId = parseFloat(success.bankOrgId);
          this.fnpfNo = this.withdrawals.xData.fnpfNo;
          this.LoadDocuments();
          this.paymentdataSource = new MatTableDataSource(
            this.withdrawals.xData.plstPreviuoslyUsedBanks
          );
          this.withdrawals.selectParams.WANewBanks =
            this.withdrawals.xData.plstNewBanks;
          // setTimeout(() => {

          //   console.log(this.withdrawals.xData.bankOrgId);
          // }, 400);
          // this.LoadPaymentDetails(true);
          this.setAll(false);
          this.data.successMesaage(success);
        },
        (error) => {
          this.setAll(false);
          this.data.errorMethod(error);
        }
      );
    } else {
      this.getData();
    }
  }

  getData() {
    this.data.getData(AppGlobal.apiPaths.withdrawals.new).then(
      (success: any) => {
        this.withdrawals.xData = success;
        this.LoadDocuments();
        this.LoadPaymentDetails(false);
        this.setAll(false);
      },
      (error) => {
        this.data.errorMethod(error);
        this.setAll(false);
      }
    );
  }

  LoadDocuments() {
    this.withdrawals.documents = [];
    if (
      this.withdrawals.xData.plstWithdrawalDocuments !== null &&
      this.withdrawals.xData.plstWithdrawalDocuments.length > 0
    ) {
      this.withdrawals.documents =
        this.withdrawals.xData.plstWithdrawalDocuments;
    }
  }

  LoadPaymentDetails(open) {
    let IsPreviouslyChecked = false;
    //ELEMENT_DATA = this.withdrawals.xData.plstPreviuoslyUsedBanks;
    let bankAccountId: number = 0;
    if (this.withdrawals.xData.bankAccountId > 0) {
      bankAccountId = this.withdrawals.xData.bankAccountId;
    }
    this.withdrawals.xData.plstPreviuoslyUsedBanks.forEach((element) => {
      element.check_previous_bank = "N";
      if (bankAccountId > 0 && element.bankAccountId == bankAccountId) {
        element.check_previous_bank = "Y";
        IsPreviouslyChecked = true;
      }
    });

    this.paymentdataSource = new MatTableDataSource(
      this.withdrawals.xData.plstPreviuoslyUsedBanks
    );
    this.withdrawals.selectParams.WANewBanks =
      this.withdrawals.xData.plstNewBanks;

    if (!IsPreviouslyChecked) {
      this.withdrawals.newBank.bankAccountNumber =
        this.withdrawals.xData.bankAccountNumber;
      this.withdrawals.newBank.bankAccountName =
        this.withdrawals.xData.bankAccountName;
      this.withdrawals.newBank.bankName = this.withdrawals.xData.bankName;
      this.withdrawals.newBank.bankOrgRefNo =
        this.withdrawals.xData.bankOrgRefNo;
      if (this.withdrawals.xData.bankOrgId != null) {
        this.withdrawals.newBank.bankOrgId = parseInt(
          this.withdrawals.xData.bankOrgId.toString()
        );
      }
      this.withdrawals.newBank.bankAccountId =
        this.withdrawals.xData.bankAccountId;
      this.btnaddnewrequired = true;

      if (open) {
        this.addpaymentdetail = true;
      } else {
        this.addpaymentdetail = false;
      }
    }
  }

  LoadPaymentDetailsForFNPF() {
    let IsPreviouslyChecked = false;
    //ELEMENT_DATA = this.withdrawals.xData.plstPreviuoslyUsedBanks;
    // let bankAccountId: number = 0;
    // if (this.withdrawals.xData.bankAccountId > 0) {
    //   bankAccountId = this.withdrawals.xData.bankAccountId;
    // }
    // this.withdrawals.xData.plstPreviuoslyUsedBanks.forEach((element) => {
    //   element.check_previous_bank = "N";
    //   if (bankAccountId > 0 && element.bankAccountId == bankAccountId) {
    //     element.check_previous_bank = "Y";
    //     IsPreviouslyChecked = true;
    //   }
    // });

    this.paymentdataSource = new MatTableDataSource(
      this.withdrawals.xData.plstPreviuoslyUsedBanks
    );
    this.withdrawals.selectParams.WANewBanks =
      this.withdrawals.xData.plstNewBanks;

    // if (!IsPreviouslyChecked) {
    //   this.withdrawals.newBank.bankAccountNumber = this.withdrawals.xData.bankAccountNumber;
    //   this.withdrawals.newBank.bankAccountName = this.withdrawals.xData.bankAccountName;
    //   this.withdrawals.newBank.bankName = this.withdrawals.xData.bankName;
    //   this.withdrawals.newBank.bankOrgRefNo = this.withdrawals.xData.bankOrgRefNo;
    //   this.withdrawals.newBank.bankOrgId = this.withdrawals.xData.bankOrgId;
    //   this.withdrawals.newBank.bankAccountId = this.withdrawals.xData.bankAccountId;
    //   this.btnaddnewrequired = true;
    // }
  }

  active(row) {
    this.activeIndex = row;
  }

  GetBankDetails() {
    if (this.withdrawals.newBank.bankOrgId > 0) {
      this.withdrawals.xData.plstNewBanks.forEach((element) => {
        if (element.orgId == this.withdrawals.newBank.bankOrgId) {
          this.withdrawals.newBank.bankOrgId = element.orgId;
          this.withdrawals.newBank.bankName = element.tradeName;
          this.withdrawals.newBank.bankOrgRefNo = element.orgRefNo;
          this.withdrawals.newBank.bankAccountId = 0;
          this.withdrawals.newBank.bankAccountNumber = "";
          this.withdrawals.newBank.bankAccountName = "";
        }
      });
    }
  }

  getPreviousBankDetail(element, checked) {
    console.log("change called");

    this.clearXdataBank();
    this.withdrawals.clearNewbank();
    this.addNewPaymentDetailShow = false;
    this.addNewBtnShow = true;
    if (checked) {
      this.withdrawals.xData.bankAccountNumber = element.accountNumber;
      this.withdrawals.xData.bankAccountName = element.accountName;
      this.withdrawals.xData.bankName = element.bankName;
      this.withdrawals.xData.bankOrgRefNo = element.bankOrgRefNo;
      this.withdrawals.xData.bankOrgId = element.bankOrgId;
      this.withdrawals.xData.bankAccountId = element.bankAccountId;
    }

    if (this.withdrawals.xData.bankOrgId !== 0) {
      this.addNewBtnShow = false;
      this.withdrawals.clearNewbank();
    }

    // console.log(element);
    // console.log(checked);

    // this.btnaddnewrequired = true;

    // this.BANRequired = true;
    // this.withdrawals.xData.plstPreviuoslyUsedBanks.forEach((element) => {
    //   element.check_previous_bank = "N";
    //   if (element.bankAccountId == value.bankAccountId) {
    //     checked === true
    //       ? (element.check_previous_bank = "Y")
    //       : (element.check_previous_bank = "N");

    //     if (element.check_previous_bank === "Y") {
    //       this.withdrawals.xData.bankAccountNumber = element.accountNumber;
    //       this.withdrawals.xData.bankAccountName = element.accountName;
    //       this.withdrawals.xData.bankName = element.bankName;
    //       this.withdrawals.xData.bankOrgRefNo = element.bankOrgRefNo;
    //       this.withdrawals.xData.bankOrgId = element.bankOrgId;
    //       this.withdrawals.xData.bankAccountId = element.bankAccountId;
    //       this.BANRequired = false;
    //       this.btnaddnewrequired = false;
    //     }
    //   }
    // });
  }

  async findFnpf() {
    await this.getMemberDetails().then((res: any) => {
      this.withdrawals.xData = res;
      this.fnpfNo = this.withdrawals.xData.fnpfNo;
      this.LoadPaymentDetailsForFNPF();
      this.fnpfChecked = true;
    });
  }

  async getMemberDetails() {
    return new Promise((resolve, reject) => {
      if (this.fnpfNo === "") {
        this.fnpfNoEmpty = true;
        return;
      }
      this.fnpfNoEmpty = false;
      this.withdrawals.xData.fnpfNo = this.fnpfNo;
      this.memberBtnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.withdrawals.getmemberDetails,
          this.withdrawals.xData
        )
        .then(
          (success: any) => {
            this.memberBtnClicked = false;
            this.setAll(false);
            resolve(success);
          },
          (error) => {
            this.memberBtnClicked = false;
            this.data.errorMethod(error);
            this.setAll(false);
          }
        );
    });
  }

  async saveData(c) {
    // if (!this.fnpfChecked) {
    //   await this.getMemberDetails().then((res: any) => {
    //     this.withdrawals.xData = res;
    //     this.fnpfChecked = true;
    //   });
    // }
    if (c.valid) {
      let errorM: any = false;
      this.withdrawals.documents.forEach((element) => {
        if (element.isMandatory === "Y") {
          if (element.pDocumentFile.fileName === "") {
            errorM = true;
            return;
          }
        }
      });
      if (errorM === true) {
        this.errorTrue = true;
        return;
      }

      this.errorTrue = false;
      this.fnpfNoEmpty = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.withdrawals.xData.fnpfNo = this.fnpfNo;
      this.data
        .postData(AppGlobal.apiPaths.withdrawals.save, this.withdrawals.xData)
        .then(
          (success: any) => {
            // console.log(JSON.stringify(success));
            this.withdrawals.xData = JSON.parse(JSON.stringify(success));
            this.paymentdataSource = new MatTableDataSource(
              this.withdrawals.xData.plstPreviuoslyUsedBanks
            );
            this.withdrawals.selectParams.WANewBanks =
              this.withdrawals.xData.plstNewBanks;
            this.withdrawals.xData.bankOrgId = parseFloat(success.bankOrgId);
            this.withdrawals.xData.bankAccountId = parseFloat(
              success.bankAccountId
            );
            // console.log(this.withdrawals.xData);
            this.fnpfNo = this.withdrawals.xData.fnpfNo;
            this.checkRequireMandatory(
              this.withdrawals.xData.paymentMethodValue,
              false
            );
            this.doChangeConditions();

            this.LoadDocuments();
            this.step1Completed = true;
            this.withdrawalSteps.next();
            this.setAll(false);
          },
          (error) => {
            this.data.errorMethod(error);
            this.setAll(false);
          }
        );
    } else {
      this.errorTrue = true;
      this.fnpfNoEmpty = true;
    }
  }

  submitData(mc) {
    if (mc.valid) {
      this.errorTrue = false;
      this.data.clearErrorMsg();
      if (this.withdrawals.xData.memberConsent === "") {
        this.data.errorMesaageOnly("Member consent is Mandatory.");
        return;
      }

      if (this.withdrawals.xData.transactionPin.length < 4) {
        this.data.errorMesaageOnly("Please enter trasaction PIN.");
        // this.data.openAlert('Please enter trasaction PIN .', 'bg-danger');
        return;
      }

      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(AppGlobal.apiPaths.withdrawals.submit, this.withdrawals.xData)
        .then(
          (success: any) => {
            this.withdrawals.xData = success;
            this.LoadDocuments();
            this.successalert();
            this.setAll(false);
          },
          (error) => {
            this.data.errorMethod(error);
            this.setAll(false);
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  uploadDocument(file, document) {
    if (file.fileType !== "xlsx") {
      document.pDocumentFile.fileType = file.fileType;
      document.pDocumentFile.fileSize = file.fileSize;
      document.pDocumentFile.relativePath = file.relativePath;
      document.pDocumentFile.fileName = file.fileName;
      document.pDocumentFile.istrFileContent = file.istrFileContent;
      const index = this.withdrawals.documents
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
      if (index !== -1) {
        this.withdrawals.documents[index] = document;
      }

      const pindex = this.withdrawals.xData.plstWithdrawalDocuments
        .map((e) => e.documentTypeValue)
        .indexOf(document.documentTypeValue);
      if (pindex !== -1) {
        this.withdrawals.xData.plstWithdrawalDocuments[pindex] = document;
      }
    } else {
      this.data.errorMesaageOnly("Invalid File Type");
    }
  }

  clearFile(document) {
    const index = this.withdrawals.documents
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (index !== -1) {
      if (
        this.withdrawals.documents[index].pDocumentFile !== null &&
        this.withdrawals.documents[index].pDocumentFile.documentFileId > 0
      ) {
        this.withdrawals.documents[index].pDocumentFile.fileType = "";
        this.withdrawals.documents[index].pDocumentFile.fileSize = 0;
        this.withdrawals.documents[index].pDocumentFile.relativePath = "";
        this.withdrawals.documents[index].pDocumentFile.fileName = "";
        this.withdrawals.documents[index].pDocumentFile.uploadbyFullName = "";
        this.withdrawals.documents[index].pDocumentFile.istrFileContent = "";
      } else {
        const obj = {
          documentFileId: 0,
          fileType: "",
          fileSize: 0,
          relativePath: "",
          fileName: "",
          uploadbyFullName: "",
          istrFileContent: "",
          idoObjState: "",
          updateSeq: 0,
        };
        this.withdrawals.documents[index].pDocumentFile = obj;
      }
    }

    const pindex = this.withdrawals.xData.plstWithdrawalDocuments
      .map((e) => e.documentTypeValue)
      .indexOf(document.documentTypeValue);
    if (pindex !== -1) {
      if (
        this.withdrawals.xData.plstWithdrawalDocuments[pindex].pDocumentFile !==
          null &&
        this.withdrawals.xData.plstWithdrawalDocuments[pindex].pDocumentFile
          .documentFileId > 0
      ) {
        this.withdrawals.xData.plstWithdrawalDocuments[
          pindex
        ].pDocumentFile.fileType = "";
        this.withdrawals.xData.plstWithdrawalDocuments[
          pindex
        ].pDocumentFile.fileSize = 0;
        this.withdrawals.xData.plstWithdrawalDocuments[
          pindex
        ].pDocumentFile.relativePath = "";
        this.withdrawals.xData.plstWithdrawalDocuments[
          pindex
        ].pDocumentFile.fileName = "";
        this.withdrawals.xData.plstWithdrawalDocuments[
          pindex
        ].pDocumentFile.uploadbyFullName = "";
        this.withdrawals.xData.plstWithdrawalDocuments[
          pindex
        ].pDocumentFile.istrFileContent = "";
      } else {
        const obj = {
          documentFileId: 0,
          fileType: "",
          fileSize: 0,
          relativePath: "",
          fileName: "",
          uploadbyFullName: "",
          istrFileContent: "",
        };
        this.withdrawals.xData.plstWithdrawalDocuments[pindex].pDocumentFile =
          obj;
      }
    }
  }

  checkMemberConsent(value) {
    value === true
      ? (this.withdrawals.xData.memberConsent = "Y")
      : (this.withdrawals.xData.memberConsent = "N");
  }

  setAll(val) {
    this.btnClicked = val;
    this.loadingTrue = val;
    this.fullspinner.empty.next(val);
  }

  step1Click() {
    this.step1Completed = true;
    this.withdrawalSteps.next();
  }

  step3Click() {
    this.step3Completed = true;
    this.withdrawalSteps.next();
  }
  step4Click() {
    this.step3Completed = true;
    this.withdrawalSteps.next();
  }
  clickPrev() {
    this.withdrawalSteps.previous();
  }

  step2Click() {
    this.step2Completed = true;
    this.withdrawalSteps.next();
  }

  updatePaymentMode(p) {
    if (
      this.withdrawals.xData.paymentMethodValue === null ||
      this.withdrawals.xData.paymentMethodValue === undefined ||
      this.withdrawals.xData.paymentMethodValue === ""
    ) {
      const message = "Members Method of Payment Status is mandatory";
      this.errorTrue = true;
      this.data.errorMesaageOnly(message);
      return;
    }

    if (this.withdrawals.xData.paymentMethodValue === "DRDP") {
      if (this.withdrawals.xData.bankAccountId == 0) {
        if (
          this.withdrawals.newBank.bankOrgId === null ||
          this.withdrawals.newBank.bankOrgId === undefined ||
          this.withdrawals.newBank.bankOrgId === 0
        ) {
          const message = "Please provide bank account details.";
          this.errorTrue = true;
          this.data.errorMesaageOnly(message);
          return;
        } else {
          this.withdrawals.xData.bankOrgId = this.withdrawals.newBank.bankOrgId;
          this.withdrawals.xData.bankName = this.withdrawals.newBank.bankName;
          this.withdrawals.xData.bankOrgRefNo =
            this.withdrawals.newBank.bankOrgRefNo;
          this.withdrawals.xData.bankAccountId = 0;
          this.withdrawals.xData.bankAccountNumber =
            this.withdrawals.newBank.bankAccountNumber;
          this.withdrawals.xData.bankAccountName =
            this.withdrawals.newBank.bankAccountName;
        }

        if (
          this.withdrawals.newBank.bankAccountNumber === null ||
          this.withdrawals.newBank.bankAccountNumber === undefined ||
          this.withdrawals.newBank.bankAccountNumber === ""
        ) {
          const message = "Please provide bank account details.";
          this.errorTrue = true;
          this.data.errorMesaageOnly(message);
          return;
        }
      }
    } else if (this.withdrawals.xData.paymentMethodValue === "MPAI") {
      if (
        this.withdrawals.xData.istrExistingMobileNo != null &&
        this.withdrawals.xData.istrExistingMobileNo != undefined &&
        this.withdrawals.xData.istrExistingMobileNo.length > 0
      ) {
        this.withdrawals.xData.mpaisaMobileNo =
          this.withdrawals.xData.istrExistingMobileNo;
      }

      if (
        this.withdrawals.xData.newMobileNo != null &&
        this.withdrawals.xData.newMobileNo != undefined &&
        this.withdrawals.xData.newMobileNo.length > 0
      ) {
        if (this.withdrawals.xData.newMobileNo.length < 7) {
          this.mobileLimitError = true;
          return;
        } else {
          this.mobileLimitError = false;
        }
        this.withdrawals.xData.mpaisaMobileNo =
          this.withdrawals.xData.newMobileNo;
      }

      if (
        this.withdrawals.xData.mpaisaMobileNo === null ||
        this.withdrawals.xData.mpaisaMobileNo === undefined ||
        this.withdrawals.xData.mpaisaMobileNo === ""
      ) {
        const message = "Please provide mobile number.";
        this.errorTrue = true;
        this.data.errorMesaageOnly(message);
        return;
      }
    }

    this.data.clearErrorMsg();
    if (p.valid) {
      this.errorTrue = false;
      this.fnpfNoEmpty = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(AppGlobal.apiPaths.withdrawals.update, this.withdrawals.xData)
        .then(
          (success: any) => {
            console.log(success);
            this.withdrawals.xData = JSON.parse(JSON.stringify(success));
            this.withdrawals.xData.bankOrgId = parseFloat(success.bankOrgId);
            this.withdrawals.xData.bankAccountId = parseFloat(
              success.bankAccountId
            );
            console.log(this.withdrawals.xData);

            this.checkRequireMandatory(
              this.withdrawals.xData.paymentMethodValue,
              false
            );
            this.doChangeConditions();

            //this.withdrawals.clearNewbank();
            this.step2Completed = true;
            this.withdrawalSteps.next();
            this.setAll(false);
          },
          (error) => {
            this.data.errorMethod(error);
            this.setAll(false);
          }
        );
    } else {
      this.errorTrue = true;
    }
  }

  GetCategoryByEmploymentStatus() {
    this.setAll(true);
    this.data
      .postData(
        AppGlobal.apiPaths.withdrawals.loadcategorybyemploymentstatus,
        this.withdrawals.xData
      )
      .then(
        (success: any) => {
          this.withdrawals.xData = success;
          console.log(this.withdrawals.xData.categoryDescription.length);
          this.setAll(false);
        },
        (error) => {
          this.data.errorMethod(error);
          this.setAll(false);
        }
      );
  }

  checkRequireMandatory(val, clear) {
    if (clear) {
      this.clearXdataBank();
      this.withdrawals.clearNewbank();
      this.withdrawals.xData.newMobileNo = "";
    }
    this.addNewBtnShow = false;
    this.addNewPaymentDetailShow = false;
    this.BANameRequired = false;
    this.BANRequired = false;
    this.bnRequired = false;
    switch (val) {
      case "DRDP":
        this.addNewBtnShow = true;
        this.addNewBtnText = "Add New Bank Account";
        this.BANameRequired = true;
        this.BANRequired = true;
        this.bnRequired = true;
        break;
      case "MPAI":
        this.addNewBtnShow = true;
        this.addNewBtnText = "Add New MPaisa Account";
        break;

      default:
        break;
    }

    // console.log(val);
    // this.BANameRequired = false;
    // this.BANRequired = false;
    // this.bnRequired = false;
    // if (val === "DRDP") {
    //   this.BANameRequired = true;
    //   this.BANRequired = true;
    //   this.bnRequired = true;
    // }

    // if (val === "MPAI") {
    // }

    // if (val !== "DRDP") {
    //   this.btnaddnewrequired = true;
    // }
  }
  successalert() {
    const dialogRef = this.dialog.open(SuccessAlertComponent, {
      width: "550px",
      disableClose: true,
      data: {
        msg: this.withdrawals.xData.infoMsg,
        Showbtn1: true,
        button1: "New Withdrawal",
        Showbtn2: true,
        button2: "View Withdrawals",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.registerNewApplication();
      } else if (result === false) {
        this.navigateProfile();
      }
    });
  }
  navigateProfile() {
    this.router.navigateByUrl("/app/withdrawals");
  }

  registerNewApplication() {
    this.fnpfNo = "";
    this.withdrawals.xData.transactionPin = "";
    this.withdrawals.clearWithdrawal();
    this.step1Completed = false;
    this.step2Completed = false;
    this.step3Completed = false;
    this.step4Completed = false;
    this.xtransactionPin.clear();
    this.withdrawalSteps.reset();
    this.getData();
  }

  addNewPaymentDetail() {
    this.clearXdataBank();
    this.withdrawals.clearNewbank();
    this.BANameRequired = false;
    this.BANRequired = false;
    this.bnRequired = false;
    this.addNewPaymentDetailShow = true;
  }
  clearXdataBank() {
    this.withdrawals.xData.bankAccountNumber = "";
    this.withdrawals.xData.bankAccountName = "";
    this.withdrawals.xData.bankName = "";
    this.withdrawals.xData.bankOrgRefNo = "";
    this.withdrawals.xData.bankOrgId = 0;
    this.withdrawals.xData.bankAccountId = 0;
    this.withdrawals.xData.mpaisaMobileNo = "";
  }

  doChangeConditions() {
    setTimeout(() => {
      if (
        this.withdrawals.xData.paymentMethodValue === "DRDP" &&
        this.withdrawals.xData.bankAccountId === 0 &&
        this.withdrawals.xData.bankOrgId > 0
      ) {
        this.addNewPaymentDetailShow = true;
        this.withdrawals.newBank.bankAccountNumber =
          this.withdrawals.xData.bankAccountNumber;
        this.withdrawals.newBank.bankAccountName =
          this.withdrawals.xData.bankAccountName;
        this.withdrawals.newBank.bankName = this.withdrawals.xData.bankName;
        this.withdrawals.newBank.bankOrgRefNo =
          this.withdrawals.xData.bankOrgRefNo;
        this.withdrawals.newBank.bankOrgId = this.withdrawals.xData.bankOrgId;
        this.withdrawals.newBank.bankAccountId =
          this.withdrawals.xData.bankAccountId;
      } else if (
        this.withdrawals.xData.paymentMethodValue === "DRDP" &&
        this.withdrawals.xData.bankOrgId > 0
      ) {
        this.addNewBtnShow = false;
      }

      if (
        this.withdrawals.xData.paymentMethodValue === "MPAI" &&
        this.withdrawals.xData.newMobileNo !== ""
      ) {
        this.addNewPaymentDetailShow = true;
      }
    }, 200);
  }
}
