import { Dano } from '../../classes/dano/dano';
import { Weapon } from '../../classes/weapon/weapon';
import { TipoArma } from '../../classes/weapon/tipoArma';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the WeaponDetalhePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-weapon-detalhe',
  templateUrl: 'weapon-detalhe.html',
})
export class WeaponDetalhePage {
  tipoEnum : TipoArma;
  weapon: Weapon;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let item = navParams.get('item');
    if (item != null) {
      this.weapon = new Weapon(item.nome, item.descricao, item.peso, item.valor, item.iniciativa, item.baAdicional, new Dano(item.danoPuro, item.danoRolagem, item.qntdRolagem), [item.alcancePequeno,item.alcanceMedio,item.alcanceGrande], item.tamanho, [item.tipo1,item.tipo2]);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeaponDetalhePage');
  }

}
