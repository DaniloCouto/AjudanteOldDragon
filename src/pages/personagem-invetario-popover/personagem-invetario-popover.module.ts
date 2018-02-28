import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonagemInvetarioPopoverPage } from './personagem-invetario-popover';

@NgModule({
  declarations: [
    PersonagemInvetarioPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonagemInvetarioPopoverPage),
  ],
})
export class PersonagemInvetarioPopoverPageModule {}
