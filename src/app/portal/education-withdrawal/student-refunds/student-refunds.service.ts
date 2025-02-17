import { Injectable } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";

@Injectable({
  providedIn: "root",
})
export class StudentRefundsService {
  unclaimedWithdrawalRefundId = 0;
  unclaimedWithdrawalRefundDetailId = 0;
  loadingTrue = false;
  btnClicked = false;
  errorTrue = false;
  constructor(public fullspinner: FullSpinnerService) {}
  unClaimedWithdrawal = {
    unclaimedWithdrawalRefundId: 0,
    refundDate: "",
    statusId: 0,
    statusValue: "",
    idoObjState: "",
    updateSeq: 0,
    totalRefundAmount: "",
    iProtoUnclaimedWithdrawalRefundDetail: {
      unclaimedWithdrawalRefundDetailId: 0,
      unclaimedWithdrawalRefundId: 0,
      withdrawalAppplicationId: 0,
      invoiceNo: "",
      studentId: "",
      studentFirstName: "",
      studentMiddleName: "",
      studentLastName: "",
      totalInvoiceAmount: "",
      totalReceivedAmount: "",
      refundAmount: "",
      balanceAmount: "",
      batchNo: 0,
      studentPersonId: 0,
      idoObjState: "",
      updateSeq: 0,
      withdrawalPaymentModeId: 0,
      remittanceId: 0,
      recipientOrgId: 0,
      recipientOrgRefNo: "",
      withdrawalStatusDescription: "",
      postingStatusId: 0,
      postingStatusValue: "",
      postingStatusDescription: "",
      isSelectedForPosting: "",
      memberFnpfId: "",
    },
    ilstProtoUnclaimedWithdrawalRefundDetail: [],
    iProtoUnclaimedWithdrawalRefundDocument: {
      unclaimedWithdrawalRefundDocumentId: 0,
      unclaimedWithdrawalRefundId: 0,
      documentTypeId: 0,
      documentTypeValue: "",
      contentServerDocId: 0,
      documentFileId: 0,
      isMandatory: "",
      idoObjState: "",
      updateSeq: 0,
      pDocumentFile: {
        documentFileId: 0,
        fileType: "",
        fileSize: 0,
        relativePath: "",
        fileName: "",
        uploadbyFullName: "",
        istrFileContent: "",
        idoObjState: "",
        updateSeq: 0,
      },
      documentTypeDescription: "",
    },
    orgId: 0,
    referenceNo: "",
    statusDescription: "",
  };
  initialData = {
    DDLStatus: [],
    DDLPostingStatus: [],
  };
  setAll(val) {
    this.btnClicked = val;
    this.loadingTrue = val;
    this.fullspinner.empty.next(val);
  }
}
