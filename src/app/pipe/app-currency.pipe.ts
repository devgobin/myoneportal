import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { baseCurrency } from '../constants';

@Pipe({
  name: 'appCurrency'
})
export class AppCurrencyPipe implements PipeTransform {
  currencyCode = baseCurrency;
  constructor(
    private currencyPipe: CurrencyPipe
  ){

  }

  transform(value: any): any {
    // console.log(value);
    if(!value){
      return '';
    }
    const xValue = this.currencyPipe.transform(value, this.currencyCode);
    return xValue;
  }

}
