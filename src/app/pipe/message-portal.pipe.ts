import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messagePortal',
})
export class MessagePortalPipe implements PipeTransform {
  transform(items: any, filter: any): any {
    // console.log(items);
    // if(!filter){
    //   return items;
    // }
    const xitems = items.filter(
      (item) => item.msgType === filter
    );
    return xitems;
  }
}
