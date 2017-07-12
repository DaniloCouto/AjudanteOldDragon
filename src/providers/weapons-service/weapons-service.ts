import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Weapon } from '../../classes/weapon/weapon';
import { SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';
import { BaseWeapons } from './base-weapons';
import { SqlCapsuleProvider } from '../test/test';

@Injectable()
export class WeaponsService {
  private sqlCapsule: SqlCapsuleProvider;
  private _db;
  private _weapons: any;

  constructor(private platform: Platform, private $sqlCapsule : SqlCapsuleProvider) {
    this.sqlCapsule = $sqlCapsule;
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db: SQLiteObject) {
        db.transaction(function (tx: SQLiteTransaction) {
          var query = 'CREATE TABLE IF NOT EXISTS weapons (' +
            '_Id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'nome	TEXT,' +
            'peso	REAL,' +
            'valor	INTEGER,' +
            'iniciativa	INTEGER,' +
            '	baAdicional	INTEGER,' +
            '	danoPuro	INTEGER,' +
            '	danoRolagem	INTEGER,' +
            '	qntdRolagem	INTEGER,' +
            '	alcancePequeno	INTEGER,' +
            '	alcanceMedio	INTEGER,' +
            '	alcanceGrande	INTEGER,' +
            '	tipo1	INTEGER,' +
            '	tipo2	INTEGER,' +
            '	tamanho	INTEGER' +
            ');'
          tx.executeSql(query, null, function (tx, res) {
            tx.executeSql('SELECT count(*) AS mycount FROM  weapons;', [], function (tx, resultSet) {
              if (resultSet.rows.item(0).mycount === 0) {
                let transaction = tx;
                BaseWeapons.BASE_WEAPONS.forEach(function (weapon) {
                  let params = service.weaponToArray(weapon);
                  let query = 'INSERT INTO weapons(nome,peso,valor,iniciativa,baAdicional,danoPuro,danoRolagem,qntdRolagem,alcancePequeno,alcanceMedio,alcanceGrande,tipo1,tipo2,tamanho) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
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

  add(weapon: Weapon): Promise<any> {
    let params = this.weaponToArray(weapon);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO weapons(nome,peso,valor,iniciativa,baAdicional,danoPuro,danoRolagem,qntdRolagem,alcancePequeno,alcanceMedio,alcanceGrande,tipo1,tipo2,tamanho) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
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
  update(weapon: Weapon, id: number): Promise<any> {
    let arrayParams = this.weaponToArray(weapon);
    arrayParams.push(id);
    return new Promise((resolve, reject) => {
      let query = 'UPDATE weapons SET nome = ? , peso = ? , valor = ? , iniciativa = ? , baAdicional = ? , danoPuro = ? , danoRolagem = ? , qntdRolagem = ? , alcancePequeno = ? , alcanceMedio = ? , alcanceGrande = ? , tipo1 = ? , tipo2 = ? , tamanho = ? WHERE _id = ?;';
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
      let query = 'DELETE FROM weapons WHERE _id = ?;';
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
  getAll(): Promise<any> {
    console.log('Breakpoint');
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql('SELECT * FROM  weapons;', [], function (tx, resultSet) {
            resolve(output(resultSet.rows));
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
          tx.executeSql('SELECT count(*) FROM  weapons;', [], function (tx, resultSet) {
            resolve(output(resultSet.rows));
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        });
      })
    });
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

