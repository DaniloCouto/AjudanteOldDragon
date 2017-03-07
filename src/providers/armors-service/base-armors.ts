import { Armadura } from '../../classes/armadura/armadura';

export class BaseArmaduras {
    constructor() {

    }

    public static get BASE_ARMADURA(): Array<Armadura>{
        return [
            new Armadura('Armadura de Couro',7,2000,2,0,1,6),
            new Armadura('Armadura de Placas',13,30000,6,-2,3,3),
            new Armadura('Armadura Completa',20,200000,8,-3,3,1),
            new Armadura('Cota de malha',14,6000,4,-1,2,2),
            new Armadura('Escudo de Madeira',3,800,1,0,0,0),
            new Armadura('Escudo de Aço',7,1500,2,0,0,0)
        ]
    }
}
    