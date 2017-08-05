import { BaseClass } from '../../classes/classes/classe';
import { Idioma } from '../../classes/idioma';
import { Armadura } from '../../classes/armadura/armadura';
import { Weapon } from '../../classes/weapon/weapon';
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
import { Personagem } from '../../classes/personagem';
import { Magia } from '../../classes/magia/magia';
import { Item } from '../../classes/item';

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
            'cobre	INTEGER,'+
            'prata	INTEGER,'+
            'ouro	INTEGER,'+
            'esmeralda	INTEGER,'+
            'platina	INTEGER,'+
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
                              var query = 'CREATE TABLE IF NOT EXISTS personagem_idiomas (' +
                                '_id_personagem	INTEGER,' +
                                '_id_idioma INTEGER,' +
                                'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),'+
                                'FOREIGN KEY(_id_idioma) REFERENCES idioma(_id)'+
                              ');';
                              console.log(query);
                              tx.executeSql(query, null, function (tx, res) {
                                  var query = 'CREATE TABLE IF NOT EXISTS personagem_classes (' +
                                    '_id_personagem	INTEGER,' +
                                    'classe INTEGER,' +
                                    'nivel INTEGER,' +
                                    'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id)'+
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

  add(personagem : Personagem) : Promise<any>{
    let service = this;
    let params = this.personagemToParams(personagem);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO personagem(nome, descricao, _id_Raca, _id_Classe, forca, destreza, constituicao, inteligencia, sabedoria, carisma, xpAtual, cobre, prata, ouro, esmeralda, platina) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?  );'
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql(query, params, function (tx, res) {
            service.addItemPersonagem(tx, res.insertId, personagem.$inventario).then(function(){
              service.addMagiaPersonagem(tx, res.insertId, personagem.$magias).then(function(){
                service.addIdiomaPersonagem(tx, res.insertId, personagem.$idiomas).then(function(){
                  service.addClassePersonagem(tx, res.insertId, personagem.$classe).then(function(){
                    resolve();
                  },function(err){
                    reject(err);
                  });
                },function(err){
                  reject(err);
                })
              },function(err){
                reject(err);
              })
            },function(err){
              reject(err);
            })     
          }, function (tx, err) {
            console.error(err);
            reject(err);
          });
        });
      });
    });
  }

  private addItemPersonagem (tx : SQLiteTransaction, personagemId : number, itens: Array<Item> ){
    return new Promise((resolve, reject) => {
      for(var i = 0; i < itens.length; i++){
        if(itens[i] instanceof Weapon){
          let queryItem = 'INSERT INTO inventarioArma(_id_personagem, _id_arma) VALUES ( ?, ? );';
          let paramsItem = [personagemId, itens[i].$id];
          tx.executeSql(queryItem, paramsItem, function (tx, resultSet) {
            if(i == itens.length){
              resolve();
            }
          }, function (tx, err) {
            reject(err);
            console.error(err);
          });
        }else if ( itens[i] instanceof Armadura){
          let queryItem = 'INSERT INTO inventarioArmadura(_id_personagem, _id_armadura) VALUES ( ?, ? );';
          let paramsItem = [personagemId, itens[i].$id];
          tx.executeSql(queryItem, paramsItem, function (tx, resultSet) {
            if(i == itens.length){
              resolve();
            }
          }, function (tx, err) {
            reject(err);
            console.error(err);
          });
        }else {
          let queryItem = 'INSERT INTO inventarioItem(_id_personagem, _id_item) VALUES ( ?, ? );';
          let paramsItem = [personagemId, itens[i].$id];
          tx.executeSql(queryItem, paramsItem, function (tx, resultSet) {
            if(i == itens.length){
              resolve();
            }
          }, function (tx, err) {
            reject(err);
          });
        }
      }
      if(itens.length == 0){
        resolve();
      }
    });
  }

  private addMagiaPersonagem (tx : SQLiteTransaction, personagemId : number, magias: Array<Magia>) : Promise<any>{
    return new Promise((resolve, reject) => {
      for(var i = 0; i < magias.length; i++){
        let queryItem = 'INSERT INTO personagem_magias(_id_personagem, _id_magia) VALUES ( ?, ? );';
        let paramsItem = [personagemId, magias[i].$id];
        tx.executeSql(queryItem, paramsItem, function (tx, resultSet) {
          if(i == magias.length){
            resolve();
          }
        }, function (tx, err) {
          reject(err);
          console.error(err);
        });
      }
      if(magias.length == 0){
        resolve();
      }
    });
  }

  private addIdiomaPersonagem (tx : SQLiteTransaction, personagemId : number, idiomas: Array<Idioma>) : Promise<any>{
    return new Promise((resolve, reject) => {
      for(var i = 0; i < idiomas.length; i++){
        let queryItem = 'INSERT INTO personagem_idiomas(_id_personagem, _id_idioma) VALUES ( ?, ? );';
        let paramsItem = [personagemId, idiomas[i].$id];
        tx.executeSql(queryItem, paramsItem, function (tx, resultSet) {
          if(i == idiomas.length){
            resolve();
          }
        }, function (tx, err) {
          reject(err);
          console.error(err);
        });
      }
      if(idiomas.length == 0){
        resolve();
      }
    });
  }

  private addClassePersonagem (tx : SQLiteTransaction, personagemId : number, classe: BaseClass) : Promise<any>{
    return new Promise((resolve, reject) => {
        let queryItem = 'INSERT INTO personagem_classes(_id_personagem, classe, nivel) VALUES ( ?, ?, ? );';
        let paramsItem = [personagemId, classe.$classe, classe.$nivel];
        tx.executeSql(queryItem, paramsItem, function (tx, resultSet) {
            resolve();
        }, function (tx, err) {
          reject(err);
          console.error(err);
        });
    });
  }

  public personagemToParams(personagem: Personagem): Array<any>{
    let returnArray = [];

    returnArray.push(personagem.$nome);
    returnArray.push(personagem.$descricao);
    returnArray.push(personagem.$raca.$id);
    returnArray.push(personagem.$atributos.$forca);
    returnArray.push(personagem.$atributos.$destreza);
    returnArray.push(personagem.$atributos.$constituicao);
    returnArray.push(personagem.$atributos.$inteligencia);
    returnArray.push(personagem.$atributos.$sabedoria);
    returnArray.push(personagem.$atributos.$carisma);
    returnArray.push(personagem.$xpAtual);
    returnArray.push(personagem.$bolsaMoedas.$cobre);
    returnArray.push(personagem.$bolsaMoedas.$prata);
    returnArray.push(personagem.$bolsaMoedas.$ouro);
    returnArray.push(personagem.$bolsaMoedas.$esmeralda);
    returnArray.push(personagem.$bolsaMoedas.$platina);
    
    return returnArray;
  }

}
