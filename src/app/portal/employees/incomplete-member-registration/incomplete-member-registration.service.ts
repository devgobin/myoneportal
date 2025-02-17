import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class IncompleteMemberRegistrationService {
    incompleteMember = {
        memberRegistrationId: 0,
        employerRefNo: '',
        orgId: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        brn: '',
        tin: '',
        passportNo: '',
        dateOfBirth: '',
        placeOfBirth: '',
        nationalityId: 0,
        nationalityValue: '',
        genderId: 0,
        genderValue: '',
        fatherName: '',
        motherName: '',
        ethnicityId: 0,
        ethnicityValue: '',
        citizenshipId: 0,
        citizenshipValue: '',
        maritalStatusId: 0,
        maritalStatusValue: '',
        mobileNo: '',
        emailId: '',
        personId: 0,
        peopleHubPersonId: 0,
        optOutOfNominee: '',
        dateStartedWork: '',
        acceptDeclaration: '',
        statusId: 0,
        statusValue: '',
        transactionPin: '',
        declaration: '',
        nationalityDescription: '',
        genderDescription: '',
        ethnicityDescription: '',
        citizenshipDescription: '',
        maritalStatusDescription: '',
        statusDescription: '',
        createdDate: '',
        pMemberExecutor: {
            memberRegistrationExecutorId: 0,
            memberRegistrationId: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            brn: '',
            tin: '',
            genderId: 0,
            genderValue: '',
            dateOfBirth: '',
            mobileNo: '',
            emailId: '',
            personId: 0,
            peopleHubPersonId: 0,
            genderDescription: '',
            pExecutorDocument: {
                memberRegistrationExecutorDocumentId: 0,
                memberRegistrationExecutorId: 0,
                documentTypeId: 0,
                documentTypeValue: '',
                documentFileId: 0,
                isMandatory: '',
                documentTypeDescription: '',
                pdocumentFile: {
                    documentFileId: 0,
                    fileType: '',
                    fileSize: 0,
                    relativePath: '',
                    fileName: '',
                    uploadbyFullName: '',
                    istrFileContent: ''
                },
            },
            plstMemberExecutorDocuments: [],
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
        pMemberAddress: {
            memberRegistrationAddressId: 0,
            memberRegistrationId: 0,
            line1: '',
            line2: '',
            city: '',
            province: '',
            island: '',
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
        pMemberNominee: {
            memberRegistrationNomineeId: 0,
            memberRegistrationId: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            dateOfBirth: '',
            brn: '',
            genderId: 0,
            genderValue: '',
            relationshipId: 0,
            relationshipValue: '',
            sharePercentage: '',
            personId: 0,
            peopleHubPersonId: 0,
            tin: '',
            genderDescription: '',
            relationshipDescription: '',
            pNomineeDocument: {
                memberRegistrationNomineeDocumentId: 0,
                memberRegistrationNomineeId: 0,
                documentTypeId: 0,
                documentTypeValue: '',
                documentFileId: 0,
                isMandatory: '',
                documentTypeDescription: '',
                pdocumentFile: {
                    documentFileId: 0,
                    fileType: '',
                    fileSize: 0,
                    relativePath: '',
                    fileName: '',
                    uploadbyFullName: '',
                    istrFileContent: ''
                },
            }
        },
        plstMemberNominees: [],
        plstMemberDocuments: [],
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
    }
}
