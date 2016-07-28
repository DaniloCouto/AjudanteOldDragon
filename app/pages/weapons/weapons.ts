import { Component } from '@angular/core';
import { NavController, Platform, Alert} from 'ionic-angular';
import { WeaponsService } from '../../providers/weapons-service/weapons-service';
import { AddWeaponPage } from '../add-weapon/add-weapon';
import { DiceClass } from '../../providers/dice-class/dice-class';
import { MoneyConventer } from '../../providers/money-conventer/money-conventer';

@Component({
  templateUrl: 'build/pages/weapons/weapons.html',
  providers: [WeaponsService, DiceClass, MoneyConventer]
})
export class WeaponsPage {
  itens: any;

  constructor(private nav: NavController, private platform: Platform, private weapService: WeaponsService, private diceService: DiceClass, private conventer: MoneyConventer) {
  }

  addItem() {
    this.nav.push(AddWeaponPage);
  }

  editItem(item) {
    console.log(item);
    this.nav.push(AddWeaponPage, { item: item });
  }

  deleteItem(item) {
    let alert = Alert.create({
      title: 'Ferreiro',
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
            this.weapService.delete(item._Id).then((result) => {
              this.itens.splice(this.itens.indexOf(item), 1);
            });
          }
        }
      ]
    });
    this.nav.present(alert);
  }

  init() {
    this.platform.ready().then(() => {
      this.weapService.getAll().then((result) => {
        this.itens = result;
        this.itens.forEach(element => {
          element.diceClass = this.diceService.identify(element.danoRolagem);
          element.convertedPrice = this.conventer.convertMaxPO(element.valor);
        });
      });
    });
  }

  ionViewWillEnter() {
    this.init();
  }

}
