import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RacaDetalhePage } from './raca-detalhe';

@NgModule({
  declarations: [
    RacaDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(RacaDetalhePage),
  ],
  exports: [
    RacaDetalhePage
  ]
})
export class RacaDetalhePageModule {}
