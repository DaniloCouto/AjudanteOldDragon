import {Item} from '../item';
import {TipoArmadura} from './tipoArmadura';

export class Armadura extends Item {
    private bonusCa: number;
    private movimentacao: number;
    private tipo: TipoArmadura;
    private limiteAjusteDex: number;

    constructor(id: number, nome: string, descricao: string, peso: number, preco: number, $bonusCa: number, $movimentacao: number, $tipo: TipoArmadura, $limiteDes: number) {
        super(id,nome,descricao, peso, preco);
        this.bonusCa = $bonusCa;
        this.movimentacao = $movimentacao;
        this.tipo = $tipo;
        this.limiteAjusteDex = $limiteDes;
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

    public get $tipo(): TipoArmadura {
        return this.tipo;
    }

    public set $tipo(value: TipoArmadura) {
        this.tipo = value;
    }

    public get $limiteAjusteDex(): number {
        return this.limiteAjusteDex;
    }

    public set $limiteAjusteDex(value: number) {
        this.limiteAjusteDex = value;
    }


}