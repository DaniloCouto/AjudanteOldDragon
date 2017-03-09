
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