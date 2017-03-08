
export class AlcanceMagia {
    private alcanceBase: number;
    private niveisParaAdicao : number;
    private alcanceAdicional: number;

    constructor($alcanceBase : number, $niveisParaAdicao : number, $alcanceAdicional : number) {
        this.alcanceBase = $alcanceBase;
        this.niveisParaAdicao = $niveisParaAdicao;
        this.alcanceAdicional = $alcanceAdicional;
    }

    public get $alcanceBase(): number {
        return this.alcanceBase
     }

     public set $alcanceBase($alcanceBase : number){
        this.alcanceBase = $alcanceBase;
    }

     public get $niveisParaAdicao(): number {
        return this.niveisParaAdicao
     }

     public set $niveisParaAdicao($niveisParaAdicao : number){
        this.niveisParaAdicao = $niveisParaAdicao;
    }

    public get $alcanceAdicional(): number {
        return this.alcanceAdicional
     }

     public set $alcanceAdicional($alcanceAdicional : number){
        this.alcanceAdicional = $alcanceAdicional;
    }

}