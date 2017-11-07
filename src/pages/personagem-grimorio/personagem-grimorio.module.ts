import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemGrimorioPage } from './personagem-grimorio';

@NgModule({
  declarations: [
    PersonagemGrimorioPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemGrimorioPage),
  ],
  exports: [
    PersonagemGrimorioPage
  ]
})
export class PersonagemGrimorioPageModule {}
