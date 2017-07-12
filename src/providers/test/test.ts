import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the SqlCapsuleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SqlCapsuleProvider {

  constructor(private platform: Platform, private sqlite: SQLite) {
  }

  openDatabase(): Promise<SQLiteObject> {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.platform.is('cordova')
        this.sqlite.create({
          name: 'oldDragonRegister.db',
          location: 'default',
          createFromLocation: 1
        }).then((db: SQLiteObject) => {
          resolve(db);
        }, (err) => {
          console.error(err);
          reject(err);
        });
      });
    })

}
}
