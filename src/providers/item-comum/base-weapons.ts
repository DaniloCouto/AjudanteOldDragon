
import { Dano } from '../../classes/dano/dano';
import { Item } from "../../classes/item";

export class BaseItens {
    constructor() {

    }

    public static get BASE_ITENS(): Array<Item>{
        return [
            new Item('Água Benta', 'frasco com 500 ml', 0.5, 100)
        ]
    }
}
    