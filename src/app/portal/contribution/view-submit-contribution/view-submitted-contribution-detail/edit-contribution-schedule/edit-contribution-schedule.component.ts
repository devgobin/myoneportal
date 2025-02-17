import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
@Component({
  selector: 'app-edit-contribution-schedule',
  templateUrl: './edit-contribution-schedule.component.html',
  styleUrls: ['./edit-contribution-schedule.component.scss']
})
export class EditContributionScheduleComponent implements OnInit {
  step1Completed = false;
  step2Completed = false;
  step3Completed = false;
  step1 = true;
  step2 = false;
  step3 = false;

  @ViewChild('registrationSteps', { static: false }) registrationSteps: CdkStepper;
  constructor() { }

  ngOnInit(): void {
  }
  step1Click() {
    this.step1Completed = true;
    this.registrationSteps.next();
    this.step2 = true;
    this.step1 = false;
    this.step3 = false;
  }
  step2Click() {
    this.step2Completed = true;
    this.registrationSteps.next();
    this.step2 = false;
    this.step1 = false;
    this.step3 = true;
  }
  step3Click() {
    this.step3Completed = true;
  }
  click2Prev() {
    this.registrationSteps.previous();
    this.step2 = false;
    this.step1 = true;
    this.step3 = false;
  }
  click3Prev() {
    this.registrationSteps.previous();
    this.step2 = true;
    this.step1 = false;
    this.step3 = false;
  }
}
