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
        if (this.forca <= 0) {
            return 0;
        } else {
            let ajustes = Constantes.AJUSTE_FORCA;
            for (let i = 0; i < ajustes.length; i++) {
                if (this.forca >= ajustes[i].forMin && this.forca <= ajustes[i].forMax) {
                    return ajustes[i].ajuste;
                }
            }
        }
    }

    public get $linearSemCarga(): number {
        if (this.forca <= 0) {
            return 0;
        } else {
            let ajustes = Constantes.AJUSTE_FORCA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.forca >= ajustes[index].forMin && this.forca <= ajustes[index].forMax) {
                    return ajustes[index].linearSemCarga;
                }
            }
        }
    }

    public get $linearCargaLeve(): number {
        if (this.forca <= 0) {
            return 0;
        } else {
            let ajustes = Constantes.AJUSTE_FORCA;
            for (var index = 0; index < ajustes.length; index++) {
                if (this.forca >= ajustes[index].forMin && this.forca <= ajustes[index].forMax) {
                    return ajustes[index].linearCargaLeve;
                }
            }
        }
    }

    public get $linearCargaPesada(): number {
        let ajustes = Constantes.AJUSTE_FORCA;
        for (var index = 0; index < ajustes.length; index++) {
            if (this.forca >= ajustes[index].forMin && this.forca <= ajustes[index].forMax) {
                return ajustes[index].linearCargaPesada;
            }
        }
    }

    public set $destreza(value: number) {
        this.destreza = value;
    }

    public get $destreza(): number {
        return this.destreza;
    }

    public get $ajusteDestreza(): number {
        if (this.destreza <= 0) {
            return 0;
        } else {
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
        this.constituicao = value;
    }

    public get $constituicao(): number {
        return this.constituicao;
    }

    public get $ajusteConstituicao(): number {
        if (this.constituicao <= 0) {
            return 0;
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
        this.inteligencia = value;
    }

    public get $inteligencia(): number {
        return this.inteligencia;
    }

    public get $idiomasAdicionais(): number {
        if (this.inteligencia <= 0) {
            return 0;
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
        } else {
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
        this.sabedoria = value;
    }

    public get $ajusteSabedoria(): number {
        if (this.sabedoria <= 0) {
            return 0;
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
        this.carisma = value;
    }

}