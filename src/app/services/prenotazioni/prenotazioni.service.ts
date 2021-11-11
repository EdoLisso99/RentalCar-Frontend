import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Prenotazione} from "../../util/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {
  private prenotazioniUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getPrenotazioni() : Observable<Prenotazione[]>{
    let x = `${this.prenotazioniUrl}/prenotazione/all`;
    return this.http.get<Prenotazione[]>(`${this.prenotazioniUrl}/prenotazione/all`);
  }

  getPrenotazioneFromId(prenotazioneId: number) : Observable<Prenotazione>{
    return this.http.get<Prenotazione>(`${this.prenotazioniUrl}/prenotazione/${prenotazioneId}`);
  }

  deletePrenotazione(prenotazioneId : number) : Observable<Prenotazione>{
    return this.http.delete<Prenotazione>(`${this.prenotazioniUrl}/prenotazione/delete/${prenotazioneId}`);
  }

  updatePrenotazione(prenotazione : Prenotazione) : Observable<Prenotazione>{
    let x = `${this.prenotazioniUrl}/prenotazione/update`;
    return this.http.put<Prenotazione>(`${this.prenotazioniUrl}/prenotazione/update`, prenotazione);
  }

}
