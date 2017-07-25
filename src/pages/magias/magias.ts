import { TipoMagia, TipoMagiaComNivel } from '../../classes/magia/tipoMagia';
import { diceENUM } from '../../classes/diceENUM';
import { Component } from '@angular/core';
import {AlertController,  NavController,   NavParams} from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
import { MagiaDetalhePage } from '../magia-detalhe/magia-detalhe';
import { Magia } from '../../classes/magia/magia';
import { medidaDeTempoENUM } from '../../classes/magia/medidaDeTempoENUM';
import { AddMagiaPage } from "../add-magia/add-magia";
import { MagiaFilterPipe } from '../../pipes/magia-filter/magia-filter';


/*
  Generated class for the Magias page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-magias',
  templateUrl: 'magias.html',
  providers: [MagiaService]
})
export class MagiasPage {
  magias: Array<Magia>;
  title: string;
  enum = medidaDeTempoENUM;
  dice = diceENUM;
  tiposLista : Array<TipoMagia>;

  idTipoMagiaFilter : number;
  nivelTipoFilter: number;
  nomeMagiaFilter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService, public alertCtrl: AlertController) { }

  openDetalhe(item){
    this.navCtrl.push(MagiaDetalhePage,{
      item: item
    })
  }

  addMagia(){
    this.navCtrl.push(AddMagiaPage)
  }

  editMagia(magia: Magia){
    this.navCtrl.push(AddMagiaPage, {
      idMagia: magia.$id
    })
  }

  deletarMagia(magia: Magia){
    let alert = this.alertCtrl.create({
      title: 'Escriba',
      message: 'Você tem certeza que deseja excluir esta magia?',
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
            this.magiaService.deletarMagia(magia.$id).then((result) => {
              this.magias.splice(this.magias.indexOf(magia), 1);
            });
          }
        }
      ]
    });
    alert.present(alert);
  }

  init() {
    var idTipos = this.navParams.get("idTipos");
    var favorito = this.navParams.get("favorito");
    this.idTipoMagiaFilter = idTipos.length ? idTipos[0] : null;
    this.title = this.navParams.get("nome");
    if(favorito){
      this.magiaService.getTodasMagiaFavorita().then((result : Array<Magia>) => {
        this.magias = result;
      });
    }else if (idTipos.length > 0) {
      this.magiaService.getMagiaPorTipo(idTipos).then((result : Array<Magia>) => {
        this.magias = result;
      });
    } else {
      this.magiaService.getTodasMagia().then((result : Array<Magia>) => {
        this.magias = result;
      });
    }
  }

  ionViewWillEnter() {
    this.init();
    this.magiaService.getAllTipos().then((result: Array<TipoMagia>) => {
      console.log(result);
      this.tiposLista = result;
    });
  }

}
