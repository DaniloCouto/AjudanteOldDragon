import { Weapon } from '../../classes/weapon/weapon';
import { Dano } from '../../classes/dano/dano';
import { HabilidadeRacial, Raca } from '../../classes/raca';
import { Idioma } from "../../classes/idioma";

export class BaseRaca {
    constructor() {

    }

    public static get BASE_RACA(): Array<Raca>{
        return [
            new Raca(null,'Humano','', 1.80, 80, 0, 0, 9,[
                new HabilidadeRacial(null,'Adaptabilidade','Adicione +2 em um atributo, porem retire -2 de outro atributo.')
            ], new Idioma(1,'Comum','Idioma difundido pelos humanos.')),
            new Raca(null,'Anão','', 1.40, 60, 0, 0, 6,[
                new HabilidadeRacial(null,'Modificadores','Adicione +2 em Constituição, porem retire -2 em carisma.'),
                new HabilidadeRacial(null,'Visão no escuro','Force completa visão no escuro até 15 metros.'),
                new HabilidadeRacial(null,'Mineradores','Capacidade de detectar desníveis e armadilhas de pedra ou fossos escondidos com um resultado de 1 ou 2 em 1d6.'),
                new HabilidadeRacial(null,'Desenvoltura em combate','Impede que recebam penalidades por usarem armas de tamanho grande com ambas as mãos ou médias com apenas uma das mãos.')
            ], new Idioma(2,'Anão','Idioma difundido pelos anões.')),
            new Raca(null,'Elfo','', 1.60, 45, 0, 0, 9,[
                new HabilidadeRacial(null,'Modificadores','Adicione +2 em Destreza, porem retire -2 em Constituição.'),
                new HabilidadeRacial(null,'Visão na Penumbra','Force completa visão na penumbra (Baixa iluminação) até 50 metros.'),
                new HabilidadeRacial(null,'Arqueiro','Adicione +1 em Bonus de Ataque em ataques de um arco.'),
                new HabilidadeRacial(null,'Percepção','Capacidade de detectar portas ou passagens secretas com 1 em 1d6, caso esteja procurando ativamente a porta, 1 ou 2 em 1d6.'),
                new HabilidadeRacial(null,'Fragilidade','Um elfo homem de armas terá d8 como dado de vida.'),
                new HabilidadeRacial(null,'Imunidade ao sono','Imune a magia ou efeitos de sono.')
            ], new Idioma(3,'Elfico','Idioma difundido pelos elfos.')),
            new Raca(null,'Halfiling','', 0.8, 25, 0, 0, 6,[
                new HabilidadeRacial(null,'Modificadores','Adicione +2 em Destreza, porem retire -2 em Força.'),
                new HabilidadeRacial(null,'Boa Mira','Adicione +1 em Bonus de Ataque em ataques de arremeso.'),
                new HabilidadeRacial(null,'Pequeno','Adicione +2 em Classe de armadura caso combata criaturas maiores que um humano.'),
                new HabilidadeRacial(null,'Restrições','Não podem usar armas grandes e só podem usar armaduras de couro.'),
            ], new Idioma(1,'Comum','Idioma difundido pelos humanos.')),

        ]
    }
}
    