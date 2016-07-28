import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Weapon } from '../../classes/weapon/weapon';
import { SQLite} from 'ionic-native';
import { BaseWeapons } from './base-weapons';

@Injectable()
export class WeaponsService {
  private sqlite;
  private _db;
  private _weapons: any;

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.sqlite = new SQLite();

    });
  }

  add(weapon: Weapon): Promise<any> {
    let params = this.weaponToArray(weapon);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO weapons(nome,peso,valor,iniciativa,baAdicional,danoPuro,danoRolagem,qntdRolagem,alcancePequeno,alcanceMedio,alcanceGrande,tipo1,tipo2,tamanho) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
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
  update(weapon: Weapon, id: number): Promise<any> {
    let arrayParams = this.weaponToArray(weapon);
    arrayParams.push(id);
    return new Promise((resolve, reject) => {
      let query = 'UPDATE weapons SET nome = ? , peso = ? , valor = ? , iniciativa = ? , baAdicional = ? , danoPuro = ? , danoRolagem = ? , qntdRolagem = ? , alcancePequeno = ? , alcanceMedio = ? , alcanceGrande = ? , tipo1 = ? , tipo2 = ? , tamanho = ? WHERE _id = ?;';
      this.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, arrayParams, function (tx, res) {
            resolve(res);
          }, function (tx, err) {
            console.log(err);
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
      let query = 'DELETE FROM weapons WHERE _id = ?;';
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
          tx.executeSql('SELECT * FROM  weapons;', [], function (tx, resultSet) {
            resolve(output(resultSet.rows));
          }, function (tx, err) {
            reject();
          });
        }, function (tx, err) {
           reject();
        },function(tx,succ){
        });
      })
    });
  }

  private openDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
          this.sqlite.openDatabase({
            name: 'oldDragonRegister.db',
            location: 'default',
            createFromLocation: 1
          }).then((db) => {
            this._db = db;
            resolve(db);
          }, (err) => {
            console.error(err);
            resolve(this._db);
          });
      });

    })
  }

  private weaponToArray(weapon: Weapon): Array<any> {
    let array = [];
    array.push(weapon.$nome);
    array.push(weapon.$peso);
    array.push(weapon.$valor);
    array.push(weapon.$iniciativa);
    array.push(weapon.$BaAdicional);
    array.push(weapon.$dano.$danoPuro);
    array.push(weapon.$dano.$danoRolagem);
    array.push(weapon.$dano.$qntdRolagem);
    array.push(weapon.$alcance[0]);
    array.push(weapon.$alcance[1]);
    array.push(weapon.$alcance[2]);
    array.push(weapon.$tipo[0]);
    array.push(weapon.$tipo[1]);
    array.push(weapon.$tamanho);
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

