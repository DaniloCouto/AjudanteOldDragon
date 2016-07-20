
class ModificadoresTerreno {
    public tipo: string;
    public penalidadeMetros: number;
    public chancePerder: number;
    public chanceComida: number;

    constructor(tipo: string, penalidadeMetros: number, chancePerder: number, chanceComida: number) {
        this.tipo = tipo;
        this.penalidadeMetros = penalidadeMetros;
        this.chancePerder = chancePerder;
        this.chanceComida = chanceComida;
    }

}

class AjusteForca {
    public forMin: number;
    public forMax: number;
    public ajuste: number;
    public linearSemCarga: number;
    public linearCargaLeve: number;
    public linearCargaPesada: number;

    constructor(forMin: number, forMax: number, ajuste: number, linearSemCarga: number, linearCargaLeve: number, linearCargaPesada: number) {
        this.forMin = forMin;
        this.forMax = forMax;
        this.ajuste = ajuste;
        this.linearSemCarga = linearSemCarga;
        this.linearCargaLeve = linearCargaLeve;
        this.linearCargaPesada = linearCargaPesada;
    }
}

class AjusteDestreza {
    public desMin: number;
    public desMax: number;
    public ajuste: number;
    public armadilhas: number;
    public furtividade_arrombar: number;
    public pungar: number;

    constructor(desMin: number, desMax: number, ajuste: number, armadilhas: number, furtividade: number, pungar: number) {
        this.desMin = desMin;
        this.desMax = desMax;
        this.ajuste = ajuste;
        this.armadilhas = armadilhas;
        this.furtividade_arrombar = furtividade;
        this.pungar = pungar;
    }
}

class AjusteConstituicao {
    public conMin: number;
    public conMax: number;
    public ajuste: number;
    public chance_res: number;

    constructor(conMin: number, conMax: number, ajuste: number, chance_res: number) {
        this.conMin = conMin;
        this.conMax = conMax;
        this.ajuste = ajuste;
        this.chance_res = chance_res;
    }
}

class AjusteInteligencia {
    public intMin: number;
    public intMax: number;
    public idiomasAdicionais: number;
    public chanceAprenderMagia: number;
    public primeiroCirculo: number;
    public segundoCirculo: number;
    public terceiroCirculo: number;

    constructor(intMin: number, intMax: number, idiomasAdicionais: number, chanceAprenderMagia: number, primeiroCirculo: number, segundoCirculo: number, terceiroCirculo: number) {
        this.intMin = intMin;
        this.intMax = intMax;
        this.idiomasAdicionais = idiomasAdicionais;
        this.chanceAprenderMagia = chanceAprenderMagia;
        this.primeiroCirculo = primeiroCirculo;
        this.segundoCirculo = segundoCirculo;
        this.terceiroCirculo = terceiroCirculo;
    }
}

class AjusteSabedoria {
    public sabMin: number;
    public sabMax: number;
    public ajuste: number;
    public primeiroCirculo: number;
    public segundoCirculo: number;
    public terceiroCirculo: number;

    constructor(sabMin: number, sabMax: number, ajuste: number, primeiroCirculo: number, segundoCirculo: number, terceiroCirculo: number) {
        this.sabMin = sabMin;
        this.sabMax = sabMax;
        this.ajuste = ajuste;
        this.primeiroCirculo = primeiroCirculo;
        this.segundoCirculo = segundoCirculo;
        this.terceiroCirculo = terceiroCirculo;
    }
}

class AjusteCarisma {
    public carMin: number;
    public carMax: number;
    public seguidores: number;
    public ajusteReacao: number;
    public mortosVivosAfastados: string;

    constructor(carMin: number, carMax: number, seguidores: number, ajusteReacao: number, mortosVivosAfastados: string) {
        this.carMin = carMin;
        this.carMax = carMax;
        this.seguidores = seguidores;
        this.ajusteReacao = ajusteReacao;
        this.mortosVivosAfastados = mortosVivosAfastados;
    }
}


export class Constantes {
    constructor() {

    }

