import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';

/*
  Generated class for the SqlCapsuleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const win: any = window;

@Injectable()
export class SqlCapsuleProvider {
  private db : SQLiteObject;
  constructor(private platform: Platform, private sqlite: SQLite) {
  }

  openDatabase(): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
      service.platform.ready().then(() => {
        service.sqlite.create({
            name: 'oldDragonRegister.db.1',
            location: 'default'
          }).then((db: SQLiteObject) => {
            service.db = db;
            service.createDatabase(this.db).then(function(){
              resolve(service.db);
            },function(err){
              reject(err);
            })
          }, (err) => {
            console.error(err);
            reject(err);
          });
      });
    })
  }

  createDatabase(db : SQLiteObject): Promise<any>{
    let service = this;
    return new Promise((resolve,reject) => {
      service.db.transaction(function (tx: SQLiteTransaction) {
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
        tx.executeSql(query, null, function (tx, res) {
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
          tx.executeSql(query, null, function (tx, res) {
            var query = 'CREATE TABLE IF NOT EXISTS item (' +
              '_id	INTEGER PRIMARY KEY AUTOINCREMENT,' +
              'nome	TEXT,' +
              'descricao TEXT,' +
              'peso	REAL,' +
              'valor	INTEGER' +
              ');'
            tx.executeSql(query, null, function (tx, res) {
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
              tx.executeSql(query, null, function (tx, res) {
                var query = 'CREATE TABLE IF NOT EXISTS tipoMagia (' +
                  '_id	INTEGER,' +
                  'nome	TEXT NOT NULL,' +
                  'PRIMARY KEY(_id)' +
                  ');';
                tx.executeSql(query, null, function (tx, res) {
                  var query = 'CREATE TABLE IF NOT EXISTS tipoMagia_magia (' +
                    '_id_tipoMagia	INTEGER,' +
                    '_id_magia	INTEGER,' +
                    'nivel	INTEGER,' +
                    'FOREIGN KEY(_id_tipoMagia) REFERENCES tipoMagia(_id),' +
                    'FOREIGN KEY(_id_magia) REFERENCES magia(_id)' +
                    ');';
                  tx.executeSql(query, null, function (tx, res) {
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
                    tx.executeSql(query, null, function (tx, res) {
                      var query = 'CREATE TABLE IF NOT EXISTS habilidadeRacial (' +
                        '_id	INTEGER,' +
                        '_id_raca	INTEGER,' +
                        'nome	TEXT,' +
                        'descricao TEXT,' +
                        'FOREIGN KEY(_id_raca) REFERENCES raca(_id),' +
                        'PRIMARY KEY(_id)' +
                        ');';
                      console.log(query)
                      tx.executeSql(query, null, function (tx, res) {
                        resolve(service.db);
                      }, function (tx, err) {
                        console.error(err);
                        reject(err);
                      });
                    }, function (tx, err) {
                      console.error(err);
                      reject(err);
                    });
                  }, function (tx, err) {
                    console.error(err);
                    reject(err);
                  });
                }, function (tx, err) {
                  console.error(err);
                  reject(err);
                });
              }, function (tx, err) {
                console.error(err);
                reject(err);
              })
            }, function (tx, err) {
              console.error(err);
              reject(err);
            });
          }, function (tx, err) {
            console.error(err);
            reject(err);
          });                
        }, function (tx, err) {
          console.error(err);
          reject(err);
        });
      }).then(function () { }, function (err) {
        console.error(err);
        reject(err);
      });
    })
  }
}
