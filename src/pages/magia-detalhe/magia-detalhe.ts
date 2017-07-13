import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/*
  Generated class for the MagiaDetalhe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-magia-detalhe',
  templateUrl: 'magia-detalhe.html'
})
export class MagiaDetalhePage {
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item  = this.navParams.get('item');
    console.log("Item",this.item);
  }

  ionViewDidLoad() {}

}
