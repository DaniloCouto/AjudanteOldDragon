import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DiceIconPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'diceicon',
})
export class DiceIconPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, arg: number) {
    switch (value) {
      case 0:
        return 'logo-d0';
      case 2:
        return 'logo-d2';
      case 4:
        return 'logo-d4-4';
      case 6:
        return 'logo-d6';
      case 8:
        return 'logo-d8';
      case 10:
        return 'logo-d10';
      case 12:
        return 'logo-d12';
      case 20:
        return 'logo-d20';
      case 100:
        return 'logo-d100';
      default:
        return '';
    }
  }
}
