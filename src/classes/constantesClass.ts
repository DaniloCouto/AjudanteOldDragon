export class BonusDeClasse {
    public nivel: number;
    public xp: number;
    public quantidade: number;
    public isDadoDeVida: number;
    public bonusDeAtaque: Array<Number>;
    public jogadaDeProtecao: number;

    constructor(nivel: number, xp: number, quantidade: number, isDadoDeVida: number, baseDeAtaque: Array<Number>, jogadaDeProtecao: number) {
        this.nivel = nivel;
        this.xp = xp;
        this.quantidade = quantidade;
        this.isDadoDeVida = isDadoDeVida;
        this.bonusDeAtaque = baseDeAtaque;
        this.jogadaDeProtecao = jogadaDeProtecao;
    }
}

export class AcessoMagia {
    public nivel: number;
    public acessoMagia: Array<number>;

    constructor(nivel: number, acessoMagia: Array<number>) {
        this.nivel = nivel;
        this.acessoMagia = acessoMagia;
    }
}

export class AfastarMortosVivos {
    public nivel: number;
    public esqueleto: any;
    public zumbi: any;
    public carnical: any;
    public inumano: any;
    public aparicao: any;
    public mumia: any;
    public espectro: any;
    public vampiro: any;

    constructor(nivel: number, esqueleto: any, zumbi: any, carnical: any, inumano: any, aparicao: any, mumia: any, espectro: any, vampiro: any) {
        this.nivel = nivel;
        this.esqueleto = esqueleto;
        this.zumbi = zumbi;
        this.carnical = carnical;
        this.inumano = inumano;
        this.aparicao = aparicao;
        this.mumia = mumia;
        this.espectro = espectro;
        this.vampiro = vampiro;
    }
}

export class AfastarMortosVivosPorDadosDeVida {
    public nivel : number;
    public mortosVivos: Array<any>;

    constructor(nivel : number, mortosVivos: Array<any>) {
        this.nivel = nivel;
        this.mortosVivos = mortosVivos;
    }
}

export class TalentosDeLadrao {
    public nivel: number;
    public abrirFechaduras: number;
    public reconhecerDesarmarArmadilhas: number;
    public escalarMuros: number;
    public moverEmSilencio: number;
    public esconderNasSombras: number;
    public pungar: number;
    public ouvirBarulhos: string;
    public ataquePelasCostas: number;

    constructor(nivel: number,abrirFechaduras: number, reconhecerDesarmarArmadilhas: number, escalarMuros: number, moverEmSilencio: number, esconderNasSombras: number, pungar: number, ouvirBarulhos: string, ataquePelasCostas: number) {
        this.nivel = nivel;
        this.abrirFechaduras = abrirFechaduras;
        this.reconhecerDesarmarArmadilhas = reconhecerDesarmarArmadilhas;
        this.escalarMuros = escalarMuros;
        this.moverEmSilencio = moverEmSilencio;
        this.esconderNasSombras = esconderNasSombras;
        this.pungar = pungar;
        this.ouvirBarulhos = ouvirBarulhos;
        this.ataquePelasCostas = ataquePelasCostas;
    }
}

export class ConstantesClass {
    constructor() {

    }

