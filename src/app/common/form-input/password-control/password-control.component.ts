import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';

@Component({
  selector: 'app-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: PasswordControlComponent, multi: true }
  ],
})
export class PasswordControlComponent extends ValueAccessorBase<string> implements OnInit {
  inputType = 'password';
  strengthValid = false;
  @Input() public label: string;
  @Input() public strength = false;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public mandatory = false;
  @Input() public emojiType = 'password';
  // tslint:disable-next-line: variable-name
  errorTrueNow = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this.errorTrueNow = (errorTrue) || false;
  }
  get errorTrue() { return this.errorTrueNow; }

  btnClickedNow = false;
  @Input()
  set btnClicked(btnClicked: boolean) {
    this.btnClickedNow = (btnClicked) || false;
  }
  get btnClicked() { return this.btnClickedNow; }

  @Output('onblur') onblur: EventEmitter<any> = new EventEmitter();
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  onFocus(p) {

  }
  blured() {
    this.onblur.next();
  }
  // (onStrengthChanged)="onStrengthChanged($event)"
  onStrengthChanged(ev) {
    if (ev === 100) {
      this.strengthValid = true;
    }
  }
}
