import {WeaponsService} from '../weapons-service/weapons-service';
import {ItemComumProvider} from '../item-comum/item-comum';
import { RacaIdiomaProvider } from '../raca-idioma/raca-idioma';
import { SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import {SqlCapsuleProvider} from '../sql-capsule/sql-capsule';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ArmorsService } from "../armors-service/armors-service";
import { MagiaService } from "../magia-service/magia-service";

/*
  Generated class for the PersonagemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PersonagemProvider {

  constructor(private platform: Platform, private sqlCapsule: SqlCapsuleProvider, racaProvider : RacaIdiomaProvider, itemProvider: ItemComumProvider, armasProvider: WeaponsService, armaduraProvider : ArmorsService, magiaProvider: MagiaService) {
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db : SQLiteObject) {
        db.transaction(function (tx : SQLiteTransaction) {
          var query = 'CREATE TABLE IF NOT EXISTS personagem (' +
            '_id	INTEGER,' +
            'nome	TEXT,' +
            'descricao	TEXT,' +
            '_id_Raca	INTEGER,' +
            '_id_Classe	INTEGER,' +
            'forca	INTEGER,' +
            'destreza	INTEGER,' +
            'constituicao	INTEGER,' +
            'inteligencia	INTEGER,' +
            'sabedoria	INTEGER,' +
            'carisma	INTEGER,' +
            'xpAtual	INTEGER,'+
            'FOREIGN KEY(_id_Raca) REFERENCES raca(_id),'+
            'PRIMARY KEY(_id)' +
          ');';
          console.log(query);
          tx.executeSql(query, null, function (tx, res) {
            var query = 'CREATE TABLE IF NOT EXISTS inventarioItem (' +
              '_id_personagem	INTEGER,' +
              '_id_item	INTEGER,' +
              'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),'+
              'FOREIGN KEY(_id_item) REFERENCES item(_id)'+
            ');';
            console.log(query);
            tx.executeSql(query, null, function (tx, res) {
                var query = 'CREATE TABLE IF NOT EXISTS inventarioArma (' +
                  '_id_personagem	INTEGER,' +
                  '_id_arma	INTEGER,' +
                  'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),'+
                  'FOREIGN KEY(_id_arma) REFERENCES weapons(_id)'+
                ');';
                console.log(query);
                tx.executeSql(query, null, function (tx, res) {
                    var query = 'CREATE TABLE IF NOT EXISTS inventarioArmadura (' +
                      '_id_personagem	INTEGER,' +
                      '_id_armadura	INTEGER,' +
                      'equipado	INTEGER,' +
                      'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),'+
                      'FOREIGN KEY(_id_armadura) REFERENCES armors(_id)'+
                    ');';
                    console.log(query);
                    tx.executeSql(query, null, function (tx, res) {
                        var query = 'CREATE TABLE IF NOT EXISTS personagem_magias (' +
                          '_id_personagem	INTEGER,' +
                          '_id_magia INTEGER,' +
                          'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),'+
                          'FOREIGN KEY(_id_magia) REFERENCES magia(_id)'+
                        ');';
                        console.log(query);
                        tx.executeSql(query, null, function (tx, res) {
                            
                        }, function (tx, err) {
                          console.error(err);
                        });
                    }, function (tx, err) {
                      console.error(err);
                    });
                }, function (tx, err) {
                  console.error(err);
                });
            }, function (tx, err) {
              console.error(err);
            });
          }, function (tx, err) {
            console.error(err);
          });
        });
      }, function (err) {
        console.error(err);
      })
    });
  }

}
