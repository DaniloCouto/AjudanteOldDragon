import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Especializacao } from '../../classes/especializacao';

/**
 * Generated class for the EspecializacaoDetalhePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-especializacao-detalhe',
  templateUrl: 'especializacao-detalhe.html',
})
export class EspecializacaoDetalhePage {

  item : Especializacao;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item  = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdiomaDetalhePage');
  }

}
