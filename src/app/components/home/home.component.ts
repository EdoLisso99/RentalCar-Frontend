import {Component, OnInit} from '@angular/core';
import {
  mezziTableConfig, mezziTableConfigUser,
  prenotazioniTableConfig, prenotazioniTableConfigUser,
  userTableConfig, userTableConfigCustomer
} from "../../config/MyTableConfig";
import {MockDataService} from "../../services/mock-data.service";
import {Mezzo, Prenotazione, Utente} from "../../util/Interfaces";
import {logoutBtn} from "../../config/MyButtonConfig";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);

  users: Utente[] = [];
  mezzi: Mezzo[] = [];
  prenotazioni : Prenotazione[] = [];

  userConfig = this.loggedUser.ruolo == 'Customer' ? userTableConfigCustomer : userTableConfig;
  mezziConfig = this.loggedUser.ruolo == 'Customer' ? mezziTableConfigUser :mezziTableConfig;
  prenotazioniConfig = this.loggedUser.ruolo == 'Customer' ?  prenotazioniTableConfigUser : prenotazioniTableConfig;
  logoutBtnConfig = logoutBtn;

  doActionOnElement(obj:any){
    alert("Azione: " + obj.action + " -Value: " + obj.data);
  }

  constructor(private mockService : MockDataService, private readonly router : Router) { }

  getUtenti(){
    if(this.loggedUser.ruolo == 'SuperUser'){
      this.mockService.getMockUsers().subscribe(user => this.users = user);
    }
    else {
      this.mockService.getMockUsers()
        .subscribe(objects => objects.map(user => user.id == this.loggedUser.id ? this.users.push(user) : ''));
    }

  }

  getMezzi(){
      this.mockService.getMockMezzi().subscribe(mezzo => this.mezzi = mezzo);
  }

  getPrenotazioni(){
    if(this.loggedUser.ruolo == 'SuperUser'){
      this.mockService.getMockPrenotazioni().subscribe(prenotazione => this.prenotazioni = prenotazione);
    }
    else {
      this.mockService.getMockPrenotazioni()
        .subscribe(object => object.map(prenotazione =>
          this.loggedUser.id == prenotazione.utente ? this.prenotazioni.push(prenotazione) : ''));
    }
  }

  ngOnInit(): void {
    this.getUtenti();
    this.getMezzi();
    this.getPrenotazioni();
  }

  logout() {
    sessionStorage.removeItem('loggedUser');
    this.router.navigate(['login']);
  }
}
