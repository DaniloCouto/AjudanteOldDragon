import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConversoresClasses } from '../../classes/classes/conversoresClasses';
import { Personagem } from '../../classes/personagem';
import { Raca } from '../../classes/raca';
import { RacaIdiomaProvider } from '../../providers/raca-idioma/raca-idioma';
import { Atributos } from '../../classes/atributos';
import { BolsaMoedas } from '../../classes/bolsaMoedas';
import { classeENUM } from '../../classes/classes/classesEnum';
import { Clerigo } from '../../classes/classes/clerigo';
import { HomemDeArmas } from '../../classes/classes/homemdearmas';
import { Mago } from '../../classes/classes/mago';
import { Ladino } from '../../classes/classes/ladino';
import { PersonagemProvider } from '../../providers/personagem/personagem';

/**
 * Generated class for the PersonagemAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personagem-add',
  templateUrl: 'personagem-add.html',
})
export class PersonagemAddPage {
  personagem: Personagem;
  racas: Array<Raca>;
  conversor: ConversoresClasses;
  classeSelecionada: any = null;
  classes = [
    new Clerigo(1, 0),
    new HomemDeArmas(1, 0),
    new Mago(1, 0),
    new Ladino(1, 0)
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public racaProvider: RacaIdiomaProvider, public personagemProvider: PersonagemProvider, private alertCtrl: AlertController) {
    let item = this.navParams.data;
    let service = this;
    this.classeSelecionada = null;
    this.conversor = new ConversoresClasses();
    this.racaProvider.getAllRaca().then(function (result) {
      service.racas = result;
    });
    if (item instanceof Personagem) {
      this.personagem = item;
    } else {
      this.personagem = new Personagem(null,"","",null,[],[],[],
      new Atributos(3,3,3,3,3,3),[],0,[],new BolsaMoedas(0,0,0,0,0)
      );
    }
  }

  personagemIsValid() : boolean{
    return (this.personagem.$nome != "" && this.personagem.$descricao != "" && this.personagem.$raca != null && this.classeSelecionada != null
    && this.personagem.$atributos.$forca > 0 && this.personagem.$atributos.$destreza > 0 && this.personagem.$atributos.$constituicao > 0 
    && this.personagem.$atributos.$inteligencia > 0 && this.personagem.$atributos.$sabedoria > 0 && this.personagem.$atributos.$carisma > 0 );
  }


  add(){
    let service = this;
    if (this.personagemIsValid()) {
      this.personagem.$classes = [this.classeSelecionada];
      this.personagemProvider.add(this.personagem).then(function () {
          let alert = service.alertCtrl.create({
            title: 'Personagem',
            message: 'Personagem criado com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        }, function () {
          let alert = service.alertCtrl.create({
            title: 'Personagem',
            message: 'Algo deu errado na criação.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        })
    } else {
      let alert = service.alertCtrl.create({
        title: 'Personagem',
        message: 'Insira todos os dados ',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonagemAddPage');
  }

}
