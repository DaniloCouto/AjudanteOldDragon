import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArmorDetalhePage } from './armor-detalhe';

@NgModule({
  declarations: [
    ArmorDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(ArmorDetalhePage),
  ],
  exports: [
    ArmorDetalhePage
  ]
})
export class ArmorDetalhePageModule {}
