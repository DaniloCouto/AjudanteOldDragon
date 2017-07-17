import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DiceMagiaPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'dicemagia',
})
export class DiceMagiaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value, args:string[]): any {
    let keys = [];
    for (var enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        if (enumMember === 'inteiro') {
          keys.push({key: enumMember, value: ""});
        }else{
          keys.push({key: enumMember, value: value[enumMember]});
        }
      } 
    }
    return keys;
  }
}
