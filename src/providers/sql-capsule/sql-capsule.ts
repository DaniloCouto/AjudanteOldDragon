import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import websql from 'websql-promisified';

/*
  Generated class for the SqlCapsuleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const win: Window = window;

@Injectable()
export class SqlCapsuleProvider {
  private db: any;
  private DB_NAME: string = "oldDragonRegister.db.1";

  constructor(private platform: Platform, private sqlite: SQLite) {
  }

  openDatabase(): Promise<SQLiteObject> {
    let service = this;
    return new Promise((resolve, reject) => {
      try {
        service.platform.ready().then(() => {
          service.sqlite.create({
            name: service.DB_NAME,
            location: 'default'
          }).then((db: SQLiteObject) => {
            service.db = db;
            service.createDatabase(db).then(function () {
              resolve(service.db);
            }, function (err) {
              reject(err);
            })
          }, (err) => {
            console.error(err);
            reject(err);
          });
        });
      } catch (err) {
        reject(err);
      }
    })
  }

  createDatabase(db): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
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
      console.log(query);
      db.executeSql(query, null).then(function (res) {
        console.log("Success")
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
          var query = 'CREATE TABLE IF NOT EXISTS item (' +
            '_id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'nome	TEXT,' +
            'descricao TEXT,' +
            'peso	REAL,' +
            'valor	INTEGER' +
            ');'
          db.executeSql(query, null).then(function (res) {
            var query = 'CREATE TABLE IF NOT EXISTS magia (' +
              '_id	INTEGER,' +
              'nome	TEXT NOT NULL,' +
              'descricao	TEXT,' +
              'alcanceBase	INTEGER NOT NULL,' +
              'nivelPorAlcance	INTEGER,' +
              'alcancePorNivel	INTEGER,' +
              'duracaoBase	INTEGER NOT NULL,' +
              'nivelPorDuracao	INTEGER,' +
              'duracaoPorNivel	INTEGER,' +
              'medidaDuracaoBase	INTEGER,' +
              'medidaDuracaoAdicional	INTEGER,' +
              'tipoDuracaoBase	INTEGER,' +
              'tipoDuracaoAdicional	INTEGER,' +
              'favorito	INTEGER,' +
              'PRIMARY KEY(_id)' +
              ');';
            db.executeSql(query, null).then(function (res) {
              var query = 'CREATE TABLE IF NOT EXISTS tipoMagia (' +
                '_id	INTEGER,' +
                'nome	TEXT NOT NULL,' +
                'PRIMARY KEY(_id)' +
                ');';
              db.executeSql(query, null).then(function (res) {
                var query = 'CREATE TABLE IF NOT EXISTS tipoMagia_magia (' +
                  '_id_tipoMagia	INTEGER,' +
                  '_id_magia	INTEGER,' +
                  'nivel	INTEGER,' +
                  'FOREIGN KEY(_id_tipoMagia) REFERENCES tipoMagia(_id),' +
                  'FOREIGN KEY(_id_magia) REFERENCES magia(_id)' +
                  ');';
                db.executeSql(query, null).then(function (res) {
                  var query = 'CREATE TABLE IF NOT EXISTS raca (' +
                    '_id	INTEGER,' +
                    'nome	TEXT,' +
                    'descricao	TEXT,' +
                    'altura	INTEGER,' +
                    'peso	INTEGER,' +
                    'classeDeArmadura	INTEGER,' +
                    'bonusDeAtaque	INTEGER,' +
                    'movimentacaoBase	INTEGER,' +
                    '_id_idioma	INTEGER,' +
                    'FOREIGN KEY(_id_idioma) REFERENCES idioma(_id),' +
                    'PRIMARY KEY(_id)' +
                    ');';
                  console.log(query)
                  db.executeSql(query, null).then(function (res) {
                    var query = 'CREATE TABLE IF NOT EXISTS habilidadeRacial (' +
                      '_id	INTEGER,' +
                      '_id_raca	INTEGER,' +
                      'nome	TEXT,' +
                      'descricao TEXT,' +
                      'FOREIGN KEY(_id_raca) REFERENCES raca(_id),' +
                      'PRIMARY KEY(_id)' +
                      ');';
                    console.log(query)
                    db.executeSql(query, null).then(function (res) {
                      resolve(db);
                    }, function (err) {
                      console.error(err);
                      reject(err);
                    });
                  }, function (err) {
                    console.error(err);
                    reject(err);
                  });
                }, function (err) {
                  console.error(err);
                  reject(err);
                });
              }, function (err) {
                console.error(err);
                reject(err);
              });
            }, function (err) {
              console.error(err);
              reject(err);
            })
          }, function (err) {
            console.error(err);
            reject(err);
          });
        }, function (err) {
          console.error(err);
          reject(err);
        });
      })
    })
  }
}
