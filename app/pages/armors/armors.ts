import { Component } from '@angular/core';
import { NavController, Platform, Alert} from 'ionic-angular';
import { ArmorsService } from '../../providers/armors-service/armors-service';
import { MoneyConventer } from '../../providers/money-conventer/money-conventer';
import { AddArmorPage } from '../add-armor/add-armor';
/*
  Generated class for the ArmorsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/armors/armors.html',
  providers: [ArmorsService, MoneyConventer]
})
export class ArmorsPage {
  itens: Array<any>;


  constructor(private nav: NavController, private platform: Platform, private armorsService: ArmorsService, private conventer: MoneyConventer) {

  }

  addItem() {
    this.nav.push(AddArmorPage);
  }

  editItem(item) {
    console.log(item);
    this.nav.push(AddArmorPage, { item: item });
  }

  deleteItem(item) {
    let alert = Alert.create({
      title: 'Ferreiro',
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
            this.armorsService.delete(item._id).then((result) => {
              this.itens.splice(this.itens.indexOf(item), 1);
            });
          }
        }
      ]
    });
    this.nav.present(alert);
  }

  init() {
    this.platform.ready().then(() => {
      this.armorsService.getAll().then((result) => {
        result.forEach(element => {
          element.convertedPrice = this.conventer.convertMaxPO(element.valor);
        });
        this.itens = result;
        console.log(result);
      });
    });
  }

  ionViewWillEnter() {
    this.init();
  }

}
