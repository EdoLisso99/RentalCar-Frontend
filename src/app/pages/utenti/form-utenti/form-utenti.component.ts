import { Component, OnInit } from '@angular/core';
import { MyHeaders, userTableConfig} from "../../../config/MyTableConfig";
import { FormBuilder } from '@angular/forms';
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {Utente} from "../../../util/Interfaces";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {emptyUser} from "../../../util/MockData";


@Component({
  selector: 'app-form-utenti',
  templateUrl: './form-utenti.component.html',
  styleUrls: ['./form-utenti.component.css']
})
export class FormUtentiComponent implements OnInit {

  data: any;
  action !: string | null;
  keyObj : MyHeaders[] = userTableConfig.headers;
  formGroup: any;
  userId : number = -1;

  constructor(private formBuilder: FormBuilder, private mockService: MockDataService,
              private readonly router : Router, private location: Location,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.action = this.route.snapshot.paramMap.get('action');
    if(this.userId !== -1){
      this.mockService.getMockUserFromId(this.userId).subscribe(user => {
        this.data = user;
      });
    }
    else {
      this.data = emptyUser;
    }
    this.formGroup = this.formBuilder.group({
      id: this.data['id'],
      nome: this.data['nome'],
      cognome: this.data['cognome'],
      dataDiNascita: this.data['dataDiNascita'],
      ruolo: this.data['ruolo']
    });
  }

  onSubmit(formData:Utente) {
    this.mockService.updateMockUser(formData).subscribe((x) => {
      //Se un customer si modifica devo aggiornare i suoi valori, dato che nella
      //tabella prendo i suoi valori direttamente dalla session storage
      if (formData.ruolo == 'Customer' &&
        JSON.parse(sessionStorage.getItem('loggedUser')!).id == formData.id){
        sessionStorage.removeItem('loggedUser');
        sessionStorage.setItem('loggedUser', JSON.stringify(formData));
      }
      this.router.navigate(['home/utenti']);
    });
  }

  //Restituisce i nomi dei parametri di un array di oggetti
  getKey(data: MyHeaders[]) : string[]{
    if(data.length == 0){
      return [];
    }
    else {
      return data.map(element => element.key);
    }
  }

  goBack() {
    this.location.back();
  }
}
