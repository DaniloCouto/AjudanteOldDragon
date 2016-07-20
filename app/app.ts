import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {CalculadoraAtributosPage} from './pages/calculadora-atributos/calculadora-atributos';


@Component({
  templateUrl: 'build/base.html'
})
export class MyApp {
  rootPage: any = CalculadoraAtributosPage;
  paginas: Array<any> = [
    {texto: 'Calculadora', componente: CalculadoraAtributosPage},
    {texto: 'Personagens', componente: HomePage},
  ]

  constructor(platform: Platform, private menu: MenuController) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  abrirPagina(pagina) {
    this.menu.close();
    this.rootPage = pagina.componente;
  }

}

ionicBootstrap(MyApp);
