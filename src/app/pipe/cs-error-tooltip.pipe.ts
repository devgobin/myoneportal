import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'csErrorTooltip'
})
export class CsErrorTooltipPipe implements PipeTransform {

  transform(items: any = []): any {
    const errors = items.map(e=>e.msgDescription).join("\n");
    // console.log(errors);
    return errors;
  }

}
