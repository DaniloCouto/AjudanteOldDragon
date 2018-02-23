import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RapidDiceRollsPage } from './rapid-dice-rolls';

@NgModule({
  declarations: [
    RapidDiceRollsPage,
  ],
  imports: [
    IonicPageModule.forChild(RapidDiceRollsPage),
  ],
})
export class RapidDiceRollsPageModule {}
