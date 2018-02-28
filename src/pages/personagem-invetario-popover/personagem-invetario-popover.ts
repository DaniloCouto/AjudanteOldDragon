import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the PersonagemInvetarioPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personagem-invetario-popover',
  templateUrl: 'personagem-invetario-popover.html',
})
export class PersonagemInvetarioPopoverPage {

  constructor(public viewCtrl: ViewController) {}

  close(id) {
    this.viewCtrl.dismiss(id);
  }

}
