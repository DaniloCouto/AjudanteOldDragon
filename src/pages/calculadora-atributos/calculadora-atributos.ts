import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Atributos } from '../../classes/atributos';
import {Splashscreen} from 'ionic-native';

/*
  Generated class for the CalculadoraAtributosPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'calculadora-atributos.html',
})
export class CalculadoraAtributosPage {
  atributos: Atributos;
  atributosSecundarios: any = {
    forca: {
      ajuste: 0,
      semCarga: 0,
      cargaLeve: 0,
      cargaPesada: 0
    },
    destreza: {
      ajuste: 0,
      armadilhas: 0,
      furtividade_arrombar: 0,
      pungar: 0
    },
    constituicao: {
      ajuste: 0,
      chance_res: 0
    },
    inteligencia: {
      idiomas: 0,
      chance_aprender_magia: 0,
      primeiroCirculo: 0,
      segundoCirculo: 0,
      terceiroCirculo: 0,
    },
    sabedoria: {
      ajuste: 0,
      primeiroCirculo: 0,
      segundoCirculo: 0,
      terceiroCirculo: 0,
    },
    carisma: {
      ajusteReacao: 0,
      mortosVivosAfastados: 0,
      seguidores: 0
    }

  };

  constructor(private nav: NavController) {
    this.atributos = new Atributos(1, 1, 1, 1, 1, 1);
    this.init();
  }

  forcaChanged() {
    this.atributosSecundarios.forca.ajuste = this.atributos.$ajusteForca;
    this.atributosSecundarios.forca.semCarga = this.atributos.$linearSemCarga;
    this.atributosSecundarios.forca.cargaLeve = this.atributos.$linearCargaLeve;
    this.atributosSecundarios.forca.cargaPesada = this.atributos.$linearCargaPesada;
  }

  destrezaChanged() {
    this.atributosSecundarios.destreza.ajuste = this.atributos.$ajusteDestreza;
    this.atributosSecundarios.destreza.armadilhas = this.atributos.$armadilhas;
    this.atributosSecundarios.destreza.furtividade_arrombar = this.atributos.$furtividade_arrombar;
    this.atributosSecundarios.destreza.pungar = this.atributos.$pungar;
  }

  conChanged() {
    this.atributosSecundarios.constituicao.ajuste = this.atributos.$ajusteConstituicao;
    this.atributosSecundarios.constituicao.chance_res = this.atributos.$chance_res;
  }

  intChanged() {
    this.atributosSecundarios.inteligencia.idiomas = this.atributos.$idiomasAdicionais;
    this.atributosSecundarios.inteligencia.chance_aprender_magia = this.atributos.$chanceAprenderMagia;
    this.atributosSecundarios.inteligencia.primeiroCirculo = this.atributos.$intPrimeiroCirculo;
    this.atributosSecundarios.inteligencia.segundoCirculo = this.atributos.$intSegundoCirculo;
    this.atributosSecundarios.inteligencia.terceiroCirculo = this.atributos.$intTerceiroCirculo;
  }

  sabChanged() {
    this.atributosSecundarios.sabedoria.ajuste = this.atributos.$ajusteSabedoria;
    this.atributosSecundarios.sabedoria.primeiroCirculo = this.atributos.$sabPrimeiroCirculo;
    this.atributosSecundarios.sabedoria.segundoCirculo = this.atributos.$sabSegundoCirculo;
    this.atributosSecundarios.sabedoria.terceiroCirculo = this.atributos.$sabTerceiroCirculo;
  }

  carChanged() {
    this.atributosSecundarios.carisma.ajusteReacao = this.atributos.$ajusteReacao;
    this.atributosSecundarios.carisma.mortosVivosAfastados = this.atributos.$mortosVivosAfastados;
    this.atributosSecundarios.carisma.seguidores = this.atributos.$seguidores;
  }

  init() {
    this.forcaChanged();
    this.destrezaChanged();
    this.conChanged();
    this.intChanged();
    this.sabChanged();
    this.carChanged();
  }

}
