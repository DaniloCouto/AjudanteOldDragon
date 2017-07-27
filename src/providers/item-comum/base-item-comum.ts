
import { Dano } from '../../classes/dano/dano';
import { Item } from "../../classes/item";

export class BaseItens {
    constructor() {

    }

    public static get BASE_ITENS(): Array<Item>{
        return [
            new Item(null,'Água Benta', 'Frasco com 500 ml', 0.5, 100),
            new Item(null,'Apito', 'Pequeno, com cordão para pescoço', 0, 2),
            new Item(null,'Arpéu', 'Gancho triplo para escaladas', 1, 50),
            new Item(null,'Barril pequeno', 'Madeira com armação de ferro. Para 5 litros', 2, 100),
            new Item(null,'Cadeado', 'Com chave única', 1.5, 500),
            new Item(null,'Odre pequeno', 'Bolsa de couro para líquidos. Até 1 litro', 0.5, 50),
            new Item(null,'Coberta de Inverno', '2,30 metros de comprimento', 2.5, 100),
            new Item(null,'Corda de Cânhamo', '15 metros. Suporta erguer até 250 kg', 15, 100),
            new Item(null,'Corrente', '10 metros para até 1.000 kg', 20, 500),
            new Item(null,'Ferramentas de Ladrão', 'Ferramentas de arrombamento e sabotagem', 1, 3000),
            new Item(null,'Fogo Alquímico', 'Explode em contato com o ar causando 1d6 de dano a todos até 3 metros', 0.5, 5000),
            new Item(null,'Lanterna Furta-fogo', 'Impede a iluminação do lanterneiro', 3, 200),
            new Item(null,'Mochila de Couro', 'Com compartimentos e reforço', 2, 200),
            new Item(null,'Pá / picareta', 'Pá / picareta', 1.5, 50),
            new Item(null,'Pé de cabra', 'De ferro para arrombamentos', 4, 200),
            new Item(null,'Pederneira', 'Para acender tochas e fazer faíscas', 0.5, 1),
            new Item(null,'Pergaminho', 'Folha solta', 0, 50),
            new Item(null,'Óleo', 'Frasco com 500 ml para lanternas e fogareiros', 1, 50),
            new Item(null,'Ração de viagem', 'Porção diária de alimentos secos para viajantes', 0.5, 100),
            new Item(null,'Saco grande', 'De estopa, para até 15 kg', 0, 5),
            new Item(null,'Símbolo Divino', 'Simples, de madeira, latão ou couro', 0.5, 100),
            new Item(null,'Tenda Pequena', 'para 4 pessoas com 2 x 2 metros', 4, 1000),
            new Item(null,'Tocha', '1 hora de duração', 0.5, 5),
            new Item(null,'Traje de exploração', 'Calça, camisa, gibão e manto', 2.5, 500),
            new Item(null,'Traje nobre', 'Gibão, camisa, calça e manto de materiais nobres', 3, 2000),
            new Item(null,'Vara de 3 metros', 'Vara para exploração de masmorras', 0.5, 50),
            new Item(null,'Vela', 'De cera de abelhas 2 horas de duração', 0, 1),
            new Item(null,'Cavalo', 'Para tração', 0, 1000),
            new Item(null,'Cavalo de Montaria', '', 0, 1500),
            new Item(null,'Cavalo de Guerra', '', 0, 15000),
            new Item(null,'Jumento ou mula', 'Para tração ou montaria', 0, 800),
            new Item(null,'Pônei', 'Para tração ou montaria', 0, 1000),
            new Item(null,'Pônei de Guerra', '', 0, 10000),
            new Item(null,'Camelo', '', 0, 5000),
            new Item(null,'Armadura leve', 'De couro para cavalos (CA +2)', 15, 15000),
            new Item(null,'Armadura Pesada', 'De chapas metálicas para cavalos (CA +4)', 35, 40000),
            new Item(null,'Sela para cavalos', 'Kit de arreios, sela e correias para montar', 5, 500),
            new Item(null,'Carruagem', 'Carro coberto e ornamentado para até 4 pessoas', 0, 10000),
            new Item(null,'Barco de Pesca', 'Pequeno barco a vela', 0, 2000),
            new Item(null,'Canoa', 'Embarcação pequena para até 4 passageiros', 0, 1000),
            new Item(null,'Casebre', 'De barro e palha com apenas 1 cômodo', 0, 500),
            new Item(null,'Casa rica', 'De pedra e madeiras nobres. Dez ou mais cômodos', 0, 15000),
            new Item(null,'Cerveja barata', 'Baixa qualidade e fermentação acelerada (500 ml)', 0, 3),
            new Item(null,'Cerveja comum', '(500 ml)', 0, 5),
            new Item(null,'Vinho comum', '(500 ml)', 0, 10),
            new Item(null,'Destilados', 'Rum, Gyn, Whisky, Brandy dentre outras (100 ml)', 0, 80),
            new Item(null,'Desjejum', 'Por pessoa', 0, 20),
            new Item(null,'Almoço', 'Por pessoa', 0, 20),
            new Item(null,'Estrebaria', 'Comida e abrigo para cavalos', 0, 5),
            new Item(null,'Quarto coletivo', 'Cama em quarto coletivo', 0, 5),
            new Item(null,'Quarto simples', 'Com até duas camas', 0, 10)
        ]
    }
}
    