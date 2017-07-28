import { Idioma } from "./idioma";

export class Raca {
  private id: number;
  private nome: string;
  private descricao: string;
  private altura: number;
  private peso: number;
  private classeDeArmadura: number;
  private bonusDeAtaque: number;
  private movimentacaoBase: number;
  private habilidades: Array<HabilidadeRacial>;
  private idioma: Idioma;

  constructor(
    $id: number,
    $nome: string,
    $descricao: string,
    $altura: number,
    $peso: number,
    $classeDeArmadura: number,
    $bonusDeAtaque: number,
    $movimentacaoBase: number,
    $habilidades: Array<HabilidadeRacial>,
    $idioma: Idioma
  ) {
    this.id = $id;
    this.nome = $nome;
    this.descricao = $descricao;
    this.altura = $altura;
    this.peso = $peso;
    this.classeDeArmadura = $classeDeArmadura;
    this.bonusDeAtaque = $bonusDeAtaque;
    this.movimentacaoBase = $movimentacaoBase;
    this.habilidades = $habilidades;
    this.idioma = $idioma;
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

  public get $altura(): number {
    return this.altura;
  }

  public set $altura(value: number) {
    this.altura = value;
  }

  public get $classeDeArmadura(): number {
    return this.classeDeArmadura;
  }

  public set $classeDeArmadura(value: number) {
    this.classeDeArmadura = value;
  }

  public get $bonusDeAtaque(): number {
    return this.bonusDeAtaque;
  }

  public set $bonusDeAtaque(value: number) {
    this.bonusDeAtaque = value;
  }

  public get $movimentacaoBase(): number {
    return this.movimentacaoBase;
  }

  public set $movimentacaoBase(value: number) {
    this.movimentacaoBase = value;
  }

  public get $habilidades(): Array<HabilidadeRacial> {
    return this.habilidades;
  }

  public set $habilidades(value: Array<HabilidadeRacial>) {
    this.habilidades = value;
  }

  public get $idioma(): Idioma {
    return this.idioma;
  }

  public set $idioma(value: Idioma) {
    this.idioma = value;
  }

	public get $peso(): number {
		return this.peso;
	}

	public set $peso(value: number) {
		this.peso = value;
	}
  
}

export class HabilidadeRacial {
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




