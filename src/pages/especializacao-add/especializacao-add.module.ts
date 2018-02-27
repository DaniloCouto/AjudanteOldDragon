import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EspecializacaoAddPage } from './especializacao-add';

@NgModule({
  declarations: [
    EspecializacaoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EspecializacaoAddPage),
  ],
})
export class EspecializacaoAddPageModule {}
