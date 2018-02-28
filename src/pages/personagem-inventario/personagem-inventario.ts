import { Personagem } from '../../classes/personagem';
import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams, AlertController, PopoverController, ModalController } from 'ionic-angular';
import { Item } from '../../classes/item';
import { Weapon } from '../../classes/weapon/weapon';
import { Armadura } from '../../classes/armadura/armadura';
import { PersonagemProvider } from '../../providers/personagem/personagem';
import { PersonagemInvetarioPopoverPage } from '../personagem-invetario-popover/personagem-invetario-popover';
import { ItemEnum } from '../../classes/itemEnum';
import { PersonagemInventarioListPage } from '../personagem-inventario-list/personagem-inventario-list';

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
  personagem: Personagem;
  peso: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public personagemService: PersonagemProvider, private alertCtrl: AlertController, private popoverCtrl: PopoverController, private modalCtrl: ModalController) {
    let item = this.navParams.data;
    this.peso = 0;
    if (item instanceof Personagem) {
      this.personagem = item;
      for (let itemInv of this.personagem.$inventario) {
        this.peso += itemInv.$peso;
      }
    } else {
      this.personagem = null;
    }
  }

  whatIsThisItem(item: Item) {
    if (item instanceof Weapon) {
      return ItemEnum.ARMA;
    } else if (item instanceof Armadura) {
      return ItemEnum.ARMADURA;
    } else {
      return ItemEnum.ITEM;
    }
  }

  deletarItem(item: Item) {
    let alert = this.alertCtrl.create({
      title: 'Inventario',
      message: 'Você tem certeza que deseja excluir este Item do inventario?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.personagemService.deleteItemPersonagem(this.personagem.$id, item).then(function () {
              this.personagem.$inventario.splice(this.personagem.$inventario.indexOf(item), 1);
            });
          }
        }
      ]
    });
    alert.present(alert);
  }

  addItemInventario(event) {
    let popover = this.popoverCtrl.create(PersonagemInvetarioPopoverPage);
    popover.onDidDismiss(data => {
      let modal = null;
      switch (data) {
        case ItemEnum.ARMA:
          modal = this.modalCtrl.create(PersonagemInventarioListPage, {tipo: ItemEnum.ARMA})
          break;

        case ItemEnum.ARMADURA:
          modal = this.modalCtrl.create(PersonagemInventarioListPage, {tipo: ItemEnum.ARMADURA})
          break;

        case ItemEnum.ITEM:
          modal = this.modalCtrl.create(PersonagemInventarioListPage, {tipo: ItemEnum.ITEM})
          break;
      }
      if(modal){
        modal.onDidDismiss(data => {
          if(data.item instanceof Item || data.item instanceof Weapon || data.item instanceof Armadura){
            this.personagemService.addItemPersonagem(this.personagem.$id,[data.item]).then(function(){
              this.personagem.$inventario.push(data.item);
            })
            
          }
        });
      }
    });

    popover.present({
      ev: event
    });
  }

  ionViewDidLoad() {
  }

}
