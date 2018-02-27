import { Pipe, PipeTransform } from '@angular/core';
import { classeENUM } from '../../classes/classes/classesEnum';

/**
 * Generated class for the ClassePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'classe',
})
export class ClassePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number): string {
    switch (value) {
      case classeENUM.clerigo:
        return "Clérigo";
      case classeENUM.homemDeArmas:
        return "Homem de Armas";
      case classeENUM.ladino:
        return "Ladino";
      case classeENUM.mago:
        return "Mago";
    }
  }
}
