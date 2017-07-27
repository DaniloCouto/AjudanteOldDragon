import { BaseClass } from './classe';
import { BonusDeClasse } from '../constantesClass';
import { TalentosDeLadrao } from '../constantesClass';
import { ConstantesClass } from '../constantesClass';

export class Ladino extends BaseClass{

    constructor(nivel: number){
        super(3, nivel, 6)
    }

    public get $bonus() : BonusDeClasse {
        if (this.$nivel <= 0) {
            return null;
        } else {
            let bonus = ConstantesClass.LADINO_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (this.$nivel === bonus[index].nivel) {
                    return bonus[index];
                }
            }
            return null;
        }
    }
    public get $talentos() : TalentosDeLadrao {
        if (this.$nivel <= 0) {
            return null;
        } else {
            let bonus = ConstantesClass.LADINO_TALENTOS;
            for (var index = 0; index < bonus.length; index++) {
                if (this.$nivel === bonus[index].nivel) {
                    return bonus[index];
                }
            }
            return null;
        }
    }

}