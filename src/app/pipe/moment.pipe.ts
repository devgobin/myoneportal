import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any, format: any, returnformat: any): any {
    if(!value){
      return '';
    }
    return moment(value, format).format(returnformat);
  }

}
