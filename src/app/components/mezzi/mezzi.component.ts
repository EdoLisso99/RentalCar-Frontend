import { Component, OnInit } from '@angular/core';
import {Mezzo, Utente} from "../../util/Interfaces";
import {mezziTableConfig, mezziTableConfigUser, MyTableActionEnum} from "../../config/MyTableConfig";
import {MockDataService} from "../../services/mockData/mock-data.service";
import {emptyMezzo} from "../../util/MockData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mezzi',
  templateUrl: './mezzi.component.html',
  styleUrls: ['./mezzi.component.css']
})
export class MezziComponent implements OnInit {

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);

  mezzi: Mezzo[] = [];
  mezziConfig = this.loggedUser.ruolo == 'Customer' ? mezziTableConfigUser :mezziTableConfig;

  constructor(private mockService : MockDataService, private readonly router : Router) { }

  ngOnInit(): void {
    this.getMezzi();
  }

  getMezzi(){
    this.mockService.getMockMezzi().subscribe(mezzo => this.mezzi = mezzo);
  }

  sendTableAction(data: any) {
    switch (data.action) {
      case MyTableActionEnum.EDIT:
        this.setSession(data.data, 'Edit');
        this.router.navigate(["home/mezzi/edit"]);
        break;
      case MyTableActionEnum.DELETE:
        this.mockService.removeMockMezzo(data.data).subscribe((x) => this.getMezzi());
        break;
      case MyTableActionEnum.NEW_ROW:
        this.setSession(emptyMezzo, "Create");
        this.router.navigate(["home/mezzi/new"]);
        break;
      default:
        break;
    }
  }

  setSession(data: any, action: string){
    sessionStorage.setItem('data', JSON.stringify(data));
    sessionStorage.setItem('type', 'Mezzi');
    sessionStorage.setItem('action', action);
    sessionStorage.setItem('keys', JSON.stringify(this.mezziConfig.headers));
  }


}
