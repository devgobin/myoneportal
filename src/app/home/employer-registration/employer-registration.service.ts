import { Injectable } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";

@Injectable({
  providedIn: "root",
})
export class EmployerRegistrationService {
  loadingTrue = false;
  btnClicked = false;
  errorTrue = false;
  otherbusinesstype = false;
  addresstype = "";
  communicationtype = "";
  constructor(public fullspinner: FullSpinnerService) {}
  newEmployer = {
    employerRegistrationId: 0,
    applicationRefNo: "",
    tradeName: "",
    businessRegistrationNo: "",
    registeredEmailId: "",
    orgName: "",
    tin: "",
    businessRegistrationDate: "",
    constitutionOfBusinessValueId: 0,
    constitutionOfBusinessValue: "",
    constitutionOfBusinessOtherDesc: "",
    currentDate: "",
    subClassCodeId: 0,
    subClassCodeValue: "",
    businessLicenseNo: "",
    groupCodeId: 0,
    groupCodeValue: "",
    classCodeId: 0,
    classCodeValue: "",
    ocrJsonValue: "",
    divisionCodeId: 0,
    divisionCodeValue: "",
    sectionCodeId: 0,
    sectionCodeValue: "",
    acceptDeclaration: "",
    statusId: 0,
    statusValue: "",
    declaration: "",
    natureOfBusiness: "",
    commencementDate: "",
    firstWagesPayableDate: "",
    firstWagesPaidDate: "",
    noOfEmployees: 0,
    orgId: 0,
    noOfNonRegisteredEmployees: 0,
    orgRefNo: "",
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
    funMsg: {
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
    statusDescription: "",
    constitutionOfBusinessDescription: "",
    sectionCodeDescription: "",
    divisionCodeDescription: "",
    classCodeDescription: "",
    groupCodeDescription: "",
    subClassCodeDescription: "",
    pEmployerRegistraionAddress: {
      employerRegistrationAddressId: 0,
      employerRegistrationId: 0,
      townCity: "",
      countryId: 0,
      countryValue: "",
      addressTypeId: 0,
      addressTypeValue: "",
      zoneId: 0,
      zoneValue: "",
      line1: "",
      line2: "",
      idoObjState: "",
      updateSeq: 0,
      countryDescription: "",
      addressTypeDescription: "",
      zoneDescription: "",
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
      townId: 0,
      townValue: "",
      townDescription: "",
    },
    plstEmployerRegistraionAddress: [],
    pEmployerRegistraionCommunicationDetails: {
      employerRegistrationCommunicationDetailId: 0,
      employerRegistrationId: 0,
      contactTypeId: 0,
      contactTypeValue: "",
      communicationDetails: "",
      preferredCommunicationId: 0,
      preferredCommunicationValue: "",
      idoObjState: "",
      updateSeq: 0,
      contactTypeDescription: "",
      preferredCommunicationDescription: "",
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
    },
    plstEmployerRegistraionCommunicationDetails: [],
    pEmployerRegistrationContacts: {
      employerRegistrationContactId: 0,
      employerRegistrationId: 0,
      businessAddressId: 0,
      percentageHolding: "",
      faxNo: "",
      workEmailAddress: "",
      fnpfNo: "",
      ocrJsonValue: "",
      contactTypeId: 0,
      contactTypeValue: "",
      isSameAsDirector: "",
      isSameAsPrimaryContact: "",
      tinNo: "",
      fatherName: "",
      dob: "",
      genderId: 0,
      genderValue: "",
      birthRegNo: "",
      fullName: "",
      personId: 0,
      designationPosition: "",
      passportNumber: "",
      postalAddress: "",
      motherName: "",
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
      contactTypeDescription: "",
      isSelected: "",
      preferredCommunicationId: 0,
      preferredCommunicationValue: "",
      preferredCommunicationDescription: "",
      communicationContactDetail: "",
      workPhoneNumber: "",
      promisMemberName: "",
      pEmployerRegistrationContactsDocument: {
        employerRegistrationContactDocumentId: 0,
        employerRegistrationContactId: 0,
        contentServerId: 0,
        documentTypeId: 0,
        documentTypeValue: "",
        isMandatory: "",
        documentFileId: 0,
        idoObjState: "",
        updateSeq: 0,
        documentTypeDescription: "",
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
        pOcrDetails: {
          value: "",
          confidence: "",
        },
        eitherValue: "",
      },
      plstEmployerRegistrationContactsDocument: [],
      pocrEmployerContactDetail: {
        fnpf: {
          value: "",
          confidence: "",
        },
        tinNo: {
          value: "",
          confidence: "",
        },
        birthRegNo: {
          value: "",
          confidence: "",
        },
        birthcertificateName: {
          value: "",
          confidence: "",
        },
        dateOfBirth: {
          value: "",
          confidence: "",
        },
        gender: {
          value: "",
          confidence: "",
        },
        fatherName: {
          value: "",
          confidence: "",
        },
        passportNo: {
          value: "",
          confidence: "",
        },
        postalAddress: {
          value: "",
          confidence: "",
        },
        passportName: {
          value: "",
          confidence: "",
        },
        jidName: {
          value: "",
          confidence: "",
        },
        utilitybillName: {
          value: "",
          confidence: "",
        },
      },
      plstBusinessAddress: [],
      contactDetail: "",
      funMsg: {
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
      preferredEmployerPortalUsername: "",
      isAlreadyHavePortalAccess: "",
      nationalityId: 0,
      nationalityValue: "",
    },
    plstEmployerRegistrationContacts: [],
    pEmployerRegistrationDocument: {
      employerRegistrationDocumentId: 0,
      employerRegistrationId: 0,
      contentServerId: 0,
      documentTypeId: 0,
      documentTypeValue: "",
      documentFileId: 0,
      isMandatory: "",
      idoObjState: "",
      updateSeq: 0,
      documentTypeDescription: "",
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
        ibyteImageContent: {
          data: [0],
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
        },
      },
    },
    plstEmployerRegistrationDocument: [],
    plstEmployerRegistrationEmailHistory: [],
    plstEmployerRegistrationStatusHistory: [],
    pEmployerRegistrationNotes: {
      employerRegistrationNotesId: 0,
      employerRegistrationId: 0,
      statusId: 0,
      statusValue: "",
      enteredBy: "",
      enteredDate: "",
      notes: "",
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
      statusDescription: "",
    },
    plstEmployerRegistrationNotes: [],
    pocrEmployerDetail: {
      employerName: {
        value: "",
        confidence: "",
      },
      businessLicenseNo: {
        value: "",
        confidence: "",
      },
      tin: {
        value: "",
        confidence: "",
      },
      commencementDate: {
        value: "",
        confidence: "",
      },
      businessRegistrationDate: {
        value: "",
        confidence: "",
      },
      natureOfBusiness: {
        value: "",
        confidence: "",
      },
    },
    plstRequiredDocuments: [],
    registrationFormContent: {
      data: [0],
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
    },
    iblShowNewDirectorbtn: true,
    sameAsDirectors: "",
    sameAsDirectorsAndPrimary: "",
    pEmployerRegistrationDocumentWithCompanyLogo: {
      employerRegistrationDocumentId: 0,
      employerRegistrationId: 0,
      contentServerId: 0,
      documentTypeId: 0,
      documentTypeValue: "",
      isMandatory: "",
      documentFileId: 0,
      idoObjState: "",
      updateSeq: 0,
      documentTypeDescription: "",
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
    },
  };
  initialData = {
    ERBusinessType: [],
    ERAddress: [],
    ERCountry: [],
    ERPreferredCommunication: [],
    ERGender: [],
    ERTowns: [],
  };

  setAll(val) {
    this.btnClicked = val;
    this.loadingTrue = val;
    this.fullspinner.empty.next(val);
  }
}
