import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {AddCharacterPage} from '../add-character/add-character';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public characters = [];

  constructor(private navController: NavController, private platform: Platform,) {
  }

  addItem() {
    this.navController.push(AddCharacterPage);
  }
  ionViewWillEnter() {
    this.platform.ready().then(() => {
    });
  }


}
