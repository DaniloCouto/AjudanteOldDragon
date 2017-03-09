import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';

@Component({
  selector: 'page-add-tipomagia',
  templateUrl: 'add-tipomagia.html',
  providers: [MagiaService]
})
export class AddTipomagiaPage {
  id: number;
  stringNome: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService, public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTipomagiaPage');
    this.id = this.navParams.get("id");
    this.stringNome = this.navParams.get("nome");
  }

  confirmar() {
    if (this.stringNome != "") {
      if (typeof this.id === "number") {
        this.magiaService.updateTipo(this.stringNome, this.id).then(function () {
          let alert = this.alertCtrl.create({
            subTitle: 'Atualização e nome realizada com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
        }, function () {
          let alert = this.alertCtrl.create({
            subTitle: 'Algo deu errado na Atualização',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
        })
      } else {
        this.magiaService.addTipo(this.stringNome).then(function () {
          let alert = this.alertCtrl.create({
            subTitle: 'Tipo de magia criado com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
        }, function () {
          let alert = this.alertCtrl.create({
            subTitle: 'Algo deu errado na criação.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
        })
      }
    } else {
      let alert = this.alertCtrl.create({
        subTitle: 'Insira um nome valido',
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
