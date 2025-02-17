import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageId = 0;
  constructor() { }
  createMessage = {
    messageId: 0,
    organizationId: 0,
    orgContactId: 0,
    messageTypeId: 0,
    messageTypeValue: "",
    sendOrRecieveDate: "",
    categoryId: 0,
    categoryValue: "",
    transactionTypeId: 0,
    transactionTypeValue: "",
    reasonTypeId: 0,
    reasonTypeValue: "",
    subject: "",
    messageContent: "",
    messageStatusId: 0,
    messageStatusValue: "",
    deliveryStatusId: 0,
    deliveryStatusValue: "",
    idoObjState: "",
    updateSeq: 0,
    messageStatusDescription: "",
    messageTypeDescription: "",
    categoryDescription: "",
    transactionTypeDescription: "",
    reasonTypeDescription: "",
    deliveryStatusDescription: "",
    sendMsgContent:0,
    isBusinessMessage: false
  }
}
