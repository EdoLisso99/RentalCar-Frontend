import { Component, OnInit } from '@angular/core';
import {Mezzo, Utente} from "../../../util/Interfaces";
import {
  mezziTableConfig,
  mezziTableConfigUser,
  MyTableActionEnum
} from "../../../config/MyTableConfig";
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {Router} from "@angular/router";
import {createBtn, emptyBtn, filterBtn, restoreBtn} from "../../../config/MyButtonConfig";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-mezzi',
  templateUrl: './mezzi.component.html',
  styleUrls: ['./mezzi.component.css']
})
export class MezziComponent implements OnInit {

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);
  filteredMezzi = true;
  btnConfig = this.loggedUser.ruolo == 'SuperUser' ? createBtn : emptyBtn;
  mezzi: Mezzo[] = [];
  mezziConfig = this.loggedUser.ruolo == 'Customer' ? mezziTableConfigUser :mezziTableConfig;
  filterBtnConfig: any = filterBtn;
  restoreBtnConfig: any = restoreBtn;
  inizio: any;
  fine: any;

  constructor(private mockService : MockDataService, private readonly router : Router) { }

  ngOnInit(): void {
    this.getMezzi();
  }

  filterMezzi() {
    this.mockService.getAvailableMezzi(this.inizio, this.fine).subscribe(mezziDisponibili => {
      this.mezzi = mezziDisponibili;
      this.filteredMezzi = false;
    })
  }

  getMezzi(){
    this.mockService.getMezzi().subscribe(mezzo => {
      this.mezzi = mezzo
    }, (error => {
      alert("Si è verificato un errore nel recuperare i Mezzi dal DB!");
      console.log(error);
    }));
  }

  restoreMezzi() {
    this.filteredMezzi = true;
    this.mockService.getMezzi().subscribe(mezzi => {
      this.mezzi = mezzi;
    }, (error => {
      alert("Si è verificato un errore nel recuperare i Mezzi dal DB!");
      console.log(error);
    }));
  }

  sendTableAction(data: any) {
    switch (data.action) {
      case MyTableActionEnum.EDIT:
        this.router.navigate(["home/mezzi/Edit/" + data.data.id]);
        break;
      case MyTableActionEnum.DELETE:
        //TODO da implementare

        // this.mockService.deletePrenotazioneFromMezzoId(data.data.id).subscribe((x) => {
          this.mockService.deleteMezzo(data.data.id).subscribe((y) => {
            this.getMezzi();
          }, (error => {
            alert("Si è verificato un errore nella rimozione del Mezzo " + data.data.casaCostruttrice + " " + data.data.modello);
            console.log(error);
          }));
        // }, ((error) => {
        //   alert("Si è verificato un errore nella rimozione della Prenotazione");
        //   console.log(error);
        // }));
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
