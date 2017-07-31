import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from 'ionic-angular';
import { RacaIdiomaProvider } from "../../providers/raca-idioma/raca-idioma";
import { HabilidadeRacial,  Raca } from '../../classes/raca';
import { Idioma } from "../../classes/idioma";
import { HabilidadeRacialAddPage } from "../habilidade-racial-add/habilidade-racial-add";

/**
 * Generated class for the RacaAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-raca-add',
  templateUrl: 'raca-add.html',
})
export class RacaAddPage {

  raca: Raca;
  idiomaList: Array<Idioma>;
  edit: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController , private racaIdiomaProvider : RacaIdiomaProvider, public modalCtrl: ModalController, public loadingCtrl : LoadingController) {
    this.idiomaList = [];
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
    let item = this.navParams.get("item");
    if (item != null) {
      this.edit = true;
      if(item instanceof Raca){
        this.raca = item;
      }else{
        this.edit = false;
        this.raca = new Raca(null,'','',0,0,0,0,0,[],new Idioma(0,'',''));
      }
    } else {
      this.edit = false;
      this.raca = new Raca(null,'','',0,0,0,0,0,[],new Idioma(0,'',''));
    }
  }

  adicionarHabilidade(){
    let service = this;
    let chooseModal = this.modalCtrl.create(HabilidadeRacialAddPage);
    chooseModal.onDidDismiss(data => {
      if(data instanceof HabilidadeRacial){
        service.raca.$habilidades.push(data);
      }
    });
    chooseModal.present();
  }

  editarHabilidade(item){
    let service = this;
    let chooseModal = this.modalCtrl.create(HabilidadeRacialAddPage,{item:item});
    
    chooseModal.onDidDismiss(function(data){
      if(data instanceof HabilidadeRacial){
        service.raca.$habilidades.push(data);
      }
    });
    chooseModal.present();
  }

  deletarHabilidade(item){
    this.raca.$habilidades.splice(this.raca.$habilidades.indexOf(item),1);
  }

  confirmar() {
    let service = this;
    if (this.raca.$nome != "" && this.raca.$descricao != "" && this.raca.$idioma.$id) {
      if (this.edit) {
        this.racaIdiomaProvider.updateRaca(this.raca).then(function () {
          let alert = service.alertCtrl.create({
            title: 'Racas',
            message: 'Atualização realizada com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        }, function () {
          let alert = service.alertCtrl.create({
            title: 'Racas',
            message: 'Algo deu errado na Atualização',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        })
      } else {
        this.racaIdiomaProvider.addRaca(this.raca).then(function () {
          let alert = service.alertCtrl.create({
            title: 'Racas',
            message: 'Raca criado com sucesso.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        }, function () {
          let alert = service.alertCtrl.create({
            title: 'Racas',
            message: 'Algo deu errado na criação.',
            buttons: ['OK']
          });
          alert.present();
          service.navCtrl.pop();
        })
      }
    } else {
      let alert = service.alertCtrl.create({
        title: 'Racas',
        message: 'Insira um nome, descrição e idioma valido',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  init(){
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RacaAddPage');
  }

}
