import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Character} from '../../classes/character';

/*
  Generated class for the AddCharacterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add-character/add-character.html',
})
export class AddCharacterPage {
  public character: Character; 

  constructor(private nav: NavController) {
    this.character = new Character();
  }
  click() {
    console.log(this.character);
  }

}
