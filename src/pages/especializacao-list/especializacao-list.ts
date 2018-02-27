import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { PersonagemProvider } from '../../providers/personagem/personagem';
import { EspecializacaoProvider } from '../../providers/especializacao/especializacao';
import { Especializacao } from '../../classes/especializacao';
import { EspecializacaoAddPage } from '../especializacao-add/especializacao-add';
import { EspecializacaoDetalhePage } from '../especializacao-detalhe/especializacao-detalhe';

/**
 * Generated class for the EspecializacaoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-especializacao-list',
  templateUrl: 'especializacao-list.html',
})
export class EspecializacaoListPage {

  especializacaoList: Array<Especializacao>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private especializacaoProvider: EspecializacaoProvider, private alertCtrl: AlertController, public loadingCtrl: LoadingController, private personagemProvider: PersonagemProvider) {
    this.especializacaoList = [];
  }

  init() {
    let service = this;
    let loading = this.loadingCtrl.create({
      content: 'Carregando especializações',
    });
    loading.present().then(() => {
      this.especializacaoProvider.getAllEspecializacao().then(function (espec) {
        service.especializacaoList = espec;
        loading.dismiss();
      })
    })
  }

  trackById(index: number, item: Especializacao): number {
    return item.$id;
  }

  addItem() {
    this.navCtrl.push(EspecializacaoAddPage);
  }

  openDetail(item) {
    this.navCtrl.push(EspecializacaoDetalhePage, { item: item });
  }

  editItem(item) {
    this.navCtrl.push(EspecializacaoAddPage, { item: item });
  }

  deleteItem(item: Especializacao) {
    let alert = this.alertCtrl.create({
      title: 'Especialização',
      message: 'Você tem certeza que deseja excluir esta especialização?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.personagemProvider.deleteEspecializacaoAllPersonagem(item).then(function () {
              this.especializacaoProvider.deleteEspecializacao(item.$id).then((result) => {
                this.especializacaoList.splice(this.especializacaoList.indexOf(item), 1);
              });
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
