import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Personagem } from '../../classes/personagem';
import { Weapon } from '../../classes/weapon/weapon';
import { Item } from '../../classes/item';

/**
 * Generated class for the RapidDiceRollsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rapid-dice-rolls',
  templateUrl: 'rapid-dice-rolls.html',
})
export class RapidDiceRollsPage {
  personagemParams: Personagem;
  ClasseArmadura: number;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.personagemParams = navParams.get('personagem');
    
  }

  getClassBonusBa() : number{
    let baClasse = 0;
    for(let i = 0; i < this.personagemParams.$classes.length; i++){
      if(baClasse < this.personagemParams.$classes[i].$bonus().bonusDeAtaque[0]){
        baClasse = this.personagemParams.$classes[i].$bonus().bonusDeAtaque[0];
      }
    }
    return baClasse;
  }

  getRacaBonusBa(){
    return this.personagemParams.$raca.$bonusDeAtaque;
  }

  roll(nomeJogada: string, dice : number, diceTotal:number, difficult?: number, bonus?: number, criticalIsPossible?: boolean){
    difficult = difficult ? difficult : 0;
    bonus = bonus ? bonus : 0;

    let successMessage = "";
    let rollResult = 0;
    for(let i = 0 ; i < diceTotal; i++){
      rollResult += (Math.round( Math.random() * dice ) +1) + bonus;
    }
    if(criticalIsPossible){
      if(rollResult == dice){
        successMessage = "Sucesso Critico!"
      }else if(rollResult == 1){
        successMessage = "Falha Critica!"
      }else if((rollResult + bonus ) >= difficult){
        successMessage = "Sucesso!"
      }else if((rollResult + bonus ) >= difficult){
        successMessage = "Falha!"
      }
    }else{
      if((rollResult + bonus ) >= difficult){
        successMessage = "Sucesso!"
      }else if((rollResult + bonus ) >= difficult){
        successMessage = "Falha!"
      }
    }
    let alert = this.alertCtrl.create({
      title: nomeJogada,
      subTitle: 'Uma rolagem de '+diceTotal+'d'+dice+' + '+bonus+', dificuldade '+difficult+', você objeteve um '+rollResult,
      message: successMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
