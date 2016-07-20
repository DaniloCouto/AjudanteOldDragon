import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {AddCharacterPage} from '../add-character/add-character';
import {CharacterService} from '../../providers/character-service/character-service';


@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CharacterService]
})
export class HomePage {
  public characters = [];

  constructor(private navController: NavController, private platform: Platform, private charService: CharacterService) {
  }

  addItem() {
    this.navController.push(AddCharacterPage);
  }
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.charService.getAll()
        .then(data => {
          this.characters = data;
        })
        .catch(console.error.bind(console));
    });
  }


}
