import { environment } from "./../environments/environment";

export const EmailPattern = "^S+@S+$";
export const basePath = "";

export const baseCurrency = "USD";
export class AppGlobal {
  public static dbname = "__fnpfempportalapp";
  public static resendTime = 2;
  public static apiPaths = {
    token: basePath + "admin/gettoken",
    homepage: basePath + "admin/gethomepagecontents",
    portalRegistration: {
      new: basePath + "portalregistration/employer/new",
      submit: basePath + "portalregistration/employer/submit",
      document: basePath + "portalregistration/employer/document",
      organization: basePath + "portalregistration/organization",
      validatecontactdetail:
        basePath + "portalregistration/validatecontactdetail",
      register: basePath + "portalregistration/employer/register",
      cancel: basePath + "portalregistration/employer/cancel",
      open: basePath + "portalregistration/employer/open",
    },
    portalLogin: {
      userinfo: basePath + "portallogin/getuserfromurl",
      userinfoforfirstimelogin:
        basePath + "portallogin/getuserforfirsttimelogin",
      isuseravailable: basePath + "portallogin/isuseravailable",
      sendotp: basePath + "portallogin/sendotp",
      validateotp: basePath + "portallogin/validateotp",
      submit: basePath + "portallogin/submit",
      login: basePath + "portallogin/login",
      selectOrg: basePath + "portallogin/login/select-org",
      validateInfo:
        basePath + "portallogin/troublelogin/validatconfidentialinformation",
      forgotUserId: basePath + "portallogin/troublelogin/forgot-userid",
      forgotPassword: basePath + "portallogin/troublelogin/forgot-password",
      savePassword: basePath + "portallogin/troublelogin/save-new-password",
      resetpassword: basePath + "portallogin/resetpassword",
      employerportalthirdpartylogin:
        basePath + "portallogin/employerportalthirdpartylogin",
    },
    memberRegistration: {
      getsearch: basePath + "memberregistration/member/getsearchfilter",
      search: basePath + "memberregistration/member/search",
      delete: basePath + "memberregistration/member/delete",
      open: basePath + "memberregistration/member/open",
      initialdata: basePath + "memberregistration/member/getinitialdata",
      new: basePath + "memberregistration/member/new",
      loadmemberregistrationdocumentbasedonmembertype:
        basePath +
        "memberregistration/member/loadmemberregistrationdocumentbasedonmembertype",
      savememberregistrationanduploadmemberdocument:
        basePath +
        "memberregistration/member/savememberregistrationanduploadmemberdocument",
      save: basePath + "memberregistration/member/save",
      document: basePath + "memberregistration/member/document",
      submit: basePath + "memberregistration/member/submit",
      update: basePath + "memberregistration/member/update",
      openimagebydocumentfileid:
        basePath + "memberregistration/member/openimagebydocumentfileid",
      cancelmemberregistration:
        basePath + "memberregistration/member/cancelmemberregistration",

      nominee: {
        new: basePath + "memberregistration/member/nominee/new",
        savemembernomineeandnomineedocument:
          basePath +
          "memberregistration/member/nominee/savemembernomineeandnomineedocument",
        save: basePath + "memberregistration/member/nominee/save",
        open: basePath + "memberregistration/member/nominee/open",
        delete: basePath + "memberregistration/member/nominee/delete",
        document: basePath + "memberregistration/member/nominee/document",
        savenomineecontact:
          basePath + "memberregistration/member/nominee/savenomineecontact",
        validatemembernominee:
          basePath + "memberregistration/member/nominee/validatemembernominee",
      },
      executor: {
        savememberexecutoranduploadexecutordocument:
          basePath +
          "memberregistration/member/executor/savememberexecutoranduploadexecutordocument",
        save: basePath + "memberregistration/member/executor/save",
        update: basePath + "memberregistration/member/executor/update",
      },
      address: {
        save: basePath + "memberregistration/member/address/save",
        update: basePath + "memberregistration/member/address/update",
      },
    },
    contact: {
      initialdata: basePath + "employercontact/getinitialdata",
      new: basePath + "employercontact/new",
      submitInformation: basePath + "employercontact/submitcontactinformation",
      submitemployementinformation:
        basePath + "employercontact/submitemployementinformation",

      submit: basePath + "employercontact/submitemployercontact",
      open: basePath + "employercontact/open",
      cancel: basePath + "employercontact/cancel",
      getsearch: basePath + "employercontact/getsearch",
      search: basePath + "employercontact/search",
      editcontact: basePath + "employercontact/editcontact",
      viewapproval: basePath + "employercontact/getregisteredcontact",
      generatecontactpin: basePath + "employercontact/generatecontactpin",
      openregisteredcontact: basePath + "employercontact/openregisteredcontact",
      geteditemployercontactinitialdata:
        basePath + "employercontact/geteditemployercontactinitialdata",
      loademployercontactdocument:
        basePath + "employercontact/loademployercontactdocument",
      unlockaccount: basePath + "employercontact/unlockaccountfromeditcontact",
      editcontaddorinactivateemployercontactbycscodeact:
        basePath + "employercontact/addorinactivateemployercontactbycscode",
      addorinactivateemployercontactbycontacttype:
        basePath +
        "employercontact/addorinactivateemployercontactbycontacttype",
    },
    forgotUserID: {
      validationForgotUserID:
        basePath +
        "portallogin/troublelogin/ValidateConfidentialInformationForForgotUserID",
      validationForgotPassword:
        basePath +
        "portallogin/troublelogin/ValidateUserDetailForForgotUserPassword",
      userid: basePath + "portallogin/troublelogin/forgot-userid",
      saveData: basePath + "portallogin/troublelogin/save-new-password",
    },
    forgotPassword: {
      fpassword: basePath + "portallogin/troublelogin/forgot-password",
      validatesecurityquestion:
        basePath + "portallogin/troublelogin/validatesecurityquestion",
    },
    stafflogin: {
      authenticate: basePath + "admin/stafflogin/authenticate",
      organization: basePath + "admin/stafflogin/selectorganization",
      selectcontactforlogin:
        basePath + "admin/stafflogin/selectcontactforlogin",
    },
    companyprofile: {
      initialdata: basePath + "employercontact/getmycompanyinitialdata",
      open: basePath + "employercontact/openmycompany",
      newaddress: basePath + "employercontact/newprofileaddress",
      newcommunication: basePath + "employercontact/newprofilecommunication",
      openaddress: basePath + "employercontact/openprofileaddress",
      opencommunication: basePath + "employercontact/openprofilecommunication",
      deleteaddress: basePath + "employercontact/deleteprofileaddress",
      deletecommunication:
        basePath + "employercontact/deleteprofilecommunication",
      saveaddress: basePath + "employercontact/saveprofileaddress",
      savecommunication: basePath + "employercontact/saveprofilecommunication",
    },
    myprofile: {
      open: basePath + "employercontact/GetMyProfileDetail",
      resetpassword: basePath + "employercontact/myprofileresetpassword",
      resettrnpin: basePath + "employercontact/myprofileresettransactionpin",
      resetsecurityques:
        basePath + "employercontact/changemyprofilesecurityquestions",
      loadsecurityques:
        basePath + "employercontact/loadmyprofilesecurityquestion",
      getemail: basePath + "employercontact/myprofilegetemail",
      resetemail: basePath + "employercontact/myprofileresetmail",
      getusername: basePath + "employercontact/myprofilegetusername",
      resetusername: basePath + "employercontact/myprofileresetusername",
      checkboxusername:
        basePath + "employercontact/myprofilemakeemailusmyusername",
      changetwpfactorauthentication:
        basePath + "employercontact/changetwpfactorauthentication",
      getmobileNo: basePath + "employercontact/myprofilegetmobileno",
      resetmobileno: basePath + "employercontact/myprofileresetmobileno",
      updatedefaultlandingpage:
        basePath + "employercontact/updatedefaultlandingpage",
    },
    withdrawals: {
      searchData: basePath + "withdrawal/getsearch",
      getsearchData: basePath + "withdrawal/search",
      initialdata: basePath + "withdrawal/getinitialdata",
      new: basePath + "withdrawal/new",
      getmemberDetails: basePath + "withdrawal/getmemberdetails",
      save: basePath + "withdrawal/save",
      update: basePath + "withdrawal/update",
      document: basePath + "withdrawal/document",
      submit: basePath + "withdrawal/submit",
      loadcategorybyemploymentstatus:
        basePath + "withdrawal/loadcategorybyemploymentstatus",
      open: basePath + "withdrawal/open",
    },
    contribution: {
      csfileinitialdata: basePath + "contribution/getcsfileinitialdata",
      getFileSearch: basePath + "contribution/getfilesearch",
      searchFile: basePath + "contribution/searchcsfile",
      opencsFile: basePath + "contribution/opencsfile",
      create: basePath + "contribution/createcsfile",
      validateFilename: basePath + "contribution/isvalidfilename",
      upload: basePath + "contribution/uploadcsfile",
      updateFile: basePath + "contribution/update/filerowdetail",
      submitFile: basePath + "contribution/submitcsfile",
      csDetailRowDelete: basePath + "contribution/deletecsdetailfilerow",
      deletecsFile: basePath + "contribution/deletecsfile",
      // view submitted contribution list
      initialdata: basePath + "contributionschedule/getcsheaderinitialdata",

      getsearch: basePath + "contributionschedule/getsearch",
      search: basePath + "contributionschedule/search",
      // new contribution
      createData: basePath + "contributionschedule/createnewcsheader",
      createnewcsfilegeneration:
        basePath + "contributionschedule/createnewcsfilegeneration",
      opendata: basePath + "contributionschedule/opencsheader",
      createEmployee: basePath + "contributionschedule/createnewcsdetail",
      getfromprevious:
        basePath + "contributionschedule/copyfrompreviouscsheader",
      retrievecsdetail: basePath + "contributionschedule/retrievecsdetail",
      insertcsdetail: basePath + "contributionschedule/insertcsdetail",
      openemployee: basePath + "contributionschedule/opencsdetail",
      deleteemployee: basePath + "contributionschedule/deletecsdetail",
      insertheader: basePath + "contributionschedule/insertcsheader",
      submitheader: basePath + "contributionschedule/submitcsheader",
      submitemployee: basePath + "contributionschedule/submitcsdetail",
      savecsdetail:
        basePath + "contributionschedule/savecsdetailemployeedetail",
      getinvoice: basePath + "contributionschedule/getinvoice",
      generatecsfile: basePath + "contributionschedule/generatecsfile",
      viewgeneratecsfile: basePath + "contributionschedule/viewgeneratecsfile",
    },
    employee: {
      getinitialdata: basePath + "employee/getinitialdata",
      getSearchParams: basePath + "employee/getemployeesearch",
      search: basePath + "employee/search",
    },
    payment: {
      paymentinitialdata: basePath + "payment/paymentinitialdata",
      paymentgetsearch: basePath + "payment/getviewreceiptsearch",
      paymentsearch: basePath + "payment/searchreceipt",
      viewpayment: basePath + "payment/getpaymentreceipt",
      generatepayment: basePath + "payment/generatepaymentreceipt",
      invoicegetsearch: basePath + "payment/getviewinvoicesearch",
      invoicesearch: basePath + "payment/searchinvoice",
      viewinvoice: basePath + "payment/getinvoice",
      getinvoicewithdepositslip: basePath + "payment/getinvoicewithdepositslip",

      getemployerstatementsearch:
        basePath + "payment/getemployerstatementsearch",
      getemployerstatement: basePath + "payment/getemployerstatement",
    },
    dashboard: {
      dashboardinitialdata: basePath + "dashboard/getinitialdata",
      generatedashboard: basePath + "dashboard/generatedashboard",
      getdashboardsearch: basePath + "dashboard/getdashboardsearch",
      getContributionSummarybyyear:
        basePath + "dashboard/getContributionsummarybyyear",
      getemployeesummarybyyear: basePath + "dashboard/getemployeesummarybyyear",
    },
    housingassitance: {
      createneweligibilitycheck:
        basePath + "housingassitance/createneweligibilitycheck",
      searchmemberforeligibility:
        basePath + "housingassitance/searchmemberforeligibility",
      checkeligibility: basePath + "housingassitance/checkeligibility",
      printmembereligibility:
        basePath + "housingassitance/printmembereligibility",
      //search
      initialdata:
        basePath + "housingassistancewithdrawal/application/getinitialdata",
      getsearch:
        basePath +
        "housingassistancewithdrawal/application/gethousingassistancesearch",
      search:
        basePath +
        "housingassistancewithdrawal/application/searchhousingwithdrawalapplication",
      //detail
      create: basePath + "housingassistancewithdrawal/application/new",
      open: basePath + "housingassistancewithdrawal/application/open",
      save:
        basePath +
        "housingassistancewithdrawal/application/saveapplicationandloan",
      update:
        basePath +
        "housingassistancewithdrawal/application/updatehousingwithdrawalapplication",
      saveproperty:
        basePath + "housingassistancewithdrawal/application/saveproperty",
      document: basePath + "housingassistancewithdrawal/application/document",
      saveaddress:
        basePath +
        "housingassistancewithdrawal/application/savepropertydetailaddress",
      submitwithdrawalapplication:
        basePath +
        "housingassistancewithdrawal/application/submitwithdrawalapplicationhousingassistance",
      //applicant
      applicantcreate:
        basePath + "housingassistancewithdrawal/application/applicant/new",
      getapplicantbyfnpfno:
        basePath +
        "housingassistancewithdrawal/application/applicant/getapplicantbyfnpfno",
      applicantopen:
        basePath + "housingassistancewithdrawal/application/applicant/open",
      applicantsave:
        basePath + "housingassistancewithdrawal/application/applicant/save",
      applicantdelete:
        basePath + "housingassistancewithdrawal/application/applicant/delete",
      savepostaladdress:
        basePath +
        "housingassistancewithdrawal/application/applicant/postaladdress",
      saveresidentialaddress:
        basePath +
        "housingassistancewithdrawal/application/applicant/residentialaddress",

      validateapplicants:
        basePath +
        "housingassistancewithdrawal/application/applicant/ValidateWithdrawalHousingApplicantDetails",
      //CheckList
      savewithdrawalhousingchecklist:
        basePath +
        "housingassistancewithdrawal/application/savewithdrawalhousingchecklist",

      //forms
      printprefilledform:
        basePath +
        "housingassistancewithdrawal/application/applicant/printprefilledform",
      printconditionalapprovalform:
        basePath +
        "housingassistancewithdrawal/application/applicant/printconditionalapprovalform",
      printapprovalform:
        basePath +
        "housingassistancewithdrawal/application/applicant/printapprovalform",
      cancel:
        basePath +
        "housingassistancewithdrawal/application/cancelwithdrawalapplicationhousingassistance",
    },
    csadjustment: {
      initialdata: basePath + "CSAdjustment/getcsadjustmentinitialdata",
      getsearch: basePath + "CSAdjustment/getcsadjustmentsearch",
      search: basePath + "CSAdjustment/searchcsadjustment",
      create: basePath + "CSAdjustment/createnewcsadjustment",
      createnewcsadjustmentdetail:
        basePath + "CSAdjustment/createnewcsadjustmentdetail",
      insertheader: basePath + "CSAdjustment/insertcsadjustmentheader",
      insertdetail: basePath + "CSAdjustment/insertcsadjustmentdetail",
      retrievedetail: basePath + "CSAdjustment/retrievecsadjustmentdetail",
      openheader: basePath + "CSAdjustment/opencsadjustmentheader",
      opendetail: basePath + "CSAdjustment/opencsadjustmentdetail",
      delete: basePath + "CSAdjustment/deletecsadjustmentdetail",
      submitheader: basePath + "CSAdjustment/submitcsadjustmentheader",
      uploadcsadjustmentdocument:
        basePath + "CSAdjustment/uploadcsadjustmentdocument",
      getcsheaderbycsheaderid:
        basePath + "CSAdjustment/getcsheaderbycsheaderid",
      cancelheader: basePath + "CSAdjustment/cancelcsadjustmentheader",
    },
    refund: {
      initialdata: basePath + "refund/GetRefundInitialData",
      getSearch: basePath + "refund/GetRefundSearch",
      search: basePath + "refund/searchrefund",
    },
    otp: {
      initialdata: basePath + "OTP/GetOTPInitialData",
      getSearch: basePath + "OTP/GetOTPSearch",
      search: basePath + "otp/searchotp",
      open: basePath + "OTP/openotp",
    },
    suspense: {
      initialdata: basePath + "suspense/suspense/GetSuspenseInitialData",
      getsearch: basePath + "suspense/suspense/GetSuspenseSearch",
      search: basePath + "suspense/suspense/SearchSuspense",
      getFNPF: basePath + "suspense/suspense/GetSuspensebyFnpfno",
      open: basePath + "suspense/suspense/GetSuspensebySuspenseid",
      resolvesuspense: basePath + "suspense/suspense/resolvesuspense",
      generatesuspesnserefundform:
        basePath + "suspense/suspense/generatesuspesnserefundform",
      uploadsuspenserefundform:
        basePath + "suspense/suspense/uploadsuspenserefundform",
      uploadsuspenseresolutionform:
        basePath + "suspense/suspense/uploadsuspenseresolutionform",

      uploadsuspensephotoidentityform:
        basePath + "suspense/suspense/uploadsuspensephotoidentityform",
      generatesuspesnseresolutionform:
        basePath + "suspense/suspense/generatesuspesnseresolutionform",
    },
    timepaymentrequest: {
      getsearch:
        basePath + "timepaymentrequest/createtimepaymentplanrequestsearch",
      search: basePath + "timepaymentrequest/searchtimepaymentplanrequest",
      opentimepaymentplanrequest:
        basePath + "timepaymentrequest/opentimepaymentrequest",
      createnewtimepaymentrequest:
        basePath + "timepaymentrequest/createnewtimepaymentrequest",
      generatetimepaymentrequestform:
        basePath + "timepaymentrequest/generatetimepaymentrequestform",
      submittimepaymentrequest:
        basePath + "timepaymentrequest/submittimepaymentrequest",
    },
    timepaymentpaln: {
      initialdata: basePath + "TimePaymentPlan/GetTimePaymentPlanInitialData",
      getsearch: basePath + "TimePaymentPlan/getTimePaymentPlanSearch",
      search: basePath + "TimePaymentPlan/searchtimepaymentplan",
      opentimepaymentplan: basePath + "timepaymentplan/opentimepaymentplan",
    },
    debt: {
      initialdata: basePath + "Dept/getDeptInitialData",
      getsearch: basePath + "Dept/getDeptSearch",
      search: basePath + "Dept/searchDept",
    },
    appointment: {
      initialdata: basePath + "bookingandmessaging/getappointmentinitialdata",
      getsearch: basePath + "bookingandmessaging/getappointmentsearch",
      search: basePath + "bookingandmessaging/searchAppointment",
      create: basePath + "bookingandmessaging/CreateNewAppointment",
      open: basePath + "bookingandmessaging/OpenAppointment",
      save: basePath + "bookingandmessaging/SaveAppointment",
      LoadSlots: basePath + "bookingandmessaging/LoadAppointmentTimeSlots",
      saveReserve: basePath + "bookingandmessaging/SaveAppointmentReserve",
      cancel: basePath + "bookingandmessaging/CancelAppointment",
    },
    message: {
      initialdata:
        basePath + "bookingandmessaging/getappointmentmessageinitialdata",
      getsearch: basePath + "bookingandmessaging/getappointmentMessagesearch",
      getallSend: basePath + "bookingandmessaging/GetAllSendMessages",
      getallreceived: basePath + "bookingandmessaging/GetAllReceivedMessages",
      create: basePath + "bookingandmessaging/CreateNewAppointmentMessage",
      save: basePath + "bookingandmessaging/SaveAppointmentMessage",
      send: basePath + "bookingandmessaging/SendAppointmentMessage",
      delete: basePath + "bookingandmessaging/deleteappointmentmessagedraft",
      markasunread: basePath + "bookingandmessaging/markasunread",
      markasread: basePath + "bookingandmessaging/markasread",
      openReceived: basePath + "bookingandmessaging/openreceivedmessage",
      openSend: basePath + "bookingandmessaging/opensendmessage",
      createmessageforcompanyporfile:
        basePath +
        "bookingandmessaging/CreateNewMessageForUpdatingCompanyBusinessAddress",
      getunreadmessagecount:
        basePath + "bookingandmessaging/getcountforUnreadMessages",
    },

    microfinanceAssistance: {
      getMicroFinanceInitialData:
        basePath + "Microfinance/getMicroFinanceInitialData",
      getMicroFinanceSearch: basePath + "Microfinance/getMicroFinanceSearch",
      searchMicroFinanceApplication:
        basePath + "Microfinance/searchMicroFinanceApplication",
      create: basePath + "Microfinance/createNewMicroFinanceApplication",
      open: basePath + "Microfinance/openMicroFinanceApplication",
      saveLoanDetails: basePath + "Microfinance/saveLoanDetail",
      saveBusinessDetails: basePath + "Microfinance/saveBusinessDetail",
      saveBusinessOwnerDetails:
        basePath + "Microfinance/saveBusinessOwnerDetail",
      saveApplicantDetails: basePath + "Microfinance/saveApplicantDetail",
      saveDocumentDetails: basePath + "Microfinance/uploadApplicantDocument",
      submitApplication: basePath + "Microfinance/submitApplicantion",
      generatePaymentLetter: basePath + "Microfinance/generatePaymentLetter",
      generateApprovalLetter: basePath + "Microfinance/generateApprovalLetter",
      printPreFilledForm: basePath + "Microfinance/printPreFilledForm",
      getApplicantDetailbyFNPFNo:
        basePath + "Microfinance/getApplicantDetailbyFNPFNo",
      getBusinessOwnerDetailbyFNPFNo:
        basePath + "Microfinance/getBusinessOwnerDetailbyFNPFNo",
    },
    complaince: {
      GetComplianceCertificateDetail:
        basePath + "complaince/getcompliancecertificate",
      generatecompliancecertificateform:
        basePath + "complaince/generatecompliancecertificateform",
      getcompliancecertificatestatus:
        basePath + "complaince/getcompliancecertificatestatus",
    },
    employerRegistration: {
      initialdata: basePath + "employerregistration/getinitialdata",
      generateform: basePath + "employerregistration/generateregistrationform",
      open: basePath + "employerregistration/open",
      submit: basePath + "employerregistration/submit",
      cancel: basePath + "employerregistration/cancel",
      new: basePath + "employerregistration/employer/new",
      verify: basePath + "employerregistration/employer/verify",
      update: basePath + "employerregistration/employer/update",
      upload: basePath + "employerregistration/employer/document/upload",
      view: basePath + "employerregistration/employer/document/view",
      address: {
        new: basePath + "employerregistration/employer/address/new",
        save: basePath + "employerregistration/employer/address/save",
        open: basePath + "employerregistration/employer/address/open",
        delete: basePath + "employerregistration/employer/address/delete",
        validate: basePath + "employerregistration/employer/address/validate",
      },
      communication: {
        new:
          basePath + "employerregistration/employer/communicationdetails/new",
        save:
          basePath + "employerregistration/employer/communicationdetails/save",
        open:
          basePath + "employerregistration/employer/communicationdetails/open",
        delete:
          basePath +
          "employerregistration/employer/communicationdetails/delete",
        validate:
          basePath +
          "employerregistration/employer/communicationdetails/validate",
      },
      contacts: {
        newdirector:
          basePath + "employerregistration/employer/contacts/newdirector",
        newprimary:
          basePath + "employerregistration/employer/contacts/newprimarycontact",
        newcscontact:
          basePath + "employerregistration/employer/contacts/newcscontact",
        loadcontactbyfnpfno:
          basePath +
          "employerregistration/employer/contacts/loadcontactbyfnpfno",
        save: basePath + "employerregistration/employer/contacts/save",
        open: basePath + "employerregistration/employer/contacts/open",
        delete: basePath + "employerregistration/employer/contacts/delete",
        validatedirector:
          basePath +
          "employerregistration/employer/contacts/validatedirectorcontacts",
        validateprimary:
          basePath +
          "employerregistration/employer/contacts/validateprimarycontacts",
        validatecs:
          basePath +
          "employerregistration/employer/contacts/validatecscontacts",

        savecscontactfromdirectorsandprimarycontact:
          basePath +
          "employerregistration/employer/contacts/savecscontactfromdirectorsandprimarycontact",
        saveprimarycontactdetailfromdirectors:
          basePath +
          "employerregistration/employer/contacts/saveprimarycontactdetailfromdirectors",

        upload:
          basePath + "employerregistration/employer/contacts/document/upload",
        uploadseparate:
          basePath +
          "employerregistration/employer/contacts/document/uploadseparate",
        view: basePath + "employerregistration/employer/contacts/document/view",
      },
    },
    dpo: {
      getinitialDPOdata:
        basePath + "departureprohibitionorder/dpo/getinitialdata",
      load:
        basePath + "departureprohibitionorder/dpo/loadalldpobyloggedincontact",
      getSearch: basePath + "departureprohibitionorder/dpo/createnewsearch",
      search: basePath + "departureprohibitionorder/dpo/search",
      newRequest: basePath + "departureprohibitionorder/dpo/newrevokerequest",
      newReceipt:
        basePath +
        "departureprohibitionorder/dpo/newreceiptfordporevokerequest",
      submitRequest:
        basePath + "departureprohibitionorder/dpo/submitrevokerequest",
      newTravelRequest:
        basePath + "departureprohibitionorder/dpo/newconditionaltravelequest",
      saveTravelRequest:
        basePath + "departureprohibitionorder/dpo/savecontitionaltravelrequest",
      loadConditionalTravelbyReason:
        basePath +
        "departureprohibitionorder/dpo/loadconditionaldocsbyreasonvalue",
      openImage:
        basePath + "departureprohibitionorder/dpo/openimagebydocumentfileid",
      requestgetSearch: basePath + "departureprohibitionorder/dpo/getsearch",
      requestSearch:
        basePath + "departureprohibitionorder/dpo/searchdporequest",
      openRequest: basePath + "departureprohibitionorder/dpo/openrequest",
      deleteRequest:
        basePath + "departureprohibitionorder/dpo/deleterevokerequestdocument",
    },
    viewReceivedFees: {
      getinitialData: basePath + "withdrawal/getviewreceivedfeesinitialdata",
      getSearch: basePath + "withdrawal/getviewreceivedfeessearch",
      search: basePath + "withdrawal/searchviewreceivedfees",
      download: basePath + "withdrawal/printreceivedfees",
      exportToExcel: basePath + "withdrawal/exporttoexcelreceivedfees",
    },
    unclaimedWithdrawalReturns: {
      getinitialData:
        basePath + "withdrawal/getunclaimedwithdrawalreturnsinitialdata",
      getSearch: basePath + "withdrawal/getunclaimedwithdrawalreturnssearch",
      search: basePath + "withdrawal/searchunclaimedwithdrawalreturns",
      create: basePath + "withdrawal/createnewunclaimedwithdrawalrefund",
      save: basePath + "withdrawal/saveunclaimedwithdrawalrefund",
      createDetail:
        basePath + "withdrawal/createnewunclaimedwithdrawalrefunddetail",
      saveDetail: basePath + "withdrawal/saveunclaimedwithdrawalrefunddetail",
      calculateunclaimedwithdrawalrefunddetailbalaceamount:
        basePath +
        "withdrawal/calculateunclaimedwithdrawalrefunddetailbalaceamount",
      searchDetail: basePath + "withdrawal/searchstudentdetail",
      submit: basePath + "withdrawal/submitunclaimedwithdrawalrefund",
      open: basePath + "withdrawal/openunclaimedwithdrawalrefund",
      openDetail: basePath + "withdrawal/openunclaimedwithdrawalrefunddetail",
      delete: basePath + "withdrawal/deleteunclaimedwithdrawalrefunddetail",
      viewReceipt: basePath + "withdrawal/viewreceipt",
      getSearchRefund:
        basePath + "withdrawal/getunclaimedwithdrawalrefunddetailsearch",
      searchRefund:
        basePath + "withdrawal/searchunclaimedwithdrawalrefunddetail",
    },
    bulkInvoice: {
      getinitialData: basePath + "bulkinvoice/invoice/getinitialdata",
      getSearch:
        basePath + "bulkinvoice/invoice/createnewbulkinvoiceuploadsearch",
      search: basePath + "bulkinvoice/invoice/searchbulkinvoiceupload",
      getSearchDetail:
        basePath + "bulkinvoice/invoice/createnewbulkinvoiceuploaddetailsearch",
      searchDetail:
        basePath + "bulkinvoice/invoice/searchbulkinvoiceuploaddetail",
      create: basePath + "bulkinvoice/invoice/createnewbulkinvoiceupload",
      submit: basePath + "bulkinvoice/invoice/submitbulkinvoice",
      open: basePath + "bulkinvoice/invoice/openbulkinvoice",
      upload: basePath + "bulkinvoice/invoice/uploadbulkinvoice",
      openDetail: basePath + "bulkinvoice/invoice/openbulkinvoicedetail",
      update: basePath + "bulkinvoice/invoice/updatebulkinvoicedetail",
    },
    invoicePayment: {
      initial: basePath + "invoicepayment/getinvoicepaymentinitialdata",
      getSearch: basePath + "invoicepayment/getinvoicepaymentsearch",
      search: basePath + "invoicepayment/searchinvoicepayment",
      getinvoicesearchforpayment:
        basePath + "invoicepayment/getinvoicesearchforpayment",
      searchInvoiceForPayment:
        basePath + "invoicepayment/searchinvoiceforpayment",
      create: basePath + "invoicepayment/createinvoicepayment",
      save: basePath + "invoicepayment/saveinvoicepayment",
      openinvoicepayment: basePath + "invoicepayment/openinvoicepayment",
      createDetail: basePath + "invoicepayment/createinvoicepaymentdetail",
      saveinvoicepaymentdetail:
        basePath + "invoicepayment/saveinvoicepaymentdetail",
      deleteinvoicepaymentdetail:
        basePath + "invoicepayment/deleteinvoicepaymentdetail",
      makeinvoicepayment: basePath + "invoicepayment/makeinvoicepayment",
    },
  };
}

export class AppResource {
  public static page = {
    dashboard: {
      pathId: "",
    },
  };
}