    public static get CLERIGO_BONUS(): Array<BonusDeClasse> {
        let array = [];
        array.push(new BonusDeClasse(1, 1500, 1,1, [0], 15));
        array.push(new BonusDeClasse(2, 3000, 2,1, [1], 15));
        array.push(new BonusDeClasse(3, 6000, 3,1, [2], 15));
        array.push(new BonusDeClasse(4, 12000, 4,1, [2], 14));
        array.push(new BonusDeClasse(5, 24000, 5,1, [3], 14));
        array.push(new BonusDeClasse(6, 48000, 6,1, [3], 14));
        array.push(new BonusDeClasse(7, 100000, 7,1, [3], 13));
        array.push(new BonusDeClasse(8, 200000, 8,1, [4], 13));
        array.push(new BonusDeClasse(9, 300000, 9,1, [4], 13));
        array.push(new BonusDeClasse(10, 400000, 1,0, [4], 12));
        array.push(new BonusDeClasse(11, 500000, 1,0, [5], 12));
        array.push(new BonusDeClasse(12, 600000, 2,0, [5], 12));
        array.push(new BonusDeClasse(13, 700000, 2,0, [5], 11));
        array.push(new BonusDeClasse(14, 800000, 3,0, [6], 11));
        array.push(new BonusDeClasse(15, 900000, 3,0, [6], 11));
        array.push(new BonusDeClasse(16, 1000000, 4,0, [6], 10));
        array.push(new BonusDeClasse(17, 1100000, 4,0, [7], 10));
        array.push(new BonusDeClasse(18, 1200000, 5,0, [7], 10));
        array.push(new BonusDeClasse(19, 1300000, 5,0, [7], 9));
        array.push(new BonusDeClasse(20, 1400000, 6,0, [8], 9));
        return array;
    }
    public static get CLERIGO_MAGIA(): Array<AcessoMagia> {
        let array = [];
        array.push(new AcessoMagia(1,[1,0,0,0,0,0,0]));
        array.push(new AcessoMagia(2,[2,0,0,0,0,0,0]));
        array.push(new AcessoMagia(3,[2,1,0,0,0,0,0]));
        array.push(new AcessoMagia(4,[3,2,0,0,0,0,0]));
        array.push(new AcessoMagia(5,[3,2,1,0,0,0,0]));
        array.push(new AcessoMagia(6,[3,3,2,0,0,0,0]));
        array.push(new AcessoMagia(7,[4,3,2,1,0,0,0]));
        array.push(new AcessoMagia(8,[4,3,3,2,0,0,0]));
        array.push(new AcessoMagia(9,[4,4,3,2,1,0,0]));
        array.push(new AcessoMagia(10,[5,4,3,3,2,0,0]));
        array.push(new AcessoMagia(11,[5,4,4,3,2,1,0]));
        array.push(new AcessoMagia(12,[5,5,4,3,3,2,0]));
        array.push(new AcessoMagia(13,[6,5,4,4,3,2,0]));
        array.push(new AcessoMagia(14,[6,5,5,4,3,3,0]));
        array.push(new AcessoMagia(15,[7,6,5,4,4,3,1]));
        array.push(new AcessoMagia(16,[7,6,5,5,4,3,2]));
        array.push(new AcessoMagia(17,[8,7,6,5,4,4,2]));
        array.push(new AcessoMagia(18,[8,7,6,5,5,4,3]));
        array.push(new AcessoMagia(19,[9,8,7,6,5,4,3]));
        array.push(new AcessoMagia(20,[9,8,7,6,5,5,3]));
        return array;
    }
    public static get CLERIGO_AFASTAR_MORTOS(): Array<AfastarMortosVivos> {
        let array = [];
        array.push(new AfastarMortosVivos(1,13,17,19,"N","N","N","N","N"));
        array.push(new AfastarMortosVivos(2,11,15,18,20,"N","N","N","N"));
        array.push(new AfastarMortosVivos(3,9,13,17,19,"N","N","N","N"));
        array.push(new AfastarMortosVivos(4,7,11,15,18,20,"N","N","N"));
        array.push(new AfastarMortosVivos(5,5,9,13,17,19,"N","N","N"));
        array.push(new AfastarMortosVivos(6,3,7,11,15,18,20,"N","N"));
        array.push(new AfastarMortosVivos(7,"A",5,9,13,17,19,"N","N"));
        array.push(new AfastarMortosVivos(8,"A",3,7,11,15,18,20,"N"));
        array.push(new AfastarMortosVivos(9,"A",2,5,9,13,17,19,"N"));
        array.push(new AfastarMortosVivos(10,"D","A",3,7,11,15,18,20));
        array.push(new AfastarMortosVivos(11,"D","A",2,5,9,13,17,19));
        array.push(new AfastarMortosVivos(12,"D","A","A",3,7,11,15,18));
        array.push(new AfastarMortosVivos(13,"D","D","A",2,5,9,13,17));
        array.push(new AfastarMortosVivos(15,"D","D","A","A",2,5,9,13));
        array.push(new AfastarMortosVivos(16,"D","D","D","A","A",3,7,11));
        array.push(new AfastarMortosVivos(17,"D","D","D","A","A",2,5,9));
        array.push(new AfastarMortosVivos(18,"D","D","D","D","A","A",3,7));
        array.push(new AfastarMortosVivos(19,"D","D","D","D","D","A",2,5));
        array.push(new AfastarMortosVivos(20,"D","D","D","D","D","A","A",3));

        return array;
    }
    public static get CLERIGO_AFASTAR_MORTOS_DADO_VIDA(): Array<AfastarMortosVivosPorDadosDeVida> {
        let array = [];
        array.push(new AfastarMortosVivosPorDadosDeVida(1,[13,17,19,'N','N','N','N','N','N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(2,[11,15,18,20,'N','N','N','N','N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(3,[9,13,17,19,'N','N','N','N','N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(4,[7,11,15,18,20,'N','N','N','N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(5,[5,9,13,17,19,'N','N','N','N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(6,[3,7,11,15,18,20,'N','N','N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(7,["A",5,9,13,17,19,'N','N','N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(8,["A",3,7,11,15,18,20,'N','N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(9,["A",2,5,9,13,17,19,'N','N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(10,["D","A",3,7,11,15,18,20,'N','N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(11,["D","A",2,5,9,13,17,19,20,'N','N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(12,["D","A","A",3,7,11,15,18,19,20,'N','N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(13,["D","D","A",2,5,9,13,17,18,19,20,'N','N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(14,["D","D","A","A",3,7,11,15,17,18,19,20,'N','N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(15,["D","D","D","A",2,7,9,13,15,17,18,19,20,'N','N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(16,["D","D","D","A","A",3,7,11,13,15,17,18,19,20,'N','N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(17,["D","D","D","D","A",2,7,9,11,13,15,17,18,19,20,'N','N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(18,["D","D","D","D","A","A",3,7,9,11,13,15,17,18,19,20,'N','N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(19,["D","D","D","D","D","A",2,5,7,9,11,13,15,17,18,19,20,'N']));
        array.push(new AfastarMortosVivosPorDadosDeVida(20,["D","D","D","D","D","A","A",3,5,7,9,11,13,15,17,18,19,20]));

        return array;
    }
    public static get MAN_AT_ARMS_BONUS(): Array<BonusDeClasse> {
        let array = [];
        array.push(new BonusDeClasse(1, 2000, 1,1, [1], 16));
        array.push(new BonusDeClasse(2, 4000, 2,1, [2], 16));
        array.push(new BonusDeClasse(3, 8000, 3,1, [3], 16));
        array.push(new BonusDeClasse(4, 16000, 4,1, [4], 15));
        array.push(new BonusDeClasse(5, 32000, 5,1, [5], 15));
        array.push(new BonusDeClasse(6, 64000, 6,1, [6], 15));
        array.push(new BonusDeClasse(7, 128000, 7,1, [7,1], 14));
        array.push(new BonusDeClasse(8, 256000, 8,1, [8,2], 14));
        array.push(new BonusDeClasse(9, 304000, 9,1, [9,3], 14));
        array.push(new BonusDeClasse(10, 408000, 2,0, [10,4], 13));
        array.push(new BonusDeClasse(11, 516000, 2,0, [10,4], 13));
        array.push(new BonusDeClasse(12, 632000, 4,0, [11,5], 13));
        array.push(new BonusDeClasse(13, 704000, 4,0, [11,5], 12));
        array.push(new BonusDeClasse(14, 808000, 5,0, [12,6], 12));
        array.push(new BonusDeClasse(15, 916000, 5,0, [12,6], 12));
        array.push(new BonusDeClasse(16, 1032000, 6,0, [13,7], 11));
        array.push(new BonusDeClasse(17, 1064000, 6,0, [13,7], 11));
        array.push(new BonusDeClasse(18, 1128000, 7,0, [14,8], 11));
        array.push(new BonusDeClasse(19, 1256000, 7,0, [14,8], 10));
        array.push(new BonusDeClasse(20, 1464000, 8,0, [15,9], 10));

        return array;
    }
    public static get MAGO_BONUS(): Array<BonusDeClasse> {
        let array = [];
        array.push(new BonusDeClasse(1, 2500, 1,1, [0], 14));
        array.push(new BonusDeClasse(2, 5000, 2,1, [0], 14));
        array.push(new BonusDeClasse(3, 10000, 3,1, [1], 14));
        array.push(new BonusDeClasse(4, 20000, 4,1, [1], 13));
        array.push(new BonusDeClasse(5, 40000, 5,1, [2], 13));
        array.push(new BonusDeClasse(6, 80000, 6,1, [2], 13));
        array.push(new BonusDeClasse(7, 160000, 7,1, [3], 12));
        array.push(new BonusDeClasse(8, 310000, 8,1, [3], 12));
        array.push(new BonusDeClasse(9, 460000, 9,1, [3], 12));
        array.push(new BonusDeClasse(10, 510000, 1,0, [4], 11));
        array.push(new BonusDeClasse(11, 660000, 1,0, [4], 11));
        array.push(new BonusDeClasse(12, 710000, 1,0, [4], 11));
        array.push(new BonusDeClasse(13, 860000, 1,0, [5], 10));
        array.push(new BonusDeClasse(14, 910000, 1,0, [5], 10));
        array.push(new BonusDeClasse(15, 1060000, 2,0, [5], 10));
        array.push(new BonusDeClasse(16, 1110000, 2,0, [6], 9));
        array.push(new BonusDeClasse(17, 1160000, 2,0, [6], 9));
        array.push(new BonusDeClasse(18, 1210000, 2,0, [6], 9));
        array.push(new BonusDeClasse(19, 1260000, 2,0, [7], 8));
        array.push(new BonusDeClasse(20, 1300000, 3,0, [7], 8));
        
        return array;
    }
    public static get MAGO_MAGIA(): Array<AcessoMagia> {
        let array = [];
        array.push(new AcessoMagia(1,[1,0,0,0,0,0,0,0,0]));
        array.push(new AcessoMagia(2,[2,0,0,0,0,0,0,0,0]));
        array.push(new AcessoMagia(3,[2,1,0,0,0,0,0,0,0]));
        array.push(new AcessoMagia(4,[2,2,0,0,0,0,0,0,0]));
        array.push(new AcessoMagia(5,[2,2,1,0,0,0,0,0,0]));
        array.push(new AcessoMagia(6,[3,2,2,0,0,0,0,0,0]));
        array.push(new AcessoMagia(7,[3,2,2,1,0,0,0,0,0]));
        array.push(new AcessoMagia(8,[3,3,2,2,0,0,0,0,0]));
        array.push(new AcessoMagia(9,[3,3,2,2,1,0,0,0,0]));
        array.push(new AcessoMagia(10,[3,3,3,2,2,0,0,0,0]));
        array.push(new AcessoMagia(11,[4,3,3,2,2,1,0,0,0]));
        array.push(new AcessoMagia(12,[4,3,3,3,2,2,0,0,0]));
        array.push(new AcessoMagia(13,[4,4,3,3,2,2,1,0,0]));
        array.push(new AcessoMagia(14,[4,4,3,3,3,2,2,0,0]));
        array.push(new AcessoMagia(15,[5,4,4,3,3,2,2,1,0]));
        array.push(new AcessoMagia(16,[5,4,4,3,3,3,2,2,0]));
        array.push(new AcessoMagia(17,[5,5,4,4,3,3,2,2,1]));
        array.push(new AcessoMagia(18,[5,5,4,4,3,3,3,2,2]));
        array.push(new AcessoMagia(19,[5,5,5,4,4,3,3,2,2]));
        array.push(new AcessoMagia(20,[6,6,5,4,4,3,3,3,2]));
        return array;
    }
    public static get LADINO_BONUS(): Array<BonusDeClasse> {
        let array = [];
        array.push(new BonusDeClasse(1, 1250, 1,1, [1], 15));
        array.push(new BonusDeClasse(2, 2500, 2,1, [1], 15));
        array.push(new BonusDeClasse(3, 5000, 3,1, [2], 15));
        array.push(new BonusDeClasse(4, 10000, 4,1, [2], 14));
        array.push(new BonusDeClasse(5, 20000, 5,1, [2], 14));
        array.push(new BonusDeClasse(6, 40000, 6,1, [3], 14));
        array.push(new BonusDeClasse(7, 80000, 7,1, [3], 13));
        array.push(new BonusDeClasse(8, 160000, 8,1, [3], 13));
        array.push(new BonusDeClasse(9, 240000, 9,1, [4], 13));
        array.push(new BonusDeClasse(10, 400000, 1,0, [4], 12));
        array.push(new BonusDeClasse(11, 520000, 1,0, [4], 12));
        array.push(new BonusDeClasse(12, 640000, 2,0, [5], 12));
        array.push(new BonusDeClasse(13, 760000, 2,0, [5], 11));
        array.push(new BonusDeClasse(14, 880000, 2,0, [5], 11));
        array.push(new BonusDeClasse(15, 1000000, 3,0, [6], 11));
        array.push(new BonusDeClasse(16, 1120000, 3,0, [6], 10));
        array.push(new BonusDeClasse(17, 1240000, 3,0, [6], 10));
        array.push(new BonusDeClasse(18, 1360000, 4,0, [7], 10));
        array.push(new BonusDeClasse(19, 1480000, 4,0, [7], 9));
        array.push(new BonusDeClasse(20, 1520000, 4,0, [7], 9));

        
        return array;
    }

    public static get LADINO_TALENTOS(): Array<TalentosDeLadrao> {
        let array = [];
        array.push(new TalentosDeLadrao(1, 15, 20, 80, 20, 10, 20, '1-2', 2));
        array.push(new TalentosDeLadrao(2, 20, 25, 81, 25, 15, 25, '1-2', 2));
        array.push(new TalentosDeLadrao(3, 25, 30, 82, 30, 20, 30, '1-2', 2));
        array.push(new TalentosDeLadrao(4, 30, 35, 83, 35, 25, 35, '1-2', 2));
        array.push(new TalentosDeLadrao(5, 35, 40, 84, 40, 30, 40, '1-3', 2));
        array.push(new TalentosDeLadrao(6, 40, 45, 85, 45, 35, 45, '1-3', 3));
        array.push(new TalentosDeLadrao(7, 45, 50, 86, 50, 40, 50, '1-3', 3));
        array.push(new TalentosDeLadrao(8, 50, 55, 87, 55, 45, 55, '1-3', 3));
        array.push(new TalentosDeLadrao(9, 55, 60, 88, 60, 50, 60, '1-3', 3));
        array.push(new TalentosDeLadrao(10, 60, 62, 89, 65, 55, 65, '1-4', 3));
        array.push(new TalentosDeLadrao(11, 62, 64, 90, 70, 60, 70, '1-4', 3));
        array.push(new TalentosDeLadrao(12, 64, 66, 91, 72, 62, 72, '1-4', 4));
        array.push(new TalentosDeLadrao(13, 66, 68, 92, 74, 64, 74, '1-4', 4));
        array.push(new TalentosDeLadrao(14, 68, 70, 93, 76, 66, 76, '1-4', 4));
        array.push(new TalentosDeLadrao(15, 70, 72, 94, 78, 68, 78, '1-4', 4));
        array.push(new TalentosDeLadrao(16, 72, 74, 95, 80, 70, 80, '1-5', 4));
        array.push(new TalentosDeLadrao(17, 74, 76, 96, 82, 72, 82, '1-5', 4));
        array.push(new TalentosDeLadrao(18, 76, 78, 97, 84, 74, 84, '1-5', 5));
        array.push(new TalentosDeLadrao(19, 78, 80, 98, 86, 76, 86, '1-5', 5));
        array.push(new TalentosDeLadrao(20, 80, 82, 99, 88, 78, 88, '1-5', 5));

        return array;
    }

}