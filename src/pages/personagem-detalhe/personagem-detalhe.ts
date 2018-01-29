import { PersonagemListPage } from '../personagem-list/personagem-list';
import { IdiomaDetalhePage } from '../idioma-detalhe/idioma-detalhe';
import { CalculadoraClassePage } from '../calculadora-classe/calculadora-classe';
import { RacaDetalhePage } from '../raca-detalhe/raca-detalhe';
import { Personagem } from '../../classes/personagem';
import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonagemDetalhePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-personagem-detalhe',
  templateUrl: 'personagem-detalhe.html',
})
export class PersonagemDetalhePage {
  personagem : Personagem;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let item = this.navParams.data;
      if(item instanceof Personagem){
        this.personagem = item;
      }else{
        this.personagem = null;
      }
  }

  openRaca(item){
    this.navCtrl.push(RacaDetalhePage, { item: item });
  }

  openClasse(item){
    this.navCtrl.push(CalculadoraClassePage, { item: item });
  }

  openIdioma(item){
    this.navCtrl.push(IdiomaDetalhePage, { item: item });
  }

  backButton(){
    this.navCtrl.setRoot(PersonagemListPage);
  }

  ionViewDidLoad() {
  }

}
