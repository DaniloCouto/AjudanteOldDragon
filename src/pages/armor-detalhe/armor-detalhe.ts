import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Armadura } from "../../classes/armadura/armadura";

/**
 * Generated class for the ArmorDetalhePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-armor-detalhe',
  templateUrl: 'armor-detalhe.html',
})
export class ArmorDetalhePage {
  armor: Armadura;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let item = navParams.get('item');
    if (item != null) {
      this.armor = new Armadura(item.nome, item.descricao, item.peso, item.valor, item.bonusCa, item.movimentacao, item.tipo, item.limiteAjusteDes);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArmorDetalhePage');
  }

}