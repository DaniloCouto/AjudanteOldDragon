import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemInventarioPage } from './personagem-inventario';

@NgModule({
  declarations: [
    PersonagemInventarioPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemInventarioPage),
  ],
  exports: [
    PersonagemInventarioPage
  ]
})
export class PersonagemInventarioPageModule {}
