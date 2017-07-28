import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Idioma } from "../../classes/idioma";

/**
 * Generated class for the IdiomaDetalhePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-idioma-detalhe',
  templateUrl: 'idioma-detalhe.html',
})
export class IdiomaDetalhePage {
  item : Idioma;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item  = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdiomaDetalhePage');
  }

}
