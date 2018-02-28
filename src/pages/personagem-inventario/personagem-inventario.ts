import { Personagem } from '../../classes/personagem';
import { Component, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams, AlertController } from 'ionic-angular';
import { Item } from '../../classes/item';
import { Weapon } from '../../classes/weapon/weapon';
import { Armadura } from '../../classes/armadura/armadura';
import { PersonagemProvider } from '../../providers/personagem/personagem';

/**
 * Generated class for the PersonagemInventarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-personagem-inventario',
  templateUrl: 'personagem-inventario.html',
})
export class PersonagemInventarioPage {
  personagem : Personagem;
  peso : number;

  
    constructor(public navCtrl: NavController, public navParams: NavParams, public personagemService : PersonagemProvider,  private alertCtrl: AlertController) {
      let item = this.navParams.data;
      this.peso = 0;
      if(item instanceof Personagem){
        this.personagem = item;
        for( let itemInv of this.personagem.$inventario){
          this.peso += itemInv.$peso;
        }
      }else{
        this.personagem = null;
      }
    }

    whatIsThisItem(item : Item){
      if(item instanceof Weapon){
        return 1;
      }else if(item instanceof Armadura){
        return 2;
      }else{
        return 0;
      }
    }

    deletarItem(item: Item){
      let alert = this.alertCtrl.create({
        title: 'Inventario',
        message: 'Você tem certeza que deseja excluir este Item do inventario?',
        buttons: [
          {
            text: 'Não',
            handler: () => {
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.personagemService.deleteItemPersonagem(this.personagem.$id,item).then(function(){
                this.personagem.$inventario.splice(this.personagem.$inventario.indexOf(item),1);
              });
            }
          }
        ]
      });
      alert.present(alert);
    }



  ionViewDidLoad() {
  }

}
