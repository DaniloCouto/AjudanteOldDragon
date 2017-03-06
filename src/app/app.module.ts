import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {BlacksmithPage} from '../pages/blacksmith/blacksmith';
import {CalculadoraAtributosPage} from '../pages/calculadora-atributos/calculadora-atributos';
import {CalculadoraClassePage} from '../pages/calculadora-classe/calculadora-classe';
import { WeaponsPage } from '../pages/weapons/weapons';
import { ArmorsPage } from '../pages/armors/armors';

import { AddWeaponPage } from '../pages/add-weapon/add-weapon';
import { AddArmorPage } from '../pages/add-armor/add-armor';



@NgModule({
  declarations: [
    MyApp,
    BlacksmithPage,
    CalculadoraAtributosPage,
    CalculadoraClassePage,
    WeaponsPage,
    ArmorsPage,
    AddWeaponPage,
    AddArmorPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BlacksmithPage,
    CalculadoraAtributosPage,
    CalculadoraClassePage,
    WeaponsPage,
    ArmorsPage,
    AddWeaponPage,
    AddArmorPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},]
})
export class AppModule {}
