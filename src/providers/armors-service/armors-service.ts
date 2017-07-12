import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
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
          var query = 'CREATE TABLE IF NOT EXISTS armors ('+
            '_id	INTEGER PRIMARY KEY AUTOINCREMENT,'+
            'nome	TEXT,'+
            'peso	INTEGER,'+
            'valor	INTEGER,'+
            'bonusCa	INTEGER,'+
            'movimentacao	INTEGER,'+
            'tipo	INTEGER,'+
            'limiteAjusteDes	INTEGER'+
          ');';
          tx.executeSql(query, null, function (tx, res) {
            tx.executeSql('SELECT count(*) AS mycount FROM  armors;', [], function (tx, resultSet) {
              if (resultSet.rows.item(0).mycount === 0) {
                let transaction = tx;
                BaseArmaduras.BASE_ARMADURA.forEach(function (weapon) {
                  let params = service.armorToArray(weapon);
                  let query = 'INSERT INTO armors(nome,peso,valor,bonusCa,movimentacao,tipo,limiteAjusteDes) VALUES ( ?,?,?,?,?,?,?);';
                  transaction.executeSql(query, params, function (tx, resultSet) {
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
        }).then(function(){}, function (err) {
          console.error(err);
        });
      }, function (err) {
        console.error(err);
      })
    });
  }

  add(armor: Armadura): Promise<any> {
    let params = this.armorToArray(armor);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO armors(nome,peso,valor,bonusCa,movimentacao,tipo,limiteAjusteDes) VALUES ( ?,?,?,?,?,?,?);';
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, params, function (tx, res) {
            resolve(res);
          }, function (tx, err) {
            console.log(err);
            reject(err);
          });
        }, function (tx, err) {
          console.log(err);
          reject(err);
        });
      });
    });
  }
  update(armor: Armadura, id: number): Promise<any> {
    let arrayParams = this.armorToArray(armor);
    arrayParams.push(id);
    console.log(arrayParams);
    return new Promise((resolve, reject) => {
      let query = 'UPDATE armors SET nome = ? , peso = ? , valor = ? , bonusCa = ? , movimentacao = ? , tipo = ? , limiteAjusteDes = ? WHERE _id = ?;';
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, arrayParams, function (tx, res) {
             console.log(tx,res);
            resolve(res);
          }, function (tx, err) {
            console.error(err);
            reject(err);
          });
        }, function (tx, err) {
          console.log('Transaction Callback Error',err);
          reject(err);
        },function(tx , succ){
          console.log('Transaction Success Callback',tx,succ);
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
  getAll(): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM  armors;', [], function (tx, resultSet) {
            resolve(output(resultSet.rows));
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }, function (tx, err) {
           reject();
        }, function(tx, succ){
          reject();
        });
      })
    });
  }

  private openDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
          this.sqlite.create({
            name: 'oldDragonRegister.db',
            location: 'default',
            createFromLocation: 1
          }).then((db : SQLiteObject) => {
            this._db = db;
            resolve(db);
          }, (err) => {
            console.error(err);
            resolve(this._db);
          });
      });

    })
  }

  private armorToArray(weapon: Armadura): Array<any> {
    let array = [];
    array.push(weapon.$nome);
    array.push(weapon.$peso);
    array.push(weapon.$valor);
    array.push(weapon.$bonusCa);
    array.push(weapon.$movimentacao);
    array.push(weapon.$tipo);
    array.push(weapon.$limiteAjusteDex);
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

