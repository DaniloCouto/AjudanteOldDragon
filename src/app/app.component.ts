import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';

import { SplashScreen  } from '@ionic-native/splash-screen';
import { StatusBar  } from '@ionic-native/status-bar';
import {BlacksmithPage} from '../pages/blacksmith/blacksmith';
import {CalculadoraAtributosPage} from '../pages/calculadora-atributos/calculadora-atributos';
import {CalculadoraClassePage} from '../pages/calculadora-classe/calculadora-classe';
import {TipoMagiasPage} from '../pages/tipo-magias/tipo-magias';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = CalculadoraClassePage;
  paginas: Array<any> = [
    {texto: 'Atributos', componente: CalculadoraAtributosPage},
    {texto: 'Classes', componente: CalculadoraClassePage},
    {texto: 'Ferreiro', componente: BlacksmithPage},
    {texto: 'Biblioteca', componente: TipoMagiasPage}
  ]

  constructor(platform: Platform, private menu: MenuController, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      setTimeout(function() {
        splashScreen.hide();
      }, 1000);
      statusBar.styleDefault();
    });
  }

  abrirPagina(pagina) {
    this.rootPage = pagina.componente;
    this.menu.close();
  }

}
