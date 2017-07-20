import { diceENUM } from '../../classes/diceENUM';
import { Component } from '@angular/core';
import {AlertController,  NavController,   NavParams} from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
import { MagiaDetalhePage } from '../magia-detalhe/magia-detalhe';
import { Magia } from '../../classes/magia/magia';
import { medidaDeTempoENUM } from '../../classes/magia/medidaDeTempoENUM';
import { AddMagiaPage } from "../add-magia/add-magia";


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
  magias: Array<Magia>;
  title: string;
  enum = medidaDeTempoENUM;
  dice = diceENUM;

  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService, public alertCtrl: AlertController) { }

  openDetalhe(item){
    this.navCtrl.push(MagiaDetalhePage,{
      item: item
    })
  }

  addMagia(){
    this.navCtrl.push(AddMagiaPage)
  }

  editMagia(magia: Magia){
    this.navCtrl.push(AddMagiaPage, {
      idMagia: magia.$id
    })
  }

  deletarMagia(magia: Magia){
    let alert = this.alertCtrl.create({
      title: 'Ferreiro',
      message: 'Você tem certeza que deseja excluir esta arma?',
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
            this.magiaService.deletarMagia(magia.$id).then((result) => {
              this.magias.splice(this.magias.indexOf(magia), 1);
            });
          }
        }
      ]
    });
    alert.present(alert);
  }

  init() {
    var idTipos = this.navParams.get("idTipos");
    this.title = this.navParams.get("nome");
    if (idTipos.length > 0) {
      this.magiaService.getMagiaPorTipo(idTipos).then((result : Array<Magia>) => {
        console.log(result);
        this.magias = result;
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
