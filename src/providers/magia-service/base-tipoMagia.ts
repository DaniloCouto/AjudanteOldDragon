import { TipoMagia } from '../../classes/magia/tipoMagia';

export class BaseTipoMagia {
    constructor() {

    }

    public static get BASE_TIPOMAGIA(): Array<TipoMagia>{
        return [    
            new TipoMagia(1,'Divina'),
            new TipoMagia(2,'Arcana')
           
        ]
    }
}
    