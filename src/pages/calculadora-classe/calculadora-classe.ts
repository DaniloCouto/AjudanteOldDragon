import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Clerigo } from '../../classes/classes/clerigo';
import { HomemDeArmas } from '../../classes/classes/homemdearmas';
import { Mago } from '../../classes/classes/mago';
import { Ladino } from '../../classes/classes/ladino';
import { BaseClass } from '../../classes/classes/classe';
import { classeENUM } from '../../classes/classes/classesEnum';
import { BonusDeClasse } from '../../classes/constantesClass';
import { AcessoMagia } from '../../classes/constantesClass';
import { AfastarMortosVivos } from '../../classes/constantesClass';
import { AfastarMortosVivosPorDadosDeVida } from '../../classes/constantesClass';
import { TalentosDeLadrao } from '../../classes/constantesClass';
import { ConstantesClass } from '../../classes/constantesClass';
import { DiceClass } from '../../providers/dice-class/dice-class';

/*
  Generated class for the CalculadoraClassePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'calculadora-classe.html',
  providers: [DiceClass]
})
export class CalculadoraClassePage {
  selectedClass: classeENUM;
  currentClass: BaseClass;
  nivel: number;

  constructor(private nav: NavController, private diceService: DiceClass, public navParams: NavParams) {
    let item = this.navParams.get("item");
    if(item instanceof BaseClass){
      this.nivel = item.$nivel;
      if(item instanceof HomemDeArmas){
        this.selectedClass = 1;
      }else if(item instanceof Mago){
        this.selectedClass = 2;
      }else if(item instanceof Ladino){
        this.selectedClass = 3;
      }else{
        this.selectedClass = 0;
      }
    }else{
      this.selectedClass = 0;
      this.nivel = 1;
    }
    this.classChanged();
  }

  classChanged(){
    this.selectedClass = Number(this.selectedClass);
    switch (this.selectedClass) {
      case 0:
        this.currentClass = new Clerigo(Number(this.nivel));
        break;
      case 1:
        this.currentClass = new HomemDeArmas(Number(this.nivel));
        break;
      case 2:
        this.currentClass = new Mago(Number(this.nivel));
        break;
      case 3:
        this.currentClass = new Ladino(Number(this.nivel));
        break;
    }
  }

  nivelChanged(){
    this.currentClass.$nivel = Number(this.nivel);
  }

}
