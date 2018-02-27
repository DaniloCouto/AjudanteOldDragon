import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdiomaPersonagemListPage } from './idioma-personagem-list';

@NgModule({
  declarations: [
    IdiomaPersonagemListPage,
  ],
  imports: [
    IonicPageModule.forChild(IdiomaPersonagemListPage),
  ],
})
export class IdiomaPersonagemListPageModule {}
