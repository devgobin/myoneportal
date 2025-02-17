import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PortalComponent } from "./portal.component";

const routes: Routes = [
  {
    path: "",
    component: PortalComponent,
    children: [
      { path: "", redirectTo: "/app/dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      /*****contribution*****/
      {
        path: "new-contribution",
        loadChildren: () =>
          import(
            "./contribution/new-contribution/new-contribution/new-contribution.module"
          ).then((m) => m.NewContributionModule),
      },
      {
        path: "new-contribution/:id",
        loadChildren: () =>
          import(
            "./contribution/new-contribution/new-contribution/new-contribution.module"
          ).then((m) => m.NewContributionModule),
      },
      {
        path: "view-submitted-contribution",
        loadChildren: () =>
          import(
            "./contribution/view-submit-contribution/view-submitted-contribution/view-submitted-contribution.module"
          ).then((m) => m.ViewSubmittedContributionModule),
      },
      {
        path: "view-submitted-contribution-details",
        loadChildren: () =>
          import(
            "./contribution/view-submit-contribution/view-submitted-contribution-detail/view-submitted-contribution-detail.module"
          ).then((m) => m.ViewSubmittedContributionDetailModule),
      },
      {
        path: "cs-adjustment",
        loadChildren: () =>
          import(
            "./cs-adjustment/cs-adjustment-search/cs-adjustment-search.module"
          ).then((m) => m.CsAdjustmentSearchModule),
      },
      {
        path: "cs-adjustment/:id",
        loadChildren: () =>
          import(
            "./cs-adjustment/cs-adjustment-search/cs-adjustment-search.module"
          ).then((m) => m.CsAdjustmentSearchModule),
      },
      {
        path: "cs-adjustment-detail",
        loadChildren: () =>
          import(
            "./cs-adjustment/cs-adjustment-detail/cs-adjustment-detail.module"
          ).then((m) => m.CsAdjustmentDetailModule),
      },
      {
        path: "cs-adjustment-detail/:id",
        loadChildren: () =>
          import(
            "./cs-adjustment/cs-adjustment-detail/cs-adjustment-detail.module"
          ).then((m) => m.CsAdjustmentDetailModule),
      },
      {
        path: "suspense",
        loadChildren: () =>
          import("./suspense/suspense-search/suspense-search.module").then(
            (m) => m.SuspenseSearchModule
          ),
      },
      {
        path: "suspense-detail",
        loadChildren: () =>
          import("./suspense/suspense-detail/suspense-detail.module").then(
            (m) => m.SuspenseDetailModule
          ),
      },
      {
        path: "generate-cs-file",
        loadChildren: () =>
          import(
            "./contribution/generate-cs-file/generate-cs-file.module"
          ).then((m) => m.GenerateCsFileModule),
      },
      {
        path: "contribution-schedule-file-upload",
        loadChildren: () =>
          import(
            "./contribution/generate-upload-cs-file/contribution-schedule-file-upload/contribution-schedule-file-upload.module"
          ).then((m) => m.ContributionScheduleFileUploadModule),
      },
      {
        path: "contribution-schedule-file-upload-details",
        loadChildren: () =>
          import(
            "./contribution/generate-upload-cs-file/contribution-schedule-file-upload-details/contribution-schedule-file-upload-details.module"
          ).then((m) => m.ContributionScheduleFileUploadDetailsModule),
      },
      {
        path: "incomplete-cs-submission",
        loadChildren: () =>
          import(
            "./contribution/incomplete-cs-submission/incomplete-cs-submission.module"
          ).then((m) => m.IncompleteCsSubmissionModule),
      },
      {
        path: "outstanding-contribution",
        loadChildren: () =>
          import(
            "./contribution/outstanding-contribution/outstanding-contribution.module"
          ).then((m) => m.OutstandingContributionModule),
      },
      /*****Payments*****/
      {
        path: "payments",
        loadChildren: () =>
          import("./payments/payment-made/payment-made.module").then(
            (m) => m.PaymentMadeModule
          ),
      },
      {
        path: "invoices",
        loadChildren: () =>
          import("./payments/view-invoice/view-invoice.module").then(
            (m) => m.ViewInvoiceModule
          ),
      },
      /*****Hosuing Assitance*****/
      {
        path: "housing-assistance",
        loadChildren: () =>
          import(
            "./housing-assitance/housing-assistance-search/housing-assistance-search.module"
          ).then((m) => m.HousingAssistanceSearchModule),
      },
      {
        path: "housing-assitance/eligibility-check",
        loadChildren: () =>
          import(
            "./housing-assitance/eligibility-check/eligibility-check.module"
          ).then((m) => m.EligibilityCheckModule),
      },
      {
        path: "housing-assitance/application",
        loadChildren: () =>
          import(
            "./housing-assitance/ha-application/ha-application.module"
          ).then((m) => m.HaApplicationModule),
      },
      /*****withdrawal*****/
      {
        path: "withdrawals",
        loadChildren: () =>
          import("./withdrawals/withdrawals-list/withdrawals-list.module").then(
            (m) => m.WithdrawalsListModule
          ),
      },
      {
        path: "withdrawal-new",
        loadChildren: () =>
          import("./withdrawals/new-withdrawal/new-withdrawal.module").then(
            (m) => m.NewWithdrawalModule
          ),
      },
      {
        path: "withdrawal-new/:id",
        loadChildren: () =>
          import("./withdrawals/new-withdrawal/new-withdrawal.module").then(
            (m) => m.NewWithdrawalModule
          ),
      },
      /*****Employees*****/
      {
        path: "employee-list",
        loadChildren: () =>
          import("./employees/employee-list/employee-list.module").then(
            (m) => m.EmployeeListModule
          ),
      },
      {
        path: "new-member-registration",
        loadChildren: () =>
          import(
            "./employees/new-member-registration/new-member-registration.module"
          ).then((m) => m.NewMemberRegistrationModule),
      },
      {
        path: "new-member-registration/:id",
        loadChildren: () =>
          import(
            "./employees/new-member-registration/new-member-registration.module"
          ).then((m) => m.NewMemberRegistrationModule),
      },
      {
        path: "incomplete-member-registration",
        loadChildren: () =>
          import(
            "./employees/incomplete-member-registration/incomplete-member-registration.module"
          ).then((m) => m.IncompleteMemberRegistrationModule),
      },
      /*****My Company*****/
      {
        path: "company-profile",
        loadChildren: () =>
          import("./my-company/company-profile/company-profile.module").then(
            (m) => m.CompanyProfileModule
          ),
      },
      {
        path: "organization-contact-list",
        loadChildren: () =>
          import(
            "./my-company/contact-management/organization-contact/organization-contact.module"
          ).then((m) => m.OrganizationContactModule),
      },
      {
        path: "edit-organization-contact",
        loadChildren: () =>
          import(
            "./my-company/contact-management/organization-contact-detail/organization-contact-detail.module"
          ).then((m) => m.OrganizationContactDetailModule),
      },
      {
        path: "view-contact",
        loadChildren: () =>
          import(
            "./my-company/contact-management/view-contact/view-contact.module"
          ).then((m) => m.ViewContactModule),
      },
      /*****My Profile *****/
      {
        path: "profile-detail",
        loadChildren: () =>
          import("./my-profile/profile-detail/profile-detail.module").then(
            (m) => m.ProfileDetailModule
          ),
      },
      {
        path: "reset-email",
        loadChildren: () =>
          import("./my-profile/reset-email/reset-email.module").then(
            (m) => m.ResetEmailModule
          ),
      },
      {
        path: "reset-MobileNumber",
        loadChildren: () =>
          import(
            "./my-profile/reset-mobile-number/reset-mobile-number.module"
          ).then((m) => m.ResetMobileNumberModule),
      },
      {
        path: "reset-username",
        loadChildren: () =>
          import("./my-profile/reset-username/reset-username.module").then(
            (m) => m.ResetUsernameModule
          ),
      },
      {
        path: "reset-password",
        loadChildren: () =>
          import("./my-profile/reset-password/reset-password.module").then(
            (m) => m.ResetPasswordModule
          ),
      },
      {
        path: "reset-transaction-pin",
        loadChildren: () =>
          import(
            "./my-profile/reset-transaction-pin/reset-transaction-pin.module"
          ).then((m) => m.ResetTransactionPinModule),
      },
      {
        path: "reset-security-questions",
        loadChildren: () =>
          import(
            "./my-profile/reset-security-questions/reset-security-questions.module"
          ).then((m) => m.ResetSecurityQuestionsModule),
      },
      {
        path: "otp",
        loadChildren: () =>
          import("./otp-search/otp-search.module").then(
            (m) => m.OtpSearchModule
          ),
      },
      {
        path: "otp-detail",
        loadChildren: () =>
          import("./otp-search/otp-detail/otp-detail.module").then(
            (m) => m.OtpDetailModule
          ),
      },
      {
        path: "refund",
        loadChildren: () =>
          import("./refund-search/refund-search.module").then(
            (m) => m.RefundSearchModule
          ),
      },
      {
        path: "time-payment-request-search",
        loadChildren: () =>
          import(
            "./time-payment-request/time-payment-request-search/time-payment-request-search.module"
          ).then((m) => m.TimePaymentRequestSearchModule),
      },
      {
        path: "time-payment-request-detail",
        loadChildren: () =>
          import(
            "./time-payment-request/time-payment-request-detail/time-payment-request-detail.module"
          ).then((m) => m.TimePaymentRequestDetailModule),
      },
      {
        path: "time-payment-request-detail/:id",
        loadChildren: () =>
          import(
            "./time-payment-request/time-payment-request-detail/time-payment-request-detail.module"
          ).then((m) => m.TimePaymentRequestDetailModule),
      },
      {
        path: "debt-search",
        loadChildren: () =>
          import("./debt/debt-search/debt-search.module").then(
            (m) => m.DebtSearchModule
          ),
      },
      {
        path: "time-payment-plan-search",
        loadChildren: () =>
          import(
            "./time-payment-plan/time-payment-plan-search/time-payment-plan-search.module"
          ).then((m) => m.TimePaymentPlanSearchModule),
      },
      {
        path: "time-payment-request-search",
        loadChildren: () =>
          import(
            "./time-payment-request/time-payment-request-search/time-payment-request-search.module"
          ).then((m) => m.TimePaymentRequestSearchModule),
      },
      {
        path: "time-payment-request-detail",
        loadChildren: () =>
          import(
            "./time-payment-request/time-payment-request-detail/time-payment-request-detail.module"
          ).then((m) => m.TimePaymentRequestDetailModule),
      },
      {
        path: "time-payment-plan-search",
        loadChildren: () =>
          import(
            "./time-payment-plan/time-payment-plan-search/time-payment-plan-search.module"
          ).then((m) => m.TimePaymentPlanSearchModule),
      },
      {
        path: "appointments-search",
        loadChildren: () =>
          import(
            "./appointments/appointments-search/appointments-search.module"
          ).then((m) => m.AppointmentsSearchModule),
      },
      {
        path: "appointments-detail",
        loadChildren: () =>
          import(
            "./appointments/appointments-detail/appointments-detail.module"
          ).then((m) => m.AppointmentsDetailModule),
      },
      {
        path: "message-search",
        loadChildren: () =>
          import("./message/message-search/message-search.module").then(
            (m) => m.MessageSearchModule
          ),
      },
      {
        path: "message-search/:id",
        loadChildren: () =>
          import("./message/message-search/message-search.module").then(
            (m) => m.MessageSearchModule
          ),
      },

      {
        path: "time-payment-plan-schedule",
        loadChildren: () =>
          import(
            "./time-payment-plan/time-payment-plan-schedule/time-payment-plan-schedule.module"
          ).then((m) => m.TimePaymentPlanScheduleModule),
      },
      // {
      //   path: "compliance-certificate",
      //   loadChildren: () =>
      //     import("./compliance-certificate/compliance-certificate.module").then(
      //       (m) => m.ComplianceCertificateModule
      //     ),
      // },
      {
        path: "compliance-certificate",
        loadChildren: () =>
          import(
            "./compliance-certificate-requirement/compliance-certificate-requirement.module"
          ).then((m) => m.ComplianceCertificateRequirementModule),
      },
      {
        path: "view-compliance-certificate",
        loadChildren: () =>
          import(
            "./compliance-certificate-requirement/view-compliance-certificate/view-compliance-certificate.module"
          ).then((m) => m.ViewComplianceCertificateModule),
      },
      // Microbusiness Assistance **********
      {
        path: "microfinance-assistance",
        loadChildren: () =>
          import(
            "./microfinance-assistance/microfinance-assistance-search/microfinance-assistance-search.module"
          ).then((m) => m.MicrofinanceAssistanceSearchModule),
      },
      {
        path: "microfinance-assistance/details",
        loadChildren: () =>
          import(
            "./microfinance-assistance/microfinance-assistance-detail/microfinance-assistance-detail.module"
          ).then((m) => m.MicrofinanceAssistanceDetailModule),
      },

      // Education Withdrawal ******
      {
        path: "student-refunds",
        loadChildren: () =>
          import(
            "./education-withdrawal/student-refunds/student-refunds-search/student-refunds-search.module"
          ).then((m) => m.StudentRefundsSearchModule),
      },
      {
        path: "student-refunds/detail",
        loadChildren: () =>
          import(
            "./education-withdrawal/student-refunds/student-refund-detail/student-refund-detail.module"
          ).then((m) => m.StudentRefundDetailModule),
      },
      {
        path: "add-refund",
        loadChildren: () =>
          import(
            "./education-withdrawal/student-refunds/add-refund/add-refund.module"
          ).then((m) => m.AddRefundModule),
      },
      {
        path: "view-received-fees",
        loadChildren: () =>
          import(
            "./education-withdrawal/view-received-fees/view-received-fees.module"
          ).then((m) => m.ViewReceivedFeesModule),
      },
      {
        path: "view-dpo",
        loadChildren: () =>
          import("./education-withdrawal/dpo/view-dpo/view-dpo.module").then(
            (m) => m.ViewDpoModule
          ),
      },
      {
        path: "view-dpo-request",
        loadChildren: () =>
          import(
            "./education-withdrawal/dpo/view-dpo-request/view-dpo-request.module"
          ).then((m) => m.ViewDpoRequestModule),
      },
      {
        path: "conditional-travel-request",
        loadChildren: () =>
          import(
            "./education-withdrawal/dpo/dpo-conditional-travel-request/dpo-conditional-travel-request.module"
          ).then((m) => m.DpoConditionalTravelRequestModule),
      },
      {
        path: "revoke-request",
        loadChildren: () =>
          import(
            "./education-withdrawal/dpo/dpo-revoke-request/dpo-revoke-request.module"
          ).then((m) => m.DpoRevokeRequestModule),
      },
      {
        path: "bulk-invoice",
        loadChildren: () =>
          import(
            "./education-withdrawal/bulk-invoice/bulk-invoice-search/bulk-invoice-search.module"
          ).then((m) => m.BulkInvoiceSearchModule),
      },
      {
        path: "bulk-invoice-upload",
        loadChildren: () =>
          import(
            "./education-withdrawal/bulk-invoice/bulk-invoice-upload/bulk-invoice-upload.module"
          ).then((m) => m.BulkInvoiceUploadModule),
      },
      {
        path: "outstanding-invoice",
        loadChildren: () =>
          import(
            "./debt-payment/outstanding-invoices/outstanding-invoices.module"
          ).then((m) => m.OutstandingInvoicesModule),
      },
      {
        path: "payment-summary/:id",
        loadChildren: () =>
          import(
            "./debt-payment/invoice-payment-summary/invoice-payment-summary.module"
          ).then((m) => m.InvoicePaymentSummaryModule),
      },
      {
        path: "debt-payment",
        loadChildren: () =>
          import(
            "./debt-payment/debt-payment-search/debt-payment-search.module"
          ).then((m) => m.DebtPaymentSearchModule),
      },
      {
        path: "employer-statement",
        loadChildren: () =>
          import(
            "./my-company/employer-statement/employer-statement.module"
          ).then((m) => m.EmployerStatementModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
