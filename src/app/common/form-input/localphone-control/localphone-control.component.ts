import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';

@Component({
  selector: 'app-localphone-control',
  templateUrl: './localphone-control.component.html',
  styleUrls: ['./localphone-control.component.scss'],
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LocalphoneControlComponent,
      multi: true,
    },
  ],
})
export class LocalphoneControlComponent extends ValueAccessorBase<string> implements OnInit {
  @Input() public label: string;
  @Input() public helptext: string;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public icononly = 'false';
  @Input() public mandatory = false;
  @Input() public countrycode = '679';
  // tslint:disable-next-line: no-output-rename
  @Output('onblur') onblur: EventEmitter<any> = new EventEmitter();
  @Output('onenter') onenter: EventEmitter<any> = new EventEmitter();
  @ViewChild('inputbox', { static: false }) inputbox: ElementRef;
  // tslint:disable-next-line: variable-name
  errorTrueNow = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this.errorTrueNow = errorTrue || false;
  }
  get errorTrue() {
    return this.errorTrueNow;
  }
  errorTextNow = '';
  @Input()
  set errorText(errorText: string) {
    this.errorTextNow = (errorText) || '';
  }
  get errorText() { return this.errorTextNow; }

  constructor() {
    super();
  }
  btnClickedNow = false;
  @Input()
  set btnClicked(btnClicked: boolean) {
    this.btnClickedNow = btnClicked || false;
  }
  get btnClicked() {
    return this.btnClickedNow;
  }
  xvalue = '';
  ngOnInit(): void {
    this.getValue().subscribe((xvalue) => {
      // console.log('xvalue is ' + xvalue);
      setTimeout(() => {
        this.checkPattern();
        // 6798888888
      }, 400);
    });
  }

  blured() {
    this.onblur.next();
  }

  setFocus() {
    this.inputbox.nativeElement.focus();
    this.inputbox.nativeElement.select();
  }

  checkenter(event) {
    if (event.key === 'Enter') {
      this.onenter.next();
    }
  }
  whenFocused(){
    // if(this.value === ''){
    //   this.xvalue = this.countrycode.replace('', '');
    //   this.value = this.xvalue.replace('-', '');
    // }
  }
  onFocus() {
    
    this.inputbox.nativeElement.focus();
  }

  checkValue(event?) {
    if(event){
      if(event.inputType === 'deleteContentBackward'){
        this.xvalue = this.inputbox.nativeElement.value;
        if(this.xvalue.length < 10){
          this.value = "";
        } else {
        this.value = this.inputbox.nativeElement.value.replace('-', '');
        }
        return;
      }
    }
    // const dPattern = /[^\d,-, ]+/g;
    const dPattern = /[^\d\s]+/g;
    console.log(this.inputbox.nativeElement.value.match(dPattern));
    if(this.inputbox.nativeElement.value.match(dPattern)){
      if(this.inputbox.nativeElement.value.match(dPattern).length > 0){
        this.inputbox.nativeElement.value = this.inputbox.nativeElement.value.substring(
          0,
          this.inputbox.nativeElement.value.length - 1
        );
      }
    }
    
    this.xvalue = this.inputbox.nativeElement.value;
    if(this.xvalue.length < 7){
      this.value = "";
    } else {
      this.value = this.countrycode + this.inputbox.nativeElement.value.replace('-', '');
    }
    
  }

  checkPattern(){
    // console.log('this value is ' + this.value);
    if(this.value.length === 7){
      this.xvalue = this.value.toString();
      this.value = '679' + this.value;
    }
  }

  clearValue(){
    this.xvalue = '';
    this.value = '';
  }
}
