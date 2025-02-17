import { Injectable } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";

@Injectable({
  providedIn: "root",
})
export class BulkInvoiceService {
  bulkInvoiceUploadId = 0;
  appBulkInvoiceUploadId = 0;
  loadingTrue = false;
  btnClicked = false;
  errorTrue = false;
  constructor(public fullspinner: FullSpinnerService) {}
  bulkInvoiceUpload = {
    appBulkInvoiceUploadId: 0,
    orgId: 0,
    orgRefNo: "",
    employerPortalUserId: 0,
    documentFileId: 0,
    uploadedDatetime: "",
    statusId: 0,
    statusValue: "",
    countOfInvoices: 0,
    statusDescription: "",
    pdocumentFile: {
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
    ilstentBulkInvoiceUploadDetail: [
      {
        appBulkInvoiceUploadDetailId: 0,
        appBulkInvoiceUploadId: 0,
        studentId: 0,
        studentName: "",
        brn: "",
        dob: "",
        termId: 0,
        termValue: "",
        termDescription: "",
        year: 0,
        invoiceNumber: "",
        invoiceDate: "",
        program: "",
        totalInvoiceAmount: "",
        statusId: 0,
        statusValue: "",
        statusDescription: "",
      },
    ],
    ientBulkInvoiceUploadDetail: {
      appBulkInvoiceUploadDetailId: 0,
      appBulkInvoiceUploadId: 0,
      studentId: 0,
      studentName: "",
      brn: "",
      dob: "",
      termId: 0,
      termValue: "",
      termDescription: "",
      year: 0,
      invoiceNumber: "",
      invoiceDate: "",
      program: "",
      totalInvoiceAmount: "",
      statusId: 0,
      statusValue: "",
      statusDescription: "",
    },
  };
  initialData = {
    BulkInvoiceTerm: [],
    InvoiceStatus: [],
  };
  setAll(val) {
    this.btnClicked = val;
    this.loadingTrue = val;
    this.fullspinner.empty.next(val);
  }
  clearNewFile() {
    this.bulkInvoiceUpload = {
      appBulkInvoiceUploadId: 0,
      orgId: 0,
      orgRefNo: "",
      employerPortalUserId: 0,
      documentFileId: 0,
      uploadedDatetime: "",
      statusId: 0,
      statusValue: "",
      countOfInvoices: 0,
      statusDescription: "",
      pdocumentFile: {
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
      ilstentBulkInvoiceUploadDetail: [
        {
          appBulkInvoiceUploadDetailId: 0,
          appBulkInvoiceUploadId: 0,
          studentId: 0,
          studentName: "",
          brn: "",
          dob: "",
          termId: 0,
          termValue: "",
          termDescription: "",
          year: 0,
          invoiceNumber: "",
          invoiceDate: "",
          program: "",
          totalInvoiceAmount: "",
          statusId: 0,
          statusValue: "",
          statusDescription: "",
        },
      ],
      ientBulkInvoiceUploadDetail: {
        appBulkInvoiceUploadDetailId: 0,
        appBulkInvoiceUploadId: 0,
        studentId: 0,
        studentName: "",
        brn: "",
        dob: "",
        termId: 0,
        termValue: "",
        termDescription: "",
        year: 0,
        invoiceNumber: "",
        invoiceDate: "",
        program: "",
        totalInvoiceAmount: "",
        statusId: 0,
        statusValue: "",
        statusDescription: "",
      },
    };
  }
}
