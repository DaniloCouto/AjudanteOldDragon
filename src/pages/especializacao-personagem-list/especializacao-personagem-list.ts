import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Personagem } from '../../classes/personagem';
import { EspecializacaoProvider } from '../../providers/especializacao/especializacao';
import { PersonagemProvider } from '../../providers/personagem/personagem';
import { Especializacao } from '../../classes/especializacao';

/**
 * Generated class for the EspecializacaoPersonagemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-especializacao-personagem-list',
  templateUrl: 'especializacao-personagem-list.html',
})
export class EspecializacaoPersonagemListPage {

  personagem : Personagem;
  especializacoes: Array<Especializacao>;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController, public especializacaoProvider: EspecializacaoProvider, public personagemProvider: PersonagemProvider) {
    let service = this;
    this.personagem = this.navParams.get('item');
    this.especializacaoProvider.getAllEspecializacao().then(function (espec: Array<Especializacao>) {
      for(let i = 0 ; i < service.personagem.$idiomas.length; i++){
        for(let j = 0; j < espec.length; j++){
          if(service.personagem.$idiomas[i].$id === espec[j].$id){
            espec.splice(j,1);
          }
        }
      }
      service.especializacoes = espec;
    })
  }

  deleteEspecializacaoPersonagem(item : Especializacao) {
    let service = this;
    let alert = this.alertCtrl.create({
      title: 'Especializações Personagem',
      message: 'Você tem certeza que deseja excluir esta Especialização do Personagem?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            service.personagemProvider.deleteEspecializacaoPersonagem(service.personagem.$id,item).then(function(){
              service.especializacoes = service.especializacoes.concat(service.personagem.$especializacoes.splice(this.personagem.$especializacoes.indexOf(item), 1));
            },function(){});
          }
        }
      ]
    });
    alert.present(alert);
  }

  add() {
    let service = this;
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');
    for (let i = 0; i < this.especializacoes.length; i++) {
      alert.addInput({
        type: 'checkbox',
        label: this.especializacoes[i].$nome,
        value: JSON.stringify(this.especializacoes[i])
      })
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('checkbox data:', data);
        let especArray : Array<Especializacao> = [];
        if(data instanceof Array){
          for(let i = 0; i < data.length; i++){
            let convertedItem  = JSON.parse(data[i]) as Especializacao;
            especArray.push(convertedItem);
          }
        }
        service.personagemProvider.addEspecializacaoPersonagem(service.personagem.$id,especArray).then(function(){
          for(let i = 0 ; i < especArray.length; i++){
            for(let j = 0; j < service.especializacoes.length; j++){
              if(especArray[i].$id === service.especializacoes[j].$id){
                service.especializacoes.splice(j,1);
              }
            }
          }
          service.personagem.$especializacoes =  service.personagem.$especializacoes.concat(especArray);
        });
      }
    });
  }

  dismiss(){
    this.viewCtrl.dismiss({item : this.personagem.$especializacoes});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EspecializacaoPersonagemListPage');
  }

}
