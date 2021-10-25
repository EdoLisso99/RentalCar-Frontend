import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MyTableActionEnum, userTableConfig, userTableConfigCustomer} from "../../../config/MyTableConfig";
import {Utente} from "../../../util/Interfaces";
import {Router} from "@angular/router";
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {createBtn, emptyBtn} from "../../../config/MyButtonConfig";

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css']
})
export class UtentiComponent implements OnInit {

  @Output() tableEvent = new EventEmitter<any>();

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);
  userConfig = this.loggedUser.ruolo == 'Customer' ? userTableConfigCustomer : userTableConfig;
  users: Utente[] = [];
  btnConfig = this.loggedUser.ruolo == 'SuperUser' ? createBtn : emptyBtn;

  constructor(private readonly router : Router, private mockService : MockDataService) { }

  ngOnInit(): void {
    this.getUtenti();
  }

  getUtenti(){
    if(this.loggedUser.ruolo == 'SuperUser'){
      this.mockService.getMockUsers().subscribe(user => this.users = user);
      console.log("Utenti Aggiornati:");
      console.log(this.users);
      console.log("=========================");
    }
    else {
      this.users = [this.loggedUser];
    }
  }

  sendTableAction(data: any) {
    switch (data.action) {
      case MyTableActionEnum.EDIT:
        this.router.navigate(["home/utenti/edit/" + data.data.id]);
        break;
      case MyTableActionEnum.DELETE:
        this.mockService.removePrenotazioniFromUtenti(data.data.id).subscribe((x) => {
          this.mockService.removeMockUser(data.data).subscribe((y) => this.getUtenti());
        })
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
