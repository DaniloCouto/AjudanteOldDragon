import {Item} from '../item';
import {Dano} from '../dano/dano';
import {TipoArma} from './tipoArma';
import {TamanhoArma} from './tamanhoArma';

export class Weapon extends Item {
    private iniciativa: number;
    private BaAdicional: number;
    private dano: Dano;
    private alcance: Array<number>;
    private tamanho: TamanhoArma;
    private tipo: Array<TipoArma>;

    constructor(name: string, peso: number, valor: number, iniciativa: number, BaAdicional: number, dano: Dano, alcance: Array<number>, tamanho: TamanhoArma, tipo: Array<TipoArma>) {
        super(name, peso, valor);
        this.iniciativa = iniciativa;
        this.dano = dano;
        this.alcance = alcance;
        this.tamanho = tamanho;
        this.BaAdicional = BaAdicional;
        this.tipo = tipo;
    }

    public get $iniciativa(): number {
        return this.iniciativa;
    }

    public set $iniciativa(value: number) {
        this.iniciativa = value;
    }

    public get $BaAdicional(): number {
        return this.BaAdicional;
    }

    public set $BaAdicional(value: number) {
        this.BaAdicional = value;
    }

    public get $dano(): Dano {
        return this.dano;
    }

    public set $dano(value: Dano) {
        this.dano = value;
    }

    public get $alcance(): Array<number> {
        return this.alcance;
    }

    public set $alcance(value: Array<number>) {
        this.alcance = value;
    }

    public get $tamanho(): TamanhoArma {
        return this.tamanho;
    }

    public set $tamanho(value: TamanhoArma) {
        this.tamanho = value;
    }

    public get $tipo():  Array<TipoArma> {
        return this.tipo;
    }

    public set $tipo(value:  Array<TipoArma>) {
        this.tipo = value;
    }

}