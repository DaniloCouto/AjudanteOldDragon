
import { Dano } from '../../classes/dano/dano';
import { Item } from "../../classes/item";

export class BaseItens {
    constructor() {

    }

    public static get BASE_ITENS(): Array<Item>{
        return [
            new Item(1,'Água Benta', 'Frasco com 500 ml', 0.5, 100),
            new Item(2,'Apito', 'Pequeno, com cordão para pescoço', 0, 2),
            new Item(3,'Arpéu', 'Gancho triplo para escaladas', 1, 50),
            new Item(4,'Barril pequeno', 'Madeira com armação de ferro. Para 5 litros', 2, 100),
            new Item(5,'Cadeado', 'Com chave única', 1.5, 500),
            new Item(6,'Odre pequeno', 'Bolsa de couro para líquidos. Até 1 litro', 0.5, 50),
            new Item(7,'Coberta de Inverno', '2,30 metros de comprimento', 2.5, 100),
            new Item(8,'Corda de Cânhamo', '15 metros. Suporta erguer até 250 kg', 15, 100),
            new Item(9,'Corrente', '10 metros para até 1.000 kg', 20, 500),
            new Item(10,'Ferramentas de Ladrão', 'Ferramentas de arrombamento e sabotagem', 1, 3000),
            new Item(11,'Fogo Alquímico', 'Explode em contato com o ar causando 1d6 de dano a todos até 3 metros', 0.5, 5000),
            new Item(12,'Lanterna Furta-fogo', 'Impede a iluminação do lanterneiro', 3, 200),
            new Item(13,'Mochila de Couro', 'Com compartimentos e reforço', 2, 200),
            new Item(14,'Pá / picareta', 'Pá / picareta', 1.5, 50),
            new Item(15,'Pé de cabra', 'De ferro para arrombamentos', 4, 200),
            new Item(16,'Pederneira', 'Para acender tochas e fazer faíscas', 0.5, 1),
            new Item(17,'Pergaminho', 'Folha solta', 0, 50),
            new Item(18,'Óleo', 'Frasco com 500 ml para lanternas e fogareiros', 1, 50),
            new Item(19,'Ração de viagem', 'Porção diária de alimentos secos para viajantes', 0.5, 100),
            new Item(20,'Saco grande', 'De estopa, para até 15 kg', 0, 5),
            new Item(21,'Símbolo Divino', 'Simples, de madeira, latão ou couro', 0.5, 100),
            new Item(22,'Tenda Pequena', 'para 4 pessoas com 2 x 2 metros', 4, 1000),
            new Item(23,'Tocha', '1 hora de duração', 0.5, 5),
            new Item(24,'Traje de exploração', 'Calça, camisa, gibão e manto', 2.5, 500),
            new Item(25,'Traje nobre', 'Gibão, camisa, calça e manto de materiais nobres', 3, 2000),
            new Item(26,'Vara de 3 metros', 'Vara para exploração de masmorras', 0.5, 50),
            new Item(27,'Vela', 'De cera de abelhas 2 horas de duração', 0, 1),
            new Item(28,'Cavalo', 'Para tração', 0, 1000),
            new Item(29,'Cavalo de Montaria', '', 0, 1500),
            new Item(30,'Cavalo de Guerra', '', 0, 15000),
            new Item(31,'Jumento ou mula', 'Para tração ou montaria', 0, 800),
            new Item(32,'Pônei', 'Para tração ou montaria', 0, 1000),
            new Item(33,'Pônei de Guerra', '', 0, 10000),
            new Item(34,'Camelo', '', 0, 5000),
            new Item(35,'Armadura leve', 'De couro para cavalos (CA +2)', 15, 15000),
            new Item(36,'Armadura Pesada', 'De chapas metálicas para cavalos (CA +4)', 35, 40000),
            new Item(37,'Sela para cavalos', 'Kit de arreios, sela e correias para montar', 5, 500),
            new Item(38,'Carruagem', 'Carro coberto e ornamentado para até 4 pessoas', 0, 10000),
            new Item(39,'Barco de Pesca', 'Pequeno barco a vela', 0, 2000),
            new Item(40,'Canoa', 'Embarcação pequena para até 4 passageiros', 0, 1000),
            new Item(41,'Casebre', 'De barro e palha com apenas 1 cômodo', 0, 500),
            new Item(42,'Casa rica', 'De pedra e madeiras nobres. Dez ou mais cômodos', 0, 15000),
            new Item(43,'Cerveja barata', 'Baixa qualidade e fermentação acelerada (500 ml)', 0, 3),
            new Item(44,'Cerveja comum', '(500 ml)', 0, 5),
            new Item(45,'Vinho comum', '(500 ml)', 0, 10),
            new Item(46,'Destilados', 'Rum, Gyn, Whisky, Brandy dentre outras (100 ml)', 0, 80),
            new Item(47,'Desjejum', 'Por pessoa', 0, 20),
            new Item(48,'Almoço', 'Por pessoa', 0, 20),
            new Item(49,'Estrebaria', 'Comida e abrigo para cavalos', 0, 5),
            new Item(50,'Quarto coletivo', 'Cama em quarto coletivo', 0, 5),
            new Item(51,'Quarto simples', 'Com até duas camas', 0, 10)
        ]
    }
}
    