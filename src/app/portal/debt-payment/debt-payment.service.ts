import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DebtPaymentService {
  constructor() {}
  initialData = {
    DDLInvoicePaymentStatus: [],
    DDLMonthValue: [],
    DDLInvoiceStatusValue: [],
    DDLTypeValue: [],
  };
  invoicepayment = {
    invoicePaymentId: 0,
    orgRefNo: "",
    totalInvoiceCount: 0,
    totalInvoicePaymentAmount: "",
    statusId: 0,
    statusValue: "",
    paymentDate: "",
    msg: {
      infoMessage: {
        msgID: 0,
        msgType: 0,
        msgDescription: "",
      },
      errorMessage: [
        {
          msgID: 0,
          msgType: 0,
          msgDescription: "",
        },
      ],
      hasError: true,
    },
    idoObjState: "",
    updateSeq: 0,
    iprotoInvoicePaymentDetail: {
      invoicePaymentDetailId: 0,
      invoicePaymentId: 0,
      invoiceId: 0,
      balanceAmount: "",
      invoiceAmountToPay: "",
      remittanceId: 0,
      msg: {
        infoMessage: {
          msgID: 0,
          msgType: 0,
          msgDescription: "",
        },
        errorMessage: [
          {
            msgID: 0,
            msgType: 0,
            msgDescription: "",
          },
        ],
        hasError: true,
      },
      idoObjState: "",
      updateSeq: 0,
      iProtoentViewInvoice: {
        orgName: "",
        invoiceId: 0,
        dueDate: "",
        totalAmount: "",
        generatedTime: "",
        generatedBy: "",
        msg: {
          infoMessage: {
            msgID: 0,
            msgType: 0,
            msgDescription: "",
          },
          errorMessage: [
            {
              msgID: 0,
              msgType: 0,
              msgDescription: "",
            },
          ],
          hasError: true,
        },
        protoentAddress: {
          personId: 0,
          orgId: 0,
          addressId: 0,
          line1: "",
          line2: "",
          city: "",
          province: "",
          source: "",
          addressType: "",
          status: "",
          countryValue: "",
          countryDescription: "",
          island: "",
          createdDate: "",
          addressTypeDescription: "",
        },
        invoiceDate: "",
        paidDate: "",
        statusDescription: "",
        invoiceTypeDescription: "",
        balanceAmount: "",
        paidAmount: "",
        csMonth: "",
        csYear: 0,
        invoiceStatusId: 0,
        invoiceStatusValue: "",
        invoiceTypeId: 0,
        invoiceTypeValue: "",
        csMonthDescription: "",
        isSelected: "",
        isAddedForPayment: "",
      },
    },
    ilstprotoInvoicePaymentDetail: [],
    iprotoInvoicePaymentTransaction: {
      invoicePaymentTransactionId: 0,
      invoicePaymentId: 0,
      paymentTransactionId: 0,
      statusId: 0,
      statusValue: "",
      transactionAmount: "",
      msg: {
        infoMessage: {
          msgID: 0,
          msgType: 0,
          msgDescription: "",
        },
        errorMessage: [
          {
            msgID: 0,
            msgType: 0,
            msgDescription: "",
          },
        ],
        hasError: true,
      },
      idoObjState: "",
      updateSeq: 0,
      paymentUrl: "",
    },
    lstProtoentViewInvoice: [],
    totalPayableAmount: "",
    totalBalanceAmount: "",
    statusDescription: "",
    userId: "",
    orgId: 0,
  };
}
