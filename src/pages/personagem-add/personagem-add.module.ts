import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemAddPage } from './personagem-add';

@NgModule({
  declarations: [
    PersonagemAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemAddPage),
  ],
})
export class PersonagemAddPageModule {}
