import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeaponDetalhePage } from './weapon-detalhe';

@NgModule({
  declarations: [
    WeaponDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(WeaponDetalhePage),
  ],
  exports: [
    WeaponDetalhePage
  ]
})
export class WeaponDetalhePageModule {}
