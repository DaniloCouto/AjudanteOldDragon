import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemComumDetalhePage } from './item-comum-detalhe';

@NgModule({
  declarations: [
    ItemComumDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemComumDetalhePage),
  ],
  exports: [
    ItemComumDetalhePage
  ]
})
export class ItemComumDetalhePageModule {}