    public static get AJUSTE_FORCA(): Array<AjusteForca> {
        let array = [];
        array.push(new AjusteForca(1, 1, -5, 1, 2, 5));
        array.push(new AjusteForca(2, 3, -4, 3, 5, 15));
        array.push(new AjusteForca(4, 5, -3, 5, 8, 25));
        array.push(new AjusteForca(6, 7, -2, 12, 15, 35));
        array.push(new AjusteForca(8, 9, -1, 15, 25, 45));
        array.push(new AjusteForca(10, 11, 0, 19, 30, 58));
        array.push(new AjusteForca(12, 13, 1, 25, 40, 75));
        array.push(new AjusteForca(14, 15, 2, 33, 50, 100));
        array.push(new AjusteForca(16, 17, 3, 43, 70, 130));
        array.push(new AjusteForca(18, 19, 4, 58, 90, 175));
        array.push(new AjusteForca(20, 21, 5, 75, 120, 230));
        array.push(new AjusteForca(22, 23, 6, 100, 150, 300));
        array.push(new AjusteForca(24, 25, 7, 135, 200, 400));
        array.push(new AjusteForca(26, 27, 8, 175, 250, 520));
        array.push(new AjusteForca(28, 29, 9, 235, 350, 700));

        return array;
    }

    public static get AJUSTE_DESTREZA(): Array<AjusteDestreza> {
        let array = [];

        array.push(new AjusteDestreza(1, 1, -5, -25, -25, -25));
        array.push(new AjusteDestreza(2, 3, -4, -20, -20, -20));
        array.push(new AjusteDestreza(4, 5, -3, -15, -15, -15));
        array.push(new AjusteDestreza(6, 7, -2, -10, -10, -10));
        array.push(new AjusteDestreza(8, 9, -1, -5, -5, -5));
        array.push(new AjusteDestreza(10, 11, 0, 0, 0, 0));
        array.push(new AjusteDestreza(12, 13, 1, 0, 5, 0));
        array.push(new AjusteDestreza(14, 15, 2, 0, 10, 5));
        array.push(new AjusteDestreza(16, 17, 3, 5, 15, 10));
        array.push(new AjusteDestreza(18, 19, 4, 10, 20, 15));
        array.push(new AjusteDestreza(20, 21, 5, 15, 25, 20));
        array.push(new AjusteDestreza(22, 23, 6, 20, 30, 25));
        array.push(new AjusteDestreza(24, 25, 7, 25, 35, 30));
        array.push(new AjusteDestreza(26, 27, 8, 30, 40, 35));
        array.push(new AjusteDestreza(28, 29, 9, 35, 45, 40));

        return array;
    }

    public static get AJUSTE_CONSTITUICAO(): Array<AjusteConstituicao> {
        let array = [];
        array.push(new AjusteConstituicao(1, 1, -5, 0));
        array.push(new AjusteConstituicao(2, 3, -4, 0));
        array.push(new AjusteConstituicao(4, 5, -3, 0));
        array.push(new AjusteConstituicao(6, 7, -2, 1));
        array.push(new AjusteConstituicao(8, 9, -1, 5));
        array.push(new AjusteConstituicao(10, 11, 0, 10));
        array.push(new AjusteConstituicao(12, 13, 1, 25));
        array.push(new AjusteConstituicao(14, 15, 2, 50));
        array.push(new AjusteConstituicao(16, 17, 3, 75));
        array.push(new AjusteConstituicao(18, 19, 4, 95));
        array.push(new AjusteConstituicao(20, 21, 5, 100));
        array.push(new AjusteConstituicao(22, 23, 6, 100));
        array.push(new AjusteConstituicao(24, 25, 7, 100));
        array.push(new AjusteConstituicao(26, 27, 8, 100));
        array.push(new AjusteConstituicao(28, 29, 9, 100));
        return array;
    }

