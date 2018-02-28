import { Personagem } from '../../classes/personagem';
import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams, AlertController, PopoverController, ModalController } from 'ionic-angular';
import { Magia } from '../../classes/magia/magia';
import { PersonagemProvider } from '../../providers/personagem/personagem';
import { PersonagemGrimorioPopoverPage } from '../personagem-grimorio-popover/personagem-grimorio-popover';
import { PersonagemGrimorioListPage } from '../personagem-grimorio-list/personagem-grimorio-list';

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
  personagem: Personagem;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private personagemProvider: PersonagemProvider, private popoverCtrl: PopoverController, private modalCtrl: ModalController) {
    let item = this.navParams.data;
    console.log("Teste Grimório:", (item instanceof Personagem), item);
    if (item instanceof Personagem) {
      this.personagem = item;
    } else {
      this.personagem = null;
    }
  }

  deletarItem(item: Magia) {
    let service = this;
    let alert = this.alertCtrl.create({
      title: 'Grimório',
      message: 'Você tem certeza que deseja excluir esta magia do grimório?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.personagemProvider.deleteMagiaPersonagem(this.personagem.$id, item).then(function () {
              service.personagem.$magias.splice(this.personagem.$magias.indexOf(item), 1);
            });
          }
        }
      ]
    });
    alert.present(alert);
  }

  addMagiaGrimorio(event) {
    let popover = this.popoverCtrl.create(PersonagemGrimorioPopoverPage);
    popover.onDidDismiss(data => {
      let modal = null;
      if (data.idTipos && data.favorito) {
        modal = this.modalCtrl.create(PersonagemGrimorioListPage, data)
      }
      if (modal) {
        modal.onDidDismiss(data => {
          if (data.item instanceof Magia) {
            this.personagemProvider.addMagiaPersonagem(this.personagem.$id, [data.item]).then(function () {
              this.personagem.$magias.push(data.item);
            })
          }
        });
      }
    });
  }
  ionViewDidLoad() {
  }

}
