import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Raca } from "../../classes/raca";
import { RacaIdiomaProvider } from "../../providers/raca-idioma/raca-idioma";
import { RacaAddPage } from "../raca-add/raca-add";
import { RacaDetalhePage } from "../raca-detalhe/raca-detalhe";

/**
 * Generated class for the RacaListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-raca-list',
  templateUrl: 'raca-list.html'
})
export class RacaListPage {
  racaList: Array<Raca> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private racaIdiomaProvider : RacaIdiomaProvider, private alertCtrl: AlertController, public loadingCtrl : LoadingController ) {
  }

  init(){
    let service = this;
    let loading = this.loadingCtrl.create({
        content: 'Carregando raças',
    });
    loading.present().then(()=>{
      this.racaIdiomaProvider.getAllRaca().then(function(racas){
        console.log(racas);
        service.racaList = racas;
        loading.dismiss();
      })
    })
  }

  trackById(index: number, item: Raca): number { 
    return item.$id;
  }

  addItem() {
    this.navCtrl.push(RacaAddPage);
  }

  openDetail(item){
    this.navCtrl.push(RacaDetalhePage, { item: item });
  }

  editItem(item) {
    this.navCtrl.push(RacaAddPage, { item: item });
  }

  deleteItem(item) {
    let alert = this.alertCtrl.create({
      title: 'Raças',
      message: 'Você tem certeza que deseja excluir esta raça?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.racaIdiomaProvider.deleteRaca(item.$id).then((result) => {
              this.racaList.splice(this.racaList.indexOf(item), 1);
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
