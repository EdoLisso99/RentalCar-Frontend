import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MyTableActionEnum, userTableConfig} from "../../../config/MyTableConfig";
import {Utente} from "../../../util/Interfaces";
import {Router} from "@angular/router";
import {createBtn, emptyBtn} from "../../../config/MyButtonConfig";
import {HttpErrorResponse} from "@angular/common/http";
import {UtentiService} from "../../../services/utenti/utenti.service";
import {PrenotazioniService} from "../../../services/prenotazioni/prenotazioni.service";

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent implements OnInit {

  @Output() tableEvent = new EventEmitter<any>();

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);
  userConfig = userTableConfig;
  users: Utente[] = [];
  btnConfig = this.loggedUser.ruolo == 'SuperUser' ? createBtn : emptyBtn;

  constructor(private readonly router : Router, private utenteService : UtentiService,
              private prenotazioneService : PrenotazioniService) { }

  ngOnInit(): void {
    this.getUtenti();
  }

  getUtenti(){
    if(this.loggedUser.ruolo == 'SuperUser'){
      this.utenteService.getUtenti().subscribe(user => {
        user.forEach(tmpUtente => {
          console.log(tmpUtente)
          tmpUtente.nascita = new Date(tmpUtente.dataDiNascita).toISOString().split('T')[0];
        })
        this.users = user;
        this.users.forEach(user =>  {
          user.loggedUser = this.loggedUser;
        })
      }, ((error : HttpErrorResponse) => {
        alert("Si è verificato un errore nel recupero degli Utenti dal database. \n" + error.message);
      }));
    }
    else {
      this.users = [this.loggedUser];
      this.users[0].nascita = new Date(this.users[0].dataDiNascita).toISOString().split('T')[0];
    }
  }

  sendTableAction(data: any) {
    switch (data.action) {
      case MyTableActionEnum.EDIT:
        this.router.navigate(["home/utenti/edit/" + data.data.id]);
        break;
      case MyTableActionEnum.DELETE:
        this.prenotazioneService.getPrenotazioni().subscribe(prenotazioni => {
          let idPrenotazioni : number[] = [];
          prenotazioni.forEach(prenotazione => {
            if(prenotazione.utente.id == data.data.id){
              idPrenotazioni.push(prenotazione.id);
            }
          })
          if(idPrenotazioni.length > 0){
            idPrenotazioni.forEach(id => {
              this.prenotazioneService.deletePrenotazione(id).subscribe(x => {});
            })
          }
          this.utenteService.deleteUtente(data.data.id).subscribe((utente) => {
            this.getUtenti();
            alert("Eliminazione dell'utente " + utente.nome + " " + utente.cognome + " effettuata con successo!");
          })
        });
        break;
      case 'new':
      case MyTableActionEnum.NEW_ROW:
        this.router.navigate(["home/utenti/create/-1"]);
        break;
      default:
        break;
    }
  }

}
