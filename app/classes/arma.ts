import {Item} from './item';

export class Arma extends Item {
    private iniciativa: number;
    private BaAdicional: number;
    private dano: string;
    private alcance: string;
    private tamanho: string;

    constructor(name: string, peso: number, valor: number, iniciativa: number, BaAdicional : number, dano : string, alcance : string, tamanho : string){
        super(name, peso, valor);
        this.iniciativa = iniciativa;
        this.dano = dano;
        this.alcance = alcance;
        this.tamanho = tamanho;
    }

    setIniciativa (iniciativa: number): void {
        this.iniciativa = iniciativa;
    }
    setBaAdicional (BaAdicional: number): void {
        this.BaAdicional = BaAdicional;
    }
    setDano (dano: string): void {
        this.dano = dano;
    }
    setAlcance (alcance: string): void {
        this.alcance = alcance;
    }
    setTamanho (tamanho: string): void {
        this.tamanho = tamanho;
    }

    getIniciativa (): number {
        return this.iniciativa;
    }
    getBaAdicional (): number {
        return this.BaAdicional;
    }
    getDano (): string {
        return this.dano;
    }
    getAlcance (): string {
        return this.alcance;
    }
    getTamanho (): string {
        return this.tamanho;
    }

}