import {Item} from "./item";

export class Armadura extends Item{
    private bonusCa : number;
    private movimentacao : number;
    private equipado : Boolean;

    constructor(name: string, peso : number, valor : number, bonusCa : number, movimentacao : number, equipado : Boolean){
        super(name,peso,valor)
        this.bonusCa = bonusCa;
        this.movimentacao = movimentacao;
        this.equipado = equipado;
    }

    setBonusCa (bonusCa : number) : void {
        this.bonusCa = bonusCa;
    }
    setMovimentacao (movimentacao : number) : void {
        this.movimentacao = movimentacao;
    }
    setDano (equipado : Boolean) : void {
        this.equipado = equipado;
    }

    getBonusCa () : number {
        return this.bonusCa;
    }
    getMovimentacao () : number {
        return this.movimentacao;
    }
    getEquipado () : Boolean {
        return this.equipado;
    }

}