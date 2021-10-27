import { Component, OnInit } from '@angular/core';
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {Prenotazione, Utente} from "../../../util/Interfaces";
import {MyTableActionEnum, prenotazioniTableConfig, prenotazioniTableConfigUser} from "../../../config/MyTableConfig";
import * as _ from 'lodash';
import {emptyBtn} from "../../../config/MyButtonConfig";
import {Router} from "@angular/router";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  loggedUser: Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);
  prenotazioni: Prenotazione[] = [];
  prenotazioniConfig = this.loggedUser.ruolo == 'Customer' ? prenotazioniTableConfigUser : prenotazioniTableConfig;
  btnConfig = emptyBtn;

  constructor(private mockService: MockDataService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.getPrenotazioni();
  }

  getPrenotazioni() {
    // if (this.loggedUser.ruolo == 'SuperUser') {
    //   this.mockService.getPrenotazioni().subscribe(prenotazione => {
    //     this.prenotazioni = prenotazione
    //   }, (error => {
    //     alert("Si è verificato un errore nel recupero delle Prenotazioni dal DB!");
    //     console.log(error);
    //   }));
    // } else {
    //   this.mockService.getPrenotazioni()
    //     .subscribe(object => {
    //       this.prenotazioni = _.filter(object, (obj) => {
    //         return obj.utente == this.loggedUser.id
    //       })
    //     }, (error => {
    //       alert("Si è verificato un errore nel recupero delle Prenotazioni dal DB!");
    //       console.log(error);
    //     }));
    // }
    this.mockService.getPrenotazioni().subscribe(prenotazione => {
          this.prenotazioni = prenotazione
        }, (error => {
          alert("Si è verificato un errore nel recupero delle Prenotazioni dal DB!");
          console.log(error);
        }));
  }

  sendTableAction(data: any) {
    switch (data.action) {
      case MyTableActionEnum.EDIT:
        let mezzoId = -1;
        this.mockService.getMockPrenotazioneFromId(data.data.id).subscribe(prenotazione => {
          mezzoId = prenotazione.auto;
          this.router.navigate(["home/prenotazioni/" + mezzoId + "/" + this.loggedUser.id + "/edit/" + data.data.id]);
        });
        break;
      case MyTableActionEnum.DELETE:
        this.mockService.deletePrenotazione(data.data.id).subscribe((x) => {
          this.getPrenotazioni()
        }, (error => {
          alert("Si è verificato un errore con l'eliminazione della Prenotazione");
          console.log(error);
        }));
        break;
      case MyTableActionEnum.APPROVE:
        data.data.accettata = true;
        this.mockService.updatePrenotazione(data.data).subscribe((x) => {
          this.getPrenotazioni();
        }, (error => {
          alert("Si è verificato un errore con l'approvazione della Prenotazione!");
          console.log(error);
        }));
        break;
      case MyTableActionEnum.REJECT:
        data.data.accettata = false;
        this.mockService.updatePrenotazione(data.data).subscribe((x) => {
          this.getPrenotazioni();
        }, (error => {
          alert("Si è verificato un errore con il rifiuto della Prenotazione!");
          console.log(error);
        }));
        break;
      default:
        break;
    }
  }

}
