import { Especializacao } from "../../classes/especializacao";


export class BaseEspecializacao {
    constructor() {

    }

    public static get BASE_ESPECIALIZACAO(): Array<Especializacao>{
        return [
            new Especializacao(1,'Paladino','No nivel 5 consegue ver os caótico tudo e bate com ajuste de carisma nos morto-vivo.'),
            new Especializacao(2,'Cultista','No nivel 5 ele abdica das magias de cura para pode controlar mortos vivos ao inves de expulsa-los'),
        ]
    }
}
    