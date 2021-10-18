import { Component, OnInit } from '@angular/core';
import {userTableConfig, mezziTableConfig, prenotazioniTableConfig} from "../../config/MyTableConfig";
import {MockDataService} from "../../services/mock-data.service";
import {Mezzo, Utente} from "../../util/Interfaces";
import {mockUser, mockAuto} from "../../util/MockData";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Utente[] = [];
  mezzi: Mezzo[] = [];

  userConfig = userTableConfig;
  mezziConfig = mezziTableConfig;
  prenotazioniConfig = prenotazioniTableConfig;

  updateUtente(updateElement:any){
    alert("Update " + updateElement.nome)
  }

  updateMezzo(updateElement:any){
    alert("Update " + updateElement.nome)
  }

  updatePrenotazione(updateElement:any){
    alert("Update " + updateElement.nome)
  }

  deleteUtente(deleteElement:any){
    alert("Cancellazione " + deleteElement.nome)
  }

  deleteMezzo(deleteElement:any){
    alert("Cancellazione " + deleteElement.nome)
  }

  deletePrenotazione(deleteElement:any){
    alert("Cancellazione " + deleteElement.nome)
  }

  createUtente(){
    alert("Creazione utente");
  }

  createMezzo(){
    alert("Creazione utente");
  }

  createPrenotazione(){
    alert("Creazione utente");
  }

  constructor(private mockService : MockDataService) { }

  getUtenti(){
    this.mockService.getMockUsers().subscribe(user => this.users = user);
    let x = '';
  }

  getMezzi(){
    this.mockService.getMockMezzi().subscribe(mezzo => this.mezzi = mezzo);
    let x = '';

  }

  ngOnInit(): void {
    this.getUtenti();
    this.getMezzi();
  }

}
