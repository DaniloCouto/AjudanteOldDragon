import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the SqlCapsuleProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const win: any = window;

@Injectable()
export class SqlCapsuleProvider {
  constructor(private platform: Platform, private sqlite: SQLite) {
  }

  openDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        if(this.platform.is('cordova')){
          this.sqlite.create({
            name: 'oldDragonRegister.db.1',
            location: 'default'
          }).then((db: SQLiteObject) => {
            resolve(db);
          }, (err) => {
            console.error(err);
            reject(err);
          });
        }else{
          resolve(win.openDatabase('oldDragonRegister.db.1', '1.0', 'database', 5 * 1024 * 1024));
        }
      });
    })
  }
}
