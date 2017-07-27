export class Item {
    private id: number;
    private nome: string;
    private descricao: string;
    private peso: number;
    private valor: number;

    constructor($id: number, $nome: string, $descricao: string, $peso: number,$valor: number) {
        this.id = $id;
        this.nome = $nome;
        this.peso = $peso;
        this.valor = $valor;
        this.descricao = $descricao;
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

	public get $descricao(): string {
		return this.descricao;
	}

	public set $descricao(value: string) {
		this.descricao = value;
	}

	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}    
    
}