import { Component, OnInit, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';
import { EmailPattern } from 'src/app/constants';
@Component({
  selector: 'app-email-control',
  templateUrl: './email-control.component.html',
  styleUrls: ['./email-control.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: EmailControlComponent, multi: true }
  ],
})
export class EmailControlComponent extends ValueAccessorBase<string> implements OnInit {
  emailPattern = EmailPattern;
  @Input() public label: string;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public mandatory = false;
  // tslint:disable-next-line: variable-name
  errorTrueNow = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this.errorTrueNow = (errorTrue) || false;
  }
  get errorTrue() { return this.errorTrueNow; }

  constructor(
  ) {
    super();
  }
  btnClickedNow = false;
  @Input()
  set btnClicked(btnClicked: boolean) {
    this.btnClickedNow = (btnClicked) || false;
  }
  get btnClicked() { return this.btnClickedNow; }

  errorTextNow = '';
  @Input()
  set errorText(errorText: string) {
    this.errorTextNow = (errorText) || '';
  }
  get errorText() { return this.errorTextNow; }

  ngOnInit() {
  }

  testFn(val) {
    console.log(val);
  }

}
