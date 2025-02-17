import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { DataService } from 'src/app/service/data.service';
import { EditContributionScheduleComponent } from './edit-contribution-schedule/edit-contribution-schedule.component';
import { MatDialog } from '@angular/material/dialog';
export interface PeriodicElement {
  id: string;
  code: string;
  year: string;
  wages: string;
  rece: string;
  amount: string;
  status: string;
  empl: string;
  action: string;
}
export interface payPeriodicElement {
  pay: string;
  con: string;
}
export interface bankPeriodicElement {
  bank: string;
  de: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: '178', code: '', year: '', wages: '', rece: '', amount: '56757', status: '', empl: '', action: '' },
  { id: '178', code: '', year: '', wages: '', rece: '', amount: '56757', status: '', empl: '', action: '' }
];
const payELEMENT_DATA: payPeriodicElement[] = [
  { pay: '178', con: '' },
  { pay: '178', con: '' },
  { pay: '178', con: '' }
];
const bankELEMENT_DATA: bankPeriodicElement[] = [
  { bank: 'KVB', de: '' },
  { bank: 'KVB', de: '' },
  { bank: 'KVB', de: '' },
];
@Component({
  selector: 'app-view-submitted-contribution-detail',
  templateUrl: './view-submitted-contribution-detail.component.html',
  styleUrls: ['./view-submitted-contribution-detail.component.scss']
})
export class ViewSubmittedContributionDetailComponent implements OnInit {
  displayedColumns: string[] = ['id', 'code', 'year', 'wages', 'rece', 'amount', 'status', 'empl', 'action'];
  paydisplayedColumns: string[] = ['pay', 'con'];
  bankdisplayedColumns: string[] = ['bank', 'de'];
  dataSource = ELEMENT_DATA;
  paydataSource = payELEMENT_DATA;
  bankdataSource = bankELEMENT_DATA;
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step4Completed = false;
  activeIndex: number;

  @ViewChild('registrationSteps', { static: false }) registrationSteps: CdkStepper;
  constructor(
    public data: DataService,
    public dialog: MatDialog,
  ) {
    this.data.headerName = {
      screenName: 'View Submitted Contribution Detail',
      paths: [
        {
          name: 'Home',
          link: '#',
        },
        {
          name: 'Contribution',
          link: '',
        },
        {
          name: 'View Submitted Contribution Detail',
          link: '',
        },
      ],
    };
  }

  ngOnInit(): void {
  }
  step1Click() {
    this.step1Completed = true;
    this.registrationSteps.next();
  }
  step2Click() {
    this.step2Completed = true;
    this.registrationSteps.next();
  }
  step3Click() {
    this.step3Completed = true;
    this.registrationSteps.next();
  }
  step4Click() {
    this.step4Completed = true;
    this.registrationSteps.next();
  }
  clickPrev() {
    this.registrationSteps.previous();
  }
  editDetail(): void {
    const dialogRef = this.dialog.open(EditContributionScheduleComponent, {
      width: '900px',
      height: '470px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  active(row) {
    this.activeIndex = row;
  }
}
