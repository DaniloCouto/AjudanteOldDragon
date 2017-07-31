import { Idioma } from '../../classes/idioma';
import { RacaIdiomaProvider } from '../../providers/raca-idioma/raca-idioma';
import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IdiomaAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-idioma-add',
  templateUrl: 'idioma-add.html',
})
export class IdiomaAddPage {

  idioma: Idioma;
  edit: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private racaIdiomaProvider: RacaIdiomaProvider, private alertCtrl: AlertController) {
    let item = this.navParams.get("item");
    if (item != null) {
      this.edit = true;
      if(item instanceof Idioma){
        this.idioma = item;
      }else{
        this.idioma = new Idioma(item.id, item.nome, item.descricao);
      }
    } else {
      this.edit = false;
      this.idioma = new Idioma(null,'','');
    }
  }

  ionViewWillEnter () {
    
  }

  confirmar() {
    let service = this;
    if (this.idioma.$nome != "" && this.idioma.$descricao != "") {
      if (this.edit) {
        this.racaIdiomaProvider.updateIdioma(this.idioma).then(function () {
          let alert = service.alertCtrl.create({
            title: 'Idiomas',
            message: 'Atualização realizada com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        }, function () {
          let alert = service.alertCtrl.create({
            title: 'Idiomas',
            message: 'Algo deu errado na Atualização',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        })
      } else {
        this.racaIdiomaProvider.addIdioma(this.idioma).then(function () {
          let alert = service.alertCtrl.create({
            title: 'Idiomas',
            message: 'Idioma criado com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        }, function () {
          let alert = service.alertCtrl.create({
            title: 'Idiomas',
            message: 'Algo deu errado na criação.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        })
      }
    } else {
      let alert = service.alertCtrl.create({
        title: 'Idiomas',
        message: 'Insira um nome e descrição valido',
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
