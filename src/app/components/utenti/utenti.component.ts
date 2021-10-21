import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MyTableActionEnum, userTableConfig, userTableConfigCustomer} from "../../config/MyTableConfig";
import {Utente} from "../../util/Interfaces";
import {Router} from "@angular/router";
import {MockDataService} from "../../services/mockData/mock-data.service";
import {emptyUser} from "../../util/MockData";
import {createBtn, emptyBtn} from "../../config/MyButtonConfig";

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
        this.setSession(data.data, 'Edit');
        this.router.navigate(["home/utenti/edit"]);
        break;
      case MyTableActionEnum.DELETE:
        this.mockService.removeMockUser(data.data).subscribe((x) => this.getUtenti());
        break;
      case 'new':
      case MyTableActionEnum.NEW_ROW:
        this.setSession(emptyUser, "Create");
        this.router.navigate(["home/utenti/new"]);
        break;
      default:
        break;
    }
  }

  setSession(data: any, action: string){
    sessionStorage.setItem('data', JSON.stringify(data));
    sessionStorage.setItem('type', 'Utente');
    sessionStorage.setItem('action', action);
    sessionStorage.setItem('keys', JSON.stringify(this.userConfig.headers));
  }
}
