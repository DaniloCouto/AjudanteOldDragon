import { diceENUM } from '../diceENUM';
import { classeENUM } from './classesEnum';

export class BaseClass {
    private classe: classeENUM;
    private nivel: number;
    private dadoDeVida: diceENUM;
    private xpAtual: number;

    constructor($classe: classeENUM, $nivel: number, $dadoDeVida: diceENUM, $xpAtual : number) {
        this.classe = $classe;
        this.nivel = $nivel;
        this.dadoDeVida = $dadoDeVida;
        this.xpAtual = $xpAtual;
    }

    public get $nome(): string {
        switch (this.classe) {
            case 0:
                return 'Clerigo';
            case 1:
                return 'Homem de Armas';
            case 2:
                return 'Mago';
            case 3:
                return 'Ladino';
        }
    }

    public get $classe(): classeENUM {
        return this.classe;
    }

    public set $classe(classe : classeENUM){
        this.classe = classe;
    }

    public get $nivel(): number {
        return this.nivel;
    }

    public set $nivel(nivel : number){
        this.nivel = nivel;
    }

    public get $dadoDeVida(): diceENUM {
        return this.dadoDeVida;
    }

    public set $dadoDeVida(dadoDeVida : diceENUM){
        this.dadoDeVida = dadoDeVida;
    }

	public get $xpAtual(): number {
		return this.xpAtual;
	}

	public set $xpAtual(value: number) {
		this.xpAtual = value;
	}
    
}