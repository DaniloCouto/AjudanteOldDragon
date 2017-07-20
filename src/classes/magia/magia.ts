import { AlcanceMagia } from './alcanceMagia';
import { DuracaoMagia } from './duracaoMagia';
import { TipoMagiaComNivel } from './tipoMagia';

export class Magia {
	private id: number;
	private tipoArray: Array<TipoMagiaComNivel>;
    private alcance: AlcanceMagia;
    private duracao: DuracaoMagia;
    private nome: string;
    private descricao: string;

	constructor($id : number, $tipoArray: Array<TipoMagiaComNivel>, $alcance: AlcanceMagia, $duracao: DuracaoMagia, $nome: string, $descricao: string) {
		this.id = $id;
		this.tipoArray = $tipoArray;
		this.alcance = $alcance;
		this.duracao = $duracao;
		this.nome = $nome;
		this.descricao = $descricao;
	}

	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}
    
	public get $alcance(): AlcanceMagia {
		return this.alcance;
	}

	public set $alcance(value: AlcanceMagia) {
		this.alcance = value;
	}

	public get $duracao(): DuracaoMagia {
		return this.duracao;
	}

	public set $duracao(value: DuracaoMagia) {
		this.duracao = value;
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

	public get $tipoArray(): Array<TipoMagiaComNivel> {
		return this.tipoArray;
	}

	public set $tipoArray(value: Array<TipoMagiaComNivel>) {
		this.tipoArray = value;
	}
	
    
}