    public static get AJUSTE_INTELIGENCIA(): Array<AjusteInteligencia> {
        let array = [];
        array.push(new AjusteInteligencia(1, 13, 0, 0, 0, 0, 0));
        array.push(new AjusteInteligencia(14, 15, 1, 25, 0, 0, 0));
        array.push(new AjusteInteligencia(16, 17, 2, 35, 1, 0, 0));
        array.push(new AjusteInteligencia(18, 19, 3, 45, 2, 0, 0));
        array.push(new AjusteInteligencia(20, 21, 4, 55, 2, 1, 0));
        array.push(new AjusteInteligencia(22, 23, 5, 65, 2, 2, 0));
        array.push(new AjusteInteligencia(24, 25, 6, 75, 2, 2, 1));
        array.push(new AjusteInteligencia(26, 27, 7, 85, 3, 2, 1));
        array.push(new AjusteInteligencia(28, 29, 8, 95, 3, 3, 1));

        return array;
    }

    public static get AJUSTE_SABEDORIA(): Array<AjusteSabedoria> {
        let array = [];
        array.push(new AjusteSabedoria(1, 1, -5, 0, 0, 0));
        array.push(new AjusteSabedoria(2, 3, -4, 0, 0, 0));
        array.push(new AjusteSabedoria(4, 5, -3, 0, 0, 0));
        array.push(new AjusteSabedoria(6, 7, -2, 0, 0, 0));
        array.push(new AjusteSabedoria(8, 9, -1, 0, 0, 0));
        array.push(new AjusteSabedoria(10, 11, 0, 0, 0, 0));
        array.push(new AjusteSabedoria(12, 13, 1, 0, 0, 0));
        array.push(new AjusteSabedoria(14, 15, 2, 0, 0, 0));
        array.push(new AjusteSabedoria(16, 17, 3, 1, 0, 0));
        array.push(new AjusteSabedoria(18, 19, 4, 2, 0, 0));
        array.push(new AjusteSabedoria(20, 21, 5, 2, 1, 0));
        array.push(new AjusteSabedoria(22, 23, 6, 2, 2, 0));
        array.push(new AjusteSabedoria(24, 25, 7, 2, 2, 1));
        array.push(new AjusteSabedoria(26, 27, 8, 3, 2, 1));
        array.push(new AjusteSabedoria(28, 29, 9, 3, 3, 1));

        return array;
    }

    public static get AJUSTE_CARISMA(): Array<AjusteCarisma> {
        let array = [];
        array.push(new AjusteCarisma(1, 1, 0, -25, '0'));
        array.push(new AjusteCarisma(2, 3, 0, -20, '0'));
        array.push(new AjusteCarisma(4, 5, 0, -15, '0'));
        array.push(new AjusteCarisma(6, 7, 0, -10, '0'));
        array.push(new AjusteCarisma(8, 9, 0, -5, '1'));
        array.push(new AjusteCarisma(10, 11, 1, 0, '1d2'));
        array.push(new AjusteCarisma(12, 13, 2, 5, '1d3'));
        array.push(new AjusteCarisma(14, 15, 3, 10, '1d4'));
        array.push(new AjusteCarisma(16, 17, 4, 15, '1d6'));
        array.push(new AjusteCarisma(18, 19, 5, 20, '1d8'));
        array.push(new AjusteCarisma(20, 21, 6, 25, '2d4'));
        array.push(new AjusteCarisma(22, 23, 7, 30, '1d10'));
        array.push(new AjusteCarisma(24, 25, 8, 35, '1d12'));
        array.push(new AjusteCarisma(26, 27, 9, 40, '2d6'));
        array.push(new AjusteCarisma(28, 29, 10, 45, '1d20'));

        return array;
    }


    public static get MODIFICADORES_DE_TERRENO(): Array<ModificadoresTerreno> {
        let array = [];
        array.push(new ModificadoresTerreno('Planice', -0, 15, 60));
        array.push(new ModificadoresTerreno('Colina', -1, 15, 60));
        array.push(new ModificadoresTerreno('Montanha', -1, 30, 40));
        array.push(new ModificadoresTerreno('Pantano', -4, 50, 50));
        array.push(new ModificadoresTerreno('Geleira', -3, 50, 30));
        array.push(new ModificadoresTerreno('Deserto', -2, 50, 15));
        array.push(new ModificadoresTerreno('Floresta', -2, 30, 30));
        array.push(new ModificadoresTerreno('Trilha', 1, 5, 20));
        array.push(new ModificadoresTerreno('Estrada', 2, 0, 10));

        return array;
    }
}