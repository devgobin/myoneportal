import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortalRegistrationService {
  register = {
    employerPortalRegistrationId: 0,
    employerRefNo: '',
    employerName: '',
    businessRegistrationNo: '',
    fircNo: '',
    companyTin: '',
    contactPhoneNo: '',
    contactEmailId: '',
    contactFnpfNo: '',
    contactPassportNo: '',
    contactTin: '',
    contactBrn: '',
    statusId: 0,
    statusValue: '',
    businessLicenseNo: '',
    contactTypeId: 0,
    contactTypeValue: '',
    employerPortalUserId: 0,
    employerPortalRegistrationDocument: [    {
      employerPortalRegistrationDocumentId: 0,
      employerPortalRegistrationId: 0,
      documentTypeId: 0,
      documentTypeValue: '',
      documentName: '',
      documentRelativeFilePath: '',
      isMandatory: '',
      documentTypeDescription: '',
      documentFile: 
        {
          documentFileId: 0,
          fileType: '',
          fileSize: '',
          relativePath: '',
          fileName: '',
          istrFileContent: '',
        },
    },
  ],
    msg: {
      infoMessage: {
        msgID: 0,
        msgType: 0,
        msgDescription: '',
      },
      errorMessage: [],
      hasError: true,
    },
    contactFirstName: '',
    contactMiddleName: '',
    contactLastName: '',
    isFijiCitizen:'',
    errorTrue:false,
    tradeName:''
  };
  constructor() {}
}
