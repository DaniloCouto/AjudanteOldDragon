import { Component } from '@angular/core';
import { AlertController, IonicPage,  NavController,  NavParams} from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
/**
 * Generated class for the AddTipoMagiaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-tipo-magia',
  templateUrl: 'add-tipo-magia.html',
  providers: [MagiaService]
})
export class AddTipoMagiaPage {
  id: number;
  stringNome: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService, private alertCtrl: AlertController) {
    this.id = this.navParams.get("id");
    this.stringNome = this.navParams.get("nome");
  }

  ionViewWillEnter () {
  }

  confirmar() {
    let service = this;
    if (this.stringNome != "") {
      if (typeof this.id === "number" && typeof this.id != "undefined" && typeof this.id != null ) {
        this.magiaService.updateTipo(this.stringNome, this.id).then(function () {
          let alert = service.alertCtrl.create({
            title: 'Escriba',
            message: 'Atualização e nome realizada com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        }, function () {
          let alert = service.alertCtrl.create({
            title: 'Escriba',
            message: 'Algo deu errado na Atualização',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        })
      } else {
        this.magiaService.addTipo(this.stringNome).then(function () {
          let alert = service.alertCtrl.create({
            title: 'Escriba',
            message: 'Tipo de magia criado com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        }, function () {
          let alert = service.alertCtrl.create({
            title: 'Escriba',
            message: 'Algo deu errado na criação.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        })
      }
    } else {
      let alert = service.alertCtrl.create({
        title: 'Escriba',
        message: 'Insira um nome valido',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
