import { Weapon } from '../../classes/weapon/weapon';
import { Dano } from '../../classes/dano/dano';
import { Idioma } from "../../classes/idioma";

export class BaseIdioma {
    constructor() {

    }

    public static get BASE_IDIOMA(): Array<Idioma>{
        return [
            new Idioma(1,'Comum','Idioma difundido pelos humanos.'),
            new Idioma(2,'Anão','Idioma difundido pelos anões.'),
            new Idioma(3,'Elfico','Idioma difundido pelos elfos.')
        ]
    }
}
    