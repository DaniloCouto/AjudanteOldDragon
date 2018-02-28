import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { MagiaService } from '../../providers/magia-service/magia-service';
import { Magia } from '../../classes/magia/magia';

/**
 * Generated class for the PersonagemGrimorioListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personagem-grimorio-list',
  templateUrl: 'personagem-grimorio-list.html',
})
export class PersonagemGrimorioListPage {
  magias: Array<Magia>;

  idTipoMagiaFilter : number;
  nivelTipoFilter: number;
  nomeMagiaFilter: string;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private loadingCtrl: LoadingController, private magiaService: MagiaService) {
    var idTipos = this.navParams.get("idTipos");
    var favorito = this.navParams.get("favorito");
    this.idTipoMagiaFilter = idTipos.length ? idTipos[0] : null;
    let loading = this.loadingCtrl.create({
        content: 'Carregando Itens',
      });
    loading.present().then(()=>{
      if(favorito){
        this.magiaService.getTodasMagiaFavorita().then((result : Array<Magia>) => {
          this.magias = result;
          loading.dismiss();
        });
      }else if (idTipos.length > 0) {
        this.magiaService.getMagiaPorTipo(idTipos).then((result : Array<Magia>) => {
          this.magias = result;
          loading.dismiss();
        });
      } else {
        this.magiaService.getTodasMagia().then((result : Array<Magia>) => {
          this.magias = result;
          loading.dismiss();
        });
      }
    })
  }

  selectMagia(item : Magia){
    this.viewCtrl.dismiss({item : item});
  }

  dismiss(){
    this.viewCtrl.dismiss({item : null});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonagemGrimorioListPage');
  }

}
