import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class organizationcontactdetailservice {
  contact = {
    employerContactId: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    emailId: "",
    contactNo: "",
    brn: "",
    tin: "",
    passportNo: "",
    contactTypeId: 0,
    contactTypeValue: "",
    designation: "",
    csCode: 0,
    statusId: 0,
    statusValue: "",
    startDate: "",
    endDate: "",
    businessAddressId: 0,
    genderId: 0,
    genderValue: "",
    nationalityId: 0,
    nationalityValue: "",
    employerRefNo: "",
    primaryContactId: 0,
    registrationStatusId: 0,
    registrationStatusValue: "",
    orgId: 0,
    coreEmployerContactId: 0,
    personId: 0,
    holdingPercentage: "",
    contactTypeDescription: "",
    genderDescription: "",
    nationalityDescription: "",
    statusDescription: "",
    registrationStatusDescription: "",
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
    employerContactAddress: {
      employerContactAddressId: 0,
      employerContactId: 0,
      line1: "",
      line2: "",
      city: "",
      province: "",
      island: "",
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
      updateSeq: 0,
      idoObjState: "",
    },
    lstentadderss: [],
    lstProtoEmployerContactDocument: [],
    lstprotoentCSCode: [],
    lstprotoentOrgContact: [],
    userName: "",
    personAlreadyAuser: "",
    updateSeq: 0,
    idoObjState: "",
  };
  DDL: any = {
    DDLGenderValue: [],
    DDLNationalityValue: [],
    DDLContactTypeValue: [],
    DDLStatusValue: [],
    DDLUserStatusValue: [],
  };
  constructor() {}
}
