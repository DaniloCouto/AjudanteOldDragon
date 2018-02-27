import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EspecializacaoPersonagemListPage } from './especializacao-personagem-list';

@NgModule({
  declarations: [
    EspecializacaoPersonagemListPage,
  ],
  imports: [
    IonicPageModule.forChild(EspecializacaoPersonagemListPage),
  ],
})
export class EspecializacaoPersonagemListPageModule {}
