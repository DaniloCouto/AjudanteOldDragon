import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLiteObject} from '@ionic-native/sqlite';
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
      this.sqlCapsule.openDatabase().then(function (db: SQLiteObject) {
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
            'favorito	INTEGER,' +
            'PRIMARY KEY(_id)' +
            ');';

          db.executeSql(query, null).then(function (res) {
            var query = 'CREATE TABLE IF NOT EXISTS tipoMagia (' +
              '_id	INTEGER,' +
              'nome	TEXT NOT NULL,' +
              'PRIMARY KEY(_id)' +
              ');';
            db.executeSql(query, null).then(function (res) {
              var query = 'CREATE TABLE IF NOT EXISTS tipoMagia_magia (' +
                '_id_tipoMagia	INTEGER,' +
                '_id_magia	INTEGER,' +
                'nivel	INTEGER,' +
                'FOREIGN KEY(_id_tipoMagia) REFERENCES tipoMagia(_id),' +
                'FOREIGN KEY(_id_magia) REFERENCES magia(_id)' +
                ');';
              db.executeSql(query, null).then(function (res) {
                db.executeSql('SELECT count(*) AS mycount FROM  magia;', []).then(function ( resultSet) {
                  if (resultSet.rows.item(0).mycount === 0) {
                    let idsTipoMagias = [];
                    let capsDB = db;
                    BaseTipoMagia.BASE_TIPOMAGIA.forEach(function (tipoMagia) {
                      let params = service.tipoMagiaToArray(tipoMagia);
                      let query = 'INSERT INTO tipoMagia(nome) VALUES ( ? );';
                      capsDB.executeSql(query, params).then(function (resultSet) {
                        idsTipoMagias.push(resultSet.insertId);
                        if (tipoMagia.$nomeTipo === 'Arcana') {
                          BaseMagia.BASE_MAGIA_ARCANA.forEach(function (element) {
                            service.addMagiaPrivate(element, db)
                          })
                        } else if (tipoMagia.$nomeTipo === 'Divina') {
                          BaseMagia.BASE_MAGIA_DIVINA.forEach(function (element) {
                            service.addMagiaPrivate(element, db)
                          })
                        }
                        if (idsTipoMagias.length === 2) {
                          BaseMagia.BASE_MAGIA_ARCANA_DIVINA.forEach(function (element) {
                            service.addMagiaPrivate(element, db)
                          })
                        }
                      }, function (err) {
                        console.error(err);
                      });
                    });
                  }
                }, function (err) {
                  console.error(err);
                });
              }, function (err) {
                console.error(err);
              });
            }, function (err) {
              console.error(err);
            });
          }, function (err) {
            console.error(err);
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
          db.executeSql('SELECT * FROM  tipoMagia;', []).then(function (resultSet) {
            var retorno = []
            for (var i = 0; i < resultSet.rows.length; i++) {
              retorno.push(new TipoMagia(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome))
            }
            resolve(retorno);
          }, function (err) {
            console.error(err);
            reject();
          });
      })
    });
  }

  private getJustMagia(tx, tipos: Array<TipoMagiaComNivel>, id_magia: number) {
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
      }, function (err) {
        reject(err);
      })
    })
  }

  getMagiaPorTipo(idTipos: Array<Number>): Promise<Array<Magia>> {
    let servico = this;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
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
          db.executeSql(query, idTipos).then(function (tiposMagia) {
            var retorno = [];
            for (var i = 0; i < tiposMagia.rows.length; i++) {
              let tempIdMagia = tiposMagia.rows.item(i)._id_magia;
              let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia WHERE _id_magia = ?;';
              db.executeSql(query, [tempIdMagia]).then(function (resultSet) {
                var tipos = [];
                for (var j = 0; j < resultSet.rows.length; j++) {
                  tipos.push(new TipoMagiaComNivel(resultSet.rows.item(j)._id_tipoMagia, resultSet.rows.item(j).nome, resultSet.rows.item(j).nivel));
                };
                servico.getJustMagia(db, tipos, tempIdMagia).then(function (magia: Magia) {
                  retorno.push(magia);
                  if (tiposMagia.rows.length === i) {
                    resolve(retorno);
                  }
                }, function (err) {
                  console.error(err);
                  reject();
                });
              }, function (err) {
                console.error(err);
                reject();
              });
            };
          }, function (err) {
            console.error(err);
            reject();
          });
      })
    });
  }

  getTodasMagia(): Promise<Array<Magia>> {
    let servico = this;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia;';
          db.executeSql(query, []).then(function (tiposMagia) {
            var retorno = [];
            for (var i = 0; i < tiposMagia.rows.length; i++) {
              let tempIdMagia = tiposMagia.rows.item(i)._id_magia;
              let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia WHERE _id_magia = ?;';
              db.executeSql(query, [tempIdMagia]).then(function (resultSet) {
                var tipos = [];
                for (var j = 0; j < resultSet.rows.length; j++) {
                  tipos.push(new TipoMagiaComNivel(resultSet.rows.item(j)._id_tipoMagia, resultSet.rows.item(j).nome, resultSet.rows.item(j).nivel));
                };
                servico.getJustMagia(db, tipos, tempIdMagia).then(function (magia: Magia) {
                  retorno.push(magia);
                  if (tiposMagia.rows.length === i) {
                    resolve(retorno);
                  }
                }, function (err) {
                  console.error(err);
                  reject();
                });
              }, function (err) {
                console.error(err);
                reject();
              });
            };
          }, function (err) {
            console.error(err);
            reject();
          });
      })
    });
  }
  getTodasMagiaFavorita(): Promise<Array<Magia>> {
    let servico = this;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia;';
          db.executeSql(query, []).then(function (tiposMagia) {
            var retorno = [];
            for (var i = 0; i < tiposMagia.rows.length; i++) {
              let tempIdMagia = tiposMagia.rows.item(i)._id_magia;
              let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia WHERE _id_magia = ?;';
              db.executeSql(query, [tempIdMagia]).then(function (resultSet) {
                var tipos = [];
                for (var j = 0; j < resultSet.rows.length; j++) {
                  tipos.push(new TipoMagiaComNivel(resultSet.rows.item(j)._id_tipoMagia, resultSet.rows.item(j).nome, resultSet.rows.item(j).nivel));
                };
                db.executeSql('SELECT * FROM magia WHERE _id = ? AND favorito = 1;', [tempIdMagia]).then(function (resultSet) {
                  if (resultSet.rows.length) {
                    retorno.push(new Magia(
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
                  }
                  if (tiposMagia.rows.length === i) {
                    resolve(retorno);
                  }
                }, function ( err) {
                  reject(err);
                })
              }, function (err) {
                console.error(err);
                reject();
              });
            };
          }, function (err) {
            console.error(err);
            reject();
          });
      })
    });
  }

  getMagia(idMagia: number): Promise<Magia> {
    let servico = this;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia WHERE _id_magia = ?;';
          db.executeSql(query, [idMagia]).then(function (resultSet) {
            var retorno = [];
            var tipos = [];
            var tamanhoDaQuery = resultSet.rows.length;
            for (var i = 0; i < tamanhoDaQuery; i++) {
              tipos.push(new TipoMagiaComNivel(resultSet.rows.item(i)._id_tipoMagia, resultSet.rows.item(i).nome, resultSet.rows.item(i).nivel));
            };
            servico.getJustMagia(db, tipos, idMagia).then(function (magia: Magia) {
              resolve(magia);
            }, function (err) {
              console.error(err);
              reject();
            });
          }, function (err) {
            console.error(err);
            reject();
          });
      })
    })
  }

  getWithDb(db : SQLiteObject, idMagia: number): Promise<Magia> {
    let servico = this;
    return new Promise((resolve, reject) => {
      let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia WHERE _id_magia = ?;';
      db.executeSql(query, [idMagia]).then(function ( resultSet) {
        var retorno = [];
        var tipos = [];
        var tamanhoDaQuery = resultSet.rows.length;
        for (var i = 0; i < tamanhoDaQuery; i++) {
          tipos.push(new TipoMagiaComNivel(resultSet.rows.item(i)._id_tipoMagia, resultSet.rows.item(i).nome, resultSet.rows.item(i).nivel));
        };
        servico.getJustMagia(db, tipos, idMagia).then(function (magia: Magia) {
          resolve(magia);
        }, function (err) {
          console.error(err);
          reject();
        });
      })
    })
  }

  getMagiaIsFavorite(idMagia: number): Promise<Boolean> {
    let servico = this;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          let query = 'SELECT favorito FROM magia WHERE _id = ?;';
          db.executeSql(query, [idMagia]).then(function (resultSet) {
            if (resultSet.rows.length) {
              if (resultSet.rows.item(0).favorito) {
                resolve(true);
              } else {
                resolve(false);
              }
            } else {
              resolve(false)
            }
          }, function (err) {
            console.error(err);
            reject();
          });
      })
    })
  }

  addTipo(nome: string): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          db.executeSql('INSERT INTO tipoMagia(nome) VALUES(?);', [nome]).then(function (resultSet) {
            resolve(output(resultSet.rows));
          }, function (err) {
            console.error(err);
            reject();
          });
      })
    });
  }

  updateTipo(nome: string, id: number): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          db.executeSql('UPDATE tipoMagia SET nome = ? WHERE _id = ?;', [nome, id]).then(function ( resultSet) {
            resolve(output(resultSet.rows));
          }, function (err) {
            console.error(err);
            reject();
          });
      })
    });
  }

  deleteTipo(id: number): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          db.executeSql("SELECT _id_magia,_id_tipoMagia FROM(SELECT _id_magia,_id_tipoMagia  FROM tipoMagia_magia GROUP BY _id_magia HAVING count(_id_magia) = 1) WHERE _id_tipoMagia = ?;", [id]).then(function (resultSet) {
            if (resultSet.rows.length > 0) {
              for (var i = 0; i < resultSet.rows.length; i++) {
                db.executeSql('DELETE FROM magia WHERE _id = ?;', [resultSet.rows.index(i)._id_magia])
              }
            }
            db.executeSql('DELETE FROM tipoMagia_magia WHERE _id_tipoMagia = ?;', [id]).then(function (resultSet) {
              db.executeSql('DELETE FROM tipoMagia WHERE _id = ?;', [id]).then(function (resultSet) {
                resolve(true);
              }, function (err) {
                console.error(err);
                reject(false);
              });
            }, function (err) {
              console.error(err);
              reject(false);
            });
          }, function (err) {
            console.error(err);
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
          service.addMagiaPrivate(magia, db).then(function (resultSet) {
            resolve(resultSet);
          }, function (err) {
            reject(err);
          })
      })
    })
  }

  deletarMagia(idMagia: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          db.executeSql('DELETE FROM magia WHERE _id = ?;', [idMagia]).then(function (resultSet) {
            db.executeSql('DELETE FROM tipoMagia_magia WHERE _id_magia = ?;', [idMagia]).then(function (resultSet) {
              resolve();
            }, function () {
              reject();
            })
          }, function () {
            reject();
          })
      })
    })
  }

  updateMagia(magia: Magia): Promise<any> {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          let promiseArray = [];
          promiseArray.push(db.executeSql('DELETE FROM tipoMagia_magia WHERE _id_magia = ?;', [magia.$id]));
          for (var i = 0; i < magia.$tipoArray.length; i++) {
            promiseArray.push(db.executeSql('INSERT INTO tipoMagia_magia(_id_tipoMagia,_id_magia,nivel) VALUES ( ?,?,? );', [magia.$tipoArray[i].$id, magia.$id, magia.$tipoArray[i].$nivel]));
          }
          Promise.all(promiseArray).then(function () {
            db.executeSql('UPDATE magia SET' +
              ' nome = ?,' +
              ' descricao = ?,' +
              ' alcanceBase = ?,' +
              ' nivelPorAlcance = ?,' +
              ' alcancePorNivel = ?,' +
              ' duracaoBase = ?,' +
              ' nivelPorDuracao = ?,' +
              ' duracaoPorNivel = ?,' +
              ' medidaDuracaoBase = ?,' +
              ' medidaDuracaoAdicional = ?,' +
              ' tipoDuracaoBase = ?,' +
              ' tipoDuracaoAdicional = ?' +
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
              ]).then(function () {
                resolve();
              }, function (error) {
                console.error(error)
                reject();
              })
          }, function (error) {
            console.error(error)
            reject();
          })
      })
    })
  }

  setFavorito(favorito: Boolean, idMagia: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          db.executeSql('UPDATE magia SET' +
            ' favorito = ?' +
            ' WHERE _id = ?;',
            [
              favorito ? 1 : 0,
              idMagia
            ]).then(function () {
              resolve(favorito);
            }, function (error) {
              console.error(error)
              reject();
            })
      })
    })
  }

  private addMagiaPrivate(element: Magia, db: SQLiteObject): Promise<any> {
    return new Promise((resolve, reject) => {
      let params = this.magiaToArray(element);
      let query = 'INSERT INTO magia(nome,descricao,alcanceBase,nivelPorAlcance,alcancePorNivel,duracaoBase,medidaDuracaoBase,nivelPorDuracao,duracaoPorNivel,medidaDuracaoAdicional,tipoDuracaoBase,tipoDuracaoAdicional,favorito) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,0 );';
      db.executeSql(query, params).then(function (resultSet) {
        for (var i = 0; i < element.$tipoArray.length; i++) {
          let params = [element.$tipoArray[i].$id, resultSet.insertId, element.$tipoArray[i].$nivel];
          let query = 'INSERT INTO tipoMagia_magia(_id_tipoMagia,_id_magia,nivel) VALUES ( ?,?,? );';
          db.executeSql(query, params).then(function (resultSet) {
            if (element.$tipoArray.length === i) {

            }
            resolve(resultSet);
          }, function (err) {
            console.error(err);
            reject(err);
          });
        }
      }, function (err) {
        console.error(err);
        reject(err);
      });
    })
  }

  private openDatabase(): Promise<SQLiteObject> {
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
