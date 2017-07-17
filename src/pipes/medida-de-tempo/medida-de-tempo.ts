import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MedidaDeTempoPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'medidatempo',
})
export class MedidaDeTempoPipe implements PipeTransform {
  transform(value, args:string[]): any {
    let keys = [];
    for (var enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({key: enumMember, value: value[enumMember]});
      } 
    }
    return keys;
  }
}