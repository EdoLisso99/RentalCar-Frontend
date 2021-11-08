import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UtentiService} from "../../services/utenti/utenti.service";
import {LoginService} from "../../services/login/login.service";
import {Utente} from "../../util/Interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private loginService : LoginService,
    private readonly router : Router, private utenteService: UtentiService) { }

  ngOnInit(): void {
  }

  login(obj:Utente){
    sessionStorage.setItem('loggedUser', JSON.stringify(obj));
    this.router.navigate(['home']);
  }

  showAll() {
    this.loginService.login(this.username, this.password).subscribe(response => {
      sessionStorage.setItem("token", response.access_token);
      let utente : Utente = new Utente();
      this.utenteService.getUtenteFromUsername(this.username).subscribe(resp => {
        utente = resp;
        this.login(resp);
      })
      console.log("====================");
    })
  }

  lostPw() {
    alert("Aumentate lo stipendio a tutti i componenti della caverna Java per avere questa feature");
  }
}
