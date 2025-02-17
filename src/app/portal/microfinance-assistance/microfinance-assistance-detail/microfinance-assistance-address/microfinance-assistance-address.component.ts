import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MicrofinanceAssistanceService } from '../../microfinance-assistance.service';

@Component({
  selector: 'app-microfinance-assistance-address',
  templateUrl: './microfinance-assistance-address.component.html',
  styleUrls: ['./microfinance-assistance-address.component.scss']
})
export class MicrofinanceAssistanceAddressComponent implements OnInit {
  errorTrue = false;
  btnClicked = false;
  constructor(
    public service: MicrofinanceAssistanceService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MicrofinanceAssistanceAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
  ) { }

  ngOnInit(): void {
  }

  saveAddress(a) {
    if (a.valid) {
      this.service.DDL.DDLcountry.forEach(element => {
        if (element.constant === this.service.microfinance.ibusMicroFinanceApplicationBusinessDetails.ibusMicroFinanceApplicationBusinessAddress.countryValue) {
          this.service.microfinance.ibusMicroFinanceApplicationBusinessDetails.ibusMicroFinanceApplicationBusinessAddress.countryDescription = element.description;
        }
      });
      this.dialog.closeAll();
    }
    else {
      this.errorTrue = true;
    }
  }
}
