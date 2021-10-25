import { Component, OnInit } from '@angular/core';
import {loginTableConfig} from "../../config/MyTableConfig";
import {Utente} from "../../util/Interfaces";
import {MockDataService} from "../../services/mockData/mock-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: Utente[] = [];
  tableConfig = loginTableConfig;

  constructor(private mockService : MockDataService, private readonly router : Router) { }

  ngOnInit(): void {
    this.getUtenti();
  }

  getUtenti(){
    this.mockService.getMockUsers().subscribe(user => this.users = user);
  }

  login(obj:any){
    sessionStorage.setItem('loggedUser', JSON.stringify(obj.data));
    this.router.navigate(['home']);
  }

}
