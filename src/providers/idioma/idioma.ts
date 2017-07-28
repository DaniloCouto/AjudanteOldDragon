import { RacaProvider } from '../raca/raca';
import { Idioma } from '../../classes/idioma';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from "ionic-angular";
import { SqlCapsuleProvider } from "../sql-capsule/sql-capsule";
import { SQLiteObject, SQLiteTransaction } from "@ionic-native/sqlite";
import { BaseIdioma } from "./base-idioma";

/*
  Generated class for the IdiomaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IdiomaProvider {

  constructor(private platform: Platform, private sqlCapsule : SqlCapsuleProvider) {
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db: SQLiteObject) {
        db.transaction(function (tx: SQLiteTransaction) {
          var query = 'CREATE TABLE IF NOT EXISTS idiomas (' +
            '_id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'nome	TEXT,' +
            'descricao TEXT' +
            ');'
          tx.executeSql(query, null, function (tx, res) {
            service.populateIdiomaDb(tx);
          }, function (tx, err) {
            console.error(err);
          });
        }).then(function(){},function ( err) {
          console.error(err);
        });
      }, function (err) {
        console.error(err);
      })
    });
  }

  private populateIdiomaDb(tx){
    let service = this;
    tx.executeSql('SELECT count(*) AS mycount FROM  idiomas;', [], function (tx, resultSet) {
      if (resultSet.rows.item(0).mycount === 0) {
        let transaction = tx;
        BaseIdioma.BASE_IDIOMA.forEach(function (idioma) {
          let params = [idioma.$id,idioma.$nome,idioma.$descricao];
          let query = 'INSERT INTO idiomas(_id, nome,descricao) VALUES ( ?,?,? );';
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

  add(idioma: Idioma): Promise<any> {
    let params = this.idiomaToArray(idioma);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO idiomas(nome,descricao) VALUES ( ?,? );'
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, params, function (tx, res) {
            resolve(res);
          }, function (tx, err) {
            console.error(err);
            reject(err);
          });
        });
      });
    });
  }
  update(idioma: Idioma): Promise<any> {
    let arrayParams = this.idiomaToArray(idioma);
    arrayParams.push(idioma.$id);
    return new Promise((resolve, reject) => {
      let query = 'UPDATE idiomas SET nome = ? , descricao = ? WHERE _id = ?;';
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql(query, arrayParams, function (tx, res) {
            resolve(res);
          }, function (tx, err) {
            console.error(err);
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
    let service = this;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx) {
          tx.executeSql('SELECT count(*) AS count FROM  raca WHERE _id_idioma = ?;', [id], function (tx, resultSet) {
            if(resultSet.rows.item(0).count > 0){
              reject(403);
            }else{
              let query = 'DELETE FROM idiomas WHERE _id = ?;';
              tx.executeSql(query, [id], function (tx, res) {
                resolve(res);
              }, function (tx, err) {
                console.error(err);
                reject(err);
              });
            }
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        }).then(function (sucesso) {
        }, function (erro) {
          console.error('Transaction Success Callback',erro);
          reject(erro);
        });;
      })
    });
  }
  getAll(): Promise<Array<Idioma>> {
    let output = this.sqliteOutputToArray;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql('SELECT * FROM  idiomas;', [], function (tx, resultSet) {
            let retorno = [];
            for(var i = 0; i < resultSet.rows.length; i++){
              retorno.push(new Idioma(resultSet.rows.item(i)._id,resultSet.rows.item(i).nome,resultSet.rows.item(i).descricao));
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
  getIdioma(id: number): Promise<Idioma> {
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.transaction(function (tx: SQLiteTransaction) {
          tx.executeSql('SELECT * FROM  idiomas WHERE _id = ?;', [id], function (tx, resultSet) {
            if(resultSet.rows.length){
              resolve(new Idioma(resultSet.rows.item(0)._id,resultSet.rows.item(0).nome,resultSet.rows.item(0).descricao));
            }else{
              resolve(null);
            }
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
          tx.executeSql('SELECT count(*) FROM  idiomas;', [], function (tx, resultSet) {
            resolve(output(resultSet.rows));
          }, function (tx, err) {
            console.error(err);
            reject();
          });
        });
      })
    });
  }

  private idiomaToArray(idioma: Idioma): Array<any> {
    let array = [];
    array.push(idioma.$nome);
    array.push(idioma.$descricao);
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
