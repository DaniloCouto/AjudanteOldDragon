import { Component } from '@angular/core';
import { NavController, Platform, AlertController} from 'ionic-angular';
import { ArmorsService } from '../../providers/armors-service/armors-service';
import { MoneyConventer } from '../../providers/money-conventer/money-conventer';
import { AddArmorPage } from '../add-armor/add-armor';
import { ArmorDetalhePage } from "../armor-detalhe/armor-detalhe";
import { Armadura } from "../../classes/armadura/armadura";
/*
  Generated class for the ArmorsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'armors.html',
  providers: [ArmorsService, MoneyConventer]
})
export class ArmorsPage {
  itens: Array<Armadura>;


  constructor(private nav: NavController, private platform: Platform, private armorsService: ArmorsService, private conventer: MoneyConventer, private alertCtrl : AlertController) {

  }

  addItem() {
    this.nav.push(AddArmorPage);
  }

  editItem(item) {
    console.log(item);
    this.nav.push(AddArmorPage, { item: item });
  }

  selectItem(item) {
    console.log(item);
    this.nav.push(ArmorDetalhePage, { item: item });
  }

  deleteItem(item) {
    let alert = this.alertCtrl.create({
      title: 'Loja',
      message: 'Você tem certeza que deseja excluir esta arma?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.armorsService.delete(item.$id).then((result) => {
              this.itens.splice(this.itens.indexOf(item), 1);
            });
          }
        }
      ]
    });
    alert.present(alert);
  }

  init() {
    this.platform.ready().then(() => {
      this.armorsService.getAll().then((result) => {
        this.itens = result;
        console.log(result);
      });
    });
  }

  ionViewWillEnter() {
    this.init();
  }

}
