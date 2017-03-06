import { BaseClass } from './classe';
import { BonusDeClasse } from '../constantesClass';
import { AcessoMagia } from '../constantesClass';
import { ConstantesClass } from '../constantesClass';

export class Mago extends BaseClass{

    constructor(nivel: number){
        super(2, nivel, 4)
    }

    public get $bonus() : BonusDeClasse {
        if (this.$nivel <= 0) {
            return null;
        } else {
            let bonus = ConstantesClass.MAGO_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (this.$nivel === bonus[index].nivel) {
                    return bonus[index];
                }
            }
            return null;
        }
    }
    public get $magia() : AcessoMagia {
        if (this.$nivel <= 0) {
            return null;
        } else {
            let bonus = ConstantesClass.MAGO_MAGIA;
            for (var index = 0; index < bonus.length; index++) {
                if (this.$nivel === bonus[index].nivel && bonus[index].acessoMagia.length === 9 ) {  
                    return bonus[index];
                }
            }
            return null;
        }
    }

}