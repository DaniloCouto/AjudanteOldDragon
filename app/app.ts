import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {BlacksmithPage} from './pages/blacksmith/blacksmith';
import {CalculadoraAtributosPage} from './pages/calculadora-atributos/calculadora-atributos';


@Component({
  templateUrl: 'build/base.html'
})
export class MyApp {
  rootPage: any = BlacksmithPage;
  paginas: Array<any> = [
    {texto: 'Calculadora', componente: CalculadoraAtributosPage},
    {texto: 'Ferreiro', componente: BlacksmithPage},
  ]

  constructor(platform: Platform, private menu: MenuController) {
    platform.ready().then(() => {
      setTimeout(function() {
        Splashscreen.hide();
      }, 1000);
      StatusBar.styleDefault();
    });
  }

  abrirPagina(pagina) {
    this.rootPage = pagina.componente;
    this.menu.close();
  }

}

ionicBootstrap(MyApp);
