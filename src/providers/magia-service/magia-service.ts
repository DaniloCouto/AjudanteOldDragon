import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';
import { Magia } from '../../classes/magia/magia';
import { TipoMagia} from '../../classes/magia/tipoMagia';
import { BaseTipoMagia } from './base-tipoMagia';
import { BaseMagia } from './base-magia';
import 'rxjs/add/operator/map';

/*
  Generated class for the MagiaService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MagiaService {

  private _db;
  private _weapons: any;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      let service = this;
      this.openDatabase().then(function (db : SQLiteObject) {
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
            'tipoDuracaoBase	INTEGER,' +
            'tipoDuracaoAdicional	INTEGER,' +
            'PRIMARY KEY(_id)' +
            ');';
          tx.executeSql(query, null, function (tx, res) {
            var query = 'CREATE TABLE IF NOT EXISTS tipoMagia (' +
              '_id	INTEGER,' +
              'nome	TEXT NOT NULL,' +
              'PRIMARY KEY(_id)' +
              ');';
            tx.executeSql(query, null, function (tx, res) {
              var query = 'CREATE TABLE IF NOT EXISTS tipoMagia_magia (' +
                '_id_tipoMagia	INTEGER,' +
                '_id_magia	INTEGER,' +
                'nivel	INTEGER,' +
                'FOREIGN KEY(_id_tipoMagia) REFERENCES tipoMagia(_id),' +
                'FOREIGN KEY(_id_magia) REFERENCES magia(_id)' +
                ');';
              tx.executeSql(query, null, function (tx, res) {
                tx.executeSql('SELECT count(*) AS mycount FROM  magia;', [], function (tx, resultSet) {
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
                            service.addMagiaPrivate(element, [resultSet.insertId], tx)
                          })
                        } else if (tipoMagia.$nomeTipo === 'Divina') {
                          BaseMagia.BASE_MAGIA_DIVINA.forEach(function (element) {
                            service.addMagiaPrivate(element, [resultSet.insertId], tx)
                          })
                        }
                        if (idsTipoMagias.length === 2) {
                          BaseMagia.BASE_MAGIA_ARCANA_DIVINA.forEach(function (element) {
                            service.addMagiaPrivate(element, idsTipoMagias, tx)
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

  getAllTipos(): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM  tipoMagia;', [], function (tx, resultSet) {
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

  getMagiaPorTipo(idTipos: Array<Number>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
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
            var whereClause = ' WHERE (_id_tipoMagia = ?)';
            queryCompletion = whereClause;
          }
          query += queryCompletion;
          console.log(query);
          tx.executeSql(query, idTipos, function (tx, resultSet) {
            var retorno = [];
            var tamanhoDaQuery = resultSet.rows.length;
            for (var i = 0; i < tamanhoDaQuery; i += idTipos.length) {
              var nivel = [];
              for (var k = i; k < (i + idTipos.length); k++) {
                nivel.push(resultSet.rows.item(k).nivel)
              }
              var tipos = [];
              for (var j = i; j < (i + idTipos.length); j++) {
                tipos.push(new TipoMagia(resultSet.rows.item(j)._id_tipoMagia,resultSet.rows.item(j).nome))
              }
              tx.executeSql('SELECT * FROM magia WHERE _id = ?;', [resultSet.rows.item(i)._id_magia], function (tx, resultSet) {
                resultSet.rows.item(0).tipoNivelArray = nivel;
                resultSet.rows.item(0).tipoArray = tipos;
                retorno.push(resultSet.rows.item(0));
                if (i === tamanhoDaQuery) {
                  resolve(retorno);
                }
              }, function (tx, err) {
                console.error(err);
                reject();
              })
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

  getMagia(idMagia: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          let query = 'SELECT tm._id_magia, tm._id_tipoMagia,  tm.nivel, t.nome FROM tipoMagia_magia tm INNER JOIN magia as m ON m._id = tm._id_magia INNER JOIN tipoMagia as t ON t._id = tm._id_tipoMagia WHERE _id_magia = ?;';
          tx.executeSql(query, [idMagia], function (tx, resultSet) {
            var retorno = [];
            var tamanhoDaQuery = resultSet.rows.length;
            for (var i = 0; i < tamanhoDaQuery; i ++) {
              var nivel = [];
              nivel.push(resultSet.rows.item(i).nivel);
              var tipos = [];
              tipos.push(new TipoMagia(resultSet.rows.item(i)._id_tipoMagia,resultSet.rows.item(i).nome));
            };
            tx.executeSql('SELECT * FROM magia WHERE _id = ?;', [idMagia], function (tx, resultSet) {
                resultSet.rows.item(0).tipoNivelArray = nivel;
                resultSet.rows.item(0).tipoArray = tipos;
                resolve(resultSet.rows.item(0));
              }, function (tx, err) {
                console.error(err);
                reject();
              })
          }, function (tx, err) {
            console.error(err);
            reject();
          })
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

  public addMagia(magia: Magia, idTipo: Array<number>): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          this.addMagiaPrivate(magia, idTipo).then(function (resultSet) {
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

  private addMagiaPrivate(element: Magia, idTipo: Array<number>, transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      let params = this.magiaToArray(element);
      let query = 'INSERT INTO magia(nome,descricao,alcanceBase,nivelPorAlcance,alcancePorNivel,duracaoBase,nivelPorDuracao,duracaoPorNivel,tipoDuracaoBase,tipoDuracaoAdicional) VALUES (?,?,?,?,?,?,?,?,?,? );';
      transaction.executeSql(query, params, function (tx, resultSet) {
        if (idTipo.length === element.$tipoNivelArray.length) {
          for (var i = 0; i < idTipo.length; i++) {
            let params = [idTipo[i], resultSet.insertId, element.$tipoNivelArray[i]];
            let query = 'INSERT INTO tipoMagia_magia(_id_tipoMagia,_id_magia,nivel) VALUES ( ?,?,? );';
            transaction.executeSql(query, params, function (tx, resultSet) {
              resolve(resultSet);
            }, function (tx, err) {
              console.error(err);
              reject(err);
            });
          }
        } else {
          console.error('Quantidade de tipos difere da de niveis.');
          reject();
        }
      }, function (tx, err) {
        console.error(err);
        reject(err);
      });
    })
  }

  private openDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.sqlite.create({
          name: 'oldDragonRegister.db',
          location: 'default',
          createFromLocation: 1
        }).then((db: SQLiteObject) => {
          this._db = db;
          resolve(db);
        }, (err) => {
          console.error(err);
          resolve(this._db);
        });
      });
    })
  }

  private magiaToArray(magia: Magia): Array<any> {
    let array = [];
    array.push(magia.$nome);
    array.push(magia.$descricao);
    array.push(magia.$alcance.$alcanceBase);
    array.push(magia.$alcance.$niveisParaAdicao);
    array.push(magia.$alcance.$alcanceAdicional);
    array.push(magia.$duracao.$duracaoBase);
    array.push(magia.$duracao.$niveisParaAdicao);
    array.push(magia.$duracao.$duracaoAdicional);
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
