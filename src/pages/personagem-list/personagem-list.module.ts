import { PersonagemFilterPipe } from '../../pipes/personagem-filter/personagem-filter';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemListPage } from './personagem-list';

@NgModule({
  declarations: [
    PersonagemListPage,
    PersonagemFilterPipe
  ],
  imports: [
    IonicPageModule.forChild(PersonagemListPage),
  ],
  exports: [
    PersonagemListPage
  ]
})
export class PersonagemListPageModule {}
