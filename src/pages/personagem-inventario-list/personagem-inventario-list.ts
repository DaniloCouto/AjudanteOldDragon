import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ItemComumProvider } from '../../providers/item-comum/item-comum';
import { WeaponsService } from '../../providers/weapons-service/weapons-service';
import { ArmorsService } from '../../providers/armors-service/armors-service';
import { Item } from '../../classes/item';
import { ItemEnum } from '../../classes/itemEnum';
import { Armadura } from '../../classes/armadura/armadura';
import { Weapon } from '../../classes/weapon/weapon';

/**
 * Generated class for the PersonagemInventarioListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personagem-inventario-list',
  templateUrl: 'personagem-inventario-list.html',
})
export class PersonagemInventarioListPage {
  tipoPesquisa: number;
  itemList: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private itensProvider: ItemComumProvider, private armaProvider: WeaponsService, private armaduraProvider: ArmorsService) {
    this.tipoPesquisa = this.navParams.data.tipo;
    let service = this;
    switch (this.tipoPesquisa) {
      case ItemEnum.ARMA:
        this.armaProvider.getAll().then(function (itens) {
          service.itemList = itens;
        })
        break;
      case ItemEnum.ARMADURA:
        this.armaduraProvider.getAll().then(function (itens) {
          service.itemList = itens;
        })
        break;
      case ItemEnum.ITEM:
        this.itensProvider.getAll().then(function (itens) {
          service.itemList = itens;
        })
        break;

      default:
        break;
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

  select(item){
    this.viewCtrl.dismiss({item: item});
  }

  dismiss(item){
    this.viewCtrl.dismiss({item: null});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonagemInventarioListPage');
  }

}
