import { Magia } from '../../classes/magia/magia';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MagiaFilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'magiafilter',
})
export class MagiaFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(arrayMagia: Array<Magia>, nomeMagia: string, nivelMagia: string) {
    //(arrayMagia: Array<Magia>, tipoId: number, tipoNivel: number, nomeMagia: string)
    if(arrayMagia == null ){
      return null;
    }
    if(nomeMagia == null && nivelMagia == null){
      return arrayMagia;
    }
    return arrayMagia.filter(item => {
      let retorno = [];
      if(item.$nome.indexOf(nomeMagia) !== -1 || typeof nomeMagia === 'undefined' || nomeMagia == null || nomeMagia === ""){
        if(nivelMagia === null || nivelMagia === "0" || typeof nivelMagia == 'undefined' || nivelMagia === ""){
          return true;
        }else{
          for(var j = 0; j < item.$tipoArray.length; j++){
            if( item.$tipoArray[j].$nivel !== Number(nivelMagia)){
              return false;
            }else if(j+1 == item.$tipoArray.length){
              return true;
            }
          }
        }
      }else{
        return false;
      }
    });
  }
  // transform(arrayMagia: Array<Magia>, tipoId: number, tipoNivel: number, nomeMagia: string) {
  //   return arrayMagia.filter(item => {
  //     let retorno = [];
  //     if(item.$nome.toUpperCase().indexOf(nomeMagia) !== -1 ){
  //       for(var j = 0; j < item.$tipoArray.length; j++){
  //         if( (item.$tipoArray[j].$id !== tipoId || tipoId != null) && item.$tipoArray[j].$id !== tipoId){
  //           return false;
  //         }else if(j+1 == item.$tipoArray.length){
  //           return true;
  //         }
  //       }
  //     }else{
  //       return true;
  //     }
  //   });
  // }
}
