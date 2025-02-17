import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StaffLoginService {
    user = {
        username: '',
        password: '',
        guid: '',
        msg: {
            infoMessage: {
                msgID: 0,
                msgType: 0,
                msgDescription: ''
            },
            errorMessage: [],
            hasError: true
        }
    };
    orgization = {
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
        lstOrgContact: [],
        msg: {
            infoMessage: {
                msgID: 0,
                msgType: 0,
                msgDescription: ''
            },
            errorMessage: [],
            hasError: true
        }
    };

    loadingTrue = false;
    btnClicked = false;
    errorTrue = false;

    staffinfo = {
        firstName: '',
        middleName: '',
        lastName: '',
        userId: '',
        beginDate: '',
        endDate: '',
        status: '',
        userSerialId: 0,
        msg: {
            infoMessage: {
                msgID: 0,
                msgType: 0,
                msgDescription: ''
            },
            errorMessage: [],
            hasError: true
        },
        selectedContactId: 0
    }
    constructor() { }
}
