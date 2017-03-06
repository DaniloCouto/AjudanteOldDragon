import { BaseClass } from './classe';
import { BonusDeClasse } from '../constantesClass';
import { AcessoMagia } from '../constantesClass';
import { AfastarMortosVivos } from '../constantesClass';
import { AfastarMortosVivosPorDadosDeVida } from '../constantesClass';
import { ConstantesClass } from '../constantesClass';

export class Clerigo extends BaseClass{

    constructor(nivel: number){
        super(0, nivel, 8)
    }

    public get $bonus() : BonusDeClasse {
        if (this.$nivel <= 0) {
            return null;
        } else {
            let bonus = ConstantesClass.CLERIGO_BONUS;
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
            let bonus = ConstantesClass.CLERIGO_MAGIA;
            for (var index = 0; index < bonus.length; index++) {
                if (this.$nivel === bonus[index].nivel && bonus[index].acessoMagia.length === 7 ) {  
                    return bonus[index];
                }
            }
            return null;
        }
    }

    public get $afastarMortos() : AfastarMortosVivos {
        if (this.$nivel <= 0) {
            return null;
        } else {
            let bonus = ConstantesClass.CLERIGO_AFASTAR_MORTOS;
            for (var index = 0; index < bonus.length; index++) {
                if (this.$nivel === bonus[index].nivel) {  
                    return bonus[index];
                }
            }
            return null;
        }
    }
    
    public get $afastarMortosDadoDeVida() : AfastarMortosVivosPorDadosDeVida {
        if (this.$nivel <= 0) {
            return null;
        } else {
            let bonus = ConstantesClass.CLERIGO_AFASTAR_MORTOS_DADO_VIDA;
            for (var index = 0; index < bonus.length; index++) {
                if (this.$nivel === bonus[index].nivel) {  
                    return bonus[index];
                }
            }
            return null;
        }
    }

}