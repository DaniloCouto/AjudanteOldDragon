import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
import { MagiasPage } from '../magias/magias';

/*
  Generated class for the TipoMagias page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tipo-magias',
  templateUrl: 'tipo-magias.html',
  providers: [MagiaService]
})
export class TipoMagiasPage {
  tipoMagias: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService) { }

  selectTipo(tipo){
    this.navCtrl.push(MagiasPage,{
      idTipos: [tipo._id]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoMagiasPage');
    this.init()
  }

  init() {
    this.magiaService.getAllTipos().then((result) => {
        console.log(result);
        this.tipoMagias = result;
        console.log(this.tipoMagias);
      });
  }

}
