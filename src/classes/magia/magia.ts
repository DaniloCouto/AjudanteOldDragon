import { AlcanceMagia } from './alcanceMagia';
import { DuracaoMagia } from './duracaoMagia';
import { TipoMagia } from './tipoMagia';

export class Magia {
	private tipoArray: Array<TipoMagia>;
    private tipoNivelArray: Array<number>;
    private alcance: AlcanceMagia;
    private duracao: DuracaoMagia;
    private nome: string;
    private descricao: string;

	constructor($tipoArray: Array<TipoMagia>, $tipoNivelArray: Array<number>, $alcance: AlcanceMagia, $duracao: DuracaoMagia, $nome: string, $descricao: string) {
		this.tipoArray = $tipoArray;
		this.tipoNivelArray = $tipoNivelArray;
		this.alcance = $alcance;
		this.duracao = $duracao;
		this.nome = $nome;
		this.descricao = $descricao;
	}

	public get $tipoNivelArray(): Array<number> {
		return this.tipoNivelArray;
	}

	public set $tipoNivelArray(value: Array<number>) {
		this.tipoNivelArray = value;
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

	public get $tipoArray(): Array<TipoMagia> {
		return this.tipoArray;
	}

	public set $tipoArray(value: Array<TipoMagia>) {
		this.tipoArray = value;
	}
	
    
}