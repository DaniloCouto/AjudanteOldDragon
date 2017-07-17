import { diceENUM } from '../../classes/diceENUM';
import { MedidaDeTempoPipe } from '../../pipes/medida-de-tempo/medida-de-tempo';
import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
import { medidaDeTempoENUM } from '../../classes/magia/medidaDeTempoENUM';
import { Magia } from '../../classes/magia/magia';
import { TipoMagia, TipoMagiaComNivel } from '../../classes/magia/tipoMagia';
import { AlcanceMagia } from '../../classes/magia/alcanceMagia';
import { DuracaoMagia } from '../../classes/magia/duracaoMagia';

@Component({
  selector: 'page-add-magia',
  templateUrl: 'add-magia.html',
  providers: [MagiaService]
})
export class AddMagiaPage {
  idMagia: any;
  magia: Magia;
  tiposLista: Array<TipoMagia>;
  tipoCadastro: TipoMagiaComNivel;
  enum = medidaDeTempoENUM;
  dice = diceENUM;


  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService, public alertCtrl: AlertController) {
    this.magia = new Magia([],new AlcanceMagia(0,0,0),new DuracaoMagia(0,0,0,0,0,0),'','')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMagiaPage');
    this.idMagia = this.navParams.get('idMagia');
    if(typeof this.idMagia === "number"){
      this.magiaService.getMagia(this.idMagia).then(function(magia : Magia){
        this.magia = magia
        this.alocarTiposSelecionados(this.magia);
      },function(){
        let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Algo deu errado ao procurar o detalhes da magia.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
      })
    } else {
      this.magia = new Magia([],new AlcanceMagia(0,0,0),new DuracaoMagia(0,0,0,0,0,0),'','')
    }
    this.magiaService.getAllTipos().then((result: Array<TipoMagia>) => {
      console.log(result);
      this.tiposLista = result;
      if(result.length != 0){
        this.tipoCadastro = new TipoMagiaComNivel(result[0].$id, result[0].$nomeTipo, 1);
      }
    });
  }

  addTipos( tipo : TipoMagiaComNivel) {
    let thisMagia = this.magia
    if (thisMagia.$tipoArray.length){
      for(var i = 0; i < thisMagia.$tipoArray.length; i++){
        if (thisMagia.$tipoArray[i].$id === tipo.$id){
          thisMagia.$tipoArray[i].$nivel = tipo.$nivel;
          break;
        } else if (i+1 === this.magia.$tipoArray.length){
          this.magia.$tipoArray.push(new TipoMagiaComNivel(tipo.$id,tipo.$nomeTipo,tipo.$nivel));
        }
      }
    } else {
      this.magia.$tipoArray.push(new TipoMagiaComNivel(tipo.$id,tipo.$nomeTipo,tipo.$nivel));
    }
  }

  deleteTipo( tipo : TipoMagiaComNivel) {
    this.magia.$tipoArray.splice( this.magia.$tipoArray.indexOf(tipo), 1);
  }

  salvar(){
    if(this.magia.$nome === "" && this.magia.$tipoArray.length != 0){
      let alert = this.alertCtrl.create({
        title: 'Cadastro de Magia',
        message: 'A magia deve ter ao menos um nome e uma escola de magia.',
        buttons: ['OK']
      });
      alert.present();
    }else{
      this.magiaService.addMagia(this.magia).then((result: any) => {
        let alert = this.alertCtrl.create({
          title: 'Cadastro de Magia',
          message: 'Cadastro Feito com sucesso.',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop();
      });
    }
  }

}
