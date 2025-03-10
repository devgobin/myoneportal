import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MicrofinanceAssistanceService {
  constructor() { }

  DDL = {
    DDLApplicationStatus: [],
    DDLApplicationTypeValue: [],
    DDLBusinessStructureValue: [],
    DDLBusinessDetailEmployementStatus: [],
    DDLPreferredCommunication: [],
    DDLcountry: []
  };

  microfinance = {
    microfinanceApplicationId: 0,
    applicationRefNo: '',
    lendingOrgId: 0,
    lendingOrgRefNo: '',
    statusId: 0,
    statusValue: '',
    raisedOrgContactId: 0,
    raisedDate: '',
    submittedOrgContactId: 0,
    submittedDate: '',
    applicationTypeId: 0,
    applicationTypeValue: '',
    loanAccountNo: '',
    loanAccountName: '',
    loanAmount: '',
    fnpfContributionAmount: '',
    balanceLoanAmount: '',
    approvalLetterGenerated: '',
    paymentLetterGenerated: '',
    createdDate : '',
    createdBy : '',
    promisWithdrawalApplicationId: 0,
    msg: {
      infoMessage: {
        msgID: 0,
        msgType: 0,
        msgDescription: '',
      },
      errorMessage: [],
      hasError: true,
    },
    idoObjState: '',
    updateSeq: 0,
    statusDescription: '',
    applicationDescription: '',
    bankName: '',
    orgContactName: '',
    branchName: '',
    approvedDate: '',
    isConsent: '',
    istrCosentContent: '',
    ibusMicroFinanceApplicationApplicant: {
      microfinanceApplicationApplicantId: 0,
      microfinanceApplicationId: 0,
      applicantFnpfNo: '',
      tin: '',
      brithRegNo: '',
      marriedName: '',
      homeNo: '',
      workNo: '',
      mobileNo: '',
      emailId: '',
      preferredCommunicationId: 0,
      preferredCommunicationValue: '',
      requestedAmount: '',
      postalAddressId: 0,
      residentialAddressId: 0,
      msg: {
        infoMessage: {
          msgID: 0,
          msgType: 0,
          msgDescription: '',
        },
        errorMessage: [],
        hasError: true,
      },
      idoObjState: '',
      updateSeq: 0,
      personImage: '',
      applicantFullName: '',
      dateOfBirth: '',
      ibusMicroFinanceApplicationPostalAddress: {
        microfinanceApplicationAddressId: 0,
        line1: '',
        line2: '',
        line3: '',
        province: '',
        island: '',
        cityTown: '',
        countryId: 0,
        countryValue: '',
        countryDescription : '',
        sourceTableName: '',
        sourceTablePrimaryKey: 0,
        msg: {
          infoMessage: {
            msgID: 0,
            msgType: 0,
            msgDescription: '',
          },
          errorMessage: [],
          hasError: true,
        },
        idoObjState: '',
        updateSeq: 0,
      },
      ibusMicroFinanceApplicationResidentialAddress: {
        microfinanceApplicationAddressId: 0,
        line1: '',
        line2: '',
        line3: '',
        province: '',
        island: '',
        cityTown: '',
        countryId: 0,
        countryValue: '',
        countryDescription : '',
        sourceTableName: '',
        sourceTablePrimaryKey: 0,
        msg: {
          infoMessage: {
            msgID: 0,
            msgType: 0,
            msgDescription: '',
          },
          errorMessage: [],
          hasError: true,
        },
        idoObjState: '',
        updateSeq: 0,
      },
    },
    ibusMicroFinanceApplicationBusinessDetails: {
      micorfinanceApplicationBusinessDetailId: 0,
      microfinanceApplicationId: 0,
      ownerFnpfNo: '',
      ownerFullName: '',
      occupation: '',
      ownerTin: '',
      employmentTypeId: 0,
      employmentTypeValue: '',
      businessStructureId: 0,
      businessStructureValue: '',
      registrationName: '',
      registrationNo: '',
      registrationDate: '',
      businessTin: '',
      businessAddressId: 0,
      msg: {
        infoMessage: {
          msgID: 0,
          msgType: 0,
          msgDescription: '',
        },
        errorMessage: [],
        hasError: true,
      },
      idoObjState: '',
      updateSeq: 0,
      ibusMicroFinanceApplicationBusinessAddress: {
        microfinanceApplicationAddressId: 0,
        line1: '',
        line2: '',
        line3: '',
        province: '',
        island: '',
        cityTown: '',
        countryId: 0,
        countryValue: '',
        countryDescription : '',
        sourceTableName: '',
        sourceTablePrimaryKey: 0,
        msg: {
          infoMessage: {
            msgID: 0,
            msgType: 0,
            msgDescription: '',
          },
          errorMessage: [],
          hasError: true,
        },
        idoObjState: '',
        updateSeq: 0,
      },
    },
    ilstbusMicroFinanceApplicationDocument: [],
  };
  clearData() {
    this.microfinance = {
      microfinanceApplicationId: 0,
      applicationRefNo: '',
      lendingOrgId: 0,
      lendingOrgRefNo: '',
      statusId: 0,
      statusValue: '',
      raisedOrgContactId: 0,
      raisedDate: '',
      submittedOrgContactId: 0,
      submittedDate: '',
      applicationTypeId: 0,
      applicationTypeValue: '',
      loanAccountNo: '',
      loanAccountName: '',
      loanAmount: '',
      fnpfContributionAmount: '',
      balanceLoanAmount: '',
      approvalLetterGenerated: '',
      paymentLetterGenerated: '',
      createdDate : '',
      createdBy : '',
      promisWithdrawalApplicationId: 0,
      msg: {
        infoMessage: {
          msgID: 0,
          msgType: 0,
          msgDescription: '',
        },
        errorMessage: [],
        hasError: true,
      },
      idoObjState: '',
      updateSeq: 0,
      statusDescription: '',
      applicationDescription: '',
      bankName: '',
      orgContactName: '',
      branchName: '',
      approvedDate: '',
      isConsent: '',
      istrCosentContent: '',
      ibusMicroFinanceApplicationApplicant: {
        microfinanceApplicationApplicantId: 0,
        microfinanceApplicationId: 0,
        applicantFnpfNo: '',
        tin: '',
        brithRegNo: '',
        marriedName: '',
        homeNo: '',
        workNo: '',
        mobileNo: '',
        emailId: '',
        preferredCommunicationId: 0,
        preferredCommunicationValue: '',
        requestedAmount: '',
        postalAddressId: 0,
        residentialAddressId: 0,
        msg: {
          infoMessage: {
            msgID: 0,
            msgType: 0,
            msgDescription: '',
          },
          errorMessage: [],
          hasError: true,
        },
        idoObjState: '',
        updateSeq: 0,
        personImage: '',
        applicantFullName: '',
        dateOfBirth: '',
        ibusMicroFinanceApplicationPostalAddress: {
          microfinanceApplicationAddressId: 0,
          line1: '',
          line2: '',
          line3: '',
          province: '',
          island: '',
          cityTown: '',
          countryId: 0,
          countryValue: '',
          countryDescription : '',
          sourceTableName: '',
          sourceTablePrimaryKey: 0,
          msg: {
            infoMessage: {
              msgID: 0,
              msgType: 0,
              msgDescription: '',
            },
            errorMessage: [],
            hasError: true,
          },
          idoObjState: '',
          updateSeq: 0,
        },
        ibusMicroFinanceApplicationResidentialAddress: {
          microfinanceApplicationAddressId: 0,
          line1: '',
          line2: '',
          line3: '',
          province: '',
          island: '',
          cityTown: '',
          countryId: 0,
          countryValue: '',
          countryDescription : '',
          sourceTableName: '',
          sourceTablePrimaryKey: 0,
          msg: {
            infoMessage: {
              msgID: 0,
              msgType: 0,
              msgDescription: '',
            },
            errorMessage: [],
            hasError: true,
          },
          idoObjState: '',
          updateSeq: 0,
        },
      },
      ibusMicroFinanceApplicationBusinessDetails: {
        micorfinanceApplicationBusinessDetailId: 0,
        microfinanceApplicationId: 0,
        ownerFnpfNo: '',
        ownerFullName: '',
        occupation: '',
        ownerTin: '',
        employmentTypeId: 0,
        employmentTypeValue: '',
        businessStructureId: 0,
        businessStructureValue: '',
        registrationName: '',
        registrationNo: '',
        registrationDate: '',
        businessTin: '',
        businessAddressId: 0,
        msg: {
          infoMessage: {
            msgID: 0,
            msgType: 0,
            msgDescription: '',
          },
          errorMessage: [],
          hasError: true,
        },
        idoObjState: '',
        updateSeq: 0,
        ibusMicroFinanceApplicationBusinessAddress: {
          microfinanceApplicationAddressId: 0,
          line1: '',
          line2: '',
          line3: '',
          province: '',
          island: '',
          cityTown: '',
          countryId: 0,
          countryValue: '',
          countryDescription : '',
          sourceTableName: '',
          sourceTablePrimaryKey: 0,
          msg: {
            infoMessage: {
              msgID: 0,
              msgType: 0,
              msgDescription: '',
            },
            errorMessage: [],
            hasError: true,
          },
          idoObjState: '',
          updateSeq: 0,
        },
      },
      ilstbusMicroFinanceApplicationDocument: [],
    };
  }
}
