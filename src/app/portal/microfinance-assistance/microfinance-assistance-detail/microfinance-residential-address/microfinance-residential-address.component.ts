import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MicrofinanceAssistanceService } from '../../microfinance-assistance.service';

@Component({
  selector: 'app-microfinance-residential-address',
  templateUrl: './microfinance-residential-address.component.html',
  styleUrls: ['./microfinance-residential-address.component.scss']
})
export class MicrofinanceResidentialAddressComponent implements OnInit {

  errorTrue = false;
  btnClicked = false;
  constructor(
    public service: MicrofinanceAssistanceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MicrofinanceResidentialAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
  ) { }

  ngOnInit(): void {
  }
  saveAddress(a) {
    if (a.valid) {
      this.service.DDL.DDLcountry.forEach(element => {
        if (element.constant === this.service.microfinance.ibusMicroFinanceApplicationApplicant.ibusMicroFinanceApplicationResidentialAddress.countryValue) {
          this.service.microfinance.ibusMicroFinanceApplicationApplicant.ibusMicroFinanceApplicationResidentialAddress.countryDescription = element.description;
        }
      });
      this.dialog.closeAll();
    }
    else {
      this.errorTrue = true;
    }
  }
}
