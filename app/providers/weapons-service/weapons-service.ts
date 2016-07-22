import { Injectable } from '@angular/core';
import { Weapon } from '../../classes/weapon/weapon';

let PouchDB = require('pouchdb');

/*
  Generated class for the CharacterService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeaponsService {
  private _db;
  private _weapons: Array<Arma>;

  constructor() {
    this._db = new PouchDB('oldDragonRegister', { adapter: 'websql' });
  }

  add(weapons) {
    return this._db.post(weapons);
  } 
  update(weapons) {
    return this._db.put(weapons);
  }
  delete(weapons) {
    return this._db.remove(weapons);
  }
  getAll() {
    if (!this._weapons) {
      return this._db.allDocs({ include_docs: true })
        .then(docs => {
          this._weapons = docs.rows.map(row => {
            return row.doc;
          });
          this._db.changes({ live: true, since: 'now', include_docs: true })
            .on('change', this.onDatabaseChange);
          return this._weapons;
        });
    } else {
      return Promise.resolve(this._weapons);
    }
  }

  private onDatabaseChange = (change) => {
    var index = this.findIndex(this._weapons, change.id);
    var birthday = this._weapons[index];

    if (change.deleted) {
      if (birthday) {
        this._weapons.splice(index, 1); // delete
      }
    } else {
      change.doc.Date = new Date(change.doc.Date);
      if (birthday && birthday._id === change.id) {
        this._weapons[index] = change.doc; // update
      } else {
        this._weapons.splice(index, 0, change.doc) // insert
      }
    }
  }

  // Binary search, the array is by default sorted by _id.
  private findIndex(array, id) {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }

}

