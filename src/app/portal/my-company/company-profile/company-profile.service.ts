import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class companyprofileservice {
    detail = {
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
            {
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
                lstprotoentOrganization: [],
                msg: {
                    infoMessage: {
                        msgID: 0,
                        msgType: 0,
                        msgDescription: ''
                    },
                    errorMessage: [],
                    hasError: true
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
        ],
        protoentAddress: {
            personId: 0,
            orgId: 0,
            addressId: 0,
            line1: '',
            line2: '',
            city: '',
            province: '',
            source: '',
            addressType: '',
            status: '',
            countryValue: '',
            countryDescription: '',
            island: '',
            createdDate: '',
            addressTypeDescription: ''
        },
        protoentOrgCommunication: {
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
    };
    DDL: any = {
        DDLCommunictionTypeValue: [],
        DDLCommunictionStatusValue: [],
        DDLCountryValue: [],
        DDLProvinceValue: [],
        DDLAddressTypeValue: []



    };
    address = {
        personId: 0,
        orgId: 0,
        addressId: 0,
        line1: '',
        line2: '',
        city: '',
        province: '',
        source: '',
        addressType: '',
        status: '',
        countryValue: '',
        countryDescription: '',
        island: '',
        createdDate: '',
        addressTypeDescription: ''

    }
    communication = {
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
    constructor() { }
}