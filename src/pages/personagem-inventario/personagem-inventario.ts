import { Personagem } from '../../classes/personagem';
import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonagemInventarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-personagem-inventario',
  templateUrl: 'personagem-inventario.html',
})
export class PersonagemInventarioPage {
  personagem : Personagem;
  
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      let item = this.navParams.data;
      if(item instanceof Personagem){
        this.personagem = item;
      }else{
        this.personagem = null;
      }
    }

  ionViewDidLoad() {
  }

}
