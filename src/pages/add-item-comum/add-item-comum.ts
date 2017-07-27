import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private itemComumProvider : ItemComumProvider, private alertCtrl: AlertController) {
    let item = navParams.get('item');
    if (item != null) {
      this.edit = true;
      if(item instanceof Item){
        this.item = item;
      }else
        this.item = new Item(item.id, item.nome, item.descricao, item.peso, item.valor);
    } else {
      this.item = new Item(null,'','' , 0 , 0);
    }
  }

  ionViewDidLoad() {
  }

  addItem() {
    let item = this.navParams.get('item');
    if (this.edit) {
      this.itemComumProvider.update(this.item).then(() => {
        let alert = this.alertCtrl.create({
          title: 'Loja',
          message: 'Você alterou o item com sucesso.',
          buttons: ['OK']
        });
        alert.present(alert);
        this.navCtrl.pop();
      });
    }else {
      this.itemComumProvider.add(this.item).then(() => {
        let alert = this.alertCtrl.create({
          title: 'Loja',
          message: 'Você cadastrou o item com sucesso.',
          buttons: ['OK']
        });
        alert.present(alert);
        this.navCtrl.pop();
      }) 
    }
  }

}
