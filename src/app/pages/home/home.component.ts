import {Component, OnInit} from '@angular/core';
import {Utente} from "../../util/Interfaces";
import {logoutBtn} from "../../config/MyButtonConfig";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);
  logoutBtnConfig = logoutBtn;

  constructor(private readonly router : Router) { }

  ngOnInit(): void {
  }

  changePath(path: string) {
    this.router.navigate(['home/' + path]);
  }

  logout() {
    sessionStorage.removeItem('loggedUser');
    this.router.navigate(['login']);
  }

}
