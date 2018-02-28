import { PersonagemInventarioPage } from '../pages/personagem-inventario/personagem-inventario';
import { PersonagemGrimorioPage } from '../pages/personagem-grimorio/personagem-grimorio';
import { PersonagemPage } from '../pages/personagem/personagem';
import { PersonagemDetalhePage } from '../pages/personagem-detalhe/personagem-detalhe';
import { AddMagiaPage } from '../pages/add-magia/add-magia';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SplashScreen  } from '@ionic-native/splash-screen';
import { StatusBar  } from '@ionic-native/status-bar';
import { SQLite} from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
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
import { RacaIdiomaProvider } from '../providers/raca-idioma/raca-idioma';
import { IdiomaListPage } from "../pages/idioma-list/idioma-list";
import { IdiomaAddPage } from "../pages/idioma-add/idioma-add";
import { IdiomaDetalhePage } from "../pages/idioma-detalhe/idioma-detalhe";
import { RacaAddPage } from "../pages/raca-add/raca-add";
import { HabilidadeRacialAddPage } from "../pages/habilidade-racial-add/habilidade-racial-add";
import { RacaDetalhePageModule } from "../pages/raca-detalhe/raca-detalhe.module";
import { PersonagemProvider } from '../providers/personagem/personagem';
import { WeaponsService } from '../providers/weapons-service/weapons-service';
import { ArmorsService } from '../providers/armors-service/armors-service';
import { MagiaService } from '../providers/magia-service/magia-service';
import { PersonagemListPageModule } from "../pages/personagem-list/personagem-list.module";
import { SQLiteMock } from '@ionic-native-mocks/sqlite';
import { AdMobFree } from '@ionic-native/admob-free';
import { RapidDiceRollsPage } from '../pages/rapid-dice-rolls/rapid-dice-rolls';
import { EspecializacaoListPage } from '../pages/especializacao-list/especializacao-list';
import { EspecializacaoDetalhePage } from '../pages/especializacao-detalhe/especializacao-detalhe';
import { EspecializacaoAddPage } from '../pages/especializacao-add/especializacao-add';
import { IdiomaPersonagemListPage } from '../pages/idioma-personagem-list/idioma-personagem-list';
import { ClassePipe } from '../pipes/classe/classe';
import { EnumPipe } from '../pipes/enum/enum';
import { EspecializacaoPersonagemListPage } from '../pages/especializacao-personagem-list/especializacao-personagem-list';
import { ClassePersonagemListPage } from '../pages/classe-personagem-list/classe-personagem-list';
import { EspecializacaoProvider } from '../providers/especializacao/especializacao';
import { PipesModule } from '../pipes/pipes.module';


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
    IdiomaListPage,
    IdiomaAddPage,
    IdiomaDetalhePage,
    RacaAddPage,
    HabilidadeRacialAddPage,
    PersonagemPage,
    PersonagemDetalhePage,
    PersonagemGrimorioPage,
    PersonagemInventarioPage,
    RapidDiceRollsPage,
    IdiomaPersonagemListPage,
    EspecializacaoListPage,
    EspecializacaoDetalhePage,
    EspecializacaoAddPage,
    EspecializacaoPersonagemListPage,
    ClassePersonagemListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),  
    IonicStorageModule.forRoot(),
    RacaDetalhePageModule,
    PersonagemListPageModule,
    PipesModule
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
    IdiomaListPage,
    IdiomaAddPage,
    IdiomaDetalhePage,
    RacaAddPage,
    HabilidadeRacialAddPage,
    PersonagemPage,
    PersonagemDetalhePage,
    PersonagemGrimorioPage,
    PersonagemInventarioPage,
    RapidDiceRollsPage,
    IdiomaPersonagemListPage,
    EspecializacaoListPage,
    EspecializacaoDetalhePage,
    EspecializacaoAddPage,
    EspecializacaoPersonagemListPage,
    ClassePersonagemListPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    AdMobFree,
    SplashScreen,
    StatusBar, 
    SqlCapsuleProvider, 
    ItemComumProvider, RacaIdiomaProvider, PersonagemProvider, WeaponsService, ArmorsService, MagiaService,ClassePipe,EspecializacaoProvider, EnumPipe]
})
export class AppModule {}
