import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Personagem } from '../../classes/personagem';
import { Ladino } from '../../classes/classes/ladino';
import { Clerigo } from '../../classes/classes/clerigo';
import { Mago } from '../../classes/classes/mago';

/**
 * Generated class for the PersonagemDetalheAjustesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personagem-detalhe-ajustes',
  templateUrl: 'personagem-detalhe-ajustes.html',
})
export class PersonagemDetalheAjustesPage {
  personagem: Personagem;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.personagem = this.navParams.data as Personagem;
  }


  isLadino(): Boolean{
    let is = false;
    for(let i = 0; i < this.personagem.$classes.length; i++){
      if(this.personagem.$classes[i] instanceof Ladino){
        is = true;
      }
    }
    return is;
  }


  isClerigo(): Boolean{
    let is = false;
    for(let i = 0; i < this.personagem.$classes.length; i++){
      if(this.personagem.$classes[i] instanceof Clerigo){
        is = true;
      }
    }
    return is;
  }

  isMago(): Boolean{
    let is = false;
    for(let i = 0; i < this.personagem.$classes.length; i++){
      if(this.personagem.$classes[i] instanceof Mago){
        is = true;
      }
    }
    return is;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonagemDetalheAjustesPage');
  }

}
