import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemDetalheAjustesPage } from './personagem-detalhe-ajustes';

@NgModule({
  declarations: [
    PersonagemDetalheAjustesPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemDetalheAjustesPage),
  ],
})
export class PersonagemDetalheAjustesPageModule {}
