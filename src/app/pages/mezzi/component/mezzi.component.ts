import { Component, OnInit } from '@angular/core';
import {DateExample, Mezzo, Prenotazione, Utente} from "../../../util/Interfaces";
import {
  altMezziTableConfig,
  mezziTableConfig,
  MyTableActionEnum
} from "../../../config/MyTableConfig";
import {Router} from "@angular/router";
import {createBtn, emptyBtn, filterBtn, restoreBtn} from "../../../config/MyButtonConfig";
import {MezziService} from "../../../services/mezzi/mezzi.service";
import {UtentiService} from "../../../services/utenti/utenti.service";
import {PrenotazioniService} from "../../../services/prenotazioni/prenotazioni.service";

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
  mezziConfig = mezziTableConfig;
  altMezziConfig = altMezziTableConfig;
  filterBtnConfig: any = filterBtn;
  restoreBtnConfig: any = restoreBtn;
  inizio: any = null;
  fine: any = null;

  constructor(private mezzoService : MezziService,
              private utenteService : UtentiService,
              private prenotazioneService : PrenotazioniService,
              private readonly router : Router) { }

  ngOnInit(): void {
    this.getMezzi();
  }

  filterMezzi() {
    this.mezzoService.getAvailableMezzi(new DateExample(this.inizio, this.fine)).subscribe(mezziDisponibili => {
      this.mezzi = mezziDisponibili;
      this.filteredMezzi = false;
    })
  }

  getMezzi(){
    this.mezzoService.getMezzi().subscribe(mezzo => {
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
    this.inizio = null;
    this.fine = null;
    this.mezzoService.getMezzi().subscribe(mezzi => {
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
          this.mezzoService.deleteMezzo(data.data.id).subscribe((mezzo) => {
            this.getMezzi();
            alert("Eliminazione del mezzo " + mezzo.casaCostruttrice + " " + mezzo.modello + " effettuata con successo!");
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
        let tmpMezzo : Mezzo;
        let tmpUtente : Utente;
        this.mezzoService.getMezzoFromId(data.data.id).subscribe(mezzo => {
          tmpMezzo = mezzo;
          this.utenteService.getUtenteFromId(this.loggedUser.id).subscribe(utente => {
            tmpUtente = utente;
            let tmpPrenotazione = new Prenotazione({inizio: new Date(this.inizio),
            fine: new Date(this.fine), auto: tmpMezzo, utente: tmpUtente});
            this.prenotazioneService.updatePrenotazione(tmpPrenotazione).subscribe(prenotazione => {
              alert("Il veicolo " + tmpMezzo.casaCostruttrice + " " + tmpMezzo.modello + " è stato prenotato con successo!");
              this.filteredMezzi = true;
              this.inizio = null;
              this.fine = null;
            });
          });
        });
        break;
      default:
        break;
    }
  }

}
