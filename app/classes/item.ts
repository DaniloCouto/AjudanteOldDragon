export class Item {
    private nome: string;
    private peso: number;
    private quantidade: number;
    private valor: number;

    constructor(nome: string, peso: number , valor: number) {
        this.nome = nome;
        this.peso = peso;
        this.valor = valor;
    }

    setNome(nome: string): void {
       this.nome = nome;
    }
    setPeso(peso: number): void {
       this.peso = peso;
    }
    setValor(valor: number): void {
       this.valor = valor;
    }
    setQuantidade(quantidade: number): void {
       this.quantidade = quantidade;
    }

    getNome(): string {
        return this.nome;
    }
    getPeso(): number {
        return this.peso;
    }
    getValor(): number {
        return this.valor;
    }
    getQuantidade(): number {
       return this.quantidade;
    }
    

}