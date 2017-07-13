import { NgModule } from '@angular/core';
import { IonicPageModule, AlertController } from 'ionic-angular';
import { AddTipoMagiaPage } from './add-tipo-magia';

@NgModule({
  declarations: [
    AddTipoMagiaPage,
    AlertController
  ],
  imports: [
    IonicPageModule.forChild(AddTipoMagiaPage),
  ],
  exports: [
    AddTipoMagiaPage
  ]
})
export class AddTipoMagiaPageModule {}
