import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeaponsPage } from '../weapons/weapons';
import { ArmorsPage } from '../armors/armors';

/*
  Generated class for the BlacksmithPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'blacksmith.html',
})
export class BlacksmithPage {

  tab1Root = WeaponsPage;
  tab2Root = ArmorsPage;

  constructor(private nav: NavController) {

  }

}
