import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SplashScreen  } from '@ionic-native/splash-screen';
import { StatusBar  } from '@ionic-native/status-bar';
import { SQLite} from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
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

import { MagiasPage } from '../pages/magias/magias';
import { TipoMagiasPage } from '../pages/tipo-magias/tipo-magias';
import { MagiaDetalhePage } from '../pages/magia-detalhe/magia-detalhe';
import { SqlCapsuleProvider } from '../providers/test/test';

@NgModule({
  declarations: [
    MyApp,
    BlacksmithPage,
    CalculadoraAtributosPage,
    CalculadoraClassePage,
    WeaponsPage,
    ArmorsPage,
    AddWeaponPage,
    AddArmorPage,
    MagiasPage,
    TipoMagiasPage,
    MagiaDetalhePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),  
    IonicStorageModule.forRoot()
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
    AddArmorPage,
    MagiasPage,
    TipoMagiasPage,
    MagiaDetalhePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},SplashScreen, StatusBar, SQLite, SqlCapsuleProvider]
})
export class AppModule {}
