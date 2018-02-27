import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SqlCapsuleProvider } from "../sql-capsule/sql-capsule";
import { SQLiteObject } from "@ionic-native/sqlite";
import { BaseEspecializacao } from './base-especializacao';
import { Especializacao } from '../../classes/especializacao';

/*
  Generated class for the RacaIdiomaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EspecializacaoProvider {
  sqlCapsule: SqlCapsuleProvider;

  constructor(private platform: Platform, private $sqlCapsule: SqlCapsuleProvider) {
    this.sqlCapsule = $sqlCapsule;
    this.platform.ready().then(() => {
      let service = this;
      this.sqlCapsule.openDatabase().then(function (db: SQLiteObject) {
        var query = 'CREATE TABLE IF NOT EXISTS especializacao (' +
          '_id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'nome	TEXT,' +
          'descricao TEXT' +
          ');'
        db.executeSql(query, null).then(function (res) {
          db.executeSql('SELECT count(*) AS mycount FROM  especializacao;', []).then(function (resultSet) {
            if (resultSet.rows.item(0).mycount === 0) {
              let capsDB = db;
              BaseEspecializacao.BASE_ESPECIALIZACAO.forEach(function (especializacao) {
                let params = [especializacao.$id, especializacao.$nome, especializacao.$descricao];
                let query = 'INSERT INTO especializacao(_id, nome,descricao) VALUES ( ?,?,? );';
                capsDB.executeSql(query, params).then(function ( resultSet) {
                }, function ( err) {
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
  addEspecializacao(especializacao: Especializacao): Promise<any> {
    let params = this.especializacaoToArraySemId(especializacao);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO raca(nome, descricao) VALUES ( ?, ? );'
      this.sqlCapsule.openDatabase().then((db) => {
        db.executeSql(query, params).then(function (res) {
          resolve();
        }, function (err) {
          console.error(err);
          reject(err);
        });
      });
    });
  }
  updateEspecializacao(especializacao: Especializacao): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        let arrayParams = service.especializacaoToArraySemId(especializacao);
        arrayParams.push(especializacao.$id);
        let query = 'UPDATE especializacao SET nome = ? , descricao = ? WHERE _id = ?;';
        db.executeSql(query, arrayParams).then(function (res) {
          resolve(res);
        }, function (err) {
          console.error(err);
          reject(err);
        });
      })
    });
  }
  deleteEspecializacao(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.executeSql('DELETE FROM especializacao WHERE _id = ?;', [id]).then(function (res) {
          resolve(res);
        }, function (err) {
          console.error(err);
          reject(err);
        });
      })
    });
  }
  getAllEspecializacao(): Promise<Array<Especializacao>> {
    let service = this;
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
        db.executeSql('SELECT * FROM  especializacao;', []).then(function (resultSet) {
          let retorno = [];
          for (var i = 0; i < resultSet.rows.length; i++) {
            retorno.push(new Especializacao(resultSet.rows.item(i)._id, resultSet.rows.item(i).nome, resultSet.rows.item(i).descricao));
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
  
  getEspecializacao(id: number): Promise<Especializacao> {
    return new Promise((resolve, reject) => {
      this.sqlCapsule.openDatabase().then((db) => {
          db.executeSql('SELECT * FROM  especializacao WHERE _id = ?;', [id]).then(function (resultSet) {
            if (resultSet.rows.length) {

              resolve(new Especializacao(resultSet.rows.item(0)._id, resultSet.rows.item(0).nome, resultSet.rows.item(0).descricao));
            } else {
              resolve(null);
            }
          }, function (err) {
            console.error(err);
            reject();
          });
      })
    });
  }

  getWithDbEspecializacao(db, id: number): Promise<Especializacao> {
    return new Promise((resolve, reject) => {
      db.executeSql('SELECT * FROM  especializacao WHERE _id = ?;', [id], function (tx, resultSet) {
        if (resultSet.rows.length) {
          resolve(new Especializacao(resultSet.rows.item(0)._id, resultSet.rows.item(0).nome, resultSet.rows.item(0).descricao));
        } else {
          resolve(null);
        }
      }, function (tx, err) {
        console.error(err);
        reject();
      });
    });
  }

  public especializacaoToArraySemId(esp: Especializacao): Array<any> {
    let array = [];
    array.push(esp.$nome);
    array.push(esp.$descricao);

    return array;

  }
  public especializacaoToArrayComId(esp: Especializacao): Array<any> {
    let array = [];
    array.push(esp.$id);
    array.push(esp.$nome);
    array.push(esp.$descricao);

    return array;

  }
}
