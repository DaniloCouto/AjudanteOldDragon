import { Constantes } from './constantes';

export class Atributos {
    private forca: number;
    private destreza: number;
    private constituicao: number;
    private inteligencia: number;
    private sabedoria: number;
    private carisma: number;
    private constants: Constantes = new Constantes();

    constructor($forca: number, $destreza: number, $constituicao: number, $inteligencia: number, $sabedoria: number, $carisma: number) {
        this.forca = $forca;
        this.destreza = $destreza;
        this.constituicao = $constituicao;
        this.inteligencia = $inteligencia;
        this.sabedoria = $sabedoria;
        this.carisma = $carisma;
    }

    public get $forca(): number {
        return this.forca;
    }

    public set $forca(value: number) {
        this.forca = value;
    }

    public get $ajusteForca(): number {
        let value = Number(this.forca);
        if (value <= 0) {
            return 0;
        } else if(value > 29){
            if(!(value % 2)){
                value += 1;
            };
            return (0.5*value)-5.5;
        }else{
            let ajustes = Constantes.AJUSTE_FORCA;
            for (let i = 0; i < ajustes.length; i++) {
                 if (value >= ajustes[i].forMin && value <= ajustes[i].forMax) {
                    return ajustes[i].ajuste;
                } 
            }
        }
    }

    public get $linearSemCarga(): number {
        let value = Number(this.forca);
        if (value <= 0) {
            return 0;
        } else if(value > 29){
            if( !(value % 2)){
                value += 1;
            };
            return (30*value)-635;
        }else {
            let ajustes = Constantes.AJUSTE_FORCA;
            for (var index = 0; index < ajustes.length; index++) {
                if (value >= ajustes[index].forMin && value <= ajustes[index].forMax) {
                    return ajustes[index].linearSemCarga;
                }
            }
        }
    }

    public get $linearCargaLeve(): number {
        let value = Number(this.forca);
        if (value <= 0) {
            return 0;
        } else if(value > 29){
            if( !(value % 2)){
                value += 1;
            };
            return (50*value)-1100;
        }  else {
            let ajustes = Constantes.AJUSTE_FORCA;
            for (var index = 0; index < ajustes.length; index++) {
                if (value >= ajustes[index].forMin && value <= ajustes[index].forMax) {
                    return ajustes[index].linearCargaLeve;
                }
            }
        }
    }

