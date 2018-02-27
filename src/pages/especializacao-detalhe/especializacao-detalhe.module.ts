import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EspecializacaoDetalhePage } from './especializacao-detalhe';

@NgModule({
  declarations: [
    EspecializacaoDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(EspecializacaoDetalhePage),
  ],
})
export class EspecializacaoDetalhePageModule {}
