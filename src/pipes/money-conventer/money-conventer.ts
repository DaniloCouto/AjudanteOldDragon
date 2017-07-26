import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MoneyConventerPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'moneyconventer',
})
export class MoneyConventerPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(total: any, ...args) {
    total = Number(total);
    if (total >= 10) {
      if (total >= 100) {
          return (total / 100) + ' PO';
      } else {
        return (total / 10) + ' PP';
      }
    } else {
      return total + ' PC';
    }
  }
}
