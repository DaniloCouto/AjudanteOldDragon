import { AddMagiaPage } from '../pages/add-magia/add-magia';
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
import { AddTipoMagiaPage } from '../pages/add-tipo-magia/add-tipo-magia';
import { MagiaDetalhePage } from '../pages/magia-detalhe/magia-detalhe';
import { SqlCapsuleProvider } from '../providers/sql-capsule/sql-capsule';
import { MedidaDeTempoPipe } from '../pipes/medida-de-tempo/medida-de-tempo';
import { DiceMagiaPipe } from '../pipes/dice-magia/dice-magia';
import { MagiaFilterPipe } from '../pipes/magia-filter/magia-filter';

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
    MagiaDetalhePage,
    AddTipoMagiaPage,
    MedidaDeTempoPipe,
    AddMagiaPage,
    DiceMagiaPipe,
    MagiaFilterPipe
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
    MagiaDetalhePage,
    AddTipoMagiaPage,
    AddMagiaPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},SplashScreen, StatusBar, SQLite, SqlCapsuleProvider]
})
export class AppModule {}
