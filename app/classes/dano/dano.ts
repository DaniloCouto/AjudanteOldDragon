import { diceENUM } from '../diceENUM';

export class Dano {
    private danoPuro: number;
    private danoRolagem: diceENUM;
    private qntdRolagem: number;

    constructor($danoPuro: number, $danoRolagem: diceENUM, $qntdRolagem: number) {
        this.danoPuro = $danoPuro;
        this.danoRolagem = $danoRolagem;
        this.qntdRolagem = $qntdRolagem;
    }

    public get $danoPuro(): number {
        return this.danoPuro;
    }

    public set $danoPuro(value: number) {
        this.danoPuro = value;
    }

    public get $danoRolagem(): diceENUM {
        return this.danoRolagem;
    }

    public set $danoRolagem(value: diceENUM) {
        this.danoRolagem = value;
    }

    public get $qntdRolagem(): number {
        return this.qntdRolagem;
    }

    public set $qntdRolagem(value: number) {
        this.qntdRolagem = value;
    }

}