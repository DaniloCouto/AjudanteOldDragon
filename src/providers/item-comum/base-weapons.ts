
import { Dano } from '../../classes/dano/dano';
import { Item } from "../../classes/item";

export class BaseItens {
    constructor() {

    }

    public static get BASE_ITENS(): Array<Item>{
        return [
            new Item('Água Benta', 'Frasco com 500 ml', 0.5, 100),
            new Item('Apito', 'Pequeno, com cordão para pescoço', 0, 2),
            new Item('Arpéu', 'Gancho triplo para escaladas', 1, 50),
            new Item('Barril pequeno', 'Madeira com armação de ferro. Para 5 litros', 2, 100),
            new Item('Cadeado', 'Com chave única', 1.5, 500),
            new Item('Odre pequeno', 'Bolsa de couro para líquidos. Até 1 litro', 0.5, 50),
            new Item('Coberta de Inverno', '2,30 metros de comprimento', 2.5, 100),
            new Item('Corda de Cânhamo', '15 metros. Suporta erguer até 250 kg', 15, 100),
            new Item('Corrente', '10 metros para até 1.000 kg', 20, 500),
            new Item('Ferramentas de Ladrão', 'Ferramentas de arrombamento e sabotagem', 1, 3000),
            new Item('Fogo Alquímico', 'Explode em contato com o ar causando 1d6 de dano a todos até 3 metros', 0.5, 5000),
            new Item('Lanterna Furta-fogo', 'Impede a iluminação do lanterneiro', 3, 200),
            new Item('Mochila de Couro', 'Com compartimentos e reforço', 2, 200),
            new Item('Pá / picareta', 'Pá / picareta', 1.5, 50),
            new Item('Pé de cabra', 'De ferro para arrombamentos', 4, 200),
            new Item('Pederneira', 'Para acender tochas e fazer faíscas', 0.5, 1),
            new Item('Pergaminho', 'Folha solta', 0, 50),
            new Item('Óleo', 'Frasco com 500 ml para lanternas e fogareiros', 1, 50),
            new Item('Ração de viagem', 'Porção diária de alimentos secos para viajantes', 0.5, 100),
            new Item('Saco grande', 'De estopa, para até 15 kg', 0, 5),
            new Item('Símbolo Divino', 'Simples, de madeira, latão ou couro', 0.5, 100),
            new Item('Tenda Pequena', 'para 4 pessoas com 2 x 2 metros', 4, 1000),
            new Item('Tocha', '1 hora de duração', 0.5, 5),
            new Item('Traje de exploração', 'Calça, camisa, gibão e manto', 2.5, 500),
            new Item('Traje nobre', 'Gibão, camisa, calça e manto de materiais nobres', 3, 2000),
            new Item('Vara de 3 metros', 'Vara para exploração de masmorras', 0.5, 50),
            new Item('Vela', 'De cera de abelhas 2 horas de duração', 0, 1),
            new Item('Cavalo', 'Para tração', 0, 1000),
            new Item('Cavalo de Montaria', '', 0, 1500),
            new Item('Cavalo de Guerra', '', 0, 15000),
            new Item('Jumento ou mula', 'Para tração ou montaria', 0, 800),
            new Item('Pônei', 'Para tração ou montaria', 0, 1000),
            new Item('Pônei de Guerra', '', 0, 10000),
            new Item('Camelo', '', 0, 5000),
            new Item('Armadura leve', 'De couro para cavalos (CA +2)', 15, 15000),
            new Item('Armadura Pesada', 'De chapas metálicas para cavalos (CA +4)', 35, 40000),
            new Item('Sela para cavalos', 'Kit de arreios, sela e correias para montar', 5, 500),
            new Item('Carruagem', 'Carro coberto e ornamentado para até 4 pessoas', 0, 10000),
            new Item('Barco de Pesca', 'Pequeno barco a vela', 0, 2000),
            new Item('Canoa', 'Embarcação pequena para até 4 passageiros', 0, 1000),
            new Item('Casebre', 'De barro e palha com apenas 1 cômodo', 0, 500),
            new Item('Casa rica', 'De pedra e madeiras nobres. Dez ou mais cômodos', 0, 15000),
            new Item('Cerveja barata', 'Baixa qualidade e fermentação acelerada (500 ml)', 0, 3),
            new Item('Cerveja comum', '(500 ml)', 0, 5),
            new Item('Vinho comum', '(500 ml)', 0, 10),
            new Item('Destilados', 'Rum, Gyn, Whisky, Brandy dentre outras (100 ml)', 0, 80),
            new Item('Desjejum', 'Por pessoa', 0, 20),
            new Item('Almoço', 'Por pessoa', 0, 20),
            new Item('Estrebaria', 'Comida e abrigo para cavalos', 0, 5),
            new Item('Quarto coletivo', 'Cama em quarto coletivo', 0, 5),
            new Item('Quarto simples', 'Com até duas camas', 0, 10)
        ]
    }
}
    