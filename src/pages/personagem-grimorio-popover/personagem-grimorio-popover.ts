import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
import { TipoMagia } from '../../classes/magia/tipoMagia';

/**
 * Generated class for the PersonagemGrimorioPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personagem-grimorio-popover',
  templateUrl: 'personagem-grimorio-popover.html',
})
export class PersonagemGrimorioPopoverPage {

  tiposMagia

  constructor(public viewCtrl: ViewController, private magiaService: MagiaService) {
    this.magiaService.getAllTipos().then((result: Array<TipoMagia>) => {
      this.tiposMagia = result;
    });
  }

  selectTipo(tipo){
    this.viewCtrl.dismiss({
      idTipos: [tipo.id],
      favorito: false
    })
  }

  selectTodos(){
    this.viewCtrl.dismiss({
      idTipos: [],
      favorito: false
    })
  }

  selectFavoritos(){
    this.viewCtrl.dismiss({
      idTipos: [],
      favorito: true
    })
  }

  close(id) {
    this.viewCtrl.dismiss(id);
  }

}
