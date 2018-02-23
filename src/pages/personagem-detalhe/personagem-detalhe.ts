import { PersonagemListPage } from '../personagem-list/personagem-list';
import { IdiomaDetalhePage } from '../idioma-detalhe/idioma-detalhe';
import { CalculadoraClassePage } from '../calculadora-classe/calculadora-classe';
import { RacaDetalhePage } from '../raca-detalhe/raca-detalhe';
import { Personagem } from '../../classes/personagem';
import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams, ModalController } from 'ionic-angular';
import { Raca } from '../../classes/raca';
import { RacaIdiomaProvider } from '../../providers/raca-idioma/raca-idioma';
import { BaseClass } from '../../classes/classes/classe';
import { Clerigo } from '../../classes/classes/clerigo';
import { HomemDeArmas } from '../../classes/classes/homemdearmas';
import { Mago } from '../../classes/classes/mago';
import { Ladino } from '../../classes/classes/ladino';
import { RapidDiceRollsPage } from '../rapid-dice-rolls/rapid-dice-rolls';

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
  @ViewChild(Navbar) navBar:Navbar;
  racas : Array<Raca>;
  classes : Array<BaseClass>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public racaProvider : RacaIdiomaProvider, public modalCtrl: ModalController) {
    let item = this.navParams.data;
    let service = this;
    this.classes = [
      new Clerigo(1),
      new HomemDeArmas(1),
      new Mago(1),
      new Ladino(1)
    ];
    this.racaProvider.getAllRaca().then(function(result){
      service.racas = result;
    });
      if(item instanceof Personagem){
        this.personagem = item;
        
      }else{
        this.personagem = null;
      }
  }
  
  openRapidDiceRoller(){
    let profileModal = this.modalCtrl.create(RapidDiceRollsPage, { personagem: this.personagem });
    profileModal.present();
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
    this.navBar.backButtonClick = (e:UIEvent) => {
        this.navCtrl.parent.viewCtrl.dismiss();
    };
  }

}
