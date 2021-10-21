import { Component, OnInit } from '@angular/core';
import {MyHeaders} from "../../../config/MyTableConfig";
import {FormBuilder} from "@angular/forms";
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Prenotazione} from "../../../util/Interfaces";

@Component({
  selector: 'app-form-prenotazioni',
  templateUrl: './form-prenotazioni.component.html',
  styleUrls: ['./form-prenotazioni.component.css']
})
export class FormPrenotazioniComponent implements OnInit {

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
      dataDiInizio: this.data['dataDiInizio'],
      dataDiFine: this.data['dataDiFine'],
      accettata: this.data['accettata'],
      auto: this.data['auto'],
      utente: this.data['utente']
    });
  }

  onSubmit(formData: Prenotazione) {
    this.mockService.updateMockPrenotazione(formData).subscribe((x) => {
      this.clearSession();
      this.router.navigate(['home/prenotazioni']);
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
