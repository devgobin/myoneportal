import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FullSpinnerService } from 'src/app/common/full-spinner/full-spinner.service';
import { AppGlobal } from 'src/app/constants';
import { DataService } from 'src/app/service/data.service';
import { HousingAssistanceService } from '../../housing-assitance.service';
import { ApplicantDetailComponent } from '../applicant-detail/applicant-detail.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  loadingTrue = true;
  errorTrue = false;
  btnClicked = false;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public fullspinner: FullSpinnerService,
    public data: DataService,
    public service: HousingAssistanceService,
    public dialogRef: MatDialogRef<ApplicantDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public xdata: any,
  ) {
    //this.service.ProtoHousingAssitanceApplication = xdata.data;
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
            AppGlobal.apiPaths.housingassitance.saveaddress,
            this.service.ProtoHousingAssitanceApplication
          )
          .then(
            (success: any) => {
              this.service.ProtoHousingAssitanceApplication.pHousingProperty.pAddress = success;
              this.data.successMesaage(success);
              this.fullspinner.empty.next(false);
              this.btnClicked = false;
              this.dialogRef.close(true);
            },
            (error) => {
              this.data.errorMethod(error);
              this.fullspinner.empty.next(false);
              this.btnClicked = false;
            }
          );
      }
    else {
      this.errorTrue = true;
    }
  }
}
