import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddItemComumPage } from './add-item-comum';

@NgModule({
  declarations: [
    AddItemComumPage,
  ],
  imports: [
    IonicPageModule.forChild(AddItemComumPage),
  ],
  exports: [
    AddItemComumPage
  ]
})
export class AddItemComumPageModule {}
