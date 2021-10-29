import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DateExample, Mezzo, Prenotazione, Utente} from "../../util/Interfaces";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private userUrl = environment.apiBaseUrl;
  private mezziUrl = environment.apiBaseUrl;
  private prenotazioniUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getUtenti() : Observable<Utente[]>{
    return this.http.get<Utente[]>(`${this.userUrl}/utente/all`);
  }

  getAvailableMezzi(dateExample: DateExample) : Observable<Mezzo[]>{
    return this.http.post<Mezzo[]>(`${this.userUrl}/mezzo/available`, dateExample);
  }

  updateUtente(utente : Utente) : Observable<Utente>{
    return this.http.put<Utente>(`${this.userUrl}/utente/update`, utente);
  }

  updateMezzo(mezzo : Mezzo) : Observable<Mezzo>{
    return this.http.put<Mezzo>(`${this.mezziUrl}/mezzo/update`, mezzo);
  }

  deleteUtente(utenteId : number) : Observable<Utente>{
    // @ts-ignore
    return this.http.delete<Utente>(`${this.userUrl}/utente/delete/${utenteId}`);
  }

  deleteMezzo(mezzoId : number) : Observable<Mezzo>{
    // @ts-ignore
    return this.http.delete<Mezzo>(`${this.mezziUrl}/mezzo/delete/${mezzoId}`);
  }

  getUtenteFromId(utenteId: number) : Observable<Utente> {
    return this.http.get<Utente>(`${this.userUrl}/utente/${utenteId}`);
  }

  getMezzi() : Observable<Mezzo[]>{
    return this.http.get<Mezzo[]>(`${this.mezziUrl}/mezzo/all`);
  }

  getMezzoFromId(mezzoId: number) : Observable<Mezzo> {
    return this.http.get<Mezzo>(`${this.mezziUrl}/mezzo/${mezzoId}`);
  }

  getPrenotazioni() : Observable<Prenotazione[]>{
    return this.http.get<Prenotazione[]>(`${this.prenotazioniUrl}/prenotazione/all`);
  }

  getPrenotazioneFromId(prenotazioneId: number) : Observable<Prenotazione>{
    return this.http.get<Prenotazione>(`${this.prenotazioniUrl}/prenotazione/${prenotazioneId}`);
  }

  deletePrenotazione(prenotazioneId : number) : Observable<Prenotazione>{
    return this.http.delete<Prenotazione>(`${this.prenotazioniUrl}/prenotazione/delete/${prenotazioneId}`);
  }

  updatePrenotazione(prenotazione : Prenotazione) : Observable<Prenotazione>{
    return this.http.put<Prenotazione>(`${this.prenotazioniUrl}/prenotazione/update`, prenotazione);
  }

}
