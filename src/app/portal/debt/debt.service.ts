import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  DDL = {
    DDLMonthValue: [],
    DDLInvoiceStatusValue: [],
    DDLRecoveryStage: []
  }
  constructor() { }
  clearData() {
    
  }
}
