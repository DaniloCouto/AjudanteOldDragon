import { Item } from './item';
import { Armadura } from './armadura';
import { Atributos } from './atributos';

export class Character {

    public nomePersonagem: string = '';
    public jogador: string = '';
    public raca: string = '';
    public classeEspecializacao: string = '';
    public nivel: number = 0;
    public alinhamento: string = '';
    public caracteristas: string = '';

    public atributos: Atributos = new Atributos(1, 1, 1, 1, 1, 1);

    public CaArmadura: number = 0;
    public CaRaca: number = 0;
    public CaOutros: number = 0;
    public CaTotal: number = 0;

    public JpBase: number = 0;

    public movimentoRaca: number = 0;
    public movimentoCarga: number = 0;
    public movimentoArmadura: number = 0;
    public movimentoTotal: number = 0;

    public pontosDeVidaMax: number = 0;
    public pontosDeVidaAtual: number = 0;

    public BaClasse: number = 0;
    public BaRaca: number = 0;
    public BaTotal: number = 0;

    // Acesso a Magia

    private acessoMagia: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Expulsar Mortos

    private expulsarMortos: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Talentos Ladinos

    public arrombar: number = 0;
    public armadilhas: number = 0;
    public escalarMuros: number = 0;
    public furtividade: number = 0;
    public pungar: number = 0;
    public percepcao: number = 0;
    public ataquePelasCostas: number = 0;

    public idiomas: Array<string> = [];

    public dinheiro: number = 0;

    public equipamento: Array<Item> = [];
    public carga: number = 0;


    constructor() {

    }

    setAcessoMagia(acessoMagia: Array<number>): void {
        if (acessoMagia.length === 9) {
            this.acessoMagia = acessoMagia;
        }else {
            console.error('O Array de acessoMagia precisa ter 9 de tamanho')
        }
    }

    getAcessoMagia(): Array<number> {
        return this.acessoMagia;
    }

    setExpulsarMortos(expulsarMortos: Array<number>): void {
        if (expulsarMortos.length === 20) {
            this.expulsarMortos = expulsarMortos;
        }else {
            console.error('O Array de expulsarMortos precisa ter 20 de tamanho')
        }
    }

    getExpulsarMortos(): Array<number> {
        return this.expulsarMortos;
    }

    gerarBaTotal(): void {
        this.BaTotal = (this.atributos.$ajusteForca + this.atributos.$ajusteDestreza + this.BaClasse + this.BaRaca);
    }

    gerarCaTotal(): void {
        this.CaTotal = (this.CaArmadura + this.CaRaca + this.CaOutros + this.atributos.$ajusteDestreza);
    }

    gerarMovimentoArmadura(): void {
        this.movimentoArmadura = 0;
        this.equipamento.forEach(element => {
            if (element instanceof Armadura) {
                if (element.getEquipado()) {
                    this.movimentoArmadura += element.getMovimentacao()
                }
            }
        });
    }

    gerarCaArmadura(): void {
        this.CaArmadura = 0;
        this.equipamento.forEach(element => {
            if (element instanceof Armadura) {
                if (element.getEquipado()) {
                    this.CaArmadura += element.getBonusCa()
                }
            }
        });
    }

    gerarMovimentoTotal(): void {
        this.movimentoTotal = (this.movimentoArmadura + this.movimentoCarga + this.movimentoRaca);
    }

    gerarPesoEquipamento(): void {
        this.carga = 0;
        this.equipamento.forEach(element => {
            this.carga += element.getPeso();
        });
    }

}
