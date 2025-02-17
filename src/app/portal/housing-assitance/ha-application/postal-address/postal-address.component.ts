import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { AppGlobal } from 'src/app/constants';
import { DataService } from 'src/app/service/data.service';
import { HousingAssistanceService } from '../../housing-assitance.service';

@Component({
  selector: 'app-postal-address',
  templateUrl: './postal-address.component.html',
  styleUrls: ['./postal-address.component.scss']
})
export class PostalAddressComponent implements OnInit {
  loadingTrue = true;
  errorTrue = false;
  btnClicked = false;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: HousingAssistanceService,
    public dialogRef: MatDialogRef<PostalAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
  ) {
    // this.service.ProtoHousingAssitanceApplicant = xdata.data;
  }

  ngOnInit(): void {
  }
  onsubmit(h) {
    if (h.valid) {
      this.errorTrue = false;
      this.btnClicked = true;
      this.fullspinner.empty.next(true);
      this.data
        .postData(
          AppGlobal.apiPaths.housingassitance.savepostaladdress,
          this.service.ProtoHousingAssitanceApplication
        )
        .then(
          (success: any) => {
            this.service.ProtoHousingAssitanceApplication.pApplicant.pPostalAddress = success;
            this.data.successMesaage(success);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
            this.dialogRef.close();
          },
          (error) => {
            this.data.errorMethod(error);
            this.fullspinner.empty.next(false);
            this.btnClicked = false;
          }
        );
    } else {
      this.errorTrue = true;
    }
  }
}
