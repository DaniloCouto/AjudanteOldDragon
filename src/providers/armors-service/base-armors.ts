import { Armadura } from '../../classes/armadura/armadura';

export class BaseArmaduras {
    constructor() {

    }

    public static get BASE_ARMADURA(): Array<Armadura>{
        return [
            new Armadura(1,'Armadura de Couro','',7,2000,2,0,1,6,0),
            new Armadura(2,'Armadura de Placas','',13,30000,6,-2,3,3,0),
            new Armadura(3,'Armadura Completa','',20,200000,8,-3,3,1,0),
            new Armadura(4,'Cota de malha','',14,6000,4,-1,2,2,0),
            new Armadura(5,'Escudo de Madeira','',3,800,1,0,0,0,0),
            new Armadura(6,'Escudo de Aço','',7,1500,2,0,0,0,0)
        ]
    }
}
    