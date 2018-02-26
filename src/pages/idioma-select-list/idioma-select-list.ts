import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Idioma } from '../../classes/idioma';
import { RacaIdiomaProvider } from '../../providers/raca-idioma/raca-idioma';

/**
 * Generated class for the IdiomaSelectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-idioma-select-list',
  templateUrl: 'idioma-select-list.html',
})
export class IdiomaSelectListPage {

  idiomaList: Array<Idioma>;
  constructor(public viewCtrl: ViewController, public navParams: NavParams, private racaIdiomaProvider : RacaIdiomaProvider, public loadingCtrl : LoadingController ) {
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

  selectIdioma(idioma){
    this.viewCtrl.dismiss({idioma : idioma});
  }

  dismiss(){
    this.viewCtrl.dismiss({idioma : null});
  }

  ionViewWillEnter() {
    this.init();
  }
}
