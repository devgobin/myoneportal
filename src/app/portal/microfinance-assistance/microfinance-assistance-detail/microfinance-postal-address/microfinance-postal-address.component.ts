import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MicrofinanceAssistanceService } from '../../microfinance-assistance.service';

@Component({
  selector: 'app-microfinance-postal-address',
  templateUrl: './microfinance-postal-address.component.html',
  styleUrls: ['./microfinance-postal-address.component.scss']
})
export class MicrofinancePostalAddressComponent implements OnInit {

  errorTrue = false;
  btnClicked = false;
  constructor(
    public service: MicrofinanceAssistanceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MicrofinancePostalAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
  ) { }

  ngOnInit(): void {
  }
  saveAddress(a) {
    if (a.valid) {
      this.service.DDL.DDLcountry.forEach(element => {
        if (element.constant === this.service.microfinance.ibusMicroFinanceApplicationApplicant.ibusMicroFinanceApplicationPostalAddress.countryValue) {
          this.service.microfinance.ibusMicroFinanceApplicationApplicant.ibusMicroFinanceApplicationPostalAddress.countryDescription = element.description;
        }
      });
      this.dialog.closeAll();
    }
    else {
      this.errorTrue = true;
    }
  }
}
