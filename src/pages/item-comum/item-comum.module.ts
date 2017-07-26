import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemComumPage } from './item-comum';

@NgModule({
  declarations: [
    ItemComumPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemComumPage),
  ],
  exports: [
    ItemComumPage
  ]
})
export class ItemComumPageModule {}
