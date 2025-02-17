import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ForgotUseridService {
    userid = {
        employerRefNo: '',
        contactFirstName: '',
        contactMiddleName: '',
        contactLastName: '',
        contactEmailid: '',
        contactMobileNo: '',
        transactionPin: '',
        portalUserSecurityQuestionList: [
            {
                portalUserSecurityQuestionId: 0,
                employerPortalUserId: 0,
                securityQuestionId: 0,
                encryptedAnswer: '',
                protoSecurityQuestion: {
                    securityQuestionId: 0,
                    securityQuestionNo: 0,
                    question: ''
                }
            }
        ],
        msg: {
            infoMessage: {
                msgID: 0,
                msgType: 0,
                msgDescription: ''
            },
            errorMessage: [],
            hasError: true
        },
        username: '',
        portalUserId: 0,
        resetEmailFlag: ''
    };
    clearData() {
        this.userid = {
            employerRefNo: '',
            contactFirstName: '',
            contactMiddleName: '',
            contactLastName: '',
            contactEmailid: '',
            contactMobileNo: '',
            transactionPin: '',
            portalUserSecurityQuestionList: [
                {
                    portalUserSecurityQuestionId: 0,
                    employerPortalUserId: 0,
                    securityQuestionId: 0,
                    encryptedAnswer: '',
                    protoSecurityQuestion: {
                        securityQuestionId: 0,
                        securityQuestionNo: 0,
                        question: ''
                    }
                }
            ],
            msg: {
                infoMessage: {
                    msgID: 0,
                    msgType: 0,
                    msgDescription: ''
                },
                errorMessage: [],
                hasError: true
            },
            username: '',
            portalUserId: 0,
            resetEmailFlag: ''
        };
    }
    loadingTrue = false;
    btnClicked = false;
    errorTrue = false;

    constructor() { }
}
