import { PersonagemDetalhePage } from '../personagem-detalhe/personagem-detalhe';
import { PersonagemPage } from '../personagem/personagem';
import { Personagem } from '../../classes/personagem';
import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PersonagemProvider } from '../../providers/personagem/personagem';
import { PersonagemPipe } from '../../pipes/personagem/personagem';

/**
 * Generated class for the PersonagemListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-personagem-list',
  templateUrl: 'personagem-list.html',
})
export class PersonagemListPage {
  personagens: Array<Personagem>;
  nomePersonagemFilter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private personagemProvider: PersonagemProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let service = this;
    let encapsulatedProvider = personagemProvider;
    this.personagens = [];
    let loading = this.loadingCtrl.create({
      content: 'Carregando personagens',
    });
    loading.present().then(() => {
      encapsulatedProvider.isBuilded().then(function (resultado) {
        console.log('INICIOU', resultado)
        encapsulatedProvider.getAll().then(function (resultado) {
          loading.dismiss();
          service.personagens = resultado;
          console.log('Resultado personagemProvider:', resultado)
        }, function (err) {
          loading.dismiss();
          console.error('Resultado personagemProvider:', err)
        });
      }, function (err) {
        loading.dismiss();
        console.error('Resultado personagemProvider:', err)
      })
    })

  }

  trackById(index: number, item: Personagem): number {
    return item.$id;
  }

  openDetalhe(personagem: Personagem) {
    console.log("personagem a ir para a tela", personagem);
    this.navCtrl.push(PersonagemPage, { item: personagem });
  }

  addPersonagem() {
  }

  editPersonagem(personagem: Personagem) {

  }

  deletarPersonagem(personagem: Personagem) {
    let alert = this.alertCtrl.create({
      title: 'Personagens',
      message: 'Você tem certeza que deseja excluir a ficha do' + personagem.$nome + ' ?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {

          }
        }
      ]
    });
    alert.present(alert);
  }

  ionViewDidLoad() {

  }

}
