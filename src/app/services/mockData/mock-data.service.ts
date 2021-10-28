import {Injectable} from '@angular/core';
import {mockAuto, mockPrenotazioni} from "../../util/MockData";
import {Observable, of} from 'rxjs';
import {DateExample, Mezzo, Prenotazione, Utente} from "../../util/Interfaces";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  //Decommentare quando si avranno richieste HTTP al posto di dati mock
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
    return this.http.post<Utente>(`${this.userUrl}/utente/update`, utente);
  }

  updateMezzo(mezzo : Mezzo) : Observable<Mezzo>{
    return this.http.post<Mezzo>(`${this.mezziUrl}/mezzo/update`, mezzo);
  }

  deleteUtente(utenteId : number) : Observable<Utente>{
    // @ts-ignore
    return this.http.post<Utente>(`${this.userUrl}/utente/delete/${utenteId}`);
  }

  deleteMezzo(mezzoId : number) : Observable<Mezzo>{
    // @ts-ignore
    return this.http.post<Mezzo>(`${this.mezziUrl}/mezzo/delete/${mezzoId}`);
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
    // @ts-ignore
    return this.http.post<Prenotazione>(`${this.prenotazioniUrl}/prenotazione/delete/${prenotazioneId}`);
  }

  updatePrenotazione(prenotazione : Prenotazione) : Observable<Prenotazione>{
    console.log("Prenotazione da aggiungere: ");
    console.log(prenotazione);
    console.log("=================================");
    return this.http.post<Prenotazione>(`${this.prenotazioniUrl}/prenotazione/update`, prenotazione);
  }

  removePrenotazioniFromMezzi(mezzoId: number){
    _.remove(mockPrenotazioni, function (o) {
      return o.auto == mezzoId
    });
    return of(mockPrenotazioni);
  }

  removePrenotazioniFromUtenti(utenteId: number){
    _.remove(mockPrenotazioni, function (o) {
      return o.utente == utenteId
    });
    return of(mockPrenotazioni);
  }

  // updateMockPrenotazione(prenotazione: Prenotazione) {
  //   if (prenotazione.id !== null && prenotazione.id !== -1) {
  //     let index = _.findIndex(mockPrenotazioni, function (o) {
  //       return o.id == prenotazione.id
  //     });
  //     mockPrenotazioni[index] = prenotazione;
  //   } else {
  //     prenotazione.id = mockPrenotazioni[mockPrenotazioni.length - 1].id + 1;
  //     mockPrenotazioni.push(prenotazione);
  //   }
  //   return of(mockPrenotazioni);
  // }

  //Decommentare quando si avranno richieste HTTP al posto di dati mock
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }

  //Decommentare quando si avranno richieste HTTP al posto di dati mock
  // updateUtente(utente: Utente): Observable<any> {
  //   return this.http.put(this.userUrl, utente, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${utente.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

}
