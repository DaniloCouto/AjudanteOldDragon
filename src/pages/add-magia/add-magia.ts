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
  tiposSelecionados: Array<TipoMagiaComNivel>;
  tiposLista: Array<TipoMagia>;
  tipoCadastro: TipoMagiaComNivel;
  enum = medidaDeTempoENUM;


  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService, public alertCtrl: AlertController) { }

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
      this.magia = new Magia([],new AlcanceMagia(0,0,0),new DuracaoMagia(0,0,0,0,0),'','')
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
    this.magia.$tipoArray.push(tipo);
  }

  deleteTipo( tipo : TipoMagiaComNivel) {
    this.magia.$tipoArray.splice( this.magia.$tipoArray.indexOf(tipo), 1);
  }

  tipoDuracao(tipo: number): string {
    switch (tipo) {
      case 0:
        return 'Instantaneo';
      case 1:
        return 'Turno';
      case 2:
        return 'Rodada';
      case 3:
        return 'Combate';
      case 4:
        return 'Segundos';
      case 5:
        return 'Minutos';
      case 6:
        return 'Horas';
      case 7:
        return 'Dia';
      case 8:
        return 'Permanente';
      default:
        return '';
    }
  }

}
