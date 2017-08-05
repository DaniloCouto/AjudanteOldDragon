export class BolsaMoedas{
    private cobre: number;
    private prata: number;
    private ouro: number;
    private esmeralda: number;
    private platina: number;

    constructor($cobre: number, $prata: number, $ouro: number, $esmeralda: number, $platina :number){
        this.cobre = $cobre;
        this.prata = $prata;
        this.ouro = $ouro;
        this.esmeralda = $esmeralda;
        this.platina = $platina;
    }


	public get $cobre(): number {
		return this.cobre;
	}

	public set $cobre(value: number) {
		this.cobre = value;
	}

	public get $prata(): number {
		return this.prata;
	}

	public set $prata(value: number) {
		this.prata = value;
	}

	public get $ouro(): number {
		return this.ouro;
	}

	public set $ouro(value: number) {
		this.ouro = value;
	}

	public get $esmeralda(): number {
		return this.esmeralda;
	}

	public set $esmeralda(value: number) {
		this.esmeralda = value;
	}

	public get $platina(): number {
		return this.platina;
	}

	public set $platina(value: number) {
		this.platina = value;
	}
    


}