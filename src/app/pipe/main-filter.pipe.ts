import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mainFilter'
})
export class MainFilterPipe implements PipeTransform {

  keyname: any;

  transform(items: any, filter: any, defaultFilter?: boolean): any {
    if (!filter) {
      return items;
    }
    // if (!filter) {
    //   return [];
    // }

    if (!Array.isArray(items)) {
      return items;
    }
    // if (!Array.isArray(items)) {
    //   return [];
    // }
    if (filter && Array.isArray(items)) {
      // tslint:disable-next-line:prefer-const
      let filterKeys = Object.keys(filter);
      this.keyname = filterKeys;

      if (defaultFilter) {
        return items.filter(item =>
          filterKeys.reduce((x, keyName) =>
            (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));
      } else {

        if (this.keyname[0] === 'nokeyname') {
          return items.filter(item => {
            return filterKeys.some((keyName) => {
              return new RegExp(filter[keyName], 'gi').test(item) || filter === '';
            });
          });

        } else {
          return items.filter(item => {
            return filterKeys.some((keyName) => {
              return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === '';
            });
          });
        }
      }
    }
  }

}
