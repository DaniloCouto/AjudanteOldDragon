import { Item } from '../../classes/item';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SqlCapsuleProvider } from "../sql-capsule/sql-capsule";
import { Platform } from 'ionic-angular';
import { SQLiteObject } from '@ionic-native/sqlite';
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

  constructor(private platform: Platform, private $sqlCapsule: SqlCapsuleProvider) {
    this.sqlCapsule = $sqlCapsule;
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db: SQLiteObject) {
          var query = 'CREATE TABLE IF NOT EXISTS item (' +
            '_id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'nome	TEXT,' +
            'descricao TEXT,' +
            'peso	REAL,' +
            'valor	INTEGER' +
            ');'
          db.executeSql(query, null).then(function (res) {
            db.executeSql('SELECT count(*) AS mycount FROM  item;', []).then(function (resultSet) {
              if (resultSet.rows.item(0).mycount === 0) {
                let capsDb = db;
                BaseItens.BASE_ITENS.forEach(function (item) {
                  let params = service.itemWithIdToArray(item);
                  let query = 'INSERT INTO item(_id, nome,descricao, peso,valor) VALUES ( ?,?,?,?,? );'
                  capsDb.executeSql(query, params).then(function ( resultSet) {
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
      })
    });
  }

  add(item: Item): Promise<any> {
    let params = this.itemToArray(item);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO item(nome,descricao, peso,valor) VALUES ( ?,?,?,? );'
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql(query, params).then(function (res) {
            resolve(res);
          }, function (err) {
            console.error(err);
            reject(err);
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
          db.executeSql(query, arrayParams).then(function (res) {
            resolve(res);
          }, function (err) {
            console.error(err);
            reject(err);
          });
      })
    });
  }
  delete(id: number): Promise<any> {

    return new Promise((resolve, reject) => {
      let query = 'DELETE FROM item WHERE _id = ?;';
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql(query, [id]).then(function (res) {
            resolve(res);
          }, function (err) {
            console.error(err);
            reject(err);
          });
      })
    });
  }
  getAll(): Promise<Array<Item>> {
    let output = this.sqliteOutputToArray;

    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql('SELECT * FROM  item;', []).then( function (resultSet) {
            let retorno = [];
            for (var i = 0; i < resultSet.rows.length; i++) {
              retorno.push(new Item(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor))
            }
            resolve(retorno);
          }, function (err) {
            console.error(err);
            reject();
          });
      }, function (err) {
        console.error(err);
        reject();
      })
    });
  }

  get(id: number): Promise<Item> {
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql('SELECT * FROM  item WHERE _id = ?;', [id]).then(function (resultSet) {
            let retorno = [];
            let i = 0;
            if (resultSet.rows.length) {
              resolve(new Item(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor))
            } else {
              resolve(null);
            }
          }, function (err) {
            console.error(err);
            reject();
          });
      }, function (err) {
        console.error(err);
        reject();
      })
    });
  }

  getWithDb(db : SQLiteObject, id: number): Promise<Item> {
    return new Promise((resolve, reject) => {
      db.executeSql('SELECT * FROM  item WHERE _id = ?;', [id]).then(function (resultSet) {
        let retorno = [];
        let i = 0;
        if (resultSet.rows.length) {
          resolve(new Item(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor))
        } else {
          resolve(null);
        }
      }, function (err) {
        console.error(err);
        reject();
      });
    });
  }

  getCount(): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql('SELECT count(*) FROM  item;', []).then(function (resultSet) {
            resolve(output(resultSet.rows));
          }, function (err) {
            console.error(err);
            reject();
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
  private itemWithIdToArray(item: Item): Array<any> {
    let array = [];
    array.push(item.$id);
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
