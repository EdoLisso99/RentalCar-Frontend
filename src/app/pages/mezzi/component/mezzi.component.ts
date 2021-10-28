import { Component, OnInit } from '@angular/core';
import {DateExample, Mezzo, Utente} from "../../../util/Interfaces";
import {
  mezziTableConfig,
  mezziTableConfigUser,
  MyTableActionEnum
} from "../../../config/MyTableConfig";
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {Router} from "@angular/router";
import {createBtn, emptyBtn, filterBtn, restoreBtn} from "../../../config/MyButtonConfig";

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
  inizio: any = null;
  fine: any = null;

  constructor(private mockService : MockDataService, private readonly router : Router) { }

  ngOnInit(): void {
    this.getMezzi();
    this.print();
  }

  filterMezzi() {
    this.mockService.getAvailableMezzi(new DateExample(this.inizio, this.fine)).subscribe(mezziDisponibili => {
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

  print(){
    console.log("Inizio:  " + this.inizio + " - Fine: " + this.fine);
    console.log(this.inizio === null);
    console.log(this.fine === null);
    console.log("===========================");
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
        this.router.navigate(["home/mezzi/edit/" + data.data.id]);
        break;
      case MyTableActionEnum.DELETE:
          this.mockService.deleteMezzo(data.data.id).subscribe((y) => {
            this.getMezzi();
          }, (error => {
            alert("Si è verificato un errore nella rimozione del Mezzo " + data.data.casaCostruttrice + " " + data.data.modello);
            console.log(error);
          }));
        break;
      case 'new':
      case MyTableActionEnum.NEW_ROW:
        this.router.navigate(["home/mezzi/create/-1"]);
        break;
      case MyTableActionEnum.BOOK:
        let mezzoId = data.data.id;
        this.router.navigate(["home/prenotazioni/" + mezzoId + "/" + this.loggedUser.id + "/create/-1"]);
        break;
      default:
        break;
    }
  }

}
