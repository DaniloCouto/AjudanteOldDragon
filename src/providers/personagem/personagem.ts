import { BolsaMoedas } from '../../classes/bolsaMoedas';
import { Atributos } from '../../classes/atributos';
import { Ladino } from '../../classes/classes/ladino';
import { Clerigo } from '../../classes/classes/clerigo';
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
import { HomemDeArmas } from '../../classes/classes/homemdearmas';
import { Mago } from '../../classes/classes/mago';
import { Raca } from '../../classes/raca';

/*
  Generated class for the PersonagemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PersonagemProvider {

  constructor(private platform: Platform, private sqlCapsule: SqlCapsuleProvider,private racaProvider : RacaIdiomaProvider,private itemProvider: ItemComumProvider,private armasProvider: WeaponsService,private armaduraProvider : ArmorsService,private magiaProvider: MagiaService) {
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

  getAll() : Promise<Array<Personagem>>{
    let service = this;
    return new Promise((resolve, reject) => {
      let query = 'SELECT _id FROM personagem;'
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql(query, [], function (tx, res) {
            let promises : Array<Promise<Personagem>> = [];
            let retorno : Array<Personagem> = []
            if(res.rows.length){
              for(let i = 0; i < res.rows.length; i++){
                promises.push(service.get(tx, res.rows.item(i)._id));
              }
              Promise.all(promises).then(function(result : Array<Personagem>){
                resolve(result);
              },function(err){
                reject();
              })
            }
               
          }, function (tx, err) {
            console.error(err);
            reject(err);
          });
        });
      });
    });
  }

  get(tx : SQLiteTransaction, id : number, ) : Promise<Personagem>{
    let service = this;
    return new Promise((resolve,reject)=> {
      tx.executeSql("SELECT * FROM personagem WHERE _id = ?;", [id], function (tx, personagem) {
        let promises = [];
        if(personagem.rows.length){
          service.getItemPersonagem(tx, id).then(function(inventario : Array<Item>){
            service.getMagiaPersonagem(tx, id).then(function(magias : Array<Magia>){
              service.getIdiomaPersonagem(tx, id).then(function(idiomas : Array<Idioma>){
                service.getClassePersonagem(tx, id).then(function(classe : BaseClass){
                  service.racaProvider.getRaca(id).then(function(raca : Raca){
                    resolve(new Personagem(
                      personagem.rows.item(0)._id,
                      personagem.rows.item(0).nome,
                      personagem.rows.item(0).descricao,
                      raca,
                      classe,
                      idiomas,
                      new Atributos(
                        personagem.rows.item(0).forca,
                        personagem.rows.item(0).destreza,
                        personagem.rows.item(0).constituicao,
                        personagem.rows.item(0).inteligencia,
                        personagem.rows.item(0).sabedoria,
                        personagem.rows.item(0).carisma
                      ),
                      magias,
                      personagem.rows.item(0).xpAtual,
                      inventario,
                      new BolsaMoedas(
                        personagem.rows.item(0).cobre,
                        personagem.rows.item(0).prata,
                        personagem.rows.item(0).ouro,
                        personagem.rows.item(0).esmeralda,
                        personagem.rows.item(0).platina
                      )
                    ));
                  },function(err){
                    reject(err);
                  })
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
        }else{
          resolve(null);
        }
      }, function (tx, err) {
        console.error(err);
        reject(err);
      });
       
    })
  }

  private getItemPersonagem (tx : SQLiteTransaction, personagemId : number ) : Promise<Array<Item>>{
    let service = this;
    return new Promise((resolve, reject) => {
      let inventario : Array<Item> = [];
      let promisesItens : Array<Promise<Item>> = [];
      let promisesArmaduras : Array<Promise<Armadura>> = [];
      let promisesArmas : Array<Promise<Weapon>> = [];
      
      tx.executeSql( 'SELECT _id_arma FROM inventarioArma WHERE _id_personagem = ?;', [personagemId], function (tx, resultSet) {
        if(resultSet.rows.length){
          for(let i = 0; i < resultSet.rows.length; i++){
            promisesArmas.push(service.armasProvider.getArma(resultSet.rows.item(i)))
          }
        }
        tx.executeSql( 'SELECT _id_armadura, equipado FROM inventarioArmadura WHERE _id_personagem = ?;', [personagemId], function (tx, resultSet) {
          if(resultSet.rows.length){
            for(let i = 0; i < resultSet.rows.length; i++){
              promisesArmaduras.push(service.armaduraProvider.get(resultSet.rows.item(i)));
            }
          }
          tx.executeSql( 'SELECT _id_item FROM inventarioItem WHERE _id_personagem = ?;', [personagemId], function (tx, resultSet) {
            if(resultSet.rows.length){
              for(let i = 0; i < resultSet.rows.length; i++){
                promisesItens.push(service.itemProvider.get(resultSet.rows.item(i)));
              } 
            }
            Promise.all(promisesArmas).then(function(armas : Array<Weapon>){
              if(armas instanceof Array)
                inventario.concat(armas);
              Promise.all(promisesArmaduras).then(function(armaduras : Array<Armadura>){
                if(armaduras instanceof Array)
                  inventario.concat(armaduras);
                Promise.all(promisesItens).then(function(itens : Array<Item>){
                  if(itens instanceof Array)
                    inventario.concat(itens);
                  resolve(inventario);
                },function(){
                  reject();
                })
              },function(){
                reject();
              })
            },function(){
              reject();
            })
          }, function (tx, err) {
            reject(err);
            console.error(err);
          });
        }, function (tx, err) {
          reject(err);
          console.error(err);
        });
      }, function (tx, err) {
        reject(err);
        console.error(err);
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

  private getMagiaPersonagem (tx : SQLiteTransaction, personagemId : number) : Promise<Array<Magia>>{
    let service = this;
    return new Promise((resolve, reject) => {
        tx.executeSql('SELECT _id_magia FROM personagem_magias WHERE _id_personagem = ? ;', [personagemId], function (tx, resultSet) {
          let promise : Array<Promise<Magia>> = [];
          for( let i = 0 ; i < resultSet.rows.length; i++){
              promise.push(service.magiaProvider.getMagia(resultSet.rows.item(i)));
          }
          Promise.all(promise).then(function(magias : Array<Magia>){
            resolve(magias);
          },function(err){
            reject(err);
          })
        }, function (tx, err) {
          reject(err);
          console.error(err);
        });
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

  private getIdiomaPersonagem (tx : SQLiteTransaction, personagemId : number) : Promise<Array<Idioma>>{
    let service = this;
    return new Promise((resolve, reject) => {
      let promises : Array<Promise<Idioma>> = [];
      let retorno : Array<Idioma> = [];
      tx.executeSql('SELECT _id_idioma FROM personagem_idiomas WHERE _id_personagem = ?;', [personagemId], function (tx, resultSet) {
        for(let i = 0; i < resultSet.rows.length; i++){
          promises.push(service.racaProvider.getIdioma(resultSet.rows.item(i)._id_idioma))
        }
        Promise.all(promises).then(function(idiomas : Array<Idioma>){
          resolve(idiomas);
        },function(err){
          reject(err);
        })
      }, function (tx, err) {
        reject(err);
        console.error(err);
      });
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

  private getClassePersonagem (tx : SQLiteTransaction, personagemId : number) : Promise<BaseClass>{
    return new Promise((resolve, reject) => {
        tx.executeSql('SELECT classe, nivel FROM personagem_classes WHERE _id_personagem = ?;', [personagemId], function (tx, resultSet) {
          if(resultSet.rows.length){
            let classe = resultSet.rows.item(0).classe;
            let nivel = resultSet.rows.item(0).nivel;
            switch (classe) {
              case 0:
                  resolve(new Clerigo(nivel))
              case 1:
                  resolve(new HomemDeArmas(nivel))
              case 2:
                  resolve(new Mago(nivel))
              case 3:
                  resolve(new Ladino(nivel))
            }
          }else{
            resolve(null);
          }
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
