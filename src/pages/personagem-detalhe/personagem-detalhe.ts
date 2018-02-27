import { PersonagemListPage } from '../personagem-list/personagem-list';
import { IdiomaDetalhePage } from '../idioma-detalhe/idioma-detalhe';
import { CalculadoraClassePage } from '../calculadora-classe/calculadora-classe';
import { RacaDetalhePage } from '../raca-detalhe/raca-detalhe';
import { Personagem } from '../../classes/personagem';
import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Raca } from '../../classes/raca';
import { RacaIdiomaProvider } from '../../providers/raca-idioma/raca-idioma';
import { Clerigo } from '../../classes/classes/clerigo';
import { HomemDeArmas } from '../../classes/classes/homemdearmas';
import { Mago } from '../../classes/classes/mago';
import { Ladino } from '../../classes/classes/ladino';
import { RapidDiceRollsPage } from '../rapid-dice-rolls/rapid-dice-rolls';
import { ConversoresClasses } from '../../classes/classes/conversoresClasses';
import { Idioma } from '../../classes/idioma';
import { IdiomaPersonagemListPage } from '../idioma-personagem-list/idioma-personagem-list';

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
  personagem: Personagem;
  @ViewChild(Navbar) navBar: Navbar;
  racas: Array<Raca>;
  conversor: ConversoresClasses;
  constructor(public navCtrl: NavController, public navParams: NavParams, public racaProvider: RacaIdiomaProvider, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    let item = this.navParams.data;
    let service = this;
    this.conversor = new ConversoresClasses();
    this.racaProvider.getAllRaca().then(function (result) {
      service.racas = result;
    });
    if (item instanceof Personagem) {
      this.personagem = item;

    } else {
      this.personagem = null;
    }
  }

  openRapidDiceRoller() {
    let profileModal = this.modalCtrl.create(RapidDiceRollsPage, { personagem: this.personagem });
    profileModal.present();
  }

  openRaca(item) {
    this.navCtrl.push(RacaDetalhePage, { item: item });
  }

  openClasse(item) {
    this.navCtrl.push(CalculadoraClassePage, { item: item });
  }

  openIdioma(item) {
    this.navCtrl.push(IdiomaDetalhePage, { item: item });
  }

  backButton() {
    this.navCtrl.setRoot(PersonagemListPage);
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.parent.viewCtrl.dismiss();
    };
  }

  openIdiomas() {
    let profileModal = this.modalCtrl.create(IdiomaPersonagemListPage, {item: this.personagem});
    profileModal.onDidDismiss(data => {
      if(data.idiomas instanceof Array){
        this.personagem.$idiomas == data.idiomas;
      }
    });
    profileModal.present();
  }

  

  classChanged(i: number) {

    let selectedClass = Number(this.personagem.$classes[i].$classe);
    switch (selectedClass) {
      case 0:
        this.personagem.$classes[i] = new Clerigo(null, this.personagem.$classes[i].$xpAtual);
        break;
      case 1:
        this.personagem.$classes[i] = new HomemDeArmas(null, this.personagem.$classes[i].$xpAtual);
        break;
      case 2:
        this.personagem.$classes[i] = new Mago(null, this.personagem.$classes[i].$xpAtual);
        break;
      case 3:
        this.personagem.$classes[i] = new Ladino(null, this.personagem.$classes[i].$xpAtual);
        break;
    }
  }

  // nivelClassChanged(i : number){
  //   let selectedClass = Number(this.personagem.$classes[i].$classe);
  //   switch (selectedClass) {
  //     case 0:
  //       this.personagem.$classes[i].$xpAtual = this.conversor.$nivelToXpClerigo(this.personagem.$classes[i].$nivel);
  //       break;
  //     case 1:
  //     this.personagem.$classes[i].$xpAtual = this.conversor.$nivelToXpHomemDeArmas(this.personagem.$classes[i].$nivel);
  //       break;
  //     case 2:
  //     this.personagem.$classes[i].$xpAtual = this.conversor.$nivelToXpMago(this.personagem.$classes[i].$nivel);
  //       break;
  //     case 3:
  //     this.personagem.$classes[i].$xpAtual = this.conversor.$nivelToXpLadino(this.personagem.$classes[i].$nivel);
  //       break;
  //   }
  // }

}
