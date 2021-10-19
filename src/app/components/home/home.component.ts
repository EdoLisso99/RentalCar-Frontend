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

  doActionOnElement(obj:any){
    alert("Azione: " + obj.action + " -Value: " + obj.data);
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
