import {Component, OnInit} from '@angular/core';
import {userTableConfig, mezziTableConfig, prenotazioniTableConfig} from "../../config/MyTableConfig";
import {MockDataService} from "../../services/mock-data.service";
import {Mezzo, Prenotazione, Utente} from "../../util/Interfaces";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Utente[] = [];
  mezzi: Mezzo[] = [];
  prenotazioni : Prenotazione[] = [];

  userConfig = userTableConfig;
  mezziConfig = mezziTableConfig;
  prenotazioniConfig = prenotazioniTableConfig;

  doActionOnElement(obj:any){
    alert("Azione: " + obj.action + " -Value: " + obj.data);
  }

  constructor(private mockService : MockDataService) { }

  getUtenti(){
    this.mockService.getMockUsers().subscribe(user => this.users = user);
  }

  getMezzi(){
    this.mockService.getMockMezzi().subscribe(mezzo => this.mezzi = mezzo);
  }

  getPrenotazioni(){
    this.mockService.getMockPrenotazioni().subscribe(prenotazione => this.prenotazioni = prenotazione);
  }

  ngOnInit(): void {
    this.getUtenti();
    this.getMezzi();
    this.getPrenotazioni();
  }

}
