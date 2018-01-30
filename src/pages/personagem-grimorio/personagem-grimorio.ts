import { Personagem } from '../../classes/personagem';
import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonagemGrimorioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-personagem-grimorio',
  templateUrl: 'personagem-grimorio.html',
})
export class PersonagemGrimorioPage {
  personagem : Personagem;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let item = this.navParams.data;
    console.log("Teste Grimório:",(item instanceof Personagem), item);
    if(item instanceof Personagem){
      this.personagem = item;
    }else{
      this.personagem = null;
    }
  }

  ionViewDidLoad() {
  }

}
