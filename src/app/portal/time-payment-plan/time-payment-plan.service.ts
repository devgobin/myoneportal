import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TimePaymentPlanService {
  DDL = {
    DDLPaymentPlanStatusValue: [],
  };
  constructor() {}
  clearData() {}

  TimePaymentPlan = {
    timePaymentId: 0,
    effectiveDate: "",
    submissionDate: "",
    totalInvoiceAmount: "",
    noOfInstallment: 0,
    statusValue: "",
    statusDescription: "",
    invoiceBalanceAmt: "",
    totalRecoveredAmt: "",
    employeeShareAmt: "",
    monthlyInstallmentAmount:"",
    lstProtoentTimePaymentSchedule: [
      {
        timePaymentScheduleId: 0,
        monthlyInstallmentAmt: "",
        installmentDueDate: "",
        invoiceBalanceAmt: "",
        employeeShareAmt: "",
        lstProtoentTimePaymentScheduleDetail: [
          {
            timePaymentSchedulePaymentDetailId: 0,
            timePaymentScheduleId: 0,
            remittanceId: 0,
            paidAmt: "",
            timePaymentInvoiceDetailId: 0,
            protoentViewInvoice: {
              orgName: "",
              invoiceId: 0,
              dueDate: "",
              totalAmount: "",
              generatedTime: "",
              generatedBy: "",
              receiptForm: [0],
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
            },
          },
        ],
      },
    ],
  };

  TimePaymentScedule = {
    timePaymentScheduleId: 0,
    monthlyInstallmentAmt: "",
    installmentDueDate: "",
    invoiceBalanceAmt: "",
    employeeShareAmt: "",
    lstProtoentTimePaymentScheduleDetail: [
      {
        timePaymentSchedulePaymentDetailId: 0,
        timePaymentScheduleId: 0,
        remittanceId: 0,
        paidAmt: "",
        timePaymentInvoiceDetailId: 0,
        protoentViewInvoice: {
          orgName: "",
          invoiceId: 0,
          dueDate: "",
          totalAmount: "",
          generatedTime: "",
          generatedBy: "",
          receiptForm: [0],
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
        },
      },
    ],
  };
}
