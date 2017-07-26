import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, Platform } from 'ionic-angular';
import { ItemComumProvider } from "../../providers/item-comum/item-comum";
import { Item } from "../../classes/item";
import { ItemComumDetalhePage } from "../item-comum-detalhe/item-comum-detalhe";
import { AddItemComumPage } from "../add-item-comum/add-item-comum";

/**
 * Generated class for the ItemComumPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-item-comum',
  templateUrl: 'item-comum.html',
})
export class ItemComumPage {
  itens : Array<Item>;
  constructor(private platform : Platform, public navCtrl: NavController, public navParams: NavParams, private itemComumProvider : ItemComumProvider, private alertCtrl: AlertController ) {
  }

  addItem() {
    this.navCtrl.push(AddItemComumPage);
  }

  openDetail(item){
    this.navCtrl.push(ItemComumDetalhePage, { item: item });
  }

  editItem(item) {
    console.log(item);
    this.navCtrl.push(AddItemComumPage, { item: item });
  }

  deleteItem(item) {
    let alert = this.alertCtrl.create({
      title: 'Loja',
      message: 'Você tem certeza que deseja excluir este Item?',
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
            this.itemComumProvider.delete(item._id).then((result) => {
              this.itens.splice(this.itens.indexOf(item), 1);
            });
          }
        }
      ]
    });
    alert.present(alert);
  }

  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.platform.ready().then(() => {
      this.itemComumProvider.getAll().then((result : Array<Item>) => {
        this.itens = result;
      });
    });
  }

}
