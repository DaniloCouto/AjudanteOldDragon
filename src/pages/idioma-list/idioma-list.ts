import { Idioma } from '../../classes/idioma';
import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { IdiomaAddPage } from "../idioma-add/idioma-add";
import { IdiomaDetalhePage } from "../idioma-detalhe/idioma-detalhe";
import { RacaIdiomaProvider } from "../../providers/raca-idioma/raca-idioma";

/**
 * Generated class for the IdiomaListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-idioma-list',
  templateUrl: 'idioma-list.html',
  providers: [RacaIdiomaProvider]
})
export class IdiomaListPage {

  idiomaList: Array<Idioma>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private racaIdiomaProvider : RacaIdiomaProvider, private alertCtrl: AlertController, public loadingCtrl : LoadingController ) {
    this.idiomaList = [];
  }

  init(){
    let service = this;
    let loading = this.loadingCtrl.create({
        content: 'Carregando idiomas',
    });
    loading.present().then(()=>{
      this.racaIdiomaProvider.getAllIdioma().then(function(idiomas){
        service.idiomaList = idiomas;
        loading.dismiss();
      })
    })
  }

  trackById(index: number, item: Idioma): number { 
    return item.$id;
  }

  addItem() {
    this.navCtrl.push(IdiomaAddPage);
  }

  openDetail(item){
    this.navCtrl.push(IdiomaDetalhePage, { item: item });
  }

  editItem(item) {
    this.navCtrl.push(IdiomaAddPage, { item: item });
  }

  deleteItem(item) {
    let alert = this.alertCtrl.create({
      title: 'Idiomas',
      message: 'Você tem certeza que deseja excluir este idioma?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.racaIdiomaProvider.deleteIdioma(item.$id).then((result) => {
              this.idiomaList.splice(this.idiomaList.indexOf(item), 1);
            },function(error){
              if(error === 403){
                let alert = this.alertCtrl.create({
                  title: 'Idiomas',
                  message: 'Este idioma esta sendo utilizado, retire as dependencias e tente novamente.',
                  buttons: []
                })
                alert.present(alert);
              }
            });
          }
        }
      ]
    });
    alert.present(alert);
  }

  ionViewWillEnter() {
    this.init();
  }

}
