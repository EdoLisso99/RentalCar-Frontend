import { Component, OnInit } from '@angular/core';
import {MockDataService} from "../../services/mockData/mock-data.service";
import {Prenotazione, Utente} from "../../util/Interfaces";
import {prenotazioniTableConfig, prenotazioniTableConfigUser} from "../../config/MyTableConfig";
import * as _ from 'lodash-es';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);
  prenotazioni : Prenotazione[] = [];
  prenotazioniConfig = this.loggedUser.ruolo == 'Customer' ?  prenotazioniTableConfigUser : prenotazioniTableConfig;

  constructor(private mockService : MockDataService) { }

  ngOnInit(): void {
    this.getPrenotazioni();
  }

  getPrenotazioni(){
    if(this.loggedUser.ruolo == 'SuperUser'){
      this.mockService.getMockPrenotazioni().subscribe(prenotazione => this.prenotazioni = prenotazione);
    }
    else {
      this.mockService.getMockPrenotazioni()
        .subscribe(object => this.prenotazioni = _.filter(object, (obj) => { return obj.utente == this.loggedUser.id}));
    }
  }

}
