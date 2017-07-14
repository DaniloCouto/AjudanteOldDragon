import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
import { MagiasPage } from '../magias/magias';
import { AddTipoMagiaPage } from '../add-tipo-magia/add-tipo-magia';
import { TipoMagia } from "../../classes/magia/tipoMagia";

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
  tipoMagias: Array<TipoMagia>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService, private alertCtrl: AlertController) { }

  selectTipo(tipo){
    console.log(tipo);
    this.navCtrl.push(MagiasPage,{
      idTipos: [tipo.id],
      nome: tipo.nomeTipo
    })
  }

  addTipo(){
    this.navCtrl.push(AddTipoMagiaPage);
  }

  editTipo(tipo){
    this.navCtrl.push(AddTipoMagiaPage,{
      id: tipo.id,
      nome: tipo.nomeTipo
    })
  }

  deleteTipo(item) {
    let alert = this.alertCtrl.create({
      title: 'Escriba',
      message: 'Você tem certeza que deseja excluir esta escola de Magia? Se existir magias que só existem nesta escola, as mesmas serão deletadas.',
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
            console.log('q q eu to enviando?',item);
            this.magiaService.deleteTipo(item.id).then((result) => {
              this.tipoMagias.splice(this.tipoMagias.indexOf(item), 1);
            });
          }
        }
      ]
    });
    alert.present(alert);
  }

  ionViewWillEnter() {
    this.init()
  }

  init() {
    this.magiaService.getAllTipos().then((result: Array<TipoMagia>) => {
        this.tipoMagias = result;
      });
  }

}
