import { classeENUM } from "./classesEnum";
import { diceENUM } from "../diceENUM";
import { BonusDeClasse } from "../constantesClass";

export interface IClasse{
    $nome : string;
    $classe: classeENUM ;
    $dadoDeVida: diceENUM;
    $nivel: number;
    $xpAtual: number;
    $bonus() : BonusDeClasse;

}