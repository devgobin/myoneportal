import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  otp={
    tpoHeaderId: 0,
  effectiveDate: "",
  endDate: "",
  principalContractor: "",
  subContractor: "",
  statusValue: "",
  statusDescription: "",
  totalDebtBalance: "",
  debtBalancePaid: "",
  debtBalanceRemaining: "",
  ilstentrincipalEmployerDetails:[],
  strdisclaimer: "",
  }
  DDL = {
    DDLStatusValue: [],
  }
  clearData(){
    this.otp={
      tpoHeaderId: 0,
      effectiveDate: "",
      endDate: "",
      principalContractor: "",
      subContractor: "",
      statusValue: "",
      statusDescription: "",
      totalDebtBalance: "",
      debtBalancePaid: "",
      debtBalanceRemaining: "",
      ilstentrincipalEmployerDetails:[],
      strdisclaimer: "",
    }
  }
  constructor() { }
}
