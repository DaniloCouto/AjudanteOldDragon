import { BolsaMoedas } from '../../classes/bolsaMoedas';
import { Personagem } from '../../classes/personagem';
import { HabilidadeRacial, Raca } from '../../classes/raca';
import { HomemDeArmas } from '../../classes/classes/homemdearmas';
import { Idioma } from '../../classes/idioma';
import { Atributos } from '../../classes/atributos';
export class BasePersonagem{

    constructor() {

    }

    public static get BASE_PERSONAGEM(): Array<Personagem>{
        return [
            new Personagem(null, // id
                'Kargathor', //Nome
                'Guerreiro de uma Ordem', //Descricao
                new Raca(1,'Humano','', 1.80, 80, 0, 0, 9,[
                    new HabilidadeRacial(null,'Adaptabilidade','Adicione +2 em um atributo, porem retire -2 de outro atributo.')
                ], new Idioma(1,'Comum','Idioma difundido pelos humanos.')), //Raça
                new HomemDeArmas(Number(1)),//Classe
                [],//Idiomas
                new Atributos(18,10,16,8,8,12),//Atributos
                [],//Magias
                0,//xpatual
                [],// inventario
                new BolsaMoedas(0,0,0,0,0)
            )
        ]
    }
}