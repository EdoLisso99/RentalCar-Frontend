import { Component, OnInit } from '@angular/core';
import {loginTableConfig} from "../../config/MyTableConfig";
import {Utente} from "../../util/Interfaces";
import {Router} from "@angular/router";
import {UtentiService} from "../../services/utenti/utenti.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: Utente[] = [];
  tableConfig = loginTableConfig;

  constructor(private utenteService: UtentiService, private readonly router : Router) { }

  ngOnInit(): void {
    this.getUtenti();
  }

  getUtenti(){
    this.utenteService.getUtenti().subscribe((user: Utente[]) => {
      this.users = user
    }, ((error : any) => {
      alert("Si è verificato un errore nel recupero degli Utenti dal database. \n" + error.message);
      console.log(error);
      }));
  }

  login(obj:any){
    sessionStorage.setItem('loggedUser', JSON.stringify(obj.data));
    this.router.navigate(['home']);
  }

}
