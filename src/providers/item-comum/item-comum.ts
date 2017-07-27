import { Item } from '../../classes/item';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SqlCapsuleProvider } from "../sql-capsule/sql-capsule";
import { Platform } from "ionic-angular";
import {SQLiteTransaction, SQLiteObject } from '@ionic-native/sqlite';
import { BaseItens } from "./base-item-comum";

/*
  Generated class for the ItemComumProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItemComumProvider {
  private sqlCapsule: SqlCapsuleProvider;
  private _db;
  private _weapons: any;

  constructor(private platform: Platform, private $sqlCapsule : SqlCapsuleProvider) {
    this.sqlCapsule = $sqlCapsule;
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db: SQLiteObject) {
        db.transaction(function (tx: SQLiteTransaction) {
          var query = 'CREATE TABLE IF NOT EXISTS item (' +
            '_id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'nome	TEXT,' +
            'descricao TEXT,' +
            'peso	REAL,' +
            'valor	INTEGER' +
            ');'
          tx.executeSql(query, null, function (tx, res) {
            tx.executeSql('SELECT count(*) AS mycount FROM  item;', [], function (tx, resultSet) {
              if (resultSet.rows.item(0).mycount === 0) {
                let transaction = tx;
                BaseItens.BASE_ITENS.forEach(function (item) {
                  let params = service.itemToArray(item);
                  let query = 'INSERT INTO item(nome,descricao, peso,valor) VALUES ( ?,?,?,? );'
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
        }).then(function(){},function ( err) {
          console.error(err);
        });
      }, function (err) {
        console.error(err);
      })
    });
  }

  add(item: Item): Promise<any> {
    let params = this.itemToArray(item);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO item(nome,descricao, peso,valor) VALUES ( ?,?,?,? );'
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, params, function (tx, res) {
            resolve(res);
          }, function (tx, err) {
            console.log(err);
            reject(err);
          });
        });
      });
    });
  }
  update(item: Item): Promise<any> {
    let arrayParams = this.itemToArray(item);
    arrayParams.push(item.$id);
    return new Promise((resolve, reject) => {
      let query = 'UPDATE item SET nome = ? , descricao = ?, peso = ? , valor = ?  WHERE _id = ?;';
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, arrayParams, function (tx, res) {
            resolve(res);
          }, function (tx, err) {
            console.log(err);
            reject(err);
          });
        }).then(function (sucesso) {
        }, function (erro) {
          console.error('Transaction Success Callback',erro);
          reject(erro);
        });
      })
    });
  }
  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = 'DELETE FROM item WHERE _id = ?;';
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, [id], function (tx, res) {
            resolve(res);
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
  getAll(): Promise<Array<Item>> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql('SELECT * FROM  item;', [], function (tx, resultSet) {
            let retorno = [];
            for(var i = 0; resultSet.rows.length; i++){
              retorno.push(new Item(resultSet.rows.item(i)._id,resultSet.rows.item(i).nome,resultSet.rows.item(i).descricao,resultSet.rows.item(i).peso, resultSet.rows.item(i).valor))
            }
            resolve(retorno);
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        });
      })
    });
  }

  getCount(): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql('SELECT count(*) FROM  item;', [], function (tx, resultSet) {
            resolve(output(resultSet.rows));
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        });
      })
    });
  }

  private itemToArray(item: Item): Array<any> {
    let array = [];
    array.push(item.$nome);
    array.push(item.$descricao);
    array.push(item.$peso);
    array.push(item.$valor);

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
