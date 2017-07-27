import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WeaponsService } from '../../providers/weapons-service/weapons-service';
import { Weapon } from '../../classes/weapon/weapon';
import { TipoArma } from '../../classes/weapon/tipoArma';
import { TamanhoArma } from '../../classes/weapon/tamanhoArma';
import { Dano } from '../../classes/dano/dano';
import { diceENUM } from "../../classes/diceENUM";

@Component({
  templateUrl: 'add-weapon.html',
  providers: [WeaponsService]
})
export class AddWeaponPage {
  edit: boolean = false;
  weapon: Weapon;
  tipoEnum: TipoArma;
  tamanhoEnum: TamanhoArma;
  diceEnum: diceENUM;

  constructor(private nav: NavController, private _db: WeaponsService, private params: NavParams) {
    let item = params.get('item');
    if (item != null) {
      this.edit = true;
      if(item instanceof Weapon){
        this.weapon = item;
      }else{
        this.weapon = new Weapon(item.id, item.nome, item.descricao, item.peso, item.valor, item.iniciativa, item.baAdicional, new Dano(item.danoPuro, item.danoRolagem, item.qntdRolagem), [item.alcancePequeno,item.alcanceMedio,item.alcanceGrande], item.tamanho, [item.tipo1,item.tipo2]);
      }
    } else {
      this.weapon = new Weapon(null,'Nova Arma','' , 0 , 0, 0, 0, new Dano(0, 2, 1), [0, 0, 0], TamanhoArma.PEQUENA, [TipoArma.NULO, TipoArma.NULO]);
    }
  }

  addItem() {
    let item = this.params.get('item');
    if (this.edit) {
      this._db.update(this.weapon).then(() => {
        this.nav.pop();
      });
    }else {
      this._db.add(this.weapon).then(() => {
        this.nav.pop();
      }) 
    }
  }

}
