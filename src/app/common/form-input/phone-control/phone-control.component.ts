import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone-control.component.html',
  styleUrls: ['./phone-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneControlComponent,
      multi: true,
    },
  ],
})
export class PhoneControlComponent
  extends ValueAccessorBase<string>
  implements OnInit {
  @Input() public label: string;
  @Input() public helptext: string;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public icononly = 'false';
  @Input() public mandatory = false;
  @Input() public countrycode = '';
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
      console.log('xvalue is ' + xvalue);
      setTimeout(() => {
        this.checkPattern();
      }, 400);
    });
  }

  // tslint:disable-next-line: typedef
  blured() {
    this.onblur.next();
  }

  // tslint:disable-next-line: typedef
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
    if(this.value === ''){
      this.xvalue = this.countrycode.replace('', '');
      this.value = this.xvalue.replace('-', '');
    }
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
    const dPattern = /[^\d-\s]+/g;
    // console.log(this.inputbox.nativeElement.value.match(dPattern));
    if(this.inputbox.nativeElement.value.match(dPattern)){
      if(this.inputbox.nativeElement.value.match(dPattern).length > 0){
        this.inputbox.nativeElement.value = this.inputbox.nativeElement.value.substring(
          0,
          this.inputbox.nativeElement.value.length - 1
        );
      }
    }
    // if(this.inputbox.nativeElement.value.length === 5){
      // console.log(this.inputbox.nativeElement.value);
      // const first4 =  this.inputbox.nativeElement.value.substr(0, 4);
      // let lastCh = '';
      // let index = this.inputbox.nativeElement.value.indexOf('-');
      // if(index !== -1){ lastCh = this.inputbox.nativeElement.value.substr(index + 1);}
      // console.log(first4, lastCh);
      // console.log(this.inputbox.nativeElement.value.indexOf('-'));
      // this.inputbox.nativeElement.value = first4 + lastCh.replace('-', '');
      
    // }
    if(this.inputbox.nativeElement.value.substring(0,3) === '679'){
      if (this.inputbox.nativeElement.value.length < 12) {
        this.inputbox.nativeElement.value = this.inputbox.nativeElement.value.replace(
          /^\s*([0-9]{3})\s*\-?$/,
          '$1-'
        );
        // this.inputbox.nativeElement.value = this.inputbox.nativeElement.value.replace(
        //   /^\s*([0-9]{3})\s*\-?([0-9]{3})\s*\-?([0-9]{4})$/,
        //   '$1 - $2$3'
        // );
      } else {
        this.inputbox.nativeElement.value = this.inputbox.nativeElement.value.substring(
          0,
          this.inputbox.nativeElement.value.length - 1
        );
      }
    } else {
      if (this.inputbox.nativeElement.value.length < 11) {

      } else {
        // this.inputbox.nativeElement.value = this.inputbox.nativeElement.value.substring(
        //   0,
        //   this.inputbox.nativeElement.value.length - 1
        // );
      }
    }
    
    this.xvalue = this.inputbox.nativeElement.value;
    if(this.xvalue.length < 10){
      this.value = "";
    } else {
      this.value = this.inputbox.nativeElement.value.replace('-', '');
    }
    
  }

  checkPattern(){
    console.log('this value is ' + this.value);
    if(this.value.length === 7){
      this.value = '679' + this.value;
    }
    this.xvalue = this.value.replace(
      /^\s*([0-9]{3})\s*\-?([0-9]{3})\s*\-?([0-9]{4})$/,
      '$1-$2$3'
    );
  }

  clearValue(){
    this.xvalue = '';
    this.value = '';
  }
}
