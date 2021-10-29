import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MyTableActionEnum, userTableConfig} from "../../../config/MyTableConfig";
import {Utente} from "../../../util/Interfaces";
import {Router} from "@angular/router";
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {createBtn, emptyBtn} from "../../../config/MyButtonConfig";
import {HttpErrorResponse} from "@angular/common/http";
import {hideBtn} from "../../../util/Functions";

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
  hideBtns : boolean[] = [];
  btnConfig = this.loggedUser.ruolo == 'SuperUser' ? createBtn : emptyBtn;

  constructor(private readonly router : Router, private mockService : MockDataService) { }

  ngOnInit(): void {
    this.getUtenti();
  }

  getUtenti(){
    if(this.loggedUser.ruolo == 'SuperUser'){
      this.mockService.getUtenti().subscribe(user => {
        this.users = user;

      }, ((error : HttpErrorResponse) => {
        alert("Si è verificato un errore nel recupero degli Utenti dal database. \n" + error.message);
      }));
    }
    else {
      this.users = [this.loggedUser];
    }
  }

  sendTableAction(data: any) {
    // data.data.dataDiNascita = new Date(data.data.dataDiNascita);
    switch (data.action) {
      case MyTableActionEnum.EDIT:
        this.router.navigate(["home/utenti/edit/" + data.data.id]);
        break;
      case MyTableActionEnum.DELETE:
          this.mockService.deleteUtente(data.data.id).subscribe((y) => this.getUtenti());
        break;
      case 'new':
      case MyTableActionEnum.NEW_ROW:
        this.router.navigate(["home/utenti/create/-1"]);
        break;
      case "showBtn":
        hideBtn(data.condition, data.data, data.loggedUser);
        break;
      default:
        break;
    }
  }

}
