import { TipoMagia } from '../../classes/magia/tipoMagia';
import { Magia } from '../../classes/magia/magia';
import { DuracaoMagia } from '../../classes/magia/duracaoMagia';
import { AlcanceMagia } from '../../classes/magia/alcanceMagia';
import { medidaDeTempoENUM } from '../../classes/magia/medidaDeTempoENUM';


export class BaseMagia {

    constructor() {

    }

    public static get BASE_MAGIA_DIVINA(): Array<Magia>{
        return [    
           new Magia([new TipoMagia(1,'Divina')],[1],new AlcanceMagia(0,0,0),new DuracaoMagia(0,0,0,medidaDeTempoENUM.instanea,medidaDeTempoENUM.instanea), 'Curar/Causar Ferimentos Leves', 'Cura ou causa dano equivalente 1D8 pontos + 1 por nivel até nivel 5.'),
        ]
    }

    public static get BASE_MAGIA_ARCANA(): Array<Magia>{
        return [    
           new Magia([new TipoMagia(2,'Arcana')],[1],new AlcanceMagia(10,1,3),new DuracaoMagia(0,0,0,medidaDeTempoENUM.instanea,medidaDeTempoENUM.instanea), 'Misseis Mágicos', 'Dispara 1 misseis magicos a cada 3 niveis contando a partir do nivel 1, causando 1d4 de dano + 1 por nivel.'),
        ]
    }

    public static get BASE_MAGIA_ARCANA_DIVINA(): Array<Magia>{
        return [    
           new Magia([new TipoMagia(2,'Arcana'),new TipoMagia(1,'Divina')],[1,1],new AlcanceMagia(10,1,3),new DuracaoMagia(1,1,3,medidaDeTempoENUM.horas,medidaDeTempoENUM.minutos), 'Luz', 'Ascende uma luz que ilumina até 6m.'),
        ]
    }
}