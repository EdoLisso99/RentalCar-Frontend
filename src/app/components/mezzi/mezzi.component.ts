import { Component, OnInit } from '@angular/core';
import {Mezzo, Utente} from "../../util/Interfaces";
import {
  mezziTableConfig,
  mezziTableConfigUser,
  MyTableActionEnum, prenotazioniTableConfig,
  prenotazioniTableConfigUser
} from "../../config/MyTableConfig";
import {MockDataService} from "../../services/mockData/mock-data.service";
import {emptyMezzo, emptyPrenotazione} from "../../util/MockData";
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
        this.setSession(data.data, 'Edit');
        this.router.navigate(["home/mezzi/edit"]);
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
        this.setSession(emptyMezzo, "Create");
        this.router.navigate(["home/mezzi/new"]);
        break;
      case MyTableActionEnum.BOOK:
        this.setPrenotazioneSession(data.data.id, this.loggedUser.id);
        this.router.navigate(["home/prenotazioni/new"]);
        break;
      default:
        break;
    }
  }

  setSession(data: any, action: string){
    sessionStorage.setItem('data', JSON.stringify(data));
    sessionStorage.setItem('type', 'Mezzi');
    sessionStorage.setItem('action', action);
    sessionStorage.setItem('keys', JSON.stringify(this.mezziConfig.headers));
  }


  private setPrenotazioneSession(mezzoId: number, utenteId: number) {
    let tempPrenotazione = emptyPrenotazione;
    tempPrenotazione.auto = mezzoId;
    tempPrenotazione.utente = utenteId;
    tempPrenotazione.accettata = null;
    sessionStorage.setItem('data', JSON.stringify(tempPrenotazione));
    sessionStorage.setItem('type', 'Prenotazioni');
    sessionStorage.setItem('action', 'Create');
    sessionStorage.setItem('keys', JSON.stringify(this.prenotazioniConfig.headers));
  }
}
