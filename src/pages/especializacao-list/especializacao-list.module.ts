import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EspecializacaoListPage } from './especializacao-list';

@NgModule({
  declarations: [
    EspecializacaoListPage,
  ],
  imports: [
    IonicPageModule.forChild(EspecializacaoListPage),
  ],
})
export class EspecializacaoListPageModule {}
