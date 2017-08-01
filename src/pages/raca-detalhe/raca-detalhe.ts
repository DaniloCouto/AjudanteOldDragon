import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Raca } from "../../classes/raca";
import { Idioma } from "../../classes/idioma";

/**
 * Generated class for the RacaDetalhePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-raca-detalhe',
  templateUrl: 'raca-detalhe.html',
})
export class RacaDetalhePage {
  raca: Raca;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let item = this.navParams.get("item");
    console.log('params:',item);
    if (item != null) {
      if(item instanceof Raca){
        this.raca = item;
      }else{
        this.raca = new Raca(null,'','',0,0,0,0,0,[],new Idioma(0,'',''));
      }
    } else {
      this.raca = new Raca(null,'','',0,0,0,0,0,[],new Idioma(0,'',''));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RacaDetalhePage');
  }

}
