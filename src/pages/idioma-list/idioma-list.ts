import { IdiomaProvider } from '../../providers/idioma/idioma';
import { Idioma } from '../../classes/idioma';
import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";

/**
 * Generated class for the IdiomaListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-idioma-list',
  templateUrl: 'idioma-list.html',
  providers: [IdiomaProvider]
})
export class IdiomaListPage {

  idiomaList: Array<Idioma>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private idiomaProvider : IdiomaProvider, private alertCtrl: AlertController, public loadingCtrl : LoadingController ) {
    this.idiomaList = [];
  }

  init(){
    let service = this;
    let loading = this.loadingCtrl.create({
        content: 'Carregando idiomas',
    });
    loading.present().then(()=>{
      this.idiomaProvider.getAll().then(function(idiomas){
        service.idiomaList = idiomas;
        loading.dismiss();
      })
    })
  }

  trackById(index: number, item: Idioma): number { 
    return item.$id;
  }

  addItem() {
    //this.nav.push(AddWeaponPage);
  }

  openDetail(item){
    //this.nav.push(WeaponDetalhePage, { item: item });
  }

  editItem(item) {
    //this.nav.push(AddWeaponPage, { item: item });
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
            this.idiomaProvider.delete(item.$id).then((result) => {
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
