import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asurl'
})
export class AsurlPipe implements PipeTransform {

  transform(value: string): string {
    return 'url(${value})';
  }


}
