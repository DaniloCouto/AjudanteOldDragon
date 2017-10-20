import { Personagem } from '../../classes/personagem';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PersonagemFilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'personagemFilter',
})
export class PersonagemFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(array: Array<Personagem>, nome: string) {
    //(arrayMagia: Array<Magia>, tipoId: number, tipoNivel: number, nomeMagia: string)
    if(array == null ){
      return null;
    }
    if(array == null && array == null){
      return array;
    }
    return array.filter(item => {
      let retorno = [];
      if(item.$nome.indexOf(nome) !== -1 || typeof nome === 'undefined' || nome == null || nome === ""){
        return true;
      }else{
        return false;
      }
    });
  }
}
