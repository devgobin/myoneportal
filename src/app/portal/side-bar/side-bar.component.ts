import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Storage } from "@ionic/storage";
import { newcontributionservice } from "../contribution/new-contribution/new-contribution/new-contribution.service";
import { CsAdjustmentService } from "../cs-adjustment/cs-adjustment.service";
import { ComplianceCertificateService } from "../compliance-certificate-requirement/compliance-certificate.service";
import { DataService } from "src/app/service/data.service";
@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit {
  pinned = true;
  hideMobile = true;
  @Output("clicked") clicked: EventEmitter<any> = new EventEmitter();
  menus = [
    {
      title: "Dashboard",
      iconLink: "assets/menu-icon/dashboard.svg",
      icon: "",
      path: "/app/dashboard",
      id: "MPDashboard",
      hideMobile: true,
      child: [],
    },
    {
      title: "Microbusiness Assistance",
      iconLink: "assets/menu-icon/housing-assistance.svg",
      icon: "",
      path: "/app/microfinance-assistance",
      id: "MPMicrofinanceAssistance",
      hideMobile: false,
      child: [],
    },
    {
      title: "Contribution",
      iconLink: "assets/menu-icon/contribution.svg",
      icon: "",
      path: "",
      id: "MPContribution",
      hideMobile: false,
      child: [
        {
          title: "New Contribution",
          iconLink: "",
          icon: "",
          path: "/app/new-contribution/new",
          id: "MCNewContribution",
          hideMobile: false,
          child: [],
        },
        {
          title: "View Contribution",
          iconLink: "",
          icon: "",
          path: "/app/view-submitted-contribution",
          id: "MCViewContribution",
          hideMobile: false,
          child: [],
        },
        {
          title: "Generate Contribution Schedule File",
          iconLink: "",
          icon: "",
          path: "/app/generate-cs-file",
          id: "MCGenerateCSFile",
          hideMobile: false,
          child: [],
        },
        {
          title: "Employer Statement",
          iconLink: "",
          icon: "",
          path: "/app/employer-statement",
          id: "MCEmployerStatement",
          hideMobile: false,
          child: [],
        },
        {
          title: "Upload CS File",
          iconLink: "",
          icon: "",
          path: "/app/contribution-schedule-file-upload",
          id: "MCUploadCSFile",
          hideMobile: true,
          child: [],
        },
        {
          title: "Contribution Schedule Adjustment",
          iconLink: "",
          icon: "",
          path: "/app/cs-adjustment",
          id: "MCViewCSAdjustment",
          hideMobile: false,
          child: [],
        },
        {
          title: "Contribution Schedule Adjustment Detail",
          iconLink: "",
          icon: "",
          path: "/app/cs-adjustment-detail/new",
          id: "MCNewCSAdjustment",
          hideMobile: true,
          child: [],
        },
      ],
    },
    {
      title: "Suspense",
      iconLink: "assets/menu-icon/suspense.svg",
      icon: "",
      path: "",
      id: "MPSuspense",
      hideMobile: false,
      child: [
        {
          title: "View Suspense",
          iconLink: "",
          icon: "",
          path: "/app/suspense",
          id: "MCViewSuspense",
          hideMobile: false,
          child: [],
        },
      ],
    },
    {
      title: "Debt",
      iconLink: "assets/menu-icon/dept.svg",
      icon: "",
      path: "",
      id: "MPDept",
      hideMobile: false,
      child: [
        {
          title: "View Debt",
          iconLink: "",
          icon: "",
          path: "/app/debt-search",
          id: "MCViewDept",
          hideMobile: false,
          child: [],
        },
        {
          title: "Time Payment Plan",
          iconLink: "",
          icon: "",
          path: "/app/time-payment-plan-search",
          id: "MCPaymentPlan",
          hideMobile: false,
          child: [],
        },
        {
          title: "Submit New Time Payment Plan",
          iconLink: "",
          icon: "",
          path: "/app/time-payment-request-search",
          id: "MCPaymentPlanSchedule",
          hideMobile: true,
          child: [],
        },
        {
          title: "Debt Payment",
          iconLink: "",
          icon: "",
          path: "/app/debt-payment",
          id: "MCDebtPayment",
          hideMobile: false,
          child: [],
        },
      ],
    },
    {
      title: "Payments",
      iconLink: "assets/menu-icon/payments.svg",
      icon: "",
      path: "",
      id: "MPPayments",
      hideMobile: false,
      child: [
        {
          title: "View Payments",
          iconLink: "",
          icon: "",
          path: "/app/payments",
          id: "MCViewPaymentsMade",
          hideMobile: false,
          child: [],
        },
        {
          title: "View Invoices",
          iconLink: "",
          icon: "",
          path: "/app/invoices",
          id: "MCViewInvoices",
          hideMobile: false,
          child: [],
        },
        {
          title: "View Refund",
          iconLink: "",
          icon: "",
          path: "/app/refund",
          id: "MCViewRefund",
          hideMobile: false,
          child: [],
        },
        // {
        //   title: "Time Payment Plan",
        //   iconLink: "",
        //   icon: "",
        //   path: "/app/time-payment-plan-search",
        //   id: "MCPaymentPlan",
        //   child: [],
        // },
        // {
        //   title: "Submit New Time Payment Plan",
        //   iconLink: "",
        //   icon: "",
        //   path: "/app/time-payment-request-search",
        //   id: "MCPaymentPlanSchedule",
        //   child: [],
        // },
      ],
    },
    {
      title: "Order to Third Party",
      iconLink: "assets/menu-icon/order-to-third-party.svg",
      icon: "",
      path: "",
      id: "MPOTP",
      hideMobile: true,
      child: [
        {
          title: "View Order to 3rd Party",
          iconLink: "",
          icon: "",
          path: "/app/otp",
          id: "MCViewOTP",
          hideMobile: true,
          child: [],
        },
        {
          title: "Order to 3rd Party Detail",
          iconLink: "",
          icon: "",
          path: "/app/otp-detail",
          id: "MCViewOTPDetail",
          hideMobile: true,
          child: [],
        },
      ],
    },
    {
      title: "Housing Assistance",
      iconLink: "assets/menu-icon/housing-assistance.svg",
      icon: "",
      path: "",
      id: "MPHousingAssistance",
      hideMobile: false,
      child: [
        {
          title: "Eligibility Check",
          iconLink: "",
          icon: "",
          path: "/app/housing-assitance/eligibility-check",
          id: "MCMemberWithdrawalEligibility",
          hideMobile: true,
          child: [],
        },
        {
          title: "Housing Assistance",
          iconLink: "",
          icon: "",
          path: "/app/housing-assistance",
          id: "MPHousingAssistanceApplication",
          hideMobile: false,
          child: [],
        },
      ],
    },
    {
      title: "Withdrawals",
      iconLink: "assets/menu-icon/withdrawals.svg",
      icon: "",
      path: "",
      id: "MPWithdrawals",
      hideMobile: true,
      child: [
        {
          title: "COVID 19 Withdrawal",
          iconLink: "",
          icon: "",
          path: "/app/withdrawals",
          id: "MCCOVID19WithdrawalPending",
          hideMobile: true,
          child: [],
        },
        {
          title: "COVID 19 Withdrawal New",
          iconLink: "",
          icon: "",
          path: "/app/withdrawal-new/new",
          id: "MCCOVID19WithdrawalNew",
          hideMobile: true,
          child: [],
        },
      ],
    },
    {
      title: "Employees",
      iconLink: "assets/menu-icon/employees.svg",
      icon: "",
      path: "",
      id: "MPEmployees",
      hideMobile: false,
      child: [
        {
          title: "View Employee Details",
          iconLink: "",
          icon: "",
          path: "/app/employee-list",
          id: "MCViewEmployeeDetails",
          hideMobile: false,
          child: [],
        },
        {
          title: "New Member Registration",
          iconLink: "",
          icon: "",
          path: "/app/new-member-registration/new",
          id: "MCNewMemberRegistration",
          hideMobile: true,
          child: [],
        },
        {
          title: "New Member Registration Request",
          iconLink: "",
          icon: "",
          path: "/app/incomplete-member-registration",
          id: "MCIncompleteMemberRegistration",
          hideMobile: false,
          child: [],
        },
      ],
    },
    {
      title: "My Company",
      iconLink: "assets/menu-icon/company.svg",
      icon: "",
      path: "",
      id: "MPMyCompany",
      hideMobile: false,
      child: [
        {
          title: "Company Profile",
          iconLink: "",
          icon: "",
          path: "/app/company-profile",
          id: "MCCompanyProfile",
          hideMobile: false,
          child: [],
        },
        {
          title: "Contact Management",
          iconLink: "",
          icon: "",
          path: "/app/organization-contact-list",
          id: "MCCContactManagement",
          hideMobile: false,
          child: [],
        },
        // {
        //   title: "Compliance Certificate Issuance",
        //   iconLink: "",
        //   icon: "",
        //   path: "/app/compliance-certificate",
        //   id: "MCComplianceCertificateIssuance",
        //   child: [],
        // },
        // {
        //   title: "Compliance Certificate ",
        //   iconLink: "",
        //   icon: "",
        //   path: "/app/compliance-certificate",
        //   id: "MCComplianceCertificate",
        //   child: [],
        // },
        {
          title: "Compliance Certificate ",
          iconLink: "",
          icon: "",
          path: "/app/compliance-certificate",
          id: "MCComplianceCertificate",
          hideMobile: false,
          child: [],
        },
      ],
    },
    {
      title: "Appointment",
      iconLink: "assets/menu-icon/appointment.svg",
      icon: "",
      path: "",
      id: "MPAppointment",
      hideMobile: false,
      child: [
        {
          title: "Booking Appointment",
          iconLink: "",
          icon: "",
          path: "/app/appointments-search",
          id: "MCBookingAppointment",
          hideMobile: false,
          child: [],
        },
        {
          title: "Messaging",
          iconLink: "",
          icon: "",
          path: "/app/message-search/1",
          id: "MCMessaging",
          hideMobile: false,
          child: [],
        },
      ],
    },
    {
      title: "Departure Probation Order",
      iconLink: "assets/menu-icon/departure.svg",
      icon: "",
      path: "",
      id: "MPDepartureProbationOrder",
      hideMobile: false,
      child: [
        {
          title: "View DPO Request",
          iconLink: "",
          icon: "",
          path: "/app/view-dpo-request",
          id: "MCViewDpoRequest",
          hideMobile: false,
          child: [],
        },
        {
          title: "View DPO",
          iconLink: "",
          icon: "",
          path: "/app/view-dpo",
          id: "MCViewDpo",
          hideMobile: false,
          child: [],
        },
      ],
    },
    {
      title: "University",
      iconLink: "assets/menu-icon/unclaimed.svg",
      icon: "",
      path: "",
      id: "MPUniversity",
      hideMobile: true,
      child: [
        {
          title: "View Received Fees",
          iconLink: "",
          icon: "",
          path: "/app/view-received-fees",
          id: "MCViewReceivedFees",
          hideMobile: true,
          child: [],
        },
        {
          title: "Unclaimed Withdrawal Returns",
          iconLink: "",
          icon: "",
          path: "/app/student-refunds",
          id: "MCUnclaimedWithdrawal",
          hideMobile: true,
          child: [],
        },
        {
          title: "Bulk Invoice",
          iconLink: "",
          icon: "",
          path: "/app/bulk-invoice",
          id: "MCBulkInvoice",
          hideMobile: true,
          child: [],
        },
      ],
    },
    {
      title: "My Profile",
      iconLink: "assets/menu-icon/profile.svg",
      icon: "",
      path: "",
      id: "MPMyProfile",
      hideMobile: false,
      child: [
        {
          title: "Profile Detail",
          iconLink: "",
          icon: "",
          path: "/app/profile-detail",
          id: "MCProfileDetail",
          hideMobile: false,
          child: [],
        },
        {
          title: "Change Email",
          iconLink: "",
          icon: "",
          path: "/app/reset-email",
          id: "MCChangeEmail",
          hideMobile: false,
          child: [],
        },
        {
          title: "Change Mobile Number",
          iconLink: "",
          icon: "",
          path: "/app/reset-MobileNumber",
          id: "MCResetMobileNumber",
          hideMobile: false,
          child: [],
        },
        {
          title: "Change Username",
          iconLink: "",
          icon: "",
          path: "/app/reset-username",
          id: "MCChangeUsername",
          hideMobile: false,
          child: [],
        },
        {
          title: "Reset Password",
          iconLink: "",
          icon: "",
          path: "/app/reset-password",
          id: "MCResetPassword",
          hideMobile: false,
          child: [],
        },
        {
          title: "Reset Transaction PIN",
          iconLink: "",
          icon: "",
          path: "/app/reset-transaction-pin",
          id: "MCResetTransactionPIN",
          hideMobile: false,
          child: [],
        },
      ],
    },
  ];

  appType = "admin";
  constructor(
    public newContributionService: newcontributionservice,
    public storage: Storage,
    public csAdjService: CsAdjustmentService,
    public ComplianceCertificateService: ComplianceCertificateService,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.storage.get("pinned").then((val) => {
      if (val !== null) {
        this.pinned = val;
      }
    });
    this.csAdjService.newClicked.subscribe((res) => {
      console.log("seervice " + res);
      console.log("subscriber hit");
    });
  }

  navClicked() {
    this.clicked.next();
  }

  menuClicked(val) {
    // console.log("menuclicked called");
    // console.log(val);
    this.newContributionService.clearData();
    this.csAdjService.clearData();
    this.ComplianceCertificateService.clearData();
    this.navClose(val);
  }

  navClose(val) {
    console.log("navclose called");
    this.newContributionService.clearData();
    // this.csAdjService.clearData();
    if (val === "Contribution Schedule Adjustment Detail") {
      console.log("cs hit");
      this.csAdjService.newClicked.next(true);
    }
    this.pinned ? "" : this.navClicked();
  }

  pinClicked() {
    this.storage.set("pinned", this.pinned);
    this.pinned ? "" : this.navClicked();
  }
}
