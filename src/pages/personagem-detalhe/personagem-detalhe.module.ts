import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemDetalhePage } from './personagem-detalhe';

@NgModule({
  declarations: [
    PersonagemDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemDetalhePage),
  ],
  exports: [
    PersonagemDetalhePage
  ]
})
export class PersonagemDetalhePageModule {}
