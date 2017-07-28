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
import { WeaponDetalhePage } from "../pages/weapon-detalhe/weapon-detalhe";
import { DiceIconPipe } from '../pipes/dice-icon/dice-icon';
import { TipoArmaPipe } from '../pipes/tipo-arma/tipo-arma';
import { MoneyConventerPipe } from '../pipes/money-conventer/money-conventer';
import { ArmorDetalhePage } from "../pages/armor-detalhe/armor-detalhe";
import { ItemComumProvider } from '../providers/item-comum/item-comum';
import { ItemComumDetalhePage } from "../pages/item-comum-detalhe/item-comum-detalhe";
import { ItemComumPage } from "../pages/item-comum/item-comum";
import { AddItemComumPage } from "../pages/add-item-comum/add-item-comum";
import { RacaListPage } from "../pages/raca-list/raca-list";
import { RacaProvider } from '../providers/raca/raca';
import { IdiomaProvider } from '../providers/idioma/idioma';
import { IdiomaListPage } from "../pages/idioma-list/idioma-list";

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
    MagiaFilterPipe,
    WeaponDetalhePage,
    DiceIconPipe,
    TipoArmaPipe,
    MoneyConventerPipe,
    ArmorDetalhePage,
    ItemComumDetalhePage,
    ItemComumPage,
    AddItemComumPage,
    RacaListPage,
    IdiomaListPage
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
    AddMagiaPage,
    WeaponDetalhePage,
    ArmorDetalhePage,
    ItemComumDetalhePage,
    ItemComumPage,
    AddItemComumPage,
    RacaListPage,
    IdiomaListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},SplashScreen, StatusBar, SQLite, SqlCapsuleProvider, ItemComumProvider, RacaProvider, IdiomaProvider]
})
export class AppModule {}
