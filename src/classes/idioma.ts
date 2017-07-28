export class Idioma{
    private id: number;
    private nome: string;
    private descricao: string;

	constructor($id: number, $nome: string, $descricao: string) {
		this.id = $id;
		this.nome = $nome;
		this.descricao = $descricao;
    }

	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}

	public get $nome(): string {
		return this.nome;
	}

	public set $nome(value: string) {
		this.nome = value;
	}

	public get $descricao(): string {
		return this.descricao;
	}

	public set $descricao(value: string) {
		this.descricao = value;
	}
    
}