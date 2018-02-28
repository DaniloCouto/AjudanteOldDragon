import { RacaListPage } from '../pages/raca-list/raca-list';
import { Page } from 'ionic-angular/navigation/nav-util';
import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BlacksmithPage } from '../pages/blacksmith/blacksmith';
import { CalculadoraAtributosPage } from '../pages/calculadora-atributos/calculadora-atributos';
import { CalculadoraClassePage } from '../pages/calculadora-classe/calculadora-classe';
import { TipoMagiasPage } from '../pages/tipo-magias/tipo-magias';
import { IdiomaListPage } from "../pages/idioma-list/idioma-list";
import { PersonagemListPage } from "../pages/personagem-list/personagem-list";
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { EspecializacaoListPage } from '../pages/especializacao-list/especializacao-list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: Page;
  paginas: Array<any> = [
    { texto: 'Atributos', componente: CalculadoraAtributosPage },
    { texto: 'Classes', componente: CalculadoraClassePage },
    { texto: 'Loja', componente: BlacksmithPage },
    { texto: 'Biblioteca', componente: TipoMagiasPage },
    { texto: 'Idiomas', componente: IdiomaListPage },
    { texto: 'Raças', componente: RacaListPage },
    { texto: 'Especializações', componente: EspecializacaoListPage },
    { texto: 'Personagens', componente: PersonagemListPage }
  ]

  constructor(platform: Platform, private menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen, private admobFree: AdMobFree) {
    this.rootPage = CalculadoraAtributosPage;
    platform.ready().then(() => {
      setTimeout(function () {
        splashScreen.hide();
      }, 1000);
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#000000');
      this.showAdmobBannerAds();
    });
  }

  showAdmobBannerAds() {
    const bannerConfig: AdMobFreeBannerConfig = {
      isTesting: true,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {})
      .catch(e => console.log(e));
  }

  abrirPagina(pagina) {
    this.rootPage = pagina.componente;
    this.menu.close();
  }

}
