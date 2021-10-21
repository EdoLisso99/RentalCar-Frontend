import { Component, OnInit } from '@angular/core';
import {MockDataService} from "../../services/mockData/mock-data.service";
import {Prenotazione, Utente} from "../../util/Interfaces";
import {MyTableActionEnum, prenotazioniTableConfig, prenotazioniTableConfigUser} from "../../config/MyTableConfig";
import * as _ from 'lodash-es';
import {emptyBtn} from "../../config/MyButtonConfig";
import {Router} from "@angular/router";

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
    if (this.loggedUser.ruolo == 'SuperUser') {
      this.mockService.getMockPrenotazioni().subscribe(prenotazione => this.prenotazioni = prenotazione);
    } else {
      this.mockService.getMockPrenotazioni()
        .subscribe(object => this.prenotazioni = _.filter(object, (obj) => {
          return obj.utente == this.loggedUser.id
        }));
    }
  }

  sendTableAction(data: any) {
    switch (data.action) {
      case MyTableActionEnum.EDIT:
        this.setSession(data.data, 'Edit');
        this.router.navigate(["home/prenotazioni/edit"]);
        break;
      case MyTableActionEnum.DELETE:
        this.mockService.removeMockPrenotazione(data.data).subscribe((x) => this.getPrenotazioni());
        break;
      case MyTableActionEnum.APPROVE:
        data.data.accettata = true;
        this.mockService.updateMockPrenotazione(data.data).subscribe((x) => this.getPrenotazioni());
        break;
      case MyTableActionEnum.REJECT:
        data.data.accettata = false;
        this.mockService.updateMockPrenotazione(data.data).subscribe((x) => this.getPrenotazioni());
        break;
      default:
        break;
    }
  }

  setSession(data: any, action: string) {
    sessionStorage.setItem('data', JSON.stringify(data));
    sessionStorage.setItem('type', 'Prenotazioni');
    sessionStorage.setItem('action', action);
    sessionStorage.setItem('keys', JSON.stringify(this.prenotazioniConfig.headers));
  }

}
