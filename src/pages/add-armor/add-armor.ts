import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Armadura } from '../../classes/armadura/armadura';
import { ArmorsService } from '../../providers/armors-service/armors-service';

/*
  Generated class for the AddArmorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'add-armor.html',
  providers: [ArmorsService]
})
export class AddArmorPage {
  edit: boolean = false;
  armor: Armadura;

  constructor(private nav: NavController, private _db: ArmorsService, private params: NavParams) {
    let item = params.get('item');
    if (item != null) {
      this.edit = true;
      this.armor = new Armadura(item.nome, item.peso, item.valor, item.bonusCa, item.movimentacao, item.tipo, item.limiteAjusteDes);
    } else {
      this.armor = new Armadura('Nova Armadura', 0, 0, 0, 0, 0, 0);
    }
  }

  addItem() {
    let item = this.params.get('item');
    if (this.edit) {
      this._db.update(this.armor, item._id).then(() => {
        this.nav.pop();
      });
    }else {
      this._db.add(this.armor).then(() => {
        this.nav.pop();
      }) 
    }
  }

}
