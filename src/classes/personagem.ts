import { BolsaMoedas } from './bolsaMoedas';
import { Item } from './item';
import { Magia } from './magia/magia';
import { Atributos } from './atributos';
import { Idioma } from './idioma';
import { Raca } from './raca';
import { classeENUM } from './classes/classesEnum';
import { IClasse } from './classes/Iclasse';
import { Armadura } from './armadura/armadura';
import { Especializacao } from './especializacao';
import { Ladino } from './classes/ladino';
import { Mago } from './classes/mago';
import { diceENUM } from './diceENUM';

export class Personagem {
	private id: number;
	private nome: string;
	private descricao: string;
	private raca: Raca;
	private classes: Array<IClasse>;
	private especializacoes: Array<Especializacao>;
	private idiomas: Array<Idioma>;
	private atributos: Atributos;
	private magias: Array<Magia>;
	private xpAtual: number;
	private inventario: Array<Item>;
	private bolsaMoedas: BolsaMoedas;

	constructor($id: number, $nome: string, $descricao: string, $raca: Raca, $classe: Array<IClasse>, $especializacao: Array<Especializacao>, $idiomas: Array<Idioma>, $atributos: Atributos, $magias: Array<Magia>, $xpAtual: number, $inventario: Array<Item>, $bolsaMoedas: BolsaMoedas) {
		this.id = $id;
		this.nome = $nome;
		this.descricao = $descricao;
		this.raca = $raca;
		this.classes = $classe;
		this.especializacoes = $especializacao;
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

	public get $classes(): Array<IClasse> {
		return this.classes;
	}

	public set $classes(value: Array<IClasse>) {
		this.classes = value;
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

	public get $especializacoes(): Array<Especializacao> {
		return this.especializacoes;
	}

	public set $especializacoes(value: Array<Especializacao>) {
		this.especializacoes = value;
	}

	public $bonusDeAtaqueDaClasse(): number {
		let baClasse = 0;
		for (let i = 0; i < this.$classes.length; i++) {
			if (baClasse < this.$classes[i].$bonus().bonusDeAtaque[0]) {
				baClasse = this.$classes[i].$bonus().bonusDeAtaque[0];
			}
		}
		return baClasse;
	}

	public $bonusDeAtaqueCurtaDistancia(misc?: number): number {
		misc = misc ? misc : 0;
		return this.$atributos.$ajusteForca + this.$raca.$bonusDeAtaque + this.$bonusDeAtaqueDaClasse() + misc;
	}

	public $bonusDeAtaqueLongaDistancia(misc?: number): number {
		misc = misc ? misc : 0;
		return this.$atributos.$ajusteDestreza + this.$raca.$bonusDeAtaque + this.$bonusDeAtaqueDaClasse() + misc;
	}

	public $armadilhasTotal(): any {
		for (let i = 0; i < this.$classes.length; i++) {
			if (this.$classes[i] instanceof Ladino) {
				let tempClass = this.$classes[i] as Ladino;
				let totalArmadilhas = this.$atributos.$armadilhas + tempClass.$talentos.reconhecerDesarmarArmadilhas
				return totalArmadilhas;
			}
		}
		return "1 em 1d12";
	}

	public $arrombarTotal(): any {
		for (let i = 0; i < this.$classes.length; i++) {
			if (this.$classes[i] instanceof Ladino) {
				let tempClass = this.$classes[i] as Ladino;
				let total = this.$atributos.$furtividade_arrombar + tempClass.$talentos.abrirFechaduras;
				return total;
			}
		}
		return "1 em 1d12";
	}

	public $escalar(): any {
		for (let i = 0; i < this.$classes.length; i++) {
			if (this.$classes[i] instanceof Ladino) {
				let tempClass = this.$classes[i] as Ladino;
				return tempClass.$talentos.escalarMuros;
			}
		}
		return "1 em 1d12";
	}

	public $pungarTotal(): any {
		for (let i = 0; i < this.$classes.length; i++) {
			if (this.$classes[i] instanceof Ladino) {
				let tempClass = this.$classes[i] as Ladino;
				return this.$atributos.$pungar + tempClass.$talentos.pungar;
			}
		}
		return "1 em 1d12";
	}

	public $furtividadeTotal(): any {
		for (let i = 0; i < this.$classes.length; i++) {
			if (this.$classes[i] instanceof Ladino) {
				let tempClass = this.$classes[i] as Ladino;
				return this.$atributos.$furtividade_arrombar + tempClass.$talentos.moverEmSilencio;
			}
		}
		return "1 em 1d12";
	}

	public $percepcao(): any {
		for (let i = 0; i < this.$classes.length; i++) {
			if (this.$classes[i] instanceof Ladino) {
				let tempClass = this.$classes[i] as Ladino;
				return tempClass.$talentos.ouvirBarulhos;
			}
		}
		return "1 em 1d12";
	}

	public $peso(): number {
		let peso = 0;
		for (let itemInv of this.$inventario) {
			peso += itemInv.$peso;
		}
		return peso;
	}

	public $movimentacaoPeso(): number {
		if (this.$peso() > this.$atributos.$linearCargaLeve) {
			return -1;
		} else if (this.$peso() > this.$atributos.$linearCargaPesada) {
			return -2;
		} else if (this.$peso() > this.$atributos.$linearCargaPesada + 20) {
			return -Math.abs(this.$raca.$movimentacaoBase);
		} else
			return 0
	}

	public $movimentacaoArmadura(): number {
		let itemEquipado = 0;
		for (let itemInv of this.$inventario) {
			if (itemInv instanceof Armadura && itemInv.$equipado) {
				itemEquipado += itemInv.$movimentacao;
			}
		}
		return itemEquipado;
	}

	public $movimentacaoTotal(): number {
		return this.$raca.$movimentacaoBase + this.$movimentacaoArmadura() + this.$movimentacaoPeso();
	}

	public $acessoMagiaArcanaTotal(): Array<number> {
		let acesso = [0, 0, 0, 0, 0, 0, 0, 0, 0]
		for (let i = 0; i < this.$classes.length; i++) {
			if (this.$classes[i] instanceof Mago) {
				let tempClass = this.$classes[i] as Mago;
				acesso = tempClass.$magia.acessoMagia;
				acesso[0] += this.$atributos.$intPrimeiroCirculo;
				acesso[1] += this.$atributos.$intSegundoCirculo;
				acesso[2] += this.$atributos.$intTerceiroCirculo;
				break;
			}
		}
		return acesso
	}

	public $acessoMagiaDivinaTotal(): Array<number> {
		let acesso = [0, 0, 0, 0, 0, 0, 0]
		for (let i = 0; i < this.$classes.length; i++) {
			if (this.$classes[i] instanceof Mago) {
				let tempClass = this.$classes[i] as Mago;
				acesso = tempClass.$magia.acessoMagia;
				acesso[0] += this.$atributos.$sabPrimeiroCirculo;
				acesso[1] += this.$atributos.$sabSegundoCirculo;
				acesso[2] += this.$atributos.$sabTerceiroCirculo;
				break;
			}
		}
		return acesso
	}

	public $classeDeArmaduraEquipado(): number {

		let caEquipados = 0;
		for (let itemInv of this.$inventario) {
			if (itemInv instanceof Armadura && itemInv.$equipado) {
				caEquipados += itemInv.$bonusCa;
			}
		}
		return caEquipados;
	}

	public $classeDeArmaduraTotal(): number {
		return this.$raca.$classeDeArmadura + this.$classeDeArmaduraEquipado() + this.$atributos.$ajusteDestreza + 10;
	}

	public $jogadaDeProtecao(): number {
		let jp = 0;
		for (let i = 0; i < this.$classes.length; i++) {
			if (this.$classes[i].$bonus().jogadaDeProtecao > jp) {
				jp = this.$classes[i].$bonus().jogadaDeProtecao;
			}
		}
		return jp;
	}

	public $dadosDeVida(): string {
		let stringDados = "";
		for (let i = 0; i < this.$classes.length; i++) {

			
			if (this.$classes[i].$bonus().isDadoDeVida) {
				stringDados = "" + this.$classes[i].$bonus().quantidade+""+ this.diceEnumToString(this.$classes[i].$dadoDeVida);
			} else if (this.$classes[i].$bonus().nivel > 9) {
				stringDados = "9" + this.diceEnumToString(this.$classes[i].$dadoDeVida);
			}

			if (!this.$classes[i].$bonus().isDadoDeVida) {
				stringDados = "+" + this.$classes[i].$bonus().quantidade;
			}
			stringDados = stringDados + " + "
		}
		return stringDados;
	}

	private diceEnumToString(numero: diceENUM): string {
		switch (numero) {
			case diceENUM.d2:
				return 'd2';
			case diceENUM.d4:
				return 'd4';
			case diceENUM.d6:
				return 'd6';
			case diceENUM.d8:
				return 'd8';
			case diceENUM.d10:
				return 'd10';
			case diceENUM.d12:
				return 'd12';
			case diceENUM.d20:
				return 'd20';
			case diceENUM.d100:
				return 'd100';
			default:
				return 'd0';
		}

	}


}