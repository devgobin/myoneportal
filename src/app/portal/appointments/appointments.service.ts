import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class appointmentservice {
  createappointment = {
    appointmentId: 0,
    appointmentCalendarId: 0,
    employerPortalUserId: 0,
    organizationId: 0,
    appointmentRefNo: '',
    branchId: 0,
    branchValue: '',
    appointmentDate: '',
    fromTime: '',
    toTime: '',
    statusId: 0,
    statusValue: '',
    statusDescription: '',
    meetingInformation: '',
    categoryId: 0,
    categoryValue: '',
    maxInfoContent: 0,
    reserveTimeout:0,
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
    ibusAppointmentCalender: {
      appointmentCalendarId: 0,
      branchId: 0,
      branchValue: ' ',
      calendarEmailAccount: ' ',
      userName: ' ',
      password: ' ',
      smtpServerIp: ' ',
      smtpServerPort: 0,
      enableSsl: ' ',
      defaultCredential: ' ',
      msg: {
        infoMessage: {
          msgID: 0,
          msgType: 0,
          msgDescription: ' '
        },
        errorMessage: [
          {
            msgID: 0,
            msgType: 0,
            msgDescription: ' '
          }
        ],
        hasError: true
      }
    },
    ibusAppointmentReserve: {
      appointmentReserveId: 0,
      employerPortalUserId: 0,
      organizationId: 0,
      appointmentRefNo: ' ',
      branchId: 0,
      branchValue: ' ',
      appointmentDate: ' ',
      fromTime: ' ',
      toTime: ' ',
      reservedDatetime: ' ',
      msg: {
        infoMessage: {
          msgID: 0,
          msgType: 0,
          msgDescription: ' '
        },
        errorMessage: [
          {
            msgID: 0,
            msgType: 0,
            msgDescription: ' '
          }
        ],
        hasError: true
      }
    },
    ibusAppointmentTimeslots: {
      fromtime: ' ',
      totime: ' ',
      appointmenttimeslotvalue: ' ',
      appointmenttimeslotconstant: ' '
    },
    ilstbusAppointmentStatusHistory: [
      {
        appointmentStatusHistoryId: 0,
        appointmentId: 0,
        statusId: 0,
        statusValue: ' ',
        changedBy: ' ',
        changedDate: ' ',
        msg: {
          infoMessage: {
            msgID: 0,
            msgType: 0,
            msgDescription: ' '
          },
          errorMessage: [
            {
              msgID: 0,
              msgType: 0,
              msgDescription: ' '
            }
          ],
          hasError: true
        }
      }
    ],
    ilstbusAppointmentTimeslots: []
  }
  DDL: any = {
    DDLAppointmentLocation: [],
    DDLAppointmentCategory: [],
    DDLAppointmentTimeSlots: [],
    DDLAppointmentStatus: [],
  };

  clearData() {
    this.createappointment = {
      reserveTimeout:0,
      maxInfoContent: 0,
      appointmentId: 0,
      appointmentCalendarId: 0,
      employerPortalUserId: 0,
      organizationId: 0,
      appointmentRefNo: '',
      branchId: 0,
      branchValue: '',
      appointmentDate: '',
      fromTime: '',
      toTime: '',
      statusId: 0,
      statusValue: '',
      statusDescription: '',
      meetingInformation: '',
      categoryId: 0,
      categoryValue: '',
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
      ibusAppointmentCalender: {
        appointmentCalendarId: 0,
        branchId: 0,
        branchValue: ' ',
        calendarEmailAccount: ' ',
        userName: ' ',
        password: ' ',
        smtpServerIp: ' ',
        smtpServerPort: 0,
        enableSsl: ' ',
        defaultCredential: ' ',
        msg: {
          infoMessage: {
            msgID: 0,
            msgType: 0,
            msgDescription: ' '
          },
          errorMessage: [
            {
              msgID: 0,
              msgType: 0,
              msgDescription: ' '
            }
          ],
          hasError: true
        }
      },
      ibusAppointmentReserve: {
        appointmentReserveId: 0,
        employerPortalUserId: 0,
        organizationId: 0,
        appointmentRefNo: ' ',
        branchId: 0,
        branchValue: ' ',
        appointmentDate: ' ',
        fromTime: ' ',
        toTime: ' ',
        reservedDatetime: ' ',
        msg: {
          infoMessage: {
            msgID: 0,
            msgType: 0,
            msgDescription: ' '
          },
          errorMessage: [
            {
              msgID: 0,
              msgType: 0,
              msgDescription: ' '
            }
          ],
          hasError: true
        }
      },
      ibusAppointmentTimeslots: {
        fromtime: ' ',
        totime: ' ',
        appointmenttimeslotvalue: ' ',
        appointmenttimeslotconstant: ' '
      },
      ilstbusAppointmentStatusHistory: [
        {
          appointmentStatusHistoryId: 0,
          appointmentId: 0,
          statusId: 0,
          statusValue: ' ',
          changedBy: ' ',
          changedDate: ' ',
          msg: {
            infoMessage: {
              msgID: 0,
              msgType: 0,
              msgDescription: ' '
            },
            errorMessage: [
              {
                msgID: 0,
                msgType: 0,
                msgDescription: ' '
              }
            ],
            hasError: true
          }
        }
      ],
      ilstbusAppointmentTimeslots: [
        {
          fromtime: ' ',
          totime: ' ',
          appointmenttimeslotvalue: ' ',
          appointmenttimeslotconstant: ' '
        }
      ]
    }
  }
}
