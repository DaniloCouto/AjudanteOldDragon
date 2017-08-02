import { BolsaMoedas } from './bolsaMoedas';
import {BaseClass} from './classes/classe';
import { Item } from './item';
import { Magia } from './magia/magia';
import { Atributos } from './atributos';
import { Idioma } from './idioma';
import { Raca } from './raca';
import { classeENUM } from './classes/classesEnum';

export class Personagem {
    private id: number;
    private nome: string;
	private descricao: string;
    private raca : Raca;
    private classe : BaseClass;
    private idiomas: Array<Idioma>;
    private atributos : Atributos;
    private magias: Array<Magia>;
    private xpAtual: number;
    private inventario: Array<Item>;
    private bolsaMoedas: BolsaMoedas;

	constructor($id: number, $nome: string, $descricao: string, $raca: Raca, $classe: BaseClass, $idiomas: Array<Idioma>, $atributos: Atributos, $magias: Array<Magia>, $xpAtual: number, $inventario: Array<Item>, $bolsaMoedas: BolsaMoedas) {
		this.id = $id;
		this.nome = $nome;
		this.descricao = $descricao;
		this.raca = $raca;
		this.classe = $classe;
		this.idiomas = $idiomas;
		this.atributos = $atributos;
		this.magias = $magias;
		this.xpAtual = $xpAtual;
		this.inventario = $inventario;
		this.bolsaMoedas = $bolsaMoedas;
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
    
	public get $raca(): Raca {
		return this.raca;
	}

	public set $raca(value: Raca) {
		this.raca = value;
	}

	public get $classe(): BaseClass {
		return this.classe;
	}

	public set $classe(value: BaseClass) {
		this.classe = value;
	}

	public get $idiomas(): Array<Idioma> {
		return this.idiomas;
	}

	public set $idiomas(value: Array<Idioma>) {
		this.idiomas = value;
	}

	public get $atributos(): Atributos {
		return this.atributos;
	}

	public set $atributos(value: Atributos) {
		this.atributos = value;
	}

	public get $magias(): Array<Magia> {
		return this.magias;
	}

	public set $magias(value: Array<Magia>) {
		this.magias = value;
	}

	public get $xpAtual(): number {
		return this.xpAtual;
	}

	public set $xpAtual(value: number) {
		this.xpAtual = value;
	}

	public get $inventario(): Array<Item> {
		return this.inventario;
	}

	public set $inventario(value: Array<Item>) {
		this.inventario = value;
	}
	
	public get $bolsaMoedas(): BolsaMoedas {
		return this.bolsaMoedas;
	}

	public set $bolsaMoedas(value: BolsaMoedas) {
		this.bolsaMoedas = value;
	}
	
}