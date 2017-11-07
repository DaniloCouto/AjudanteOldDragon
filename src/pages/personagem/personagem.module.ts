import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemPage } from './personagem';
import { GeralPage } from '..\geral\geral';

@NgModule({
  declarations: [
    PersonagemPage,
    GeralPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemPage),
  ]
})
export class PersonagemPageModule {}
