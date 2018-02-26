import { ConstantesClass } from "../constantesClass";

export class ConversoresClasses{
    constructor(){};
    public $nivelToXpLadino(nivel : number) : number{
        if (nivel-1 <= 1) {
            return 0;
        } else {
            let bonus = ConstantesClass.LADINO_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (nivel-1 === bonus[index].nivel) {
                    return bonus[index].xp;
                }
            }
            return 0;
        }
    }

    public $xpToNivelLadino(xp : number) : number{
        let bonus = ConstantesClass.LADINO_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (xp < bonus[index].xp) {
                    return bonus[index].nivel;
                }
            }
            return null;
    }

    public $nivelToXpMago(nivel : number) : number{
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

    public $xpToNivelMago(xp : number) : number{
        let bonus = ConstantesClass.MAGO_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (xp < bonus[index].xp) {
                    return bonus[index].nivel;
                }
            }
            return null;
    }

    public $nivelToXpHomemDeArmas(nivel : number) : number{
        if (nivel-1 <= 1) {
            return 0;
        } else {
            let bonus = ConstantesClass.MAN_AT_ARMS_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (nivel-1 === bonus[index].nivel) {
                    return bonus[index].xp;
                }
            }
            return 0;
        }
    }

    public $xpToNivelHomemDeArmas(xp : number) : number{
        let bonus = ConstantesClass.MAN_AT_ARMS_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (xp < bonus[index].xp) {
                    return bonus[index].nivel;
                }
            }
            return null;
    }

    public $nivelToXpClerigo(nivel : number) : number{
        if (nivel-1 <= 1) {
            return 0;
        } else {
            let bonus = ConstantesClass.CLERIGO_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (nivel-1 === bonus[index].nivel) {
                    return bonus[index].xp;
                }
            }
            return 0;
        }
    }

    public $xpToNivelClerigo(xp : number) : number{
        let bonus = ConstantesClass.CLERIGO_BONUS;
            for (var index = 0; index < bonus.length; index++) {
                if (xp < bonus[index].xp) {
                    return bonus[index].nivel;
                }
            }
            return null;
    }
}