import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { AppGlobal } from 'src/app/constants';
import { DataService } from 'src/app/service/data.service';
import { HousingAssistanceService } from '../../housing-assitance.service';

@Component({
  selector: 'app-residential-address',
  templateUrl: './residential-address.component.html',
  styleUrls: ['./residential-address.component.scss']
})
export class ResidentialAddressComponent implements OnInit {
  loadingTrue = true;
  errorTrue = false;
  btnClicked = false;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: HousingAssistanceService,
    public dialogRef: MatDialogRef<ResidentialAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
  ) {
    //this.service.ProtoHousingAssitanceApplicant = xdata.data;
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
          AppGlobal.apiPaths.housingassitance.saveresidentialaddress,
          this.service.ProtoHousingAssitanceApplication
        )
        .then(
          (success: any) => {
            this.service.ProtoHousingAssitanceApplication.pApplicant.pResidentialAddress = success;
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
