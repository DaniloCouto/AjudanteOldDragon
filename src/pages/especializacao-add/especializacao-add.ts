import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Especializacao } from '../../classes/especializacao';
import { EspecializacaoProvider } from '../../providers/especializacao/especializacao';

/**
 * Generated class for the EspecializacaoAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-especializacao-add',
  templateUrl: 'especializacao-add.html',
})
export class EspecializacaoAddPage {

  especializacao: Especializacao;
  edit: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private especializacaoProvider: EspecializacaoProvider, private alertCtrl: AlertController) {
    let item = this.navParams.get("item");
    if (item != null) {
      this.edit = true;
      if(item instanceof Especializacao){
        this.especializacao = item;
      }else{
        this.especializacao = new Especializacao(item.id, item.nome, item.descricao);
      }
    } else {
      this.edit = false;
      this.especializacao = new Especializacao(null,'','');
    }
  }

  ionViewWillEnter () {
    
  }

  confirmar() {
    let service = this;
    if (this.especializacao.$nome != "" && this.especializacao.$descricao != "") {
      if (this.edit) {
        this.especializacaoProvider.updateEspecializacao(this.especializacao).then(function () {
          let alert = service.alertCtrl.create({
            title: 'Especialização',
            message: 'Atualização realizada com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        }, function () {
          let alert = service.alertCtrl.create({
            title: 'Especialização',
            message: 'Algo deu errado na Atualização',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        })
      } else {
        this.especializacaoProvider.addEspecializacao(this.especializacao).then(function () {
          let alert = service.alertCtrl.create({
            title: 'Especialização',
            message: 'Idioma criado com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        }, function () {
          let alert = service.alertCtrl.create({
            title: 'Especialização',
            message: 'Algo deu errado na criação.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        })
      }
    } else {
      let alert = service.alertCtrl.create({
        title: 'Especialização',
        message: 'Insira um nome e descrição valido',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
