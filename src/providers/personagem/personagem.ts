import { BolsaMoedas } from '../../classes/bolsaMoedas';
import { Atributos } from '../../classes/atributos';
import { Ladino } from '../../classes/classes/ladino';
import { Clerigo } from '../../classes/classes/clerigo';
import { Idioma } from '../../classes/idioma';
import { Armadura } from '../../classes/armadura/armadura';
import { Weapon } from '../../classes/weapon/weapon';
import { WeaponsService } from '../weapons-service/weapons-service';
import { ItemComumProvider } from '../item-comum/item-comum';
import { RacaIdiomaProvider } from '../raca-idioma/raca-idioma';
import { SQLiteObject } from '@ionic-native/sqlite';
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
import { ConversoresClasses } from '../../classes/classes/conversoresClasses';
import { IClasse } from '../../classes/classes/Iclasse';

/*
  Generated class for the PersonagemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PersonagemProvider {
  private isInitialized: Promise<any>

  constructor(private platform: Platform, private sqlCapsule: SqlCapsuleProvider, private racaProvider: RacaIdiomaProvider, private itemProvider: ItemComumProvider, private armasProvider: WeaponsService, private armaduraProvider: ArmorsService, private magiaProvider: MagiaService) {
    let service = this;
    this.isInitialized = new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.sqlCapsule.openDatabase().then(function (db) {
          var query = 'CREATE TABLE IF NOT EXISTS personagem (' +
            '_id	INTEGER,' +
            'nome	TEXT,' +
            'descricao	TEXT,' +
            '_id_Raca	INTEGER,' +
            'especializacao	TEXT,' +
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
          db.executeSql(query, null).then(function (res) {
            var query = 'CREATE TABLE IF NOT EXISTS inventarioItem (' +
              '_id_personagem	INTEGER,' +
              '_id_item	INTEGER,' +
              'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
              'FOREIGN KEY(_id_item) REFERENCES item(_id)' +
              ');';
            console.log(query);
            db.executeSql(query, null).then(function (res) {
              var query = 'CREATE TABLE IF NOT EXISTS inventarioArma (' +
                '_id_personagem	INTEGER,' +
                '_id_arma	INTEGER,' +
                'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
                'FOREIGN KEY(_id_arma) REFERENCES weapons(_id)' +
                ');';
              console.log(query);
              db.executeSql(query, null).then(function (res) {
                var query = 'CREATE TABLE IF NOT EXISTS inventarioArmadura (' +
                  '_id_personagem	INTEGER,' +
                  '_id_armadura	INTEGER,' +
                  'equipado	INTEGER,' +
                  'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
                  'FOREIGN KEY(_id_armadura) REFERENCES armors(_id)' +
                  ');';
                console.log(query);
                db.executeSql(query, null).then(function (res) {
                  var query = 'CREATE TABLE IF NOT EXISTS personagem_magias (' +
                    '_id_personagem	INTEGER,' +
                    '_id_magia INTEGER,' +
                    'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
                    'FOREIGN KEY(_id_magia) REFERENCES magia(_id)' +
                    ');';
                  console.log(query);
                  db.executeSql(query, null).then(function (res) {
                    var query = 'CREATE TABLE IF NOT EXISTS personagem_idiomas (' +
                      '_id_personagem	INTEGER,' +
                      '_id_idioma INTEGER,' +
                      'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id),' +
                      'FOREIGN KEY(_id_idioma) REFERENCES idioma(_id)' +
                      ');';
                    console.log(query);
                    db.executeSql(query, null).then(function (res) {
                      var query = 'CREATE TABLE IF NOT EXISTS personagem_classes (' +
                        '_id_personagem	INTEGER,' +
                        'classe INTEGER,' +
                        'xp INTEGER,' +
                        'FOREIGN KEY(_id_personagem) REFERENCES personagem(_id)' +
                        ');';
                      console.log(query);
                      db.executeSql(query, null).then(function (res) {
                        service.getCount().then(function (quantidade) {
                          if (quantidade == 0) {
                            BasePersonagem.BASE_PERSONAGEM.forEach(function (personagem) {
                              service.add(personagem).then(function (resp) {
                                resolve(resp);
                              }, function (err) {
                                reject(err);
                              });
                            })
                          } else {
                            resolve();
                          }
                        })
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
      });
    })
  }

  isBuilded(): Promise<any> {
    return this.isInitialized;
  }

  add(personagem: Personagem): Promise<any> {
    let service = this;
    let params = this.personagemToParams(personagem);
    return new Promise((resolve, reject) => {
      let query = 'INSERT INTO personagem(nome, descricao, _id_Raca, especializacao, forca, destreza, constituicao, inteligencia, sabedoria, carisma, xpAtual, cobre, prata, ouro, esmeralda, platina) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?  );'
      this.sqlCapsule.openDatabase().then((db) => {
        db.executeSql(query, params).then(function (res) {
          service.addItemPersonagem(db, res.insertId, personagem.$inventario).then(function (tx) {
            service.addMagiaPersonagem(db, res.insertId, personagem.$magias).then(function (tx) {
              service.addIdiomaPersonagem(db, res.insertId, personagem.$idiomas).then(function (tx) {
                service.addClassesPersonagem(db, res.insertId, personagem.$classes).then(function (tx) {
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
        }, function (err) {
          console.error(err);
          reject(err);
        })
      });
    });
  }

  getCount(): Promise<Number> {
    let service = this;
    return new Promise((resolve, reject) => {
      console.log('Get all persongagens')
      let query = 'SELECT count(*) as quantidade FROM personagem;'
      this.sqlCapsule.openDatabase().then((db) => {
        db.executeSql(query, []).then(function (res) {
          console.log(res, res.rows, res.rows.item(0), res.rows.item(0).quantidade);
          resolve(res.rows.item(0).quantidade);
        }, function (err) {
          console.error(err);
          reject(err);
        });
      });
    });
  }

  getAll(): Promise<Array<Personagem>> {
    let service = this;
    return new Promise((resolve, reject) => {
      console.log('Get all persongagens')
      let query = 'SELECT _id FROM personagem;'
      this.sqlCapsule.openDatabase().then((db) => {
        db.executeSql(query, []).then(function (res) {
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
        }, function (err) {
          console.error(err);
          reject(err);
        });
      });
    });
  }

  get(id: number): Promise<Personagem> {
    let service = this;
    console.log('GET STARTED', id);
    return new Promise((resolve, reject) => {
      console.log('PROMISE RUNING', id);
      this.sqlCapsule.openDatabase().then((db) => {
        console.log('DB OPENNED', id);
        db.executeSql("SELECT * FROM personagem WHERE _id = ?;", [id]).then(function (personagem) {

          let promises = [];
          if (personagem.rows.length) {
            console.log('personagem gotten', personagem.rows.item(0));
            service.getItemPersonagem(id).then(function (inventario: Array<Item>) {
              console.log('Itens', inventario);
              service.getMagiaPersonagem(db, id).then(function (magias: Array<Magia>) {
                console.log('magias', magias);
                service.getIdiomaPersonagem(db, id).then(function (idiomas: Array<Idioma>) {
                  console.log('idiomas', idiomas);
                  service.getClassesPersonagem(db, id).then(function (classe: Array<IClasse>) {
                    console.log('classe', classe);
                    service.racaProvider.getRaca(personagem.rows.item(0)._id_Raca).then(function (raca: Raca) {
                      console.log('raca', raca);
                      console.log('Personagem', personagem.rows.item(0));
                      resolve(new Personagem(
                        personagem.rows.item(0)._id,
                        personagem.rows.item(0).nome,
                        personagem.rows.item(0).descricao,
                        raca,
                        classe,
                        personagem.rows.item(0).especializacao,
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
        }, function (err) {
          console.error(err);
          reject(err);
        });
      }, function (err) {
        console.error(err)
        reject(err)
      });
    })
  }

  private getItemPersonagem(personagemId: number): Promise<Array<Item>> {
    let service = this;
    return new Promise((resolve, reject) => {
      console.log('ITEM_PERSONAGEM');
      let inventario: Array<Item> = [];
      let promisesItens: Array<Promise<Item>> = [];
      let promisesArmaduras: Array<Promise<Armadura>> = [];
      let promisesArmas: Array<Promise<Weapon>> = [];
      this.sqlCapsule.openDatabase().then(db => {
        db.executeSql('SELECT _id_armadura, equipado FROM inventarioArmadura WHERE _id_personagem = ?;', [personagemId]).then(function (resultSet) {
          if (resultSet.rows.length) {
            for (let i = 0; i < resultSet.rows.length; i++) {
              console.log(resultSet.rows.item(i))
              promisesArmaduras.push(service.armaduraProvider.getWithDb(db, resultSet.rows.item(i)._id_armadura));
            }
          }
          db.executeSql('SELECT _id_arma FROM inventarioArma WHERE _id_personagem = ?;', [personagemId]).then(function (resultSet) {
            console.log("resultset de armas", resultSet);
            if (resultSet.rows.length) {
              for (let i = 0; i < resultSet.rows.length; i++) {
                console.log("Arma geted", resultSet.rows.item(i));
                promisesArmas.push(service.armasProvider.getWithDb(db, resultSet.rows.item(i)._id_arma))
              }
            }
            db.executeSql('SELECT _id_item FROM inventarioItem WHERE _id_personagem = ?;', [personagemId]).then(function (resultSet) {
              if (resultSet.rows.length) {
                for (let i = 0; i < resultSet.rows.length; i++) {
                  promisesItens.push(service.itemProvider.getWithDb(db, resultSet.rows.item(i)._id_item));
                }
              }
              Promise.all(promisesArmas).then(function (armas: Array<Weapon>) {
                console.log("Promessa feita", armas);
                if (armas instanceof Array)
                  inventario = inventario.concat(armas);
                Promise.all(promisesArmaduras).then(function (armaduras: Array<Armadura>) {
                  console.log("Promessa feita", armaduras);
                  if (armaduras instanceof Array)
                    inventario = inventario.concat(armaduras);
                  Promise.all(promisesItens).then(function (itens: Array<Item>) {
                    console.log("Promessa feita", itens);
                    if (itens instanceof Array)
                      inventario = inventario.concat(itens);
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
            }, function (err) {
              reject(err);
              console.error(err);
            });
          }, function (err) {
            reject(err);
            console.error(err);
          });
        }, function (err) {
          reject(err);
          console.error(err);
        });
      });
    });
  }

  private transactioQ(db: SQLiteObject, query: string, params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      db.executeSql(query, params).then(function (resultSet) {
        console.log("Resolved", resultSet);
        resolve(resultSet);
      }, function (err) {
        reject(err);
      })
    });
  }
  private addItemPersonagem(db: SQLiteObject, personagemId: number, itens: Array<Item>): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
      let promises: Array<Promise<any>> = [];
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
        console.log(queryItem, paramsItem);
        promises.push(service.transactioQ(db, queryItem, paramsItem));
      };
      Promise.all(promises).then(function (resultSets) {
        resolve(resultSets);
      }, function (err) {
        reject(err);
      })
      if (itens.length == 0) {
        resolve();
      }
    });
  }

  public removeItemPersonagem(personagemId: number, item: Item): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
      let promises: Array<Promise<any>> = [];
      this.sqlCapsule.openDatabase().then((db) => {
        let queryItem: string;
        let paramsItem = [personagemId, item.$id];

        if (item instanceof Weapon) {
          queryItem = 'DELETE FROM inventarioArma WHERE _id_personagem = ? AND _id_arma = ?;';
        } else if (item instanceof Armadura) {
          queryItem = 'DELETE FROM inventarioArmadura WHERE _id_personagem = ? AND _id_armadura = ?;';
        } else {
          queryItem = 'DELETE FROM inventarioItem WHERE _id_personagem = ? AND _id_item = ?;';
        }
        console.log(queryItem, paramsItem);
        db.executeSql(queryItem, paramsItem).then(function (resultSet) {
          resolve(resultSet);
        }, function (err) {
          reject(err);
          console.error(err);
        });
      });
    });
  }

  private addMagiaPersonagem(db: SQLiteObject, personagemId: number, magias: Array<Magia>): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
      let promises: Array<Promise<any>> = [];;
      for (var i = 0; i < magias.length; i++) {
        let queryItem = 'INSERT INTO personagem_magias(_id_personagem, _id_magia) VALUES ( ?, ? );';
        let paramsItem = [personagemId, magias[i].$id]
        promises.push(service.transactioQ(db, queryItem, paramsItem));
      }
      Promise.all(promises).then(function (resultSets) {
        resolve(resultSets);
      }, function (err) {
        reject(err);
      })
      if (magias.length == 0) {
        resolve(db);
      }
    })
  }

  private getMagiaPersonagem(db: SQLiteObject, personagemId: number): Promise<Array<Magia>> {
    let service = this;
    return new Promise((resolve, reject) => {
      db.executeSql('SELECT _id_magia FROM personagem_magias WHERE _id_personagem = ? ;', [personagemId]).then(function (resultSet) {
        let promise: Array<Promise<Magia>> = [];
        for (let i = 0; i < resultSet.rows.length; i++) {
          promise.push(service.magiaProvider.getWithDb(db, resultSet.rows.item(i)));
        }
        Promise.all(promise).then(function (magias: Array<Magia>) {
          resolve(magias);
        }, function (err) {
          reject(err);
        })
      }, function (err) {
        reject(err);
        console.error(err);
      });
    });
  }

  private addIdiomaPersonagem(db: SQLiteObject, personagemId: number, idiomas: Array<Idioma>): Promise<any> {
    let service = this;
    return new Promise((resolve, reject) => {
      let promises: Array<Promise<any>> = [];
      for (var i = 0; i < idiomas.length; i++) {
        let queryItem = 'INSERT INTO personagem_idiomas(_id_personagem, _id_idioma) VALUES ( ?, ? );';
        let paramsItem = [personagemId, idiomas[i].$id];
        promises.push(service.transactioQ(db, queryItem, paramsItem));
      }
      Promise.all(promises).then(function (resultSets) {
        resolve(resultSets);
      }, function (err) {
        reject(err);
      })
      if (idiomas.length == 0) {
        resolve(db);
      }
    })
  }

  private getIdiomaPersonagem(db: SQLiteObject, personagemId: number): Promise<Array<Idioma>> {
    let service = this;
    return new Promise((resolve, reject) => {
      let promises: Array<Promise<Idioma>> = [];
      let retorno: Array<Idioma> = [];
      db.executeSql('SELECT _id_idioma FROM personagem_idiomas WHERE _id_personagem = ?;', [personagemId]).then(function (resultSet) {
        for (let i = 0; i < resultSet.rows.length; i++) {
          promises.push(service.racaProvider.getIdioma(resultSet.rows.item(i)._id_idioma))
        }
        Promise.all(promises).then(function (idiomas: Array<Idioma>) {
          resolve(idiomas);
        }, function (err) {
          reject(err);
        })
      }, function (err) {
        reject(err);
        console.error(err);
      });
    });
  }

  private addClassePersonagem(db: SQLiteObject, personagemId: number, classe: IClasse): Promise<any> {
    return new Promise((resolve, reject) => {
      let queryItem = 'INSERT INTO personagem_classes(_id_personagem, classe, xp) VALUES ( ?, ?, ? );';
      let paramsItem = [personagemId, classe.$classe, classe.$xpAtual];
      db.executeSql(queryItem, paramsItem).then(function (resultSet) {
        resolve(db);
      }, function (err) {
        reject(err);
        console.error(err);
      });
      
    });
  }

  private addClassesPersonagem(db: SQLiteObject, personagemId: number, classes: Array<IClasse>): Promise<any> {
    let service =  this;
    return new Promise((resolve, reject) => {
      let promises : Array<Promise<any>> = [];
      for(let i = 0; i < classes.length ; i++){
        promises.push(service.addClassePersonagem(db,personagemId,classes[i]));
      }
      Promise.all(promises).then(function (idiomas: Array<Idioma>) {
        resolve(idiomas);
      }, function (err) {
        reject(err);
      })
    });
  }


  private getClassesPersonagem(db: SQLiteObject, personagemId: number): Promise<Array<IClasse>> {
    return new Promise((resolve, reject) => {
      db.executeSql('SELECT * FROM personagem_classes WHERE _id_personagem = ?;', [personagemId]).then(function (resultSet) {
        if (resultSet.rows.length) {
          let classes: Array<IClasse> = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            console.log(resultSet.rows.item(0));
            let classe = resultSet.rows.item(0).classe;
            let xp = resultSet.rows.item(0).xp;
            let conversor = new ConversoresClasses();
            switch (classe) {
              case 0:
                classes.push(new Clerigo(conversor.$xpToNivelClerigo(xp), xp));
                break;
              case 1:
                classes.push(new HomemDeArmas(conversor.$xpToNivelHomemDeArmas(xp), xp))
                break;
              case 2:
                classes.push(new Mago(conversor.$xpToNivelMago(xp), xp))
                break;
              case 3:
                classes.push(new Ladino(conversor.$xpToNivelMago(xp), xp))
                break;
              default:
                resolve(null)
                break;
            }
          }
          resolve(classes);
        } else {
          resolve(null);
        }
      }, function (err) {
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
    returnArray.push(personagem.$especializacao);
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
