import { diceENUM } from '../diceENUM';
import { classeENUM } from './classesEnum';
import { ConversoresClasses } from './conversoresClasses';

export class BaseClass {
    private classe: classeENUM;
    private nivel: number;
    private dadoDeVida: diceENUM;
    private xpAtual: number;
    private conversor: ConversoresClasses;

    constructor($classe: classeENUM, $nivel: number, $dadoDeVida: diceENUM, $xpAtual: number) {
        this.classe = $classe;
        this.nivel = $nivel;
        this.dadoDeVida = $dadoDeVida;
        this.xpAtual = $xpAtual;
        this.conversor = new ConversoresClasses();
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

    public set $classe(classe: classeENUM) {
        this.classe = classe;
    }

    public get $nivel(): number {
        
        return this.nivel;
    }

    public set $nivel(nivel: number) {
        switch (this.classe) {
            case 0:
                this.xpAtual = this.conversor.$nivelToXpClerigo(nivel);
                break;
            case 1:
                this.xpAtual = this.conversor.$nivelToXpHomemDeArmas(nivel);
                break;
            case 2:
                this.xpAtual = this.conversor.$nivelToXpMago(nivel);
                break;
            case 3:
                this.xpAtual = this.conversor.$nivelToXpLadino(nivel);
                break;
        }
        this.nivel = nivel;
    }

    public get $dadoDeVida(): diceENUM {
        return this.dadoDeVida;
    }

    public set $dadoDeVida(dadoDeVida: diceENUM) {
        this.dadoDeVida = dadoDeVida;
    }

    public get $xpAtual(): number {
        return this.xpAtual;
    }

    public set $xpAtual(value: number) {
        switch (this.classe) {
            case 0:
                this.nivel = this.conversor.$xpToNivelClerigo(value);
                break;
            case 1:
                this.nivel = this.conversor.$xpToNivelHomemDeArmas(value);
                break;
            case 2:
                this.nivel = this.conversor.$xpToNivelMago(value);
                break;
            case 3:
                this.nivel = this.conversor.$xpToNivelLadino(value);
                break;
        }
        this.xpAtual = value;
    }

}