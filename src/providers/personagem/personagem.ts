import { BolsaMoedas } from '../../classes/bolsaMoedas';
import { Atributos } from '../../classes/atributos';
import { Ladino } from '../../classes/classes/ladino';
import { Clerigo } from '../../classes/classes/clerigo';
import { BaseClass } from '../../classes/classes/classe';
import { Idioma } from '../../classes/idioma';
import { Armadura } from '../../classes/armadura/armadura';
import { Weapon } from '../../classes/weapon/weapon';
import { WeaponsService } from '../weapons-service/weapons-service';
import { ItemComumProvider } from '../item-comum/item-comum';
import { RacaIdiomaProvider } from '../raca-idioma/raca-idioma';
import { SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { SqlCapsuleProvider } from '../sql-capsule/sql-capsule';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ArmorsService } from "../armors-service/armors-service";
import { MagiaService } from "../magia-service/magia-service";
import { Personagem } from '../../classes/personagem';
import { Magia } from '../../classes/magia/magia';
import { Item } from '../../classes/item';
import { HomemDeArmas } from '../../classes/classes/homemdearmas';
import { Mago } from '../../classes/classes/mago';
import { Raca } from '../../classes/raca';
import { BasePersonagem } from './base-personagem';

/*
  Generated class for the PersonagemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PersonagemProvider {
  private isInitialized : Promise<any>

  constructor(private platform: Platform, private sqlCapsule: SqlCapsuleProvider, private racaProvider: RacaIdiomaProvider, private itemProvider: ItemComumProvider, private armasProvider: WeaponsService, private armaduraProvider: ArmorsService, private magiaProvider: MagiaService) {
    let service = this;
    this.isInitialized = new Promise((resolve, reject)=>{
      this.platform.ready().then(() => {
        this.sqlCapsule.openDatabase().then(function (db) {
          var query = 'CREATE TABLE IF NOT EXISTS personagem (' +
            '_id	INTEGER,' +
            'nome	TEXT,' +
            'descricao	TEXT,' +
            '_id_Raca	INTEGER,' +
            '_id_Classe	INTEGER,' +
            'forca	INTEGER,' +
            'destreza	INTEGER,' +
            'constituicao	INTEGER,' +
            'inteligencia	INTEGER,' +
            'sabedoria	INTEGER,' +
            'carisma	INTEGER,' +
            'xpAtual	INTEGER,' +
            'cobre	INTEGER,' +
            'prata	INTEGER,' +
            'ouro	INTEGER,' +
            'esmeralda	INTEGER,' +
            'platina	INTEGER,' +
            'FOREIGN KEY(_id_Raca) REFERENCES raca(_id),' +
            'PRIMARY KEY(_id)' +
            ');';
          console.log(query);
          db.executeSql(query, null, function (res) {
            var query = 'CREATE TABLE IF NOT EXISTS inventarioItem (' +
              '_id_personagem	INTEGER,' +
              '_id_item	INTEGER,' +
              'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
              'FOREIGN KEY(_id_item) REFERENCES item(_id)' +
              ');';
            console.log(query);
            db.executeSql(query, null, function (res) {
              var query = 'CREATE TABLE IF NOT EXISTS inventarioArma (' +
                '_id_personagem	INTEGER,' +
                '_id_arma	INTEGER,' +
                'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
                'FOREIGN KEY(_id_arma) REFERENCES weapons(_id)' +
                ');';
              console.log(query);
              db.executeSql(query, null, function (res) {
                var query = 'CREATE TABLE IF NOT EXISTS inventarioArmadura (' +
                  '_id_personagem	INTEGER,' +
                  '_id_armadura	INTEGER,' +
                  'equipado	INTEGER,' +
                  'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
                  'FOREIGN KEY(_id_armadura) REFERENCES armors(_id)' +
                  ');';
                console.log(query);
                db.executeSql(query, null, function (res) {
                  var query = 'CREATE TABLE IF NOT EXISTS personagem_magias (' +
                    '_id_personagem	INTEGER,' +
                    '_id_magia INTEGER,' +
                    'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
                    'FOREIGN KEY(_id_magia) REFERENCES magia(_id)' +
                    ');';
                  console.log(query);
                  db.executeSql(query, null, function (res) {
                    var query = 'CREATE TABLE IF NOT EXISTS personagem_idiomas (' +
                      '_id_personagem	INTEGER,' +
                      '_id_idioma INTEGER,' +
                      'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
                      'FOREIGN KEY(_id_idioma) REFERENCES idioma(_id)' +
                      ');';
                    console.log(query);
                    db.executeSql(query, null, function (res) {
                      var query = 'CREATE TABLE IF NOT EXISTS personagem_classes (' +
                        '_id_personagem	INTEGER,' +
                        'classe INTEGER,' +
                        'nivel INTEGER,' +
                        'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id)' +
                        ');';
                      console.log(query);
                      db.executeSql(query, null, function (res) {
                        service.get
                        BasePersonagem.BASE_PERSONAGEM.forEach(function (personagem) {
                          service.add(personagem).then(function(resp){
                            resolve(resp);
                          },function(err){
                            reject(err);
                          });
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
        }, function (err) {
          console.error(err);
          reject(err);
        })
      });
    })
  }

  isBuilded(): Promise<any>{
    return this.isInitialized;
  }

  add(personagem: Personagem): Promise<any> {
    let service = this;
    let params = this.personagemToParams(personagem);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO personagem(nome, descricao, _id_Raca, _id_Classe, forca, destreza, constituicao, inteligencia, sabedoria, carisma, xpAtual, cobre, prata, ouro, esmeralda, platina) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?  );'
      this.sqlCapsule.openDatabase().then((db) => {
        db.executeSql(query, params, function (res) {
          service.addItemPersonagem(db, res.insertId, personagem.$inventario).then(function (tx) {
            service.addMagiaPersonagem(db, res.insertId, personagem.$magias).then(function (tx) {
              service.addIdiomaPersonagem(db, res.insertId, personagem.$idiomas).then(function (tx) {
                service.addClassePersonagem(db, res.insertId, personagem.$classe).then(function (tx) {
                  resolve();
                }, function (err) {
                  reject(err);
                });
              }, function (err) {
                reject(err);
              })
            }, function (err) {
              reject(err);
            })
          }, function (err) {
            reject(err);
          })
        }, function (tx, err) {
          console.error(err);
          reject(err);
        })
      });
    });
  }

  getAll(): Promise<Array<Personagem>> {
    let service = this;
    return new Promise((resolve, reject) => {
      console.log('Get all persongagens')
      let query = 'SELECT _id FROM personagem;'
      this.sqlCapsule.openDatabase().then((db) => {
        db.executeSql(query, [], function (res) {
          let promises: Array<Promise<Personagem>> = [];
          let retorno: Array<Personagem> = []
          if (res.rows.length) {
            console.log(res.rows);
            for (let i = 0; i < res.rows.length; i++) {
              console.log(res.rows.item(i));
              promises.push(service.get(res.rows.item(i)._id));
            }
            console.log("Promises Starting:");
            Promise.all(promises).then(function (result: Array<Personagem>) {
              resolve(result);
            }, function (err) {
              reject();
            })
          } else {
            resolve([]);
          }
        }, function (tx, err) {
          console.error(err);
          reject(err);
        });
      });
    });
  }

  get( id: number ): Promise<Personagem> {
    let service = this;
    console.log('GET STARTED', id);
    return new Promise((resolve, reject) => {
      console.log('PROMISE RUNING', id);
      this.sqlCapsule.openDatabase().then((db) => {
        console.log('DB OPENNED', id);
        db.executeSql("SELECT * FROM personagem WHERE _id = ?;", [id], function (personagem) {
          console.log('personagem gotten', personagem);
          let promises = [];
          if (personagem.rows.length) {
            service.getItemPersonagem(db, id).then(function (inventario: Array<Item>) {
              console.log('Itens', inventario );
              service.getMagiaPersonagem(db, id).then(function (magias: Array<Magia>) {
                console.log('magias', magias );
                service.getIdiomaPersonagem(db, id).then(function (idiomas: Array<Idioma>) {
                  console.log('idiomas', idiomas );
                  service.getClassePersonagem(db, id).then(function (classe: BaseClass) {
                    console.log('classe', classe );
                    service.racaProvider.getRaca(personagem.rows.item(0)._id_Raca).then(function (raca: Raca) {
                      console.log('raca', raca );
                      console.log('Personagem',personagem.rows.item(0));
                      resolve(new Personagem(
                        personagem.rows.item(0)._id,
                        personagem.rows.item(0).nome,
                        personagem.rows.item(0).descricao,
                        raca,
                        classe,
                        idiomas,
                        new Atributos(
                          personagem.rows.item(0).forca,
                          personagem.rows.item(0).destreza,
                          personagem.rows.item(0).constituicao,
                          personagem.rows.item(0).inteligencia,
                          personagem.rows.item(0).sabedoria,
                          personagem.rows.item(0).carisma
                        ),
                        magias,
                        personagem.rows.item(0).xpAtual,
                        inventario,
                        new BolsaMoedas(
                          personagem.rows.item(0).cobre,
                          personagem.rows.item(0).prata,
                          personagem.rows.item(0).ouro,
                          personagem.rows.item(0).esmeralda,
                          personagem.rows.item(0).platina
                        )
                      ));
                    }, function (err) {
                      reject(err);
                    })
                  }, function (err) {
                    reject(err);
                  });
                }, function (err) {
                  reject(err);
                })
              }, function (err) {
                reject(err);
              })
            }, function (err) {
              reject(err);
            })
          } else {
            resolve(null);
          }
        }, function (tx, err) {
          console.error(err);
          reject(err);
        });
      },function(err){
        console.error(err)
        reject(err)
      });
    })
  }

  private getItemPersonagem(db, personagemId: number): Promise<Array<Item>> {
    let service = this;
    return new Promise((resolve, reject) => {
      console.log('ITEM_PERSONAGEM');
      let inventario: Array<Item> = [];
      let promisesItens: Array<Promise<Item>> = [];
      let promisesArmaduras: Array<Promise<Armadura>> = [];
      let promisesArmas: Array<Promise<Weapon>> = [];
      db.transaction(function (transaction: SQLiteTransaction) {
        transaction.executeSql('SELECT _id_arma FROM inventarioArma WHERE _id_personagem = ?;', [personagemId], function (tx, resultSet) {
          if (resultSet.rows.length) {
            for (let i = 0; i < resultSet.rows.length; i++) {
              promisesArmas.push(service.armasProvider.getWithDb(transaction, resultSet.rows.item(i)))
            }
          }
          tx.executeSql('SELECT _id_armadura, equipado FROM inventarioArmadura WHERE _id_personagem = ?;', [personagemId], function (tx, resultSet) {
            if (resultSet.rows.length) {
              for (let i = 0; i < resultSet.rows.length; i++) {
                promisesArmaduras.push(service.armaduraProvider.getWithDb(transaction, resultSet.rows.item(i)));
              }
            }
            tx.executeSql('SELECT _id_item FROM inventarioItem WHERE _id_personagem = ?;', [personagemId], function (tx, resultSet) {
              if (resultSet.rows.length) {
                for (let i = 0; i < resultSet.rows.length; i++) {
                  promisesItens.push(service.itemProvider.getWithDb(transaction, resultSet.rows.item(i)));
                }
              }
              Promise.all(promisesArmas).then(function (armas: Array<Weapon>) {
                if (armas instanceof Array)
                  inventario.concat(armas);
                Promise.all(promisesArmaduras).then(function (armaduras: Array<Armadura>) {
                  if (armaduras instanceof Array)
                    inventario.concat(armaduras);
                  Promise.all(promisesItens).then(function (itens: Array<Item>) {
                    if (itens instanceof Array)
                      inventario.concat(itens);
                    transaction.finish();
                    resolve(inventario);
                  }, function () {
                    reject();
                  })
                }, function () {
                  reject();
                })
              }, function () {
                reject();
              })
            }, function (tx, err) {
              reject(err);
              console.error(err);
            });
          }, function (tx, err) {
            reject(err);
            console.error(err);
          });
        }, function (tx, err) {
          reject(err);
          console.error(err);
        });
      }, function (tx, err) {
        reject(err);
        console.error(err);
      });
    });
  }

  private transactioQ(tx: SQLiteTransaction, query: string, params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      tx.executeSql(query, params, function (tx, resultSet) {
        resolve(resultSet);
      }, function (tx, err) {
        reject(err);
      })
    });
  }
  private addItemPersonagem(db, personagemId: number, itens: Array<Item>): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
      let promises: Array<Promise<any>> = [];
      db.transaction(function (tx: SQLiteTransaction) {
        for (var i = 0; i < itens.length; i++) {
          let queryItem: string;
          let paramsItem = [personagemId, itens[i].$id];
          if (itens[i] instanceof Weapon) {
            queryItem = 'INSERT INTO inventarioArma(_id_personagem, _id_arma) VALUES ( ?, ? );';
          } else if (itens[i] instanceof Armadura) {
            queryItem = 'INSERT INTO inventarioArmadura(_id_personagem, _id_armadura) VALUES ( ?, ? );';
          } else {
            queryItem = 'INSERT INTO inventarioItem(_id_personagem, _id_item) VALUES ( ?, ? );';
          }
          promises.push(service.transactioQ(tx, queryItem, paramsItem));
        };
        Promise.all(promises).then(function (resultSets) {
          tx.finish();
          resolve(resultSets);
        }, function (err) {
          reject(err);
        })
      }, function (error) {
        console.log('Transaction ERROR: ' + error.message);
      })
      if (itens.length == 0) {
        resolve();
      }
    });
  }

  private addMagiaPersonagem(db, personagemId: number, magias: Array<Magia>): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: SQLiteTransaction) {
        let promises: Array<Promise<any>> = [];;
        for (var i = 0; i < magias.length; i++) {
          let queryItem = 'INSERT INTO personagem_magias(_id_personagem, _id_magia) VALUES ( ?, ? );';
          let paramsItem = [personagemId, magias[i].$id]
          console.log('Add Magias', queryItem, tx)
          promises.push(service.transactioQ(tx, queryItem, paramsItem));
        }
        Promise.all(promises).then(function (resultSets) {
          tx.finish();
          resolve(resultSets);
        }, function (err) {
          reject(err);
        })
        if (magias.length == 0) {
          resolve(tx);
        }
      })
    })
  }

  private getMagiaPersonagem(db, personagemId: number): Promise<Array<Magia>> {
    let service = this;
    return new Promise((resolve, reject) => {
      db.transaction(function (transaction: SQLiteTransaction) {
        transaction.executeSql('SELECT _id_magia FROM personagem_magias WHERE _id_personagem = ? ;', [personagemId], function (tx, resultSet) {
          let promise: Array<Promise<Magia>> = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            promise.push(service.magiaProvider.getWithDb(transaction,resultSet.rows.item(i)));
          }
          Promise.all(promise).then(function (magias: Array<Magia>) {
            transaction.finish();
            resolve(magias);
          }, function (err) {
            reject(err);
          })
        }, function (tx, err) {
          reject(err);
          console.error(err);
        });
      }, function (tx, err) {
        reject(err);
        console.error(err);
      });
    });
  }

  private addIdiomaPersonagem(db, personagemId: number, idiomas: Array<Idioma>): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
      db.transaction(function (tx: SQLiteTransaction) {
        let promises: Array<Promise<any>> = [];
        for (var i = 0; i < idiomas.length; i++) {
          let queryItem = 'INSERT INTO personagem_idiomas(_id_personagem, _id_idioma) VALUES ( ?, ? );';
          let paramsItem = [personagemId, idiomas[i].$id];
          console.log('Add Magias', queryItem, tx);
          promises.push(service.transactioQ(tx, queryItem, paramsItem));
        }
        Promise.all(promises).then(function (resultSets) {
          tx.finish();
          resolve(resultSets);
        }, function (err) {
          reject(err);
        })
        if (idiomas.length == 0) {
          resolve(tx);
        }
      });
    })
  }

  private getIdiomaPersonagem(db, personagemId: number): Promise<Array<Idioma>> {
    let service = this;
    return new Promise((resolve, reject) => {
      let promises: Array<Promise<Idioma>> = [];
      let retorno: Array<Idioma> = [];
      db.transaction(function (transaction: SQLiteTransaction) {
        transaction.executeSql('SELECT _id_idioma FROM personagem_idiomas WHERE _id_personagem = ?;', [personagemId], function (tx, resultSet) {
          for (let i = 0; i < resultSet.rows.length; i++) {
            promises.push(service.racaProvider.getIdioma(resultSet.rows.item(i)._id_idioma))
          }
          Promise.all(promises).then(function (idiomas: Array<Idioma>) {
            transaction.finish();
            resolve(idiomas);
          }, function (err) {
            reject(err);
          })
        }, function (tx, err) {
          reject(err);
          console.error(err);
        });
      }, function (tx, err) {
        reject(err);
        console.error(err);
      });
    });
  }

  private addClassePersonagem(db, personagemId: number, classe: BaseClass): Promise<any> {
    return new Promise((resolve, reject) => {
      let queryItem = 'INSERT INTO personagem_classes(_id_personagem, classe, nivel) VALUES ( ?, ?, ? );';
      let paramsItem = [personagemId, classe.$classe, classe.$nivel];
      db.executeSql(queryItem, paramsItem, function (tx, resultSet) {
        resolve(tx);
      }, function (tx, err) {
        reject(err);
        console.error(err);
      });
    });
  }

  private getClassePersonagem(db, personagemId: number): Promise<BaseClass> {
    return new Promise((resolve, reject) => {
      console.log('Banco',db);
      db.executeSql('SELECT classe, nivel FROM personagem_classes WHERE _id_personagem = ?;', [personagemId], function (resultSet) {
        console.log('Quey',resultSet);
        if (resultSet.rows.length) {
          console.log('Quey',resultSet);
          let classe = resultSet.rows.item(0).classe;
          let nivel = resultSet.rows.item(0).nivel;
          switch (classe) {
            case 0:
              resolve(new Clerigo(nivel))
              break;
            case 1:
              resolve(new HomemDeArmas(nivel))
              break;
            case 2:
              resolve(new Mago(nivel))
              break;
            case 3:
              resolve(new Ladino(nivel))
              break;
            default:
              resolve(null)
              break;
          }
        } else {
          resolve(null);
        }
      }, function (tx, err) {
        reject(err);
        console.error(err);
      });
    });
  }

  public personagemToParams(personagem: Personagem): Array<any> {
    let returnArray = [];

    returnArray.push(personagem.$nome);
    returnArray.push(personagem.$descricao);
    returnArray.push(personagem.$raca.$id);
    returnArray.push(personagem.$atributos.$forca);
    returnArray.push(personagem.$atributos.$destreza);
    returnArray.push(personagem.$atributos.$constituicao);
    returnArray.push(personagem.$atributos.$inteligencia);
    returnArray.push(personagem.$atributos.$sabedoria);
    returnArray.push(personagem.$atributos.$carisma);
    returnArray.push(personagem.$xpAtual);
    returnArray.push(personagem.$bolsaMoedas.$cobre);
    returnArray.push(personagem.$bolsaMoedas.$prata);
    returnArray.push(personagem.$bolsaMoedas.$ouro);
    returnArray.push(personagem.$bolsaMoedas.$esmeralda);
    returnArray.push(personagem.$bolsaMoedas.$platina);

    return returnArray;
  }

}
