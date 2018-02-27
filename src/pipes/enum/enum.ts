import { Pipe, PipeTransform } from '@angular/core';
import { classeENUM } from '../../classes/classes/classesEnum';

/**
 * Generated class for the EnumPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'enum',
})
export class EnumPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args: any[]): any {
    
    let items: any[] = [];
    for (let key in value) {
      var isValueProperty = parseInt(key, 10) >= 0;
      if (!isValueProperty) continue;
      items.push({ key: key, value: value[key] });
    }
    return items;
  }
}
