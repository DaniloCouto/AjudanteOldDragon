import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Item } from "../../classes/item";

/**
 * Generated class for the ItemComumDetalhePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-item-comum-detalhe',
  templateUrl: 'item-comum-detalhe.html',
})
export class ItemComumDetalhePage {
  item : Item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let item = navParams.get('item');
    if (item != null) {
      this.item = new Item(item.nome, item.descricao, item.peso, item.valor);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemComumDetalhePage');
  }

}
