import { ɵELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { BaseRaca } from './base-raca';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SqlCapsuleProvider } from "../sql-capsule/sql-capsule";
import { SQLiteObject, SQLiteTransaction } from "@ionic-native/sqlite";
import { HabilidadeRacial, Raca } from '../../classes/raca';
import { IdiomaProvider } from "../idioma/idioma";
import { Idioma } from "../../classes/idioma";

/*
  Generated class for the RacaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RacaProvider {
  sqlCapsule: SqlCapsuleProvider;
  
  constructor(private platform: Platform, private $sqlCapsule: SqlCapsuleProvider) {
    this.sqlCapsule = $sqlCapsule;
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db : SQLiteObject) {
        db.transaction(function (tx : SQLiteTransaction) {
          var query = 'CREATE TABLE IF NOT EXISTS raca (' +
            '_id	INTEGER,' +
            'nome	TEXT,' +
            'descricao	TEXT,' +
            'altura	INTEGER,' +
            'peso	INTEGER,' +
            'classeDeArmadura	INTEGER,' +
            'bonusDeAtaque	INTEGER,'+
            'movimentacaoBase	INTEGER,'+
            '_id_idioma	INTEGER,'+
            'FOREIGN KEY(_id_idioma) REFERENCES idioma(_id),'+
            'PRIMARY KEY(_id)' +
            ');';
          console.log(query)
          tx.executeSql(query, null, function (tx, res) {
            var query = 'CREATE TABLE IF NOT EXISTS habilidadeRacial (' +
              '_id	INTEGER,' +
              '_id_raca	INTEGER,' +
              'nome	TEXT,' +
              'descricao TEXT,' +
              'FOREIGN KEY(_id_raca) REFERENCES raca(_id),'+
              'PRIMARY KEY(_id)' +
              ');';
            console.log(query)
            tx.executeSql(query, null, function (tx, res) {
                tx.executeSql('SELECT count(*) AS mycount FROM  raca;', [], function (tx, resultSet) {
                  if (resultSet.rows.item(0).mycount === 0) {
                    let idsTipoMagias = [];
                    let transaction = tx;
                    BaseRaca.BASE_RACA.forEach(function (raca:  Raca) {
                      let params = service.racaToArray(raca);
                      let query = 'INSERT INTO raca(nome, descricao, altura, peso, classeDeArmadura, bonusDeAtaque, movimentacaoBase, _id_idioma ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? );';
                      transaction.executeSql(query, params, function (tx, resultSet) {
                        let racaId = resultSet.insertId;
                        raca.$habilidades.forEach(function(habilidade){
                          let query = 'INSERT INTO habilidadeRacial(_id_raca, nome, descricao) VALUES ( ?, ?, ? );';
                          let params = [racaId, habilidade.$nome, habilidade.$descricao];
                          transaction.executeSql(query, params, function (tx, resultSet) {
                          }, function (tx, err) {
                            console.error(err);
                          });
                        })
                      }, function (tx, err) {
                        console.error(err);
                      });
                    });
                  }
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
  add(raca: Raca): Promise<any> {
    let params = this.racaToArray(raca);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO raca(nome, descricao, altura, peso, classeDeArmadura, bonusDeAtaque, movimentacaoBase, _id_idioma ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? );'
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, params, function (tx, res) {
            let racaId = res.insertId;
            for(var i = 0; i < raca.$habilidades.length; i++){
              let query = 'INSERT INTO habilidadeRacial(_id_raca, nome, descricao) VALUES ( ?, ?, ? );';
              let params = [racaId, raca.$habilidades[i].$nome, raca.$habilidades[i].$descricao];
              tx.executeSql(query, params, function (tx, resultSet) {
                if(i+1 === raca.$habilidades.length){
                  resolve();
                }
              }, function (tx, err) {
                reject(err);
                console.error(err);
              });
            }            
          }, function (tx, err) {
            console.error(err);
            reject(err);
          });
        });
      });
    });
  }
  update(raca: Raca): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx) {
          let promiseArray = [];
          promiseArray.push(tx.executeSql('DELETE FROM habilidadeRacial WHERE _id_raca = ?;', [raca.$id]));
          for(var i = 0; i < raca.$habilidades.length; i++){
            promiseArray.push(tx.executeSql('INSERT INTO habilidadeRacial(_id_raca, nome, descricao) VALUES ( ?, ?, ? );', [raca.$id, raca.$habilidades[i].$nome, raca.$habilidades[i].$descricao]));
          }
          Promise.all(promiseArray).then(function(){
            let arrayParams = this.racaToArray(raca);
            arrayParams.push(raca.$id);
            let query = 'UPDATE item SET nome = ? , descricao = ?, altura = ? , peso = ?, classeDeArmadura = ?, bonusDeAtaque = ?, movimentacaoBase = ?, _id_idioma = ?  WHERE _id = ?;';
            tx.executeSql(query, arrayParams, function (tx, res) {
              resolve(res);
            }, function (tx, err) {
              console.error(err);
              reject(err);
            });
          },function(error){
            console.error(error);
            reject(error);
          })
        });
      })
    });
  }
  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql('DELETE FROM habilidadeRacial WHERE _id_raca = ?;', [id], function (tx, res) {
            tx.executeSql('DELETE FROM raca WHERE _id = ?;', [id], function (tx, res) {
              resolve(res);
            }, function (tx, err) {
              console.error(err);
              reject(err);
            });
          }, function (tx, err) {
            console.error(err);
            reject(err);
          });
        }).then(function (sucesso) {
        }, function (erro) {
          console.error('Transaction Success Callback',erro);
          reject(erro);
        });;
      })
    });
  }
  getAll(): Promise<Array<Raca>> {
    let service = this;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql('SELECT * FROM  raca;', [], function (tx, racas) {
            let retorno = [];
            for(let i = 0; i < racas.rows.length; i++){
              let tempRaca = racas.rows.item(i);
              tx.executeSql('SELECT * FROM  habilidadeRacial WHERE _id_raca = ?;', [tempRaca._id], function (tx, habilidades) {
                let arrayHabilidades = [];
                for(let j = 0; j < habilidades.rows.length; j++){
                  let tempHabilidade = habilidades.rows.item(j);
                  arrayHabilidades.push(
                    new HabilidadeRacial(
                      tempHabilidade._id,
                      tempHabilidade.nome,
                      tempHabilidade.descricao
                    )
                  )
                }
                console.log(tempRaca,i,racas.rows.length,racas.rows);
                tx.executeSql('SELECT * FROM  idiomas WHERE _id = ?;', [tempRaca._id], function (tx, idioma) {
                  if(idioma.rows.length){
                    retorno.push(
                      new Raca(
                        tempRaca._id,
                        tempRaca.nome,
                        tempRaca.descricao,
                        tempRaca.altura,
                        tempRaca.peso,
                        tempRaca.classeDeArmadura,
                        tempRaca.bonusDeAtaque,
                        tempRaca.movimentacaoBase,
                        arrayHabilidades,
                        new Idioma(idioma.rows.item(0)._id,idioma.rows.item(0).nome,idioma.rows.item(0).descricao)
                      )
                    )
                    if(i+1 === racas.rows.length){
                      resolve(retorno);
                    }
                  }else{
                    resolve(null);
                  }
                }, function (tx, err) {
                  console.error(err);
                  reject();
                });
              },function(){
                reject()
              })
            }
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        },function(err){
          console.error(err);
          reject();
        });
      },function(err){
          console.error(err);
          reject();
        })
    });
  }
  getRaca(id : number): Promise<Raca> {
    let service = this;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql('SELECT * FROM  raca WHERE _id = ?;', [id], function (tx, racas) {
            let retorno = [];
            if(racas.rows.length){
              let tempRaca = racas.rows.item(0);
              tx.executeSql('SELECT * FROM  habilidadeRacial WHERE _id_raca = ?;', [id], function (tx, habilidades) {
                let arrayHabilidades = [];
                for(var i = 0; i < habilidades.rows.length; i++){
                  arrayHabilidades.push(
                    new HabilidadeRacial(
                      racas.rows.item(i)._id,
                      racas.rows.item(i).nome,
                      racas.rows.item(i).descricao
                    )
                  )
                }
                tx.executeSql('SELECT * FROM  idiomas WHERE _id = ?;', [tempRaca._id], function (tx, idioma) {
                  if(idioma.rows.length){
                    resolve(
                      new Raca(
                        tempRaca._id,
                        tempRaca.nome,
                        tempRaca.descricao,
                        tempRaca.altura,
                        tempRaca.peso,
                        tempRaca.classeDeArmadura,
                        tempRaca.bonusDeAtaque,
                        tempRaca.movimentacaoBase,
                        arrayHabilidades,
                        new Idioma(idioma.rows.item(0)._id,idioma.rows.item(0).nome,idioma.rows.item(0).descricao)
                      )
                    )
                  }else{
                    resolve(null);
                  }
                }, function (tx, err) {
                  console.error(err);
                  reject();
                });
              },function(){
                reject()
              })
            }else{
              resolve(null);
            }
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        },function(err){
          console.error(err);
          reject();
        });
      },function(err){
          console.error(err);
          reject();
        })
    });
  }

  getCountRacasComIdiomas(id_idioma : number): Promise<number> {
    let service = this;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql('SELECT count(*) AS count FROM  raca WHERE _id_idioma = ?;', [id_idioma], function (tx, resultSet) {
            resolve(resultSet.rows.item(0).count);
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        },function(err){
          console.error(err);
          reject();
        });
      },function(err){
          console.error(err);
          reject();
        })
    });
  }
  
  private racaToArray(raca : Raca): Array<any>{
    let array = [];
    array.push(raca.$nome);
    array.push(raca.$descricao);
    array.push(raca.$altura);
    array.push(raca.$peso);
    array.push(raca.$classeDeArmadura);
    array.push(raca.$bonusDeAtaque);
    array.push(raca.$movimentacaoBase);
    array.push(raca.$idioma.$id);
    
    return array;
      
  }
}
