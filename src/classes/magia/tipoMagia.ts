
export class TipoMagia {
    private id: number;
    private nomeTipo : string;

    constructor($id: number,$nomeTipo : string) {
        this.id = $id;
        this.nomeTipo = $nomeTipo
    }

    public get $nomeTipo(): string {
        return this.nomeTipo
    }

     public set $nomeTipo($nomeTipo : string){
        this.nomeTipo = $nomeTipo;
    }


	public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}
    

}

export class TipoMagiaComNivel extends TipoMagia{
    private nivel: number;

    constructor($id: number,$nomeTipo : string, $nivel: number) {
        super($id,$nomeTipo);
        this.nivel = $nivel;
    }

    public get $nivel(): number {
		return this.nivel;
	}

	public set $nivel(value: number) {
		this.nivel = value;
	}

}