    public get $linearCargaPesada(): number {
        let value = Number(this.forca);
        if (value <= 0) {
            return 0;
        } else if(value > 29){
            if( !(value % 2)){
                value += 1;
            };
            return (90*value)-1910;
        }  else {
            let ajustes = Constantes.AJUSTE_FORCA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.forca >= ajustes[index].forMin && this.forca <= ajustes[index].forMax) {
                    return ajustes[index].linearCargaPesada;
                }
            }
        }
    }

    public set $destreza(value: number) {
        this.destreza = Number(value);
    }

    public get $destreza(): number {
        return this.destreza;
    }

    public get $ajusteDestreza(): number {
        if (this.destreza <= 0) {
            return 0;
        } else if (this.destreza > 29) {
            let value = this.destreza;
            if( !(value % 2)){
                value += 1;
            };
            return (0.5*value-5.5);
        } else  {
            let ajustes = Constantes.AJUSTE_DESTREZA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.destreza >= ajustes[index].desMin && this.destreza <= ajustes[index].desMax) {
                    return ajustes[index].ajuste;
                }
            }
        }
    }

    public get $armadilhas(): number {
        if (this.destreza <= 0) {
            return 0;
        } else if (this.destreza > 29) {
            let dex = this.destreza;
            if( !(dex % 2) ){
                dex += 1
            }
            let result = Math.floor(2.5*dex-37.5);
            return result > 100 ? 100 : result;
        } else {
            let ajustes = Constantes.AJUSTE_DESTREZA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.destreza >= ajustes[index].desMin && this.destreza <= ajustes[index].desMax) {
                    return ajustes[index].armadilhas;
                }
            }
        }
    }

    public get $furtividade_arrombar(): number {
        if (this.destreza <= 0) {
            return 0;
        } else if (this.destreza > 29) {
            let dex = this.destreza;
            if( !(dex % 2) ){
                dex += 1
            }
            let result = Math.floor(2.5*dex-27.5);
            return result > 100 ? 100 : result;
        } else {
            let ajustes = Constantes.AJUSTE_DESTREZA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.destreza >= ajustes[index].desMin && this.destreza <= ajustes[index].desMax) {
                    return ajustes[index].furtividade_arrombar;
                }
            }
        }
    }

    public get $pungar(): number {
        if (this.destreza <= 0) {
            return 0;
        } else if (this.destreza > 29) {
            let dex = this.destreza;
            if( !(dex % 2) ){
                dex += 1
            }
            let result = 2.5*dex-32.5;
            return result > 100 ? 100 : result;
        } else {
            let ajustes = Constantes.AJUSTE_DESTREZA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.destreza >= ajustes[index].desMin && this.destreza <= ajustes[index].desMax) {
                    return ajustes[index].pungar;
                }
            }
        }
    }

    public set $constituicao(value: number) {
        this.constituicao = Number(value);
    }

    public get $constituicao(): number {
        return this.constituicao;
    }

    public get $ajusteConstituicao(): number {
        if (this.constituicao <= 0) {
            return 0;
        } else if (this.constituicao > 29) {
            let value = this.constituicao;
            if( !(value % 2)){
                value += 1;
            };
            return (0.5*value-5.5);
        } else {
            let ajustes = Constantes.AJUSTE_CONSTITUICAO;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.constituicao >= ajustes[index].conMin && this.constituicao <= ajustes[index].conMax) {
                    return ajustes[index].ajuste;
                }
            }
        }
    }

    public get $chance_res(): number {
        if (this.constituicao <= 0) {
            return 0;
        } else if (this.constituicao > 20) {
            return 100;
        } else {
            let ajustes = Constantes.AJUSTE_CONSTITUICAO;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.constituicao >= ajustes[index].conMin && this.constituicao <= ajustes[index].conMax) {
                    return ajustes[index].chance_res;
                }
            }
        }
    }

    public set $inteligencia(value: number) {
        this.inteligencia = Number(value);
    }

    public get $inteligencia(): number {
        return this.inteligencia;
    }

    public get $idiomasAdicionais(): number {
        if (this.inteligencia <= 0) {
            return 0;
        } else if (this.inteligencia > 29) {
            let value = this.inteligencia;
            if( !(value % 2)){
                value += 1;
            };
            return (0.5*value-6.5);
        } else {
            let ajustes = Constantes.AJUSTE_INTELIGENCIA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.inteligencia >= ajustes[index].intMin && this.inteligencia <= ajustes[index].intMax) {
                    return ajustes[index].idiomasAdicionais;
                }
            }
        }
    }

    public get $chanceAprenderMagia(): number {
        if (this.inteligencia <= 0) {
            return 0;
        } else if (this.inteligencia > 29) {
            return 100;
        }else {
            let ajustes = Constantes.AJUSTE_INTELIGENCIA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.inteligencia >= ajustes[index].intMin && this.inteligencia <= ajustes[index].intMax) {
                    return ajustes[index].chanceAprenderMagia;
                }
            }
        }
    }

    public get $intPrimeiroCirculo(): number {
        if (this.inteligencia <= 0) {
            return 0;
        } else if (this.inteligencia > 29) {
            let value = this.inteligencia;
            if( !(value % 2)){
                value += 1;
            };
            return Math.floor(0.25*value-4.25);
        } else {
            let ajustes = Constantes.AJUSTE_INTELIGENCIA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.inteligencia >= ajustes[index].intMin && this.inteligencia <= ajustes[index].intMax) {
                    return ajustes[index].primeiroCirculo;
                }
            }
        }
    }

    public get $intSegundoCirculo(): number {
        if (this.inteligencia <= 0) {
            return 0;
        } else if (this.inteligencia > 29) {
            let value = this.inteligencia;
            if( !(value % 2)){
                value += 1;
            };
            return Math.floor(0.17*value-1.8);
        } else {
            let ajustes = Constantes.AJUSTE_INTELIGENCIA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.inteligencia >= ajustes[index].intMin && this.inteligencia <= ajustes[index].intMax) {
                    return ajustes[index].segundoCirculo;
                }
            }
        }
    }

    public get $intTerceiroCirculo(): number {
        if (this.inteligencia <= 0) {
            return 0;
        } else if (this.inteligencia > 29) {
            let value = this.inteligencia;
            if( !(value % 2)){
                value += 1;
            };
            return Math.floor(0.042*value-0.042);
        } else {
            let ajustes = Constantes.AJUSTE_INTELIGENCIA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.inteligencia >= ajustes[index].intMin && this.inteligencia <= ajustes[index].intMax) {
                    return ajustes[index].terceiroCirculo;
                }
            }
        }
    }

    public get $sabedoria(): number {
        return this.sabedoria;
    }

    public set $sabedoria(value: number) {
        this.sabedoria = Number(value);
    }

    public get $ajusteSabedoria(): number {
        if (this.sabedoria <= 0) {
            return 0;
        } else if (this.sabedoria > 29) {
            let value = this.sabedoria;
            if( !(value % 2)){
                value += 1;
            };
            return (0.5*value-5.5);
        } else {
            let ajustes = Constantes.AJUSTE_SABEDORIA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.sabedoria >= ajustes[index].sabMin && this.sabedoria <= ajustes[index].sabMax) {
                    return ajustes[index].ajuste;
                }
            }
        }
    }

    public get $sabPrimeiroCirculo(): number {
        if (this.sabedoria <= 0) {
            return 0;
        } else if (this.sabedoria > 29) {
            let value = this.sabedoria;
            if( !(value % 2)){
                value += 1;
            };
            return Math.floor(0.25*value-4.25);
        } else {
            let ajustes = Constantes.AJUSTE_SABEDORIA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.sabedoria >= ajustes[index].sabMin && this.sabedoria <= ajustes[index].sabMax) {
                    return ajustes[index].primeiroCirculo;
                }
            }
        }
    }

    public get $sabSegundoCirculo(): number {
        if (this.sabedoria <= 0) {
            return 0;
        } else if (this.sabedoria > 29) {
            let value = this.sabedoria;
            if( !(value % 2)){
                value += 1;
            };
            return Math.floor(0.17*value-1.8);
        } else {
            let ajustes = Constantes.AJUSTE_SABEDORIA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.sabedoria >= ajustes[index].sabMin && this.sabedoria <= ajustes[index].sabMax) {
                    return ajustes[index].segundoCirculo;
                }
            }
        }
    }

    public get $sabTerceiroCirculo(): number {
        if (this.sabedoria <= 0) {
            return 0;
        } else if (this.sabedoria > 29) {
            let value = this.sabedoria;
            if( !(value % 2)){
                value += 1;
            };
            return Math.floor(0.042*value-0.042);
        } else {
            let ajustes = Constantes.AJUSTE_SABEDORIA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.sabedoria >= ajustes[index].sabMin && this.sabedoria <= ajustes[index].sabMax) {
                    return ajustes[index].terceiroCirculo;
                }
            }
        }
    }

    public get $carisma(): number {
        return this.carisma;
    }

    public get $mortosVivosAfastados(): string {
        if (this.carisma <= 0) {
            return '0';
        } else if (this.carisma > 29) {
            return '1d20';
        } else {
            let ajustes = Constantes.AJUSTE_CARISMA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.carisma >= ajustes[index].carMin && this.carisma <= ajustes[index].carMax) {
                    return ajustes[index].mortosVivosAfastados;
                }
            }
        }
    }

    public get $ajusteReacao(): number {
        if (this.carisma <= 0) {
            return 0;
        } else if (this.carisma > 29) {
            let value = this.carisma;
            if( !(value % 2) ){
                value += 1
            }
            let result = 2.5*value-27.5;
            return result > 100 ? 100 : result;
        } else {
            let ajustes = Constantes.AJUSTE_CARISMA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.carisma >= ajustes[index].carMin && this.carisma <= ajustes[index].carMax) {
                    return ajustes[index].ajusteReacao;
                }
            }
        }
    }

    public get $seguidores(): number {
        if (this.carisma <= 0) {
            return 0;
        } else if (this.carisma > 29) {
            let value = this.carisma;
            if( !(value % 2) ){
                value += 1
            }
            return 0.5*value-4.5;
        } else {
            let ajustes = Constantes.AJUSTE_CARISMA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.carisma >= ajustes[index].carMin && this.carisma <= ajustes[index].carMax) {
                    return ajustes[index].seguidores;
                }
            }
        }
    }

    public set $carisma(value: number) {
        this.carisma = Number(value);
    }

}