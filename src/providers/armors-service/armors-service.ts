import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Armadura } from '../../classes/armadura/armadura';
import { BaseArmaduras } from './base-armors';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqlCapsuleProvider } from '../sql-capsule/sql-capsule';

@Injectable()
export class ArmorsService {
  private _db;
  private sqlCapsule: SqlCapsuleProvider;

  constructor(private platform: Platform, private sqlite: SQLite, private $sqlCapsule: SqlCapsuleProvider) {
    this.sqlCapsule = $sqlCapsule;
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db: SQLiteObject) {
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
          db.executeSql(query, null).then(function (res) {
            db.executeSql("PRAGMA table_info(armors);", null).then(function (res) {
              let verifyFlag = false;
              for (let i = 0; i < res.rows.length; i++) {
                if (res.rows.item(i).name == 'descricao') {
                  service.populateArmorDb(db);
                  break;
                } else if (i + 1 === res.rows.length) {
                  db.executeSql("ALTER TABLE armors ADD COLUMN descricao TEXT;", null).then(function (res) {
                    service.populateArmorDb(db);
                  }, function (err) {
                    console.error(err);
                  });
                }
              }
            }, function ( err) { });
            // 

          }, function ( err) {
            console.error(err);

          });
      }, function (err) {
        console.error(err);
      })
    });
  }

  private populateArmorDb(db : SQLiteObject) {
    let service = this;
    db.executeSql('SELECT count(*) AS mycount FROM  armors;', []).then(function (resultSet) {
      if (resultSet.rows.item(0).mycount === 0) {
        let capsDB = db;
        BaseArmaduras.BASE_ARMADURA.forEach(function (weapon) {
          let params = service.armorWithIdToArray(weapon);
          let query = 'INSERT INTO armors(_id,nome,descricao,peso,valor,bonusCa,movimentacao,tipo,limiteAjusteDes) VALUES ( ?,?,?,?,?,?,?,?,?);';
          capsDB.executeSql(query, params).then(function (resultSet) {
          }, function (err) {
            console.error(err);
          });
        });
      }
    }, function (err) {
      console.error(err);
    });
  }

  add(armor: Armadura): Promise<any> {
    let params = this.armorToArray(armor);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO armors(nome,descricao,peso,valor,bonusCa,movimentacao,tipo,limiteAjusteDes) VALUES ( ?,?,?,?,?,?,?,?);';
      this.openDatabase().then((db) => {
          db.executeSql(query, params).then(function (res) {
            resolve(res);
          }, function (err) {
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
          db.executeSql(query, arrayParams).then(function (res) {
            resolve(res);
          }, function ( err) {
            console.error(err);
            reject(err);
          });
      })
    });
  }
  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = 'DELETE FROM armors WHERE _id = ?;';
      this.openDatabase().then((db) => {
          db.executeSql(query, [id]).then(function (res) {
            resolve(res);
          }, function ( err) {
            reject(err);
          });
      })
    });
  }
  getAll(): Promise<Array<Armadura>> {
    let output = this.sqliteOutputToArray;

    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
          db.executeSql('SELECT * FROM  armors;', []).then(function (resultSet) {
            let retorno = [];
            for (var i = 0; i < resultSet.rows.length; i++) {
              retorno.push(new Armadura(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor, resultSet.rows.item(i).bonusCa, resultSet.rows.item(i).movimentacao, resultSet.rows.item(i).tipo, resultSet.rows.item(i).limiteAjusteDes, resultSet.rows.item(i).equipado))
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

  get(id: number): Promise<Armadura> {
    let output = this.sqliteOutputToArray;

    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        db.executeSql('SELECT * FROM armors WHERE _id = ?;', [id]).then(function (resultSet) {
          let retorno = [];
          let i = 0;
          if (resultSet.rows.length) {
            resolve(new Armadura(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor, resultSet.rows.item(i).bonusCa, resultSet.rows.item(i).movimentacao, resultSet.rows.item(i).tipo, resultSet.rows.item(i).limiteAjusteDes, 0));
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

  getWithDb(db : SQLiteObject, id: number): Promise<Armadura> {
    let output = this.sqliteOutputToArray;

    return new Promise((resolve, reject) => {
      console.log("Vamo pegar esse id na tabela de armadura",id);
      // id
        db.executeSql('SELECT * FROM  armors WHERE _id = ?;', [id]).then(function (resultSet) {
            let retorno = [];
            let i = 0;
            console.log("Resultado do SELECT ",resultSet);
            if (resultSet.rows.length) {
              console.log(resultSet.rows.item(i));
              resolve(new Armadura(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor, resultSet.rows.item(i).bonusCa, resultSet.rows.item(i).movimentacao, resultSet.rows.item(i).tipo, resultSet.rows.item(i).limiteAjusteDes, 0));
            } else {
              resolve(null);
            }
          }, function (err) {
            console.error(err);
            reject();
          });
    });
  }

  private openDatabase(): Promise<SQLiteObject> {
    return this.sqlCapsule.openDatabase();
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
  private armorWithIdToArray(armor: Armadura): Array<any> {
    let array = [];
    array.push(armor.$id);
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

