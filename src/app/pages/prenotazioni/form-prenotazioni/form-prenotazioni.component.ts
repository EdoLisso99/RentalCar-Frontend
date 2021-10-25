import { Component, OnInit } from '@angular/core';
import {MyHeaders} from "../../../config/MyTableConfig";
import {FormBuilder} from "@angular/forms";
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Prenotazione} from "../../../util/Interfaces";
import {emptyPrenotazione} from "../../../util/MockData";

@Component({
  selector: 'app-form-prenotazioni',
  templateUrl: './form-prenotazioni.component.html',
  styleUrls: ['./form-prenotazioni.component.css']
})
export class FormPrenotazioniComponent implements OnInit {

  data: any;
  action !: string | null;
  formGroup: any;
  prenotazioneId: number = -1;
  vehicleId !: number;
  userId !: number;

  constructor(private formBuilder: FormBuilder, private mockService: MockDataService,
              private readonly router : Router, private location: Location,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.prenotazioneId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.vehicleId = parseInt(this.route.snapshot.paramMap.get('vehicle')!);
    this.userId = parseInt(this.route.snapshot.paramMap.get('user')!);
    this.action = this.route.snapshot.paramMap.get('action');
    if(this.prenotazioneId !== -1){
      this.mockService.getMockPrenotazioneFromId(this.prenotazioneId).subscribe(prenotazione => {
        this.data = prenotazione;
      });
    }
    else {
      this.data = emptyPrenotazione;
    }
    this.formGroup = this.formBuilder.group({
      id: this.data['id'],
      dataDiInizio: this.data['dataDiInizio'],
      dataDiFine: this.data['dataDiFine'],
      accettata: this.data['accettata'],
      auto: this.data['auto'],
      utente: this.data['utente']
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

  onSubmit(formData: Prenotazione) {
    formData.auto = this.vehicleId;
    formData.utente = this.userId;
    this.mockService.updateMockPrenotazione(formData).subscribe((x) => {
      this.router.navigate(['home/prenotazioni']);
    });
  }

}
