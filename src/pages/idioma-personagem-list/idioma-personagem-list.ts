import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, ViewController } from 'ionic-angular';
import { RacaIdiomaProvider } from '../../providers/raca-idioma/raca-idioma';
import { Personagem } from '../../classes/personagem';
import { Idioma } from '../../classes/idioma';
import { PersonagemProvider } from '../../providers/personagem/personagem';

/**
 * Generated class for the IdiomaPersonagemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-idioma-personagem-list',
  templateUrl: 'idioma-personagem-list.html',
})
export class IdiomaPersonagemListPage {

  personagem: Personagem;
  idiomasList: Array<Idioma>;

  constructor(public navCtrl: ViewController, public navParams: NavParams, public racaIdiomaProvider: RacaIdiomaProvider, public personagemProvider : PersonagemProvider, public alertController: AlertController) {
    let service = this;
    this.personagem = this.navParams.get("item");
    this.racaIdiomaProvider.getAllIdioma().then(function (idiomas: Array<Idioma>) {
      for(let i = 0 ; i < service.personagem.$idiomas.length; i++){
        for(let j = 0; j < idiomas.length; j++){
          if(service.personagem.$idiomas[i].$id === idiomas[j].$id){
            idiomas.splice(j,1);
          }
        }
      }
      service.idiomasList = idiomas;
      
    })
  }

  deleteIdiomaPersonagem(item : Idioma) {
    let service = this;
    let alert = this.alertController.create({
      title: 'Idiomas Personagem',
      message: 'Você tem certeza que deseja excluir este Idioma do Personagem?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            service.personagemProvider.deleteIdiomaPersonagem(service.personagem.$id,item).then(function(){
              service.idiomasList = service.idiomasList.concat(service.personagem.$idiomas.splice(this.personagem.$idiomas.indexOf(item), 1));
            },function(){});
            
          }
        }
      ]
    });
    alert.present(alert);
  }

  add() {
    let service = this;
    let alert = this.alertController.create();
    alert.setTitle('Lightsaber color');
    for (let i = 0; i < this.idiomasList.length; i++) {
      alert.addInput({
        type: 'checkbox',
        label: this.idiomasList[i].$nome,
        value: JSON.stringify(this.idiomasList[i])
      })
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('checkbox data:', data);
        let idiomaArray : Array<Idioma> = [];
        if(data instanceof Array){
          for(let i = 0; i < data.length; i++){
            let convertedItem  = JSON.parse(data[i]) as Idioma;
            idiomaArray.push(convertedItem);
            
          }
        }
        service.personagemProvider.addIdiomaPersonagem(service.personagem.$id,idiomaArray).then(function(){
          for(let i = 0 ; i < idiomaArray.length; i++){
            for(let j = 0; j < service.idiomasList.length; j++){
              if(idiomaArray[i].$id === service.idiomasList[j].$id){
                service.idiomasList.splice(j,1);
              }
            }
          }
          service.personagem.$idiomas =  service.personagem.$idiomas.concat(idiomaArray);
        });
      }
    });
  }

  dismiss(){
    this.navCtrl.dismiss(this.personagem.$idiomas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdiomaPersonagemListPage');
  }

}
