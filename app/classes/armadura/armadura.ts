import {Item} from '../item';
import {TipoArmadura} from './tipoArmadura';

export class Armadura extends Item {
    private bonusCa: number;
    private movimentacao: number;
    private equipado: Boolean;
    private tipo: TipoArmadura;

    constructor(nome: string, peso: number, preco: number, $bonusCa: number, $movimentacao: number, $equipado: Boolean, $tipo: TipoArmadura) {
        super(name, peso, preco);
        this.bonusCa = $bonusCa;
        this.movimentacao = $movimentacao;
        this.equipado = $equipado;
        this.tipo = $tipo;
    }

    public get $bonusCa(): number {
        return this.bonusCa;
    }

    public set $bonusCa(value: number) {
        this.bonusCa = value;
    }

    public get $movimentacao(): number {
        return this.movimentacao;
    }

    public set $movimentacao(value: number) {
        this.movimentacao = value;
    }

    public get $equipado(): Boolean {
        return this.equipado;
    }

    public set $equipado(value: Boolean) {
        this.equipado = value;
    }

    public get $tipo(): TipoArmadura {
        return this.tipo;
    }

    public set $tipo(value: TipoArmadura) {
        this.tipo = value;
    }

}