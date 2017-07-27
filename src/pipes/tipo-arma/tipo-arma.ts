import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TipoArmaPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'tipoarma',
})
export class TipoArmaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args: any ) {
    switch(Number(value)){
      case 0:
      return 'Nulo';
      case 1:
      return 'Perfuração';
      case 2:
      return 'Corte';
      case 3:
      return 'Impacto';
      default:
      return 'Nulo';
    }

  }
}
