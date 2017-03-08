import { medidaDeTempoENUM } from './medidaDeTempoENUM';

export class DuracaoMagia {
    private duracaoBase: number;
    private niveisParaAdicao : number;
    private duracaoAdicional: number;
    private medidaDuracaoBase: medidaDeTempoENUM;
    private medidaDuracaoAdicional: medidaDeTempoENUM;

    constructor($duracaoBase : number, $niveisParaAdicao : number, $duracaoAdicional : number, $medidaDuracaoBase: medidaDeTempoENUM, $medidaDuracaoAdicional: medidaDeTempoENUM) {
        this.duracaoBase = $duracaoBase;
        this.niveisParaAdicao = $niveisParaAdicao;
        this.duracaoAdicional = $duracaoAdicional;
        this.medidaDuracaoBase =  $medidaDuracaoBase;
        this.medidaDuracaoAdicional =  $medidaDuracaoAdicional;
    }

    public get $duracaoBase(): number {
        return this.duracaoBase
     }

     public set $duracaoBase($duracaoBase : number){
        this.duracaoBase = $duracaoBase;
    }

     public get $niveisParaAdicao(): number {
        return this.niveisParaAdicao
     }

     public set $niveisParaAdicao($niveisParaAdicao : number){
        this.niveisParaAdicao = $niveisParaAdicao;
    }

    public get $duracaoAdicional(): number {
        return this.duracaoAdicional
     }

     public set $duracaoAdicional($duracaoAdicional : number){
        this.duracaoAdicional = $duracaoAdicional;
    }

	public get $medidaDuracaoBase(): medidaDeTempoENUM {
		return this.medidaDuracaoBase;
	}

	public set $medidaDuracaoBase(value: medidaDeTempoENUM) {
		this.medidaDuracaoBase = value;
	}

	public get $medidaDuracaoAdicional(): medidaDeTempoENUM {
		return this.medidaDuracaoAdicional;
	}

	public set $medidaDuracaoAdicional(value: medidaDeTempoENUM) {
		this.medidaDuracaoAdicional = value;
	}
    
}