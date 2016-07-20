import { Injectable } from '@angular/core';

let PouchDB = require('pouchdb');

/*
  Generated class for the CharacterService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CharacterService {
  private _db;
  private _characters;

  constructor() {
    this._db = new PouchDB('oldDragonRegister', { adapter: 'websql' });
  }

  add(char) {
    return this._db.post(char);
  } 
  update(char) {
    return this._db.put(char);
  }
  delete(char) {
    return this._db.remove(char);
  }
  getAll() {

    if (!this._characters) {
      return this._db.allDocs({ include_docs: true })
        .then(docs => {

          // Each row has a .doc object and we just want to send an 
          // array of birthday objects back to the calling controller,
          // so let's map the array to contain just the .doc objects.

          this._characters = docs.rows.map(row => {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

          // Listen for changes on the database.
          this._db.changes({ live: true, since: 'now', include_docs: true })
            .on('change', this.onDatabaseChange);

          return this._characters;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._characters);
    }
  }

  private onDatabaseChange = (change) => {
    var index = this.findIndex(this._characters, change.id);
    var birthday = this._characters[index];

    if (change.deleted) {
      if (birthday) {
        this._characters.splice(index, 1); // delete
      }
    } else {
      change.doc.Date = new Date(change.doc.Date);
      if (birthday && birthday._id === change.id) {
        this._characters[index] = change.doc; // update
      } else {
        this._characters.splice(index, 0, change.doc) // insert
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

