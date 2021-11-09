import { Component, OnInit } from '@angular/core';
import {Prenotazione, Utente} from "../../../util/Interfaces";
import {MyTableActionEnum, prenotazioniTableConfig} from "../../../config/MyTableConfig";
import {emptyBtn} from "../../../config/MyButtonConfig";
import {Router} from "@angular/router";
import {PrenotazioniService} from "../../../services/prenotazioni/prenotazioni.service";
import {dateOverlaps} from "../../../util/Functions";

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  loggedUser: Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);
  prenotazioni: Prenotazione[] = [];
  prenotazioniConfig = prenotazioniTableConfig;
  btnConfig = emptyBtn;

  constructor(private prenotazioneService: PrenotazioniService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.getPrenotazioni();
  }

  getPrenotazioni() {
    this.prenotazioneService.getPrenotazioni().subscribe(prenotazione => {
      prenotazione.forEach(tmpPrenotazione => {
        tmpPrenotazione.status = tmpPrenotazione.accettata ? "Accettata" : tmpPrenotazione.accettata == null ?
          "In attesa di conferma..." : "Rifiutata";
        tmpPrenotazione.user = tmpPrenotazione.utente.nome + " " + tmpPrenotazione.utente.cognome;
        tmpPrenotazione.mezzo = tmpPrenotazione.auto.casaCostruttrice + " " + tmpPrenotazione.auto.modello;
        tmpPrenotazione.inizio = new Date(tmpPrenotazione.dataDiInizio).toISOString().split('T')[0];
        tmpPrenotazione.fine = new Date(tmpPrenotazione.dataDiFine).toISOString().split('T')[0];
      });
      this.prenotazioni = prenotazione
    }, (error => {
          alert("Si è verificato un errore nel recupero delle Prenotazioni dal DB!");
          console.log(error);
        }));
  }

  sendTableAction(data: any) {
    switch (data.action) {
      case MyTableActionEnum.EDIT:
        let mezzoId = -1;
        this.prenotazioneService.getPrenotazioneFromId(data.data.id).subscribe(prenotazione => {
          mezzoId = prenotazione.auto.id;
          this.router.navigate(["home/prenotazioni/" + mezzoId + "/" + this.loggedUser.id + "/edit/" + data.data.id]);
        });
        break;
      case MyTableActionEnum.DELETE:
        this.prenotazioneService.deletePrenotazione(data.data.id).subscribe((prenotazione) => {
          alert("Eliminazione della prenotazione avvenuta con successo!");
          this.getPrenotazioni();
        }, (error => {
          alert("Si è verificato un errore con l'eliminazione della Prenotazione");
          console.log(error);
        }));
        break;
      case MyTableActionEnum.APPROVE:
        data.data.accettata = true;
        this.prenotazioneService.updatePrenotazione(data.data).subscribe((x) => {
          this.getPrenotazioni();
          this.prenotazioni.forEach(prenotazione => {
            if(prenotazione.id !== data.data.id && dateOverlaps(data.data.inizio, data.data.fine, prenotazione.dataDiInizio, prenotazione.dataDiFine)){
              prenotazione.accettata = false;
            }
          })
        }, (error => {
          alert("Si è verificato un errore con l'approvazione della Prenotazione!");
          console.log(error);
        }));
        break;
      case MyTableActionEnum.REJECT:
        data.data.accettata = false;
        this.prenotazioneService.updatePrenotazione(data.data).subscribe((x) => {
          this.getPrenotazioni();
        }, (error => {
          alert("Si è verificato un errore con il rifiuto della Prenotazione!");
          console.log(error);
        }));
        break;
      default:
        break;
    }
  }

}
