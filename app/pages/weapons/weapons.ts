import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { WeaponsService } from '../../providers/weapons-service/weapons-service';
import { AddWeaponPage } from '../add-weapon/add-weapon';

/*
  Generated class for the WeaponsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/weapons/weapons.html',
  providers: [WeaponsService]
})
export class WeaponsPage {
  weapons: any;

  constructor(private nav: NavController, private platform: Platform, private weapService: WeaponsService) {
    this.platform.ready().then(() => {
      this.weapService.getAll().then((result) => {
        this.weapons = result;
      });
      
    });
  }

  addItem() {
    this.nav.push(AddWeaponPage);
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.weapService.getAll().then((result) => {
        this.weapons = result;
      });
      
    });
  }

}
