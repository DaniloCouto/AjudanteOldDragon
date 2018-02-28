import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Personagem } from '../../classes/personagem';
import { IClasse } from '../../classes/classes/Iclasse';
import { classeENUM } from '../../classes/classes/classesEnum';
import { PersonagemProvider } from '../../providers/personagem/personagem';
import { Clerigo } from '../../classes/classes/clerigo';
import { HomemDeArmas } from '../../classes/classes/homemdearmas';
import { Mago } from '../../classes/classes/mago';
import { Ladino } from '../../classes/classes/ladino';
import { ClassePipe } from '../../pipes/classe/classe';

/**
 * Generated class for the ClassePersonagemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-classe-personagem-list',
  templateUrl: 'classe-personagem-list.html',
  providers: [ClassePipe]
})
export class ClassePersonagemListPage {

  personagem: Personagem;
  classes = [
    { key: classeENUM.clerigo, value: "Clérigo" },
    { key: classeENUM.homemDeArmas, value: "Homem de Armas" },
    { key: classeENUM.ladino, value: "Ladino" },
    { key: classeENUM.mago, value: "Mago" },
  ];

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController, public personagemProvider: PersonagemProvider) {
    this.personagem = this.navParams.get("item");
    for (let i = 0; i < this.personagem.$classes.length; i++) {
      for (let j = 0; j < this.classes.length; j++) {
        if (this.personagem.$classes[i].$classe === this.classes[j].key) {
          this.classes.splice(j, 1);
        }
      }
    }
  }

  editXp(i: number) {
    let service = this;
    let alert = this.alertCtrl.create({
      title: 'Definir Experiência',
      message: 'Você pode somar ou definir o valor do XP atual.',
      inputs: [
        {
          name: 'xpAlert',
          placeholder: 'Experiência',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Definir',
          handler: data => {
            let xp = data.xpAlert as number;
            if (xp) {
              let backupXp = this.personagem.$classes[i].$xpAtual;
              this.personagem.$classes[i].$xpAtual = xp;
              this.personagemProvider.updateClassePersonagem(this.personagem.$id, this.personagem.$classes[i]).then(function () {
                return true;
              }, function () {
                service.personagem.$classes[i].$xpAtual = backupXp;
                return false;
              })
            } else {
              return false;
            }
          }
        },
        {
          text: 'Somar',
          handler: data => {
            let xp = data.xpAlert as number;
            if (xp) {
              let backupXp = this.personagem.$classes[i].$xpAtual;
              this.personagem.$classes[i].$xpAtual += xp;
              this.personagemProvider.updateClassePersonagem(this.personagem.$id, this.personagem.$classes[i]).then(function () {
                return true;
              }, function () {
                service.personagem.$classes[i].$xpAtual = backupXp;
                return false;
              })
            } else {
              return false;
            }
          }
        }
      ]
    })
  }

  delete(item: IClasse) {
    let service = this;
    let alert 
    if (this.personagem.$classes.length > 1) {
      alert = this.alertCtrl.create({
        title: 'Classes Personagem',
        message: 'Você tem certeza que deseja excluir esta Classe do Personagem?',
        buttons: [
          {
            text: 'Não',
            handler: () => {
            }
          },
          {
            text: 'Sim',
            handler: () => {
              service.personagemProvider.deleteClassePersonagem(service.personagem.$id, item).then(function () {
                let classeRetirada: IClasse[] = service.personagem.$classes.splice(this.personagem.$classes.indexOf(item), 1)
                if (classeRetirada.length === 1) {
                  switch (classeRetirada[0].$classe) {
                    case classeENUM.clerigo:
                      service.classes.push({ key: classeENUM.clerigo, value: "Clérigo" })
                      break;
                    case classeENUM.homemDeArmas:
                      service.classes.push({ key: classeENUM.homemDeArmas, value: "Homem de Armas" })
                      break;
                    case classeENUM.ladino:
                      service.classes.push({ key: classeENUM.ladino, value: "Ladino" })
                      break;
                    case classeENUM.mago:
                      service.classes.push({ key: classeENUM.mago, value: "Mago" })
                      break;
                  }
                }
              }, function () { });
            }
          }
        ]
      });
    }else{
      alert = this.alertCtrl.create({
        title: 'Classes Personagem',
        subTitle: 'Não foi possivel excluri a classe',
        message: 'O personagem deve ter no minimo uma classe.',
        buttons: ['Ok']
      });
    }

    alert.present();
  }

  add() {
    let service = this;
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');
    for (let i = 0; i < this.classes.length; i++) {
      alert.addInput({
        type: 'radio',
        label: this.classes[i].value,
        value: JSON.stringify(this.classes[i])
      })
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('checkbox data:', data);
        if (data) {
          let especArray: Array<IClasse> = [];
          let convertedItem = JSON.parse(data);

          let addedClass: IClasse;
          switch (convertedItem[0].key) {
            case classeENUM.clerigo:
              addedClass = new Clerigo(1, 0);
              break;
            case classeENUM.homemDeArmas:
              addedClass = new HomemDeArmas(1, 0);
              break;
            case classeENUM.ladino:
              addedClass = new Mago(1, 0);
              break;
            case classeENUM.mago:
              addedClass = new Ladino(1, 0);
              break;
          }

          service.personagemProvider.addClassePersonagem(service.personagem.$id, addedClass).then(function () {
            service.classes.splice(service.classes.indexOf(convertedItem), 1);
            service.personagem.$classes = service.personagem.$classes.concat([addedClass]);
          });
        }
      }
    });
  }
  dismiss() {
    this.viewCtrl.dismiss({ item: this.personagem.$classes });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassePersonagemListPage');
  }

}
