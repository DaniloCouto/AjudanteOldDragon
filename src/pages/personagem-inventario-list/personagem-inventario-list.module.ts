import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemInventarioListPage } from './personagem-inventario-list';

@NgModule({
  declarations: [
    PersonagemInventarioListPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemInventarioListPage),
  ],
})
export class PersonagemInventarioListPageModule {}
