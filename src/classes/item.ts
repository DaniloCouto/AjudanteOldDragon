export class Item {
    private nome: string;
    private peso: number;
    private valor: number;

    constructor($nome: string, $peso: number,$valor: number) {
        this.nome = $nome;
        this.peso = $peso;
        this.valor = $valor;
    }

    public get $nome(): string {
        return this.nome;
    }

    public set $nome(value: string) {
        this.nome = value;
    }

    public get $peso(): number {
        return this.peso;
    }

    public set $peso(value: number) {
        this.peso = value;
    }

    public get $valor(): number {
        return this.valor;
    }

    public set $valor(value: number) {
        this.valor = value;
    }


}