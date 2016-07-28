import { Injectable } from '@angular/core';

/*
  Generated class for the DiceClass provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DiceClass {

  constructor() {
  }

  identify(diceEnum) {
    switch (diceEnum) {
      case 0:
        return 'logo-d0';
      case 2:
        return 'logo-d2';
      case 4:
        return 'logo-d4-4';
      case 6:
        return 'logo-d6';
      case 8:
        return 'logo-d8';
      case 10:
        return 'logo-d10';
      case 12:
        return 'logo-d12';
      case 20:
        return 'logo-d20';
      case 100:
        return 'logo-d100';
      default:
        return '';
    }

  }
}

