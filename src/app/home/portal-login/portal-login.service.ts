import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortalLoginService {
  user = {
    employerPortalUserId: 0,
    personId: 0,
    employerName: '',
    receivedDate: '',
    userId: '',
    password: '',
    statusId: 0,
    statusValue: '',
    passwordExpiryDate: '',
    unsuccessfulLoginAttempts: 0,
    lastLockedDate: '',
    lastEmailSentDate: '',
    passwordResetFlag: '',
    passwordLastChangedDate: '',
    lockCount: 0,
    successfulLoginAttempts: 0,
    lastLoginDate: '',
    currentLoginDate: '',
    workEmailAddress: '',
    startDate: '',
    endDate: '',
    tAndCFlag: '',
    transactionPin: '',
    transactionPinLastChangedDate: '',
    portalUserSecurityQuestionList: [],
    msg: {
      infoMessage: {
        msgID: 0,
        msgType: 0,
        msgDescription: '',
      },
      errorMessage: [
        {
          msgID: 0,
          msgType: 0,
          msgDescription: '',
        },
      ],
      hasError: true,
    },
    maskedEmail: '',
    maskedContactNo: '',
    contactFullName: '',
    contactMobileNumber:'',
    contactEmailid:'',
    organizationRefNo:'',
    mobileNo:'',
    sendOtpToEmail:'',
    sendOtpToMobile:''
  };
  loadingTrue = false;
  btnClicked = false;
  errorTrue = false;

  constructor() {}
}
