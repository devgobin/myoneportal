import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor-base';


@Component({
  selector: 'app-pin-control',
  templateUrl: './pin-control.component.html',
  styleUrls: ['./pin-control.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: PinControlComponent, multi: true }
  ],
})
export class PinControlComponent extends ValueAccessorBase<string> implements OnInit, AfterViewInit {

  @Input() boxes = '0';
  // @Input() id = 'ex';
  @Input() public id: string;
  @Input() password = 'false';
  @Input() public label: string;
  @Input() clearbtn = 'true';
  @Input() alignLeft = false;
  errorTrueNow = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this.errorTrueNow = (errorTrue) || false;
  }
  get errorTrue() { return this.errorTrueNow; }
  sets = [];
  loadingTrue = true;
  inputtext = 'text';
  @Output() onEnter = new EventEmitter<any>();
  @Output() onFinished = new EventEmitter<any>();
  constructor() {
    super();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      for (let i = 0; i < parseFloat(this.boxes); i++) {
        const obj = {
          value: '',
          id: this.id + i,
          nextid: this.id + (i + 1),
          previd: i === 0 ? '' : this.id + (i - 1)
        };
        this.sets.push(obj);
      }
      this.loadingTrue = false;
      this.inputtext = (this.password === 'true') ? 'password' : 'text';
    }, 400);

    // console.log(this.sets);
  }
  setValueFn() {
    let value = '';
    this.sets.forEach(element => {
      if (element.value !== '') {
        value = value + element.value.toString();
      }
    });
    this.value = value;
    if(this.value.length === parseFloat(this.boxes)){
      this.onFinished.emit();
    }
    // console.log(this.value.length, this.boxes);
  }
  clear() {
    this.sets = [];
    for (let i = 0; i < parseFloat(this.boxes); i++) {
      const obj = {
        value: '',
        id: this.id + i,
        nextid: this.id + (i + 1)
      };
      this.sets.push(obj);
    }
    this.value = '';
  }
  showtext() {
    this.inputtext === 'password' ? this.inputtext = 'text' : this.inputtext = 'password';
  }
  keyevent(event) {
    // console.log(event.key);
    if(event.key === 'Enter'){
      this.onEnter.emit();
    }
  //   // console.log(event);
  //   // console.log(value);
  //   if (event.key === 'Backspace') {
  //     if (value === '') {
  //       console.log(id);
  //     }
  //   }

  //   // console.log(event.key);
  }

  doFocus(){
    const prevelement = document.getElementById(this.sets[0].id);
        // console.log(prevelement);
        if (prevelement) {
          prevelement.focus();
        }
  }


}
