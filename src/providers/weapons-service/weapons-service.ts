import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Weapon } from '../../classes/weapon/weapon';
import { SQLiteObject } from '@ionic-native/sqlite';
import { BaseWeapons } from './base-weapons';
import { SqlCapsuleProvider } from '../sql-capsule/sql-capsule';
import { Dano } from "../../classes/dano/dano";

@Injectable()
export class WeaponsService {
  private sqlCapsule: SqlCapsuleProvider;
  private _db;
  private _weapons: any;

  constructor(private platform: Platform, private $sqlCapsule: SqlCapsuleProvider) {
    this.sqlCapsule = $sqlCapsule;
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db: SQLiteObject) {
          var query = 'CREATE TABLE IF NOT EXISTS weapons (' +
            '_id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'nome	TEXT,' +
            'descricao TEXT,' +
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
          db.executeSql(query, null).then(function (res) {
            db.executeSql("PRAGMA table_info(weapons);", null).then(function (res) {
              let verifyFlag = false;
              for (let i = 0; i < res.rows.length; i++) {
                if (res.rows.item(i).name == 'descricao') {
                  service.populateWeaponDb(db);
                  break;
                } else if (i + 1 === res.rows.length) {
                  db.executeSql("ALTER TABLE weapons ADD COLUMN descricao TEXT;", null).then(function ( res) {
                    service.populateWeaponDb(db);
                  }, function (err) {
                    console.error(err);
                  });
                }
              }
            }, function (err) { });
          }, function (err) {
            console.error(err);
          });
      }, function (err) {
        console.error(err);
      })
    });
  }

  private populateWeaponDb(db : SQLiteObject) {
    let service = this;
    db.executeSql('SELECT count(*) AS mycount FROM  weapons;', []).then(function (resultSet) {
      if (resultSet.rows.item(0).mycount === 0) {
        let capsDb = db;
        BaseWeapons.BASE_WEAPONS.forEach(function (weapon) {
          let params = service.weaponWithIdToArray(weapon);
          let query = 'INSERT INTO weapons(_id,nome,descricao, peso,valor,iniciativa,baAdicional,danoPuro,danoRolagem,qntdRolagem,alcancePequeno,alcanceMedio,alcanceGrande,tipo1,tipo2,tamanho) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
          capsDb.executeSql(query, params).then(function (resultSet) {
          }, function (err) {
            console.error(err);
          });
        });
      }
    }, function ( err) {
      console.error(err);
    });
  }

  add(weapon: Weapon): Promise<any> {
    let params = this.weaponToArray(weapon);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO weapons(nome,descricao,peso,valor,iniciativa,baAdicional,danoPuro,danoRolagem,qntdRolagem,alcancePequeno,alcanceMedio,alcanceGrande,tipo1,tipo2,tamanho) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?);'
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql(query, params).then(function ( res) {
            resolve(res);
          }, function ( err) {
            console.error(err);
            reject(err);
          });
      });
    });
  }
  update(weapon: Weapon): Promise<any> {
    let arrayParams = this.weaponToArray(weapon);
    arrayParams.push(weapon.$id);
    return new Promise((resolve, reject) => {
      let query = 'UPDATE weapons SET nome = ? , descricao = ?, peso = ? , valor = ? , iniciativa = ? , baAdicional = ? , danoPuro = ? , danoRolagem = ? , qntdRolagem = ? , alcancePequeno = ? , alcanceMedio = ? , alcanceGrande = ? , tipo1 = ? , tipo2 = ? , tamanho = ? WHERE _id = ?;';
      this.sqlCapsule.openDatabase().then((db) => {
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
      let query = 'DELETE FROM weapons WHERE _id = ?;';
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql(query, [id]).then(function ( res) {
            resolve(res);
          }, function ( err) {
            console.error(err);
            reject(err);
          });
      })
    });
  }
  getAll(): Promise<Array<Weapon>> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql('SELECT * FROM  weapons;', []).then(function ( resultSet) {
            let retorno = [];
            for (var i = 0; i < resultSet.rows.length; i++) {
              retorno.push(new Weapon(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor,
                resultSet.rows.item(i).iniciativa, resultSet.rows.item(i).baAdicional,
                new Dano(resultSet.rows.item(i).danoPuro, resultSet.rows.item(i).danoRolagem, resultSet.rows.item(i).qntdRolagem),
                [resultSet.rows.item(i).alcancePequeno, resultSet.rows.item(i).alcanceMedio, resultSet.rows.item(i).alcanceGrande],
                resultSet.rows.item(i).tamanho, [resultSet.rows.item(i).tipo1, resultSet.rows.item(i).tipo2]
              ))
            }
            resolve(retorno);
          }, function ( err) {
            console.error(err);
            reject();
          });
      })
    });
  }

  getArma(id: number): Promise<Weapon> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql('SELECT * FROM  weapons WHERE _id = ?;', [id]).then(function ( resultSet) {
            let retorno = [];
            let i = 0;
            if (resultSet.rows.length) {
              resolve(new Weapon(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor,
                resultSet.rows.item(i).iniciativa, resultSet.rows.item(i).baAdicional,
                new Dano(resultSet.rows.item(i).danoPuro, resultSet.rows.item(i).danoRolagem, resultSet.rows.item(i).qntdRolagem),
                [resultSet.rows.item(i).alcancePequeno, resultSet.rows.item(i).alcanceMedio, resultSet.rows.item(i).alcanceGrande],
                resultSet.rows.item(i).tamanho, [resultSet.rows.item(i).tipo1, resultSet.rows.item(i).tipo2]
              ));
            } else {
              resolve(null);
            }
          }, function ( err) {
            console.error(err);
            reject();
          });
      })
    });
  }

  getWithDb(db, id: number): Promise<Weapon> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      db.executeSql('SELECT * FROM  weapons WHERE _id = ?;', [id]).then(function (resultSet) {
        let retorno = [];
        let i = 0;
        if (resultSet.rows.length) {
          resolve(new Weapon(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao, resultSet.rows.item(i).peso, resultSet.rows.item(i).valor,
            resultSet.rows.item(i).iniciativa, resultSet.rows.item(i).baAdicional,
            new Dano(resultSet.rows.item(i).danoPuro, resultSet.rows.item(i).danoRolagem, resultSet.rows.item(i).qntdRolagem),
            [resultSet.rows.item(i).alcancePequeno, resultSet.rows.item(i).alcanceMedio, resultSet.rows.item(i).alcanceGrande],
            resultSet.rows.item(i).tamanho, [resultSet.rows.item(i).tipo1, resultSet.rows.item(i).tipo2]
          ));
        } else {
          resolve(null);
        }
      })
    });
  }

  getCount(): Promise<any> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql('SELECT count(*) FROM  weapons;', []).then(function ( resultSet) {
            resolve(output(resultSet.rows));
          }, function ( err) {
            console.error(err);
            reject();
          });
      })
    });
  }

  private weaponToArray(weapon: Weapon): Array<any> {
    let array = [];
    array.push(weapon.$nome);
    array.push(weapon.$descricao);
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
  private weaponWithIdToArray(weapon: Weapon): Array<any> {
    let array = [];
    array.push(weapon.$id);
    array.push(weapon.$nome);
    array.push(weapon.$descricao);
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

