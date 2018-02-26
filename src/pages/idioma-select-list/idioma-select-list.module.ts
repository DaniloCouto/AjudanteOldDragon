import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdiomaSelectListPage } from './idioma-select-list';

@NgModule({
  declarations: [
    IdiomaSelectListPage,
  ],
  imports: [
    IonicPageModule.forChild(IdiomaSelectListPage),
  ],
})
export class IdiomaSelectListPageModule {}
