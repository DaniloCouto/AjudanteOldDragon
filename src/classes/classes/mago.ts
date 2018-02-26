import { BaseClass } from './classe';
import { BonusDeClasse } from '../constantesClass';
import { AcessoMagia } from '../constantesClass';
import { ConstantesClass } from '../constantesClass';
import { diceENUM } from '../diceENUM';
import { classeENUM } from './classesEnum';
import { IClasse } from './Iclasse';
import { ConversoresClasses } from './conversoresClasses';

export class Mago extends BaseClass implements IClasse{

    constructor(nivel?: number, xpAtual? : number){
        let conversor = new ConversoresClasses();
        xpAtual =  xpAtual ? xpAtual : conversor.$nivelToXpMago(nivel);
        nivel = nivel ? nivel : conversor.$xpToNivelMago(xpAtual);
        super(2, nivel, 4, xpAtual)
    }

    public get $nome(): string {
        return super.$nome;
    }

    public get $classe(): classeENUM {
        return super.$classe;
    }

    public set $classe(classe : classeENUM){
        super.$classe = classe;
    }

    public get $nivel(): number {
        return super.$nivel;
    }

    public set $nivel(nivel : number){
        super.$nivel = nivel;
    }

    public get $dadoDeVida(): diceENUM {
        return super.$dadoDeVida;
    }

    public set $dadoDeVida(dadoDeVida : diceENUM){
        super.$dadoDeVida = dadoDeVida;
    }

	public get $xpAtual(): number {
		return super.$xpAtual;
	}

	public set $xpAtual(value: number) {
		super.$xpAtual = value;
	}

    public $bonus() : BonusDeClasse {
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
    public $nivelToXp(nivel : number) : number{
        if (nivel-1 <= 1) {
            return 0;
        } else {
            let bonus = ConstantesClass.MAGO_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (nivel-1 === bonus[index].nivel) {
                    return bonus[index].xp;
                }
            }
            return 0;
        }
    }

    public $xpToNivel(xp : number) : number{
        let bonus = ConstantesClass.MAGO_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (xp < bonus[index].xp) {
                    return bonus[index].nivel;
                }
            }
            return null;
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