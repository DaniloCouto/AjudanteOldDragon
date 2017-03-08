
export class TipoMagia {
    private nomeTipo : string;

    constructor($nomeTipo : string) {
        this.nomeTipo = $nomeTipo
    }

     public get $nomeTipo(): string {
        return this.nomeTipo
     }

     public set $nomeTipo($nomeTipo : string){
        this.nomeTipo = $nomeTipo;
    }

}