import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectSearch'
})
export class SelectSearchPipe implements PipeTransform {

  keyname: any;

  transform(items: any, filter: any, filtername: any, defaultFilter?: boolean): any {
    if (!filter) {
      return items;
    }
    return items.filter(item => item[filtername].toLowerCase().indexOf(filter.toLowerCase()) > -1);
  }

}
