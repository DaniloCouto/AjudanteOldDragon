import { Weapon } from '../../classes/weapon/weapon';
import { Dano } from '../../classes/dano/dano';

export class BaseWeapons {
    constructor() {

    }

    public static get BASE_WEAPONS(): Array<Weapon>{
        return [
            new Weapon('Adaga', 0.5, 200, 8, 0, new Dano(0, 4, 1), [3, 6, 9], 1 , [0, 1]),
            new Weapon('Alabarda', 8, 1500, 1, 0, new Dano(0, 10, 1), [3, 0, 0], 3, [2, 1]),
            new Weapon('Arco Curto', 0.5, 2500, 3, 0, new Dano(0, 0, 0), [15, 30, 45], 1, [0, 0]),
            new Weapon('Arco Longo', 1.5, 6000, 2, 0, new Dano(0, 0, 0), [20, 50, 75], 3, [0, 0]),
            new Weapon('Besta', 3.5, 3000, 3, 0, new Dano(0, 6, 1), [3, 6, 9], 1, [0, 1]),
            new Weapon('Bordão/Cajado', 1.5, 50, 7, 0, new Dano(0, 6, 1), [0, 0, 0], 2, [0, 3]),
            new Weapon('Cimitarra', 1.5, 1500, 8, 0, new Dano(0, 6, 1), [0, 0, 0], 2, [0, 2]),
            new Weapon('Espada Bastarda', 2.8, 1200, 3, 0, new Dano(0, 10, 1), [0, 0, 0], 3, [0, 2]),
            new Weapon('Espada Curta', 1.5, 6000, 7, 0, new Dano(0, 6, 1), [0, 0, 0], 1, [0, 1]),
            new Weapon('Espada Longa', 2, 1000, 5, 0, new Dano(0, 6, 1), [0, 0, 0], 1, [2, 1]),
            new Weapon('Flexa x20', 1.5, 5000, 0, 0, new Dano(0, 8, 1), [0, 0, 0], 0, [0, 1]),
            new Weapon('Flexa Improvisada x10', 0.5, 0, 0, 0, new Dano(0, 6, 1), [0, 0, 0], 0, [0, 1]),
            new Weapon('Funda', 0, 50, 4, 0, new Dano(0, 4, 1), [10, 20, 30], 1, [0, 3]),
            new Weapon('Lança', 2.5, 500, 4, 0, new Dano(0, 6, 1), [3, 6, 9], 2, [0, 1]),
            new Weapon('Maça', 5, 600, 3, 0, new Dano(0, 8, 1), [0, 0, 0], 2, [0, 3]),
            new Weapon('Machado', 3.5, 800, 1, 0, new Dano(0, 12, 1), [0, 0, 0], 3, [0, 2]),
            new Weapon('Machadinha', 2, 400, 6, 0, new Dano(0, 6, 1), [3, 6, 9], 1, [0, 2]),
            new Weapon('Mangual', 5, 800, 4, 0, new Dano(0, 8, 1), [0, 0, 0], 2, [1, 3]),
            new Weapon('Martelo', 3, 500, 4, 0, new Dano(0, 6, 1), [3, 6, 9], 2, [0, 3]),
            new Weapon('Montante', 10, 2000, 1, 0, new Dano(0, 10, 1), [0, 0, 0], 3, [0, 2]),
            new Weapon('Porrete', 5, 10, 6, 0, new Dano(0, 4, 1), [0, 0, 0], 2, [0, 3]),
            new Weapon('Sabre', 1.5, 80, 8, 0, new Dano(0, 6, 1), [0, 0, 0], 1, [0, 1])
            
        ]
    }
}
    