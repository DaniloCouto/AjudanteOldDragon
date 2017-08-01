import { BaseClass } from './classe';
import { BonusDeClasse } from '../constantesClass';
import { ConstantesClass } from '../constantesClass';

export class HomemDeArmas extends BaseClass{

    constructor(nivel: number){
        super(1, nivel, 10, 0)
    }

    public get $bonus() : BonusDeClasse {
        if (this.$nivel <= 0) {
            return null;
        } else {
            let bonus = ConstantesClass.MAN_AT_ARMS_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (this.$nivel === bonus[index].nivel) {
                    return bonus[index];
                }
            }
            return null;
        }
    }

}