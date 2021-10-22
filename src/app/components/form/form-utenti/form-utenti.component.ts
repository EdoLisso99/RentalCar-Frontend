import { Component, OnInit } from '@angular/core';
import {MyHeaders} from "../../../config/MyTableConfig";
import { FormBuilder } from '@angular/forms';
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {Utente} from "../../../util/Interfaces";
import {Router} from "@angular/router";
import {Location} from "@angular/common";


@Component({
  selector: 'app-form-utenti',
  templateUrl: './form-utenti.component.html',
  styleUrls: ['./form-utenti.component.css']
})
export class FormUtentiComponent implements OnInit {

  data: any = sessionStorage.getItem('data')!;
  type: string = sessionStorage.getItem('type')!;
  action: string = sessionStorage.getItem('action')!;
  keyObj : MyHeaders[] = JSON.parse(sessionStorage.getItem('keys')!);
  formGroup: any;

  constructor(private formBuilder: FormBuilder, private mockService: MockDataService,
              private readonly router : Router, private location: Location) { }

  ngOnInit(): void {
    this.data = JSON.parse(sessionStorage.getItem('data')!);
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
      this.clearSession();
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

  clearSession(){
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('type');
    sessionStorage.removeItem('action');
    sessionStorage.removeItem('keys');
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
    this.clearSession();
    this.location.back();
  }
}
