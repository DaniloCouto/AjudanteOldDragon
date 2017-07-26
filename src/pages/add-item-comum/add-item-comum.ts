import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Item } from "../../classes/item";
import { ItemComumProvider } from "../../providers/item-comum/item-comum";

/**
 * Generated class for the AddItemComumPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-item-comum',
  templateUrl: 'add-item-comum.html',
})
export class AddItemComumPage {
  edit: boolean;
  item : Item;
  constructor(public navCtrl: NavController, public navParams: NavParams, private itemComumProvider : ItemComumProvider) {
    let item = navParams.get('item');
    if (item != null) {
      this.edit = true;
      this.item = new Item(item.nome, item.descricao, item.peso, item.valor);
    } else {
      this.item = new Item('','' , 0 , 0);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemComumPage');
  }

  addItem() {
    let item = this.navParams.get('item');
    if (this.edit) {
      this.itemComumProvider.update(this.item, item._id).then(() => {
        this.navCtrl.pop();
      });
    }else {
      this.itemComumProvider.add(this.item).then(() => {
        this.navCtrl.pop();
      }) 
    }
  }

}
