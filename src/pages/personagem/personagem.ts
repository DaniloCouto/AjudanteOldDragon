import { Personagem } from '../../classes/personagem';
import { PersonagemInventarioPage } from '../personagem-inventario/personagem-inventario';
import { PersonagemGrimorioPage } from '../personagem-grimorio/personagem-grimorio';
import { PersonagemDetalhePage } from '../personagem-detalhe/personagem-detalhe';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonagemPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-personagem',
  templateUrl: 'personagem.html'
})
export class PersonagemPage {
  geralRoot;
  grimorioRoot;
  inventarioRoot;
  personagemRoot : Personagem;

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let item = this.navParams.get("item");
    if(item instanceof Personagem){
      console.log("personagem a ir para a tela", item);
      this.personagemRoot = item;
    }
    this.geralRoot = PersonagemDetalhePage;
    this.grimorioRoot = PersonagemGrimorioPage;
    this.inventarioRoot = PersonagemInventarioPage;
  }

}
