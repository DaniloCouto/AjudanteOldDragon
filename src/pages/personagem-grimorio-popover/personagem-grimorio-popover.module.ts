import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemGrimorioPopoverPage } from './personagem-grimorio-popover';

@NgModule({
  declarations: [
    PersonagemGrimorioPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemGrimorioPopoverPage),
  ],
})
export class PersonagemGrimorioPopoverPageModule {}
