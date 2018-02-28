import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemGrimorioListPage } from './personagem-grimorio-list';

@NgModule({
  declarations: [
    PersonagemGrimorioListPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemGrimorioListPage),
  ],
})
export class PersonagemGrimorioListPageModule {}
