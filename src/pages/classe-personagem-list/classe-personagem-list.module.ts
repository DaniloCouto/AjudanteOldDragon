import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassePersonagemListPage } from './classe-personagem-list';

@NgModule({
  declarations: [
    ClassePersonagemListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassePersonagemListPage),
  ],
})
export class ClassePersonagemListPageModule {}
