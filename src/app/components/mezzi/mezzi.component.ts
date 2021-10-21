import { Component, OnInit } from '@angular/core';
import {Mezzo, Utente} from "../../util/Interfaces";
import {mezziTableConfig, mezziTableConfigUser} from "../../config/MyTableConfig";
import {MockDataService} from "../../services/mockData/mock-data.service";

@Component({
  selector: 'app-mezzi',
  templateUrl: './mezzi.component.html',
  styleUrls: ['./mezzi.component.css']
})
export class MezziComponent implements OnInit {

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);

  mezzi: Mezzo[] = [];
  mezziConfig = this.loggedUser.ruolo == 'Customer' ? mezziTableConfigUser :mezziTableConfig;

  constructor(private mockService : MockDataService) { }

  ngOnInit(): void {
    this.getMezzi();
  }

  getMezzi(){
    this.mockService.getMockMezzi().subscribe(mezzo => this.mezzi = mezzo);
  }


}
