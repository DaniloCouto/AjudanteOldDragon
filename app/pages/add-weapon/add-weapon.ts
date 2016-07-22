import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeaponsService } from '../../providers/weapons-service/weapons-service';
import { Weapon } from '../../classes/weapon/weapon';
import { TipoArma } from '../../classes/weapon/tipoArma';
import { TamanhoArma } from '../../classes/weapon/tamanhoArma';
import { Dano } from '../../classes/dano/dano';

@Component({
  templateUrl: 'build/pages/add-weapon/add-weapon.html',
  providers: [WeaponsService]
})
export class AddWeaponPage {
  weapon: Weapon;

  constructor(private nav: NavController, private _db: WeaponsService) {
    this.weapon = new Weapon('Nova Arma', 0 , 0, 0, 0, new Dano(0, 2, 1), [0, 0, 0], TamanhoArma.PEQUENA, [TipoArma.NULO, TipoArma.NULO]);
  }

  addItem() {
    this._db.add(this.weapon);
    console.log(this.weapon);
  }

}
