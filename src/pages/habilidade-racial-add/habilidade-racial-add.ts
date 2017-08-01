import { HabilidadeRacial } from '../../classes/raca';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HabilidadeRacialAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-habilidade-racial-add',
  templateUrl: 'habilidade-racial-add.html',
})
export class HabilidadeRacialAddPage {

  habilidade : HabilidadeRacial;
  edit: boolean;

  constructor(public navParams: NavParams,  public viewCtrl: ViewController) {
    this.init();
  }

  close(){
    this.viewCtrl.dismiss();
  }

  cadastrar(){
    this.viewCtrl.dismiss({item: this.habilidade});
  }

  ionViewDidLoad() {
    this.init();
  }

  init(){
    let item = this.navParams.get("item");
    console.log('Modal Params:',item);
    if (item) {
      this.edit = true;
      if(item instanceof HabilidadeRacial){
        this.habilidade = item;
      }else{
        this.edit = false;
        this.habilidade = new HabilidadeRacial(null,'','');
      }
    } else {
      this.edit = false;
      this.habilidade = new HabilidadeRacial(null,'','');
    }
  }

}
