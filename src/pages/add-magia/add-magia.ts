import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
import { medidaDeTempoENUM } from '../../classes/magia/medidaDeTempoENUM';
import { Magia } from '../../classes/magia/magia';
import { TipoMagia } from '../../classes/magia/tipoMagia';
import { AlcanceMagia } from '../../classes/magia/alcanceMagia';
import { DuracaoMagia } from '../../classes/magia/duracaoMagia';

class tipo {
  public objetoTipo: TipoMagia;
  public nivel: number;
  constructor($objetoTipo: TipoMagia, $nivel: number) {
    this.objetoTipo = $objetoTipo;  
    this.nivel = $nivel
  }
}

@Component({
  selector: 'page-add-magia',
  templateUrl: 'add-magia.html',
  providers: [MagiaService]
})
export class AddMagiaPage {
  idMagia: any;
  magia: Magia;
  tiposSelecionados: Array<tipo>;
  tiposLista: Array<any>
  tipos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private magiaService: MagiaService, public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMagiaPage');
    this.idMagia = this.navParams.get('idMagia');
    if(typeof this.idMagia === "number"){
      this.magiaService.getMagia(this.idMagia).then(function(resultSet){
        this.magia = new Magia(resultSet.tipoArray,resultSet.tipoNivelArray,new AlcanceMagia(resultSet.alcanceBase,resultSet.nivelPorAlcance,resultSet.alcancePorNivel),new DuracaoMagia(resultSet.duracaoBase,resultSet.nivelPorDuracao,resultSet.duracaoPorNivel,resultSet.tipoDuracaoBase,resultSet.tipoDuracaoAdicional),resultSet.nome,resultSet.descricao);
        this.alocarTiposSelecionados(this.magia);
      },function(){
        let alert = this.alertCtrl.create({
            subTitle: 'Algo deu errado ao procurar o detalhes da magia.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
      })
    } else {
      this.magia = new Magia([new TipoMagia(0,'')],[0],new AlcanceMagia(0,0,0),new DuracaoMagia(0,0,0,0,0),'','')
      this.alocarTiposSelecionados(this.magia);
    }
    this.addTipos();
    this.magiaService.getAllTipos().then((result) => {
      console.log(result);
      this.tipos = result;
      this.tiposLista = result;
      console.log(this.tipos);
    });
  }

  private alocarTiposSelecionados(magia: Magia){
    var tiposTemp = [];
    for(var i = 0; i < magia.$tipoArray.length; i++){
      tiposTemp.push(new tipo({
        _id: magia.$tipoArray[i].$id,
        nome: magia.$tipoArray[i].$nomeTipo
      },magia.$tipoNivelArray[i]))
    }
    this.tiposSelecionados = tiposTemp;
  }

  addTipos() {
    this.tiposSelecionados.push(new tipo(null, 1));
  }

  selectedTipo() {
    this.tiposLista = this.tipos;
    for (var i = 0; i < this.tiposSelecionados.length; i++) {
      this.tiposLista.splice(this.tiposLista.indexOf(this.tiposSelecionados[i].objetoTipo), 1)
    }
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
