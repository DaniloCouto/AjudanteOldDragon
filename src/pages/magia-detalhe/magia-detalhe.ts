import {MagiaService} from '../../providers/magia-service/magia-service';
import {medidaDeTempoENUM} from '../../classes/magia/medidaDeTempoENUM';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Magia } from '../../classes/magia/magia';


/*
  Generated class for the MagiaDetalhe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-magia-detalhe',
  templateUrl: 'magia-detalhe.html',
  providers: [MagiaService]
})
export class MagiaDetalhePage {
  item: Magia;
  isFavorite : Boolean;
  enum = medidaDeTempoENUM;

  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService) {
    this.item  = this.navParams.get('item');
    let service = this;
    magiaService.getMagiaIsFavorite(this.item.$id).then(function(result){
      service.isFavorite = result;
    })
  }

  setFavorite(){
    let service = this;
    this.magiaService.setFavorito(!this.isFavorite, this.item.$id).then(function(result){
      service.isFavorite = result;
    })
  }

  ionViewWillEnter () {}

}
