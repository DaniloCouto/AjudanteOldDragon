import { WeaponDetalhePage } from '../weapon-detalhe/weapon-detalhe';
import { Component } from '@angular/core';
import { NavController, Platform, AlertController} from 'ionic-angular';
import { WeaponsService } from '../../providers/weapons-service/weapons-service';
import { AddWeaponPage } from '../add-weapon/add-weapon';
import { DiceClass } from '../../providers/dice-class/dice-class';
import { MoneyConventer } from '../../providers/money-conventer/money-conventer';
import { Weapon } from "../../classes/weapon/weapon";

@Component({
  templateUrl: 'weapons.html',
  providers: [WeaponsService, DiceClass, MoneyConventer]
})
export class WeaponsPage {
  itens: Array<Weapon>;

  constructor(private nav: NavController, private platform: Platform, private weapService: WeaponsService, private diceService: DiceClass, private conventer: MoneyConventer, private alertCtrl: AlertController) {
  }

  addItem() {
    this.nav.push(AddWeaponPage);
  }

  openDetail(item){
    this.nav.push(WeaponDetalhePage, { item: item });
  }

  editItem(item) {
    console.log(item);
    this.nav.push(AddWeaponPage, { item: item });
  }

  deleteItem(item) {
    let alert = this.alertCtrl.create({
      title: 'Loja',
      message: 'Você tem certeza que deseja excluir esta arma?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.weapService.delete(item.$id).then((result) => {
              this.itens.splice(this.itens.indexOf(item), 1);
            });
          }
        }
      ]
    });
    alert.present(alert);
  }

  init() {
    this.platform.ready().then(() => {
      this.weapService.getAll().then((result) => {
        this.itens = result;
      });
    });
  }

  ionViewWillEnter() {
    this.init();
  }

}
