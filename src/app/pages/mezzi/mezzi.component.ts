import { Component, OnInit } from '@angular/core';
import {Mezzo, Utente} from "../../util/Interfaces";
import {
  mezziTableConfig,
  mezziTableConfigUser,
  MyTableActionEnum, prenotazioniTableConfig,
  prenotazioniTableConfigUser
} from "../../config/MyTableConfig";
import {MockDataService} from "../../services/mockData/mock-data.service";
import {Router} from "@angular/router";
import {createBtn, emptyBtn} from "../../config/MyButtonConfig";

@Component({
  selector: 'app-mezzi',
  templateUrl: './mezzi.component.html',
  styleUrls: ['./mezzi.component.css']
})
export class MezziComponent implements OnInit {

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);
  btnConfig = this.loggedUser.ruolo == 'SuperUser' ? createBtn : emptyBtn;
  mezzi: Mezzo[] = [];
  mezziConfig = this.loggedUser.ruolo == 'Customer' ? mezziTableConfigUser :mezziTableConfig;
  prenotazioniConfig = this.loggedUser.ruolo == 'Customer' ?  prenotazioniTableConfigUser : prenotazioniTableConfig;

  constructor(private mockService : MockDataService, private readonly router : Router) { }

  ngOnInit(): void {
    this.getMezzi();
  }

  getMezzi(){
    this.mockService.getMockMezzi().subscribe(mezzo => this.mezzi = mezzo);
  }

  sendTableAction(data: any) {
    switch (data.action) {
      case MyTableActionEnum.EDIT:
        this.router.navigate(["home/mezzi/Edit/" + data.data.id]);
        break;
      case MyTableActionEnum.DELETE:
        this.mockService.removePrenotazioniFromMezzi(data.data.id).subscribe((x => {
          this.mockService.removeMockMezzo(data.data).subscribe((y) => {
            this.getMezzi();
          });
        }));
        break;
      case 'new':
      case MyTableActionEnum.NEW_ROW:
        this.router.navigate(["home/mezzi/create/-1"]);
        break;
      case MyTableActionEnum.BOOK:
        let mezzoId = -1;
        this.mockService.getMockPrenotazioneFromId(data.data.id).subscribe(prenotazione => {
          mezzoId = prenotazione.auto;
          this.router.navigate(["home/prenotazioni/" + mezzoId + "/" + this.loggedUser.id + "/create/-1"]);
        });
        break;
      default:
        break;
    }
  }

}
