import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class profileservice {
    detail = {
        mobileNo:'',
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
        statusDescription:'',
        totalSecurityQuestions:'0',
        answeredSecurityQuestions:'0',
        defaultLandingPage:'',
        defaultLandingPageName:'',
        
        lstprotoDefaultLandingPage:[],
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
            errorMessage: [
                {
                    msgID: 0,
                    msgType: 0,
                    msgDescription: ''
                }
            ],
            hasError: true
        },
        maskedEmail: '',
        maskedContactNo: '',
        contactFullName: '',
        fnpfNo: '',
        otp: '',
        otpSentDatetime: '',
        contactMobileNumber: '',
        contactEmailid: '',
        enableTwoFactorAuthentication: '',
        fontSizeValue: '',
        guid: '',
        organizationRefNo: '',
        reminingpasswordExpiredDays:0,
        iprotoentOrgContact: {
            person: {
                firstName: '',
                middleName: '',
                lastName: '',
                dateOfBirth: '',
                genderId: 0,
                genderValue: '',
                genderDescription: '',
                fatherName: '',
                motherName: '',
                fnpfNo: '',
                tin: '',
                passportNo: '',
                personId: 0,
                mobileNo: '',
                emailId: '',
                citizenshipId: 0,
                citizenshipValue: '',
                citizenshipDescription: '',
                ethnicityId: 0,
                ethnicityValue: '',
                ethnicityDescription: '',
                nationalId: 0,
                nationalValue: '',
                nationalDescription: '',
                maritalStatusId: 0,
                maritalStatusValue: '',
                maritalStatusDescription: '',
                personStatusId: 0,
                personStatusValue: '',
                personStatusDescription: '',
                peopleHubId: 0,
                errorStatusId: 0,
                errorStatusValue: '',
                actionStatusId: 0,
                actionStatusValue: '',
                interfaceStatusId: 0,
                interfaceStatusValue: '',
                hotlistFlag: '',
                suppressWarningsFlag: '',
                duplicateFlag: '',
                cAndFNotificationFlag: '',
                birthRegNo: '',
                msg: {
                    infoMessage: {
                        msgID: 0,
                        msgType: 0,
                        msgDescription: ''
                    },
                    errorMessage: [
                        {
                            msgID: 0,
                            msgType: 0,
                            msgDescription: ''
                        }
                    ],
                    hasError: true
                }
            },
            orgRefNo: '',
            orgId: 0,
            contactTypeId: 0,
            contactTypeValue: '',
            contactTypeDescription: '',
            contactStatusId: 0,
            contactStatusValue: '',
            contactStatusDescription: '',
            holdingPercentage: '',
            startDate: '',
            endDate: '',
            emailId: '',
            contactNo: '',
            employerContactId: 0,
            organization: {
                orgId: 0,
                businessName: '',
                tradeName: '',
                orgRefNo: '',
                tin: '',
                businessRegNo: '',
                businessRegDate: '',
                businessLicenseNo: '',
                fircNo: '',
                natureOfBusiness: '',
                orgStatusId: 0,
                orgStatusValue: '',
                orgStatusDescription: '',
                overseasOrg: true,
                lstOrgContact: [
                    null
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
                lstEntAdderss: [
                    {
                        personId: 0,
                        orgId: 0,
                        addressId: 0,
                        line1: '',
                        line2: '',
                        city: '',
                        province: '',
                        island: ''
                    }
                ],
                lstEntCommunication: [
                    {
                        orgCommunicationId: 0,
                        orgId: 0,
                        orgReFNo: '',
                        orgCommunicationTypeId: 0,
                        orgCommunicationTypeValue: '',
                        orgCommunicationTypeDescription: '',
                        orgCommunicationStatusId: 0,
                        orgCommunicationStatusValue: '',
                        orgCommunicationStatusDescription: '',
                        communicationDetail: ''
                    }
                ]
            },
            lstprotoentOrganization: [
                {
                    orgId: 0,
                    businessName: '',
                    tradeName: '',
                    orgRefNo: '',
                    tin: '',
                    businessRegNo: '',
                    businessRegDate: '',
                    businessLicenseNo: '',
                    fircNo: '',
                    natureOfBusiness: '',
                    orgStatusId: 0,
                    orgStatusValue: '',
                    orgStatusDescription: '',
                    overseasOrg: true,
                    lstOrgContact: [
                        null
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
                    lstEntAdderss: [
                        {
                            personId: 0,
                            orgId: 0,
                            addressId: 0,
                            line1: '',
                            line2: '',
                            city: '',
                            province: '',
                            island: ''
                        }
                    ],
                    lstEntCommunication: [
                        {
                            orgCommunicationId: 0,
                            orgId: 0,
                            orgReFNo: '',
                            orgCommunicationTypeId: 0,
                            orgCommunicationTypeValue: '',
                            orgCommunicationTypeDescription: '',
                            orgCommunicationStatusId: 0,
                            orgCommunicationStatusValue: '',
                            orgCommunicationStatusDescription: '',
                            communicationDetail: ''
                        }
                    ]
                }
            ],
            msg: {
                infoMessage: {
                    msgID: 0,
                    msgType: 0,
                    msgDescription: ''
                },
                errorMessage: [
                    {
                        msgID: 0,
                        msgType: 0,
                        msgDescription: ''
                    }
                ],
                hasError: true
            },
            protoentAddress: {
                personId: 0,
                orgId: 0,
                addressId: 0,
                line1: '',
                line2: '',
                city: '',
                province: '',
                island: ''
            }
        },
        lstprotoentOrgContact: []
    }
    constructor() { }
}