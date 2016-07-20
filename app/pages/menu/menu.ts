import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CalculadoraAtributosPage } from '../calculadora-atributos/calculadora-atributos';

/*
  Generated class for the MenuPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/menu/menu.html',
})
export class MenuPage {
  menuPage: any = CalculadoraAtributosPage;
  paginas: Array<any> = [
    {texto: 'Calculadora', componente: CalculadoraAtributosPage},
    {texto: 'Personagens', componente: HomePage},
  ]

  constructor(private nav: NavController, private menu: MenuController) {

  }

  abrirPagina(pagina) {
    this.menu.close();
    this.menuPage = pagina.componente;
  }

}
