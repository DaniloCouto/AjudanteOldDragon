import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';
import { Magia } from '../../classes/magia/magia';
import { AlcanceMagia } from '../../classes/magia/alcanceMagia';
import { DuracaoMagia } from '../../classes/magia/duracaoMagia';
import { TipoMagia, TipoMagiaComNivel } from '../../classes/magia/tipoMagia';
import { BaseTipoMagia } from './base-tipoMagia';
import { BaseMagia } from './base-magia';
import { SqlCapsuleProvider } from '../sql-capsule/sql-capsule';
import 'rxjs/add/operator/map';

/*
  Generated class for the MagiaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MagiaService {

  private sqlCapsule: SqlCapsuleProvider;
  private _db;
  private _weapons: any;

  constructor(private platform: Platform, private $sqlCapsule: SqlCapsuleProvider) {
    this.sqlCapsule = $sqlCapsule;
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db : SQLiteObject) {
        db.transaction(function (tx : SQLiteTransaction) {
          var query = 'CREATE TABLE IF NOT EXISTS magia (' +
            '_id	INTEGER,' +
            'nome	TEXT NOT NULL,' +
            'descricao	TEXT,' +
            'alcanceBase	INTEGER NOT NULL,' +
            'nivelPorAlcance	INTEGER,' +
            'alcancePorNivel	INTEGER,' +
            'duracaoBase	INTEGER NOT NULL,' +
            'nivelPorDuracao	INTEGER,' +
            'duracaoPorNivel	INTEGER,' +
            'medidaDuracaoBase	INTEGER,' +
            'medidaDuracaoAdicional	INTEGER,' +
            'tipoDuracaoBase	INTEGER,' +
            'tipoDuracaoAdicional	INTEGER,' +
            'PRIMARY KEY(_id)' +
            ');';

          tx.executeSql(query, null, function (tx, res) {
            console.log('Query Executed', query);
            var query = 'CREATE TABLE IF NOT EXISTS tipoMagia (' +
              '_id	INTEGER,' +
              'nome	TEXT NOT NULL,' +
              'PRIMARY KEY(_id)' +
              ');';
            tx.executeSql(query, null, function (tx, res) {
              console.log('Query Executed', query);
              var query = 'CREATE TABLE IF NOT EXISTS tipoMagia_magia (' +
                '_id_tipoMagia	INTEGER,' +
                '_id_magia	INTEGER,' +
                'nivel	INTEGER,' +
                'FOREIGN KEY(_id_tipoMagia) REFERENCES tipoMagia(_id),' +
                'FOREIGN KEY(_id_magia) REFERENCES magia(_id)' +
                ');';
              tx.executeSql(query, null, function (tx, res) {
                console.log('Query Executed', query);
                tx.executeSql('SELECT count(*) AS mycount FROM  magia;', [], function (tx, resultSet) {
                  console.log('Count', resultSet.rows.item(0).mycount);
                  if (resultSet.rows.item(0).mycount === 0) {
                    let idsTipoMagias = [];
                    let transaction = tx;
                    BaseTipoMagia.BASE_TIPOMAGIA.forEach(function (tipoMagia) {
                      let params = service.tipoMagiaToArray(tipoMagia);
                      let query = 'INSERT INTO tipoMagia(nome) VALUES ( ? );';
                      transaction.executeSql(query, params, function (tx, resultSet) {
                        idsTipoMagias.push(resultSet.insertId);
                        if (tipoMagia.$nomeTipo === 'Arcana') {
                          BaseMagia.BASE_MAGIA_ARCANA.forEach(function (element) {
                            service.addMagiaPrivate(element, tx)
                          })
                        } else if (tipoMagia.$nomeTipo === 'Divina') {
                          BaseMagia.BASE_MAGIA_DIVINA.forEach(function (element) {
                            service.addMagiaPrivate(element, tx)
                          })
                        }
                        if (idsTipoMagias.length === 2) {
                          BaseMagia.BASE_MAGIA_ARCANA_DIVINA.forEach(function (element) {
                            service.addMagiaPrivate(element,  tx)
                          })
                        }
                      }, function (tx, err) {
                        console.error(err);
                      });
                    });
                  }
                }, function (tx, err) {
                  console.error(err);
                });
              }, function (tx, err) {
                console.log(err);
              });
            }, function (tx, err) {
              console.log(err);
            });
          }, function (tx, err) {
            console.log(err);
          });
        });
      }, function (err) {
        console.error(err);
      })
    });
  }

  getAllTipos(): Promise<Array<TipoMagia>> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM  tipoMagia;', [], function (tx, resultSet) {
            var retorno = []
            for(var i = 0; i < resultSet.rows.length; i++){
              retorno.push(new TipoMagia(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome))
            }
            resolve(retorno);
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }, function (tx, err) {
          reject();
        }, function (tx, succ) {
          reject();
        });
      })
    });
  }

  private getJustMagia(tx, tipos: Array<TipoMagiaComNivel>, id_magia: number){
    return new Promise((resolve, reject) => {
      tx.executeSql('SELECT * FROM magia WHERE _id = ?;', [id_magia], function (tx, resultSet) {
          resolve(new Magia(
            resultSet.rows.item(0)._id,
            tipos,
            new AlcanceMagia(
              resultSet.rows.item(0).alcanceBase,
              resultSet.rows.item(0).alcancePorNivel,
              resultSet.rows.item(0).nivelPorAlcance
            ),
            new DuracaoMagia(
              resultSet.rows.item(0).duracaoBase,
              resultSet.rows.item(0).medidaDuracaoBase,
              resultSet.rows.item(0).nivelPorDuracao,
              resultSet.rows.item(0).duracaoPorNivel,
              resultSet.rows.item(0).medidaDuracaoAdicional,
              resultSet.rows.item(0).tipoDuracaoBase,
              resultSet.rows.item(0).tipoDuracaoAdicional
            ),
            resultSet.rows.item(0).nome,
            resultSet.rows.item(0).descricao
          ));
      }, function (tx, err) {
        reject(err);
      })
    })
  }

  getMagiaPorTipo(idTipos: Array<Number>): Promise<Array<Magia>> {
    let servico = this;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia';
          var queryCompletion = ''
          if (idTipos.length >= 2) {
            var whereClause = ' WHERE (';
            for (var i = 0; i < idTipos.length; i++) {
              if (i + 1 === idTipos.length) {
                whereClause += '_id_tipoMagia = ?)';
              } else {
                whereClause += '_id_tipoMagia = ? OR ';
              }
            }
            var inClause = " AND tm._id_magia IN ( " +
              "SELECT _id_magia FROM tipoMagia_magia " +
              whereClause +
              "GROUP BY _id_magia " +
              "HAVING COUNT(*) >= " + idTipos.length +
              ")";
            queryCompletion = whereClause + inClause;
          } else {
            whereClause = ' WHERE (_id_tipoMagia = ?)';
            queryCompletion = whereClause;
          }
          query += queryCompletion;
          tx.executeSql(query, idTipos, function (tx: SQLiteTransaction, tiposMagia) {
            var retorno = [];
            for (var i = 0; i < tiposMagia.rows.length; i++) {
              let tempIdMagia = tiposMagia.rows.item(i)._id_magia;
              let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia WHERE _id_magia = ?;';
              tx.executeSql(query, [tempIdMagia], function (tx: SQLiteTransaction, resultSet) {
                var tipos = [];
                for (var j = 0; j < resultSet.rows.length; j ++) {
                  tipos.push(new TipoMagiaComNivel(resultSet.rows.item(j)._id_tipoMagia, resultSet.rows.item(j).nome, resultSet.rows.item(j).nivel ));
                };
                servico.getJustMagia(tx, tipos, tempIdMagia).then(function(magia: Magia){
                  retorno.push(magia);
                  if(tiposMagia.rows.length === i){
                    resolve(retorno);
                  }
                },function(err){
                  console.error(err);
                  reject();
                });
              }, function (tx, err) {
                console.error(err);
                reject();
              });
            };
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }, function (tx, err) {
          reject();
        }, function (tx, succ) {
          reject();
        });
      })
    });
  }

  getTodasMagia(): Promise<Array<Magia>> {
    let servico = this;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia;';
          tx.executeSql(query, [], function (tx: SQLiteTransaction, tiposMagia) {
            var retorno = [];
            for (var i = 0; i < tiposMagia.rows.length; i++) {
              let tempIdMagia = tiposMagia.rows.item(i)._id_magia;
              let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia WHERE _id_magia = ?;';
              tx.executeSql(query, [tempIdMagia], function (tx: SQLiteTransaction, resultSet) {
                var tipos = [];
                for (var j = 0; j < resultSet.rows.length; j ++) {
                  tipos.push(new TipoMagiaComNivel(resultSet.rows.item(j)._id_tipoMagia, resultSet.rows.item(j).nome, resultSet.rows.item(j).nivel ));
                };
                servico.getJustMagia(tx, tipos, tempIdMagia).then(function(magia: Magia){
                  retorno.push(magia);
                  if(tiposMagia.rows.length === i){
                    resolve(retorno);
                  }
                },function(err){
                  console.error(err);
                  reject();
                });
              }, function (tx, err) {
                console.error(err);
                reject();
              });
            };
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }, function (tx, err) {
          reject();
        }, function (tx, succ) {
          reject();
        });
      })
    });
  }

  getMagia(idMagia: number): Promise<Magia> {
    let servico = this;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia WHERE _id_magia = ?;';
          tx.executeSql(query, [idMagia], function (tx, resultSet) {
            var retorno = [];
            var tipos = [];
            var tamanhoDaQuery = resultSet.rows.length;
            for (var i = 0; i < tamanhoDaQuery; i ++) {
              tipos.push(new TipoMagiaComNivel(resultSet.rows.item(i)._id_tipoMagia, resultSet.rows.item(i).nome, resultSet.rows.item(i).nivel ));
            };
            servico.getJustMagia(tx, tipos, idMagia).then(function(magia: Magia){
              resolve(magia);
            },function(err){
              console.error(err);
              reject();
            });
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }, function (tx, err) {
          reject();
        }, function (tx, succ) {
          reject();
        });
      })
    })
  }

  addTipo(nome: string): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql('INSERT INTO tipoMagia(nome) VALUES(?);', [nome], function (tx, resultSet) {
            resolve(output(resultSet.rows));
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }, function (tx, err) {
          reject();
        }, function (tx, succ) {
          reject();
        });
      })
    });
  }

  updateTipo(nome: string, id: number): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql('UPDATE tipoMagia SET nome = ? WHERE _id = ?;', [nome, id], function (tx, resultSet) {
            resolve(output(resultSet.rows));
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }, function (tx, err) {
          reject();
        }, function (tx, succ) {
          reject();
        });
      })
    });
  }

  deleteTipo( id: number): Promise<any> {
    let output = this.sqliteOutputToArray;
    console.log('id dessa bosta', id);
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql("SELECT _id_magia,_id_tipoMagia FROM(SELECT _id_magia,_id_tipoMagia  FROM tipoMagia_magia GROUP BY _id_magia HAVING count(_id_magia) = 1) WHERE _id_tipoMagia = ?;", [id], function (tx, resultSet) {
            if(resultSet.rows.length > 0){
              for(var i = 0; i < resultSet.rows.length; i++ ){
                tx.executeSql('DELETE FROM magia WHERE _id = ?;', [resultSet.rows.index(i)._id_magia])
              }
            }
            tx.executeSql('DELETE FROM tipoMagia_magia WHERE _id_tipoMagia = ?;', [id], function (tx, resultSet) {
              tx.executeSql('DELETE FROM tipoMagia WHERE _id = ?;', [id], function (tx, resultSet) {
                resolve(true);
              }, function (tx, err) {
                console.error(err);
                reject(false);
              });
            }, function (tx, err) {
              console.error(err);
              reject(false);
            });
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }, function (tx, err) {
          reject();
        }, function (tx, succ) {
          reject();
        });
      })
    });
  }

  public addMagia(magia: Magia): Promise<any> {
    let service = this;
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          service.addMagiaPrivate(magia,tx).then(function (resultSet) {
            resolve(resultSet);
          }, function (err) {
            reject(err);
          })
        }, function (tx, err) {
          console.error(err)
          reject(err);
        }, function (tx, succ) {
          reject(succ);
        });
      })
    })
  }

  deletarMagia(idMagia : number): Promise<any>{
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql('DELETE FROM magia WHERE _id = ?;', [idMagia], function(tx, resultSet){
            tx.executeSql('DELETE FROM tipoMagia_magia WHERE _id_magia = ?;', [idMagia], function (tx, resultSet) {
              resolve();
            },function(){
              reject();
            })
           },function(){
            reject();
           })
        })
      })
    })
  }

  updateMagia(magia : Magia): Promise<any>{
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          let promiseArray = [];
          promiseArray.push(tx.executeSql('DELETE FROM tipoMagia_magia WHERE _id_magia = ?;', [magia.$id]));
          for(var i = 0; i < magia.$tipoArray.length; i++){
            promiseArray.push(tx.executeSql('INSERT INTO tipoMagia_magia(_id_tipoMagia,_id_magia,nivel) VALUES ( ?,?,? );', [magia.$tipoArray[i].$id, magia.$id, magia.$tipoArray[i].$nivel]));
          }
          Promise.all(promiseArray).then(function(){
            tx.executeSql('UPDATE magia SET'+
              ' nome = ?,'+
              ' descricao = ?,'+
              ' alcanceBase = ?,'+
              ' nivelPorAlcance = ?,'+
              ' alcancePorNivel = ?,'+
              ' duracaoBase = ?,'+
              ' nivelPorDuracao = ?,'+
              ' duracaoPorNivel = ?,'+
              ' medidaDuracaoBase = ?,'+
              ' medidaDuracaoAdicional = ?,'+
              ' tipoDuracaoBase = ?,'+
              ' tipoDuracaoAdicional = ?'+
              ' WHERE _id = ?;',
              [
                magia.$nome,
                magia.$descricao,
                magia.$alcance.$alcanceBase,
                magia.$alcance.$niveisParaAdicao,
                magia.$alcance.$alcanceAdicional,
                magia.$duracao.$duracaoBase,
                magia.$duracao.$niveisParaAdicao,
                magia.$duracao.$duracaoAdicional,
                magia.$duracao.$medidaDuracaoBase,
                magia.$duracao.$medidaDuracaoAdicional,
                magia.$duracao.$tipoDuracaoBase,
                magia.$duracao.$tipoDuracaoAdicional,
                magia.$id
              ],function(){
                resolve();
              },function(error){
                console.error(error)
                reject();
              })
          },function(error){
            console.error(error)
            reject();
          })
        })
      })
    })
  }

  private addMagiaPrivate(element: Magia, transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      let params = this.magiaToArray(element);
      let query = 'INSERT INTO magia(nome,descricao,alcanceBase,nivelPorAlcance,alcancePorNivel,duracaoBase,medidaDuracaoBase,nivelPorDuracao,duracaoPorNivel,medidaDuracaoAdicional,tipoDuracaoBase,tipoDuracaoAdicional) VALUES (?,?,?,?,?,?,?,?,?,?,?,? );';
      console.log('Adicionando',query,params,element );
      transaction.executeSql(query, params, function (tx, resultSet) {
          for (var i = 0; i < element.$tipoArray.length; i++) {
            let params = [element.$tipoArray[i].$id, resultSet.insertId, element.$tipoArray[i].$nivel];
            let query = 'INSERT INTO tipoMagia_magia(_id_tipoMagia,_id_magia,nivel) VALUES ( ?,?,? );';
            console.log('Adicionando tipoMagia_magia',query,params);
            transaction.executeSql(query, params, function (tx, resultSet) {
              if(element.$tipoArray.length === i){

              }
              resolve(resultSet);
            }, function (tx, err) {
              console.error(err);
              reject(err);
            });
          }
      }, function (tx, err) {
        console.error(err);
        reject(err);
      });
    })
  }

  private openDatabase(): Promise<any> {
    return this.sqlCapsule.openDatabase();
  }

  private magiaToArray(magia: Magia): Array<any> {
    let array = [];
    array.push(magia.$nome);
    array.push(magia.$descricao);
    array.push(magia.$alcance.$alcanceBase);
    array.push(magia.$alcance.$niveisParaAdicao);
    array.push(magia.$alcance.$alcanceAdicional);
    array.push(magia.$duracao.$duracaoBase);
    array.push(magia.$duracao.$tipoDuracaoBase);
    array.push(magia.$duracao.$niveisParaAdicao);
    array.push(magia.$duracao.$duracaoAdicional);
    array.push(magia.$duracao.$tipoDuracaoAdicional);
    array.push(magia.$duracao.$medidaDuracaoBase);
    array.push(magia.$duracao.$medidaDuracaoAdicional);
    return array;
  }

  private tipoMagiaToArray(tipoMagia: TipoMagia): Array<any> {
    let array = [];
    array.push(tipoMagia.$nomeTipo);
    return array;
  }

  private sqliteOutputToArray(sqliteOutPut): Array<any> {
    let array = [];
    for (var index = 0; index < sqliteOutPut.length; index++) {
      array.push(sqliteOutPut.item(index));
    }
    return array;
  }

}
