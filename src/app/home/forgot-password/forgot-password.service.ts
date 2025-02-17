import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ForgotPasswordService {
    password = {
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
        this.password = {
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
    setpw = {
        password: '',
        guid: '',
        portalUserId: 0,
        msg: {
            infoMessage: {
                msgID: 0,
                msgType: 0,
                msgDescription: ''
            },
            hasError: true
        }
    }
    loadingTrue = false;
    btnClicked = false;
    errorTrue = false;

    constructor() { }
}
