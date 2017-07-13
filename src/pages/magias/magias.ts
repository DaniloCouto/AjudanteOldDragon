import { Component } from '@angular/core';
import {AlertController,  NavController,   NavParams} from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
import { MagiaDetalhePage } from '../magia-detalhe/magia-detalhe';

/*
  Generated class for the Magias page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-magias',
  templateUrl: 'magias.html',
  providers: [MagiaService]
})
export class MagiasPage {
  magias: Array<any>;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService, public alertCtrl: AlertController) { }

  openDetalhe(item){
    this.navCtrl.push(MagiaDetalhePage,{
      item: item
    })
  }

  init() {
    var idTipos = this.navParams.get("idTipos");
    this.title = this.navParams.get("nome");
    if (idTipos.length > 0) {
      this.magiaService.getMagiaPorTipo(idTipos).then((result) => {
        this.magias = result;
        console.log("Magias",this.magias);
        this.magias.forEach(function(element){
          element.tiposFormatados = [];
          for(var i = 0; (i < element.tipoArray.length && i < element.tipoNivelArray.length); i++){
            element.tiposFormatados.push({
                nome: element.tipoArray[i].nomeTipo,
                nivel: element.tipoNivelArray[i]
            })
          }
        })
        console.log(result)
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Algo deu Errado',
        subTitle: 'Não foi possivel encotrar o tipo de magia.',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MagiasPage');
    this.init();
  }



}
