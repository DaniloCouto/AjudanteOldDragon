import { Injectable } from '@angular/core';

@Injectable()
export class MoneyConventer {
  constructor() {
  }

  convert(total: number): string {
    if (total >= 10) {
      if (total >= 100) {
        if (total >= 1000) {
          if (total >= 10000) {
            return (total / 10000) + ' PPL';
          } else {
            return (total / 1000) + ' PE';
          }
        } else {
          return (total / 100) + ' PO';
        }
      } else {
        return (total / 10) + ' PP';
      }
    } else {
      return total + ' PC';
    }
  }
  convertToPP(cooper: number): string {
    return cooper / 10 + ' PP';
  }
  convertToPO(cooper: number): string {
    return cooper / 100 + ' PO';
  }
  convertMaxPO(cooper: number): string {
    if (cooper >= 10) {
      if (cooper >= 100) {
          return (cooper / 100) + ' PO';
      } else {
        return (cooper / 10) + ' PP';
      }
    } else {
      return cooper + ' PC';
    }
  }
}

