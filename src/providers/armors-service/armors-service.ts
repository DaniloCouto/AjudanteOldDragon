import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Armadura } from '../../classes/armadura/armadura';
import { BaseArmaduras } from './base-armors';
import { SQLite, SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';

@Injectable()
export class ArmorsService {
  private _db;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      let service = this;
      this.openDatabase().then(function (db: SQLiteObject) {
        db.transaction(function (tx: SQLiteTransaction) {
          var query = 'CREATE TABLE IF NOT EXISTS armors (' +
            '_id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'nome	TEXT,' +
            'descricao	TEXT,' +
            'peso	INTEGER,' +
            'valor	INTEGER,' +
            'bonusCa	INTEGER,' +
            'movimentacao	INTEGER,' +
            'tipo	INTEGER,' +
            'limiteAjusteDes	INTEGER' +
            ');';
          tx.executeSql(query, null, function (tx, res) {
            tx.executeSql("PRAGMA table_info(armors);", null, function (tx, res) {
              let verifyFlag = false;
              for (let i = 0; i < res.rows.length; i++) {
                if (res.rows.item(i).name == 'descricao') {
                  service.populateArmorDb(tx);
                  break;
                } else if (i + 1 === res.rows.length) {
                  tx.executeSql("ALTER TABLE armors ADD COLUMN descricao TEXT;", null, function (tx, res) {
                    service.populateArmorDb(tx);
                  }, function (tx, err) {
                    console.error(err);
                  });
                }
              }
            }, function (tx, err) { });
            // 

          }, function (tx, err) {
            console.error(err);

          });
        }).then(function () { }, function (err) {
          console.error(err);
        });
      }, function (err) {
        console.error(err);
      })
    });
  }

  private populateArmorDb(tx) {
    let service = this;
    tx.executeSql('SELECT count(*) AS mycount FROM  armors;', [], function (tx, resultSet) {
      if (resultSet.rows.item(0).mycount === 0) {
        let transaction = tx;
        BaseArmaduras.BASE_ARMADURA.forEach(function (weapon) {
          let params = service.armorToArray(weapon);
          let query = 'INSERT INTO armors(nome,descricao,peso,valor,bonusCa,movimentacao,tipo,limiteAjusteDes) VALUES ( ?,?,?,?,?,?,?,?);';
          transaction.executeSql(query, params, function (tx, resultSet) {
          }, function (tx, err) {
            console.error(err);
          });
        });
      }
    }, function (tx, err) {
      console.error(err);
    });
  }

  add(armor: Armadura): Promise<any> {
    let params = this.armorToArray(armor);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO armors(nome,descricao,peso,valor,bonusCa,movimentacao,tipo,limiteAjusteDes) VALUES ( ?,?,?,?,?,?,?,?);';
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, params, function (tx, res) {
            resolve(res);
          }, function (tx, err) {
            console.error(err);
            reject(err);
          });
        }, function (tx, err) {
          console.error(err);
          reject(err);
        });
      });
    });
  }
  update(armor: Armadura): Promise<any> {
    let arrayParams = this.armorToArray(armor);
    arrayParams.push(armor.$id);
    return new Promise((resolve, reject) => {
      let query = 'UPDATE armors SET nome = ?, descricao = ? , peso = ? , valor = ? , bonusCa = ? , movimentacao = ? , tipo = ? , limiteAjusteDes = ? WHERE _id = ?;';
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, arrayParams, function (tx, res) {
            resolve(res);
          }, function (tx, err) {
            console.error(err);
            reject(err);
          });
        }, function (tx, err) {
          console.error('Transaction Callback Error', err);
          reject(err);
        }, function (tx, succ) {
          reject(tx);
        });
      })
    });
  }
  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = 'DELETE FROM armors WHERE _id = ?;';
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, [id], function (tx, res) {
            resolve(res);
          }, function (tx, err) {
            reject(err);
          });
        }, function (tx, err) {
          reject(err);
        });
      })
    });
  }
  getAll(): Promise<Array<Armadura>> {
    let output = this.sqliteOutputToArray;

    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM  armors;', [], function (tx, resultSet) {
            let retorno = [];
            for (var i = 0; i < resultSet.rows.length; i++) {
              retorno.push(new Armadura(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor, resultSet.rows.item(i).bonusCa, resultSet.rows.item(i).movimentacao, resultSet.rows.item(i).tipo, resultSet.rows.item(i).limiteAjusteDes, resultSet.rows.item(i).equipado))
            }
            resolve(retorno);
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }, function (tx, err) {
          console.error(err);
          reject();
        });
      }, function (err) {
        console.error(err);
        reject();
      })

    });
  }

  get(id: number): Promise<Armadura> {
    let output = this.sqliteOutputToArray;

    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.executeSql('SELECT * FROM  armors WHERE _id = ?;', [id], function (tx, resultSet) {
          let retorno = [];
          let i = 0;
          if (resultSet.rows.length) {
            resolve(new Armadura(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor, resultSet.rows.item(i).bonusCa, resultSet.rows.item(i).movimentacao, resultSet.rows.item(i).tipo, resultSet.rows.item(i).limiteAjusteDes, 0));
          } else {
            resolve(null);
          }
        }, function (tx, err) {
          console.error(err);
          reject();
        });
      }, function (err) {
        console.error(err);
        reject();
      })

    });
  }

  getWithDb(db, id: number): Promise<Armadura> {
    let output = this.sqliteOutputToArray;

    return new Promise((resolve, reject) => {
      db.executeSql('SELECT * FROM  armors WHERE _id = ?;', [id], function (tx, resultSet) {
        let retorno = [];
        let i = 0;
        if (resultSet.rows.length) {
          resolve(new Armadura(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor, resultSet.rows.item(i).bonusCa, resultSet.rows.item(i).movimentacao, resultSet.rows.item(i).tipo, resultSet.rows.item(i).limiteAjusteDes, 0));
        } else {
          resolve(null);
        }
      }, function (tx, err) {
        console.error(err);
        reject();
      });
    });
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

  private armorToArray(armor: Armadura): Array<any> {
    let array = [];
    array.push(armor.$nome);
    array.push(armor.$descricao);
    array.push(armor.$peso);
    array.push(armor.$valor);
    array.push(armor.$bonusCa);
    array.push(armor.$movimentacao);
    array.push(armor.$tipo);
    array.push(armor.$limiteAjusteDex);
